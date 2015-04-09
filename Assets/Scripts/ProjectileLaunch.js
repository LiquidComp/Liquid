public var maxStretch = 2.0;
public var force = 15.0;
public var samples = 15;
public var spacing = 0.1;
public var trajectorySprite : Sprite;
public var trajectoryParent : Transform;

private var spring : SpringJoint2D;
private var tempPlayer : Transform;
private var clickedOn;
private var rayToMouse : Ray;
private var maxStretchSqr : float;
private var prevVelocity : Vector2;
private var offset : Vector2;
private var home : Vector2;
private var argo : GameObject[];
private var balls : float;
private var normalScale : float;
//dkdgdfgjh

function Awake () {
		spring = gameObject.GetComponent(SpringJoint2D);
		tempPlayer = spring.connectedBody.transform;
	}
	
 
 function Start () {
 	 normalScale = transform.localScale.y;
     home = transform.position;
     argo = new GameObject[samples];
     for (var i = 0; i < argo.Length; i++) {
     	 balls = balls + 0.005;
         var go = GameObject();
         go.transform.localScale = Vector3((0.2 - balls), (0.2 - balls), 0.2);
         go.AddComponent.<SpriteRenderer>().sprite = trajectorySprite;
         go.GetComponent.<Renderer>().sortingLayerName = "Foreground";
		 go.GetComponent.<Renderer>().sortingOrder = 3;
		 go.name = "Trajectory Dot " + i;
		 go.transform.parent = trajectoryParent;
         argo[i] = go;
     }
     ShowHideIndicators(false);
     rayToMouse = new Ray (tempPlayer.position, Vector3.zero);
	 maxStretchSqr = maxStretch * maxStretch;
 }
 
 function Update () {
<<<<<<< HEAD
 		//transform.localScale.y = normalScale - (GetComponent.<Rigidbody2D>().velocity.x / (force * maxStretch * 2.5));
=======
 		transform.rotation.z = 0;
 		transform.localScale.y = normalScale - ((GetComponent.<Rigidbody2D>().velocity.x) / (force * maxStretch * 2.5));
>>>>>>> 2c0c336b1b455dd99fcba894642dd74563d71cdd
 		var shootVector = home - transform.position;
 		if (clickedOn) {
			Dragging ();
		}
		
		if (spring != null) {
			if (!gameObject.GetComponent(Rigidbody2D).isKinematic) {
				Destroy (spring);
				GetComponent(Rigidbody2D).AddForce((shootVector * force), ForceMode2D.Impulse);
			}
			
		}
}	

 function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "Obstacles")
		transform.localScale.y = normalScale - ((0.5 - (0.5 *(Time.smoothDeltaTime / 20))));
		yield WaitForSeconds(0.3);
		//transform.localScale.y = normalScale;
}
 
 function ShowHideIndicators(show : boolean) {
     for (var i = 0; i < argo.Length; i++) {
         argo[i].GetComponent.<Renderer>().enabled = show;
         argo[i].transform.position = home;
     }
 }
 
function OnMouseDown() {
	spring.enabled = false;
	clickedOn = true;
	ShowHideIndicators(true);
}
 
 function OnMouseUp() {
 	ShowHideIndicators(false);
 	spring.enabled = true;
	gameObject.GetComponent(Rigidbody2D).isKinematic = false;
	clickedOn = false;
 }
  
 
 function DisplayIndicators() {
     argo[0].transform.position = transform.position;
     var v2 = transform.position;
     var y = (force  * (home - transform.position)).y;
     var t = 0.0;
     v2.y = 0.0;
     for (var i = 1; i < argo.Length; i++) {
         v2 +=  force * (home - transform.position) * spacing;
         t += spacing;
         v2.y = y * t + 0.5 * (Physics.gravity.y * gameObject.GetComponent(Rigidbody2D).gravityScale) * t * t + transform.position.y;
         argo[i].transform.position = v2;
     }
}

function Dragging () {
		var mouseWorldPoint : Vector3 = Camera.main.ScreenToWorldPoint (Input.mousePosition);
		var throwToMouse : Vector2 = mouseWorldPoint - tempPlayer.position;
		
		if (throwToMouse.sqrMagnitude > maxStretchSqr) {
			rayToMouse.direction = throwToMouse;
			mouseWorldPoint = rayToMouse.GetPoint(maxStretch);
		}

		DisplayIndicators();
		mouseWorldPoint.z = 0.0;
		transform.position = mouseWorldPoint;
}
