using UnityEngine;
using System.Collections;

public class ProjectileDrag : MonoBehaviour {
	
	public float maxStretch = 3.0f;
	private SpringJoint2D spring;
	private Transform tempPlayer;
	private bool clickedOn;
	private Ray rayToMouse;
	private float maxStretchSqr;
	private Vector2 prevVelocity;

	void Awake () {
		spring = GetComponent <SpringJoint2D> ();
		tempPlayer = spring.connectedBody.transform;
	}
	
	void Start () {
		rayToMouse = new Ray (tempPlayer.position, Vector3.zero);
		maxStretchSqr = maxStretch * maxStretch;
	}
	
	void Update () {
		if (clickedOn) {
			Dragging ();
		}
		
		if (spring != null) {
			if (!GetComponent<Rigidbody2D>().isKinematic && prevVelocity.sqrMagnitude > GetComponent<Rigidbody2D>().velocity.sqrMagnitude) {
				Destroy (spring);
				GetComponent<Rigidbody2D>().velocity = prevVelocity * 0.8f;
			}
			if (!clickedOn) {
				prevVelocity = GetComponent<Rigidbody2D>().velocity;
			}
			
		}
	}
	
	void OnMouseDown() {
		spring.enabled = false;
		clickedOn = true;
	}
	
	void OnMouseUp() {
		spring.enabled = true;
		GetComponent<Rigidbody2D>().isKinematic = false;
		clickedOn = false;
	}
	
	void Dragging () {
		Vector3 mouseWorldPoint = Camera.main.ScreenToWorldPoint (Input.mousePosition);
		Vector2 throwToMouse = mouseWorldPoint - tempPlayer.position;
		
		if (throwToMouse.sqrMagnitude > maxStretchSqr) {
			rayToMouse.direction = throwToMouse;
			mouseWorldPoint = rayToMouse.GetPoint(maxStretch);
		}

		
		mouseWorldPoint.z = 0.0f;
		transform.position = mouseWorldPoint;
	}

}