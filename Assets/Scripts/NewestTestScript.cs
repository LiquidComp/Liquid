using UnityEngine;
using System.Collections;

public class NewestTestScript : MonoBehaviour {
	
	//variables for catapult
	public float maxStretch = 2.0f;

	
	private SpringJoint2D spring;
	private Transform tempPlayer;
	private Ray rayToMouse;
	private float maxStretchSqr;
	private float circleRadius;
	private Vector2 prevVelocity;
	private bool clickedOn = false;
	
	//prediction line
	private int samples = 15;
	private float spacing = 0.1f;
	private GameObject[] line;
	private Vector3 home;
	private float actualForce = 0.0f;
	private float force = 4.0f;
	
	
	
	void Awake(){
		spring = GetComponent<SpringJoint2D> ();
		tempPlayer = spring.connectedBody.transform;
	}
	
	// Use this for initialization
	void Start () {
		rayToMouse = new Ray (tempPlayer.position, Vector3.zero);
		maxStretchSqr = maxStretch * maxStretch;
		CircleCollider2D circle = GetComponent<Collider2D>() as CircleCollider2D;
		circleRadius = circle.radius;
		
		line = new GameObject[samples];
		for (int i = 0; i < line.Length; i++){
			var go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
			go.GetComponent<Collider>().enabled = false;
			go.transform.localScale = new Vector3(0.2f,0.2f,0.2f);
			line[i] = go;
		}
		
		home = transform.position;
	}
	
	void FixedUpdate(){
		
		if (clickedOn)
			DisplayLine ();
	}
	
	
	// Update is called once per frame
	void Update () {
		Vector2 distanceFromCatapult = new Vector2(transform.position.x - tempPlayer.position.x, transform.position.y - tempPlayer.position.y);
		actualForce = distanceFromCatapult.magnitude + force;
		if (clickedOn)
			Dragging ();
		
		if (spring != null) {
			if(!GetComponent<Rigidbody2D>().isKinematic && prevVelocity.sqrMagnitude > GetComponent<Rigidbody2D>().velocity.sqrMagnitude){
				Destroy (spring);
				GetComponent<Rigidbody2D>().velocity = prevVelocity;
			}
			if (!clickedOn)
				prevVelocity = GetComponent<Rigidbody2D>().velocity;
			} 
		
	}

	
	void OnMouseDown(){
		spring.enabled = false;
		clickedOn = true;
	}
	
	void OnMouseUp(){
		spring.enabled = true;
		GetComponent<Rigidbody2D>().isKinematic = false;
		clickedOn = false;
	}
	
	void Dragging(){
		Vector3 mouseWorldPoint = Camera.main.ScreenToWorldPoint (Input.mousePosition);
		Vector2 catapultToMouse = mouseWorldPoint - tempPlayer.position;
		
		if (catapultToMouse.sqrMagnitude > maxStretchSqr) {
			rayToMouse.direction = catapultToMouse;
			mouseWorldPoint = rayToMouse.GetPoint(maxStretch);
		}
		
		mouseWorldPoint.z = 0.0f;
		transform.position = mouseWorldPoint;
		
	}

	
	void DisplayLine(){
		line [0].transform.position = transform.position;
		Vector3 v3 = transform.position;
		float y = (actualForce * (home - transform.position)).y;
		float t = 0.0f;
		v3.y = 0.0f;
		
		for (int i = 1; i < line.Length; i++) {
			v3 += actualForce * (home - transform.position) * spacing;
			t += spacing;
			v3.y = y * t + 0.5f * Physics2D.gravity.y * t * t + transform.position.y;
			line[i].transform.position = v3;
		}
	}
}