public var maxStretch = 3.0;
private var spring : SpringJoint2D;
private var tempPlayer : Transform;
private var clickedOn;
private var rayToMouse : Ray;
private var maxStretchSqr : float;
private var prevVelocity : Vector2;

public var force = 4.0;
public var samples = 15;
public var spacing = 0.1;  // Time between samples 
 
private var offset : Vector2;
private var home : Vector2;
private var argo : GameObject[];
 
private var velocity = Vector2.zero;
 
function Awake () {
		spring = gameObject.GetComponent(SpringJoint2D);
		tempPlayer = spring.connectedBody.transform;
	}
	
 
 function Start () {
     home = transform.position;
     argo = new GameObject[samples];
     for (var i = 0; i < argo.Length; i++) {
         var go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
         go.GetComponent.<Collider>().enabled = false;
         go.transform.localScale = Vector3(0.2, 0.2, 0.2);
         argo[i] = go;
     }
     rayToMouse = new Ray (tempPlayer.position, Vector3.zero);
	 maxStretchSqr = maxStretch * maxStretch;
 }
 
 function Update () {
 		if (clickedOn) {
			Dragging ();
		}
		
		if (spring != null) {
			if (!gameObject.GetComponent(Rigidbody2D).isKinematic && (prevVelocity.sqrMagnitude > gameObject.GetComponent(Rigidbody2D).velocity.sqrMagnitude)) {
				Destroy (spring);
				gameObject.GetComponent(Rigidbody2D).velocity = prevVelocity * 0.8;
			}
			if (!clickedOn) {
				prevVelocity = gameObject.GetComponent(Rigidbody2D).velocity;
			}
			
		}
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
}
 
 function OnMouseUp() {
 	ShowHideIndicators(false);
 	spring.enabled = true;
	gameObject.GetComponent(Rigidbody2D).isKinematic = false;
	clickedOn = false;
 }
      
 function OnMouseDrag() {    
    DisplayIndicators();
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
         v2.y = y * t + 0.5 * Physics.gravity.y * t * t + transform.position.y;
         argo[i].transform.position = v2;
     }
}

function Dragging () {
		Vector3 mouseWorldPoint = Camera.main.ScreenToWorldPoint (Input.mousePosition);
		Vector2 throwToMouse = mouseWorldPoint - tempPlayer.position;
		
		if (throwToMouse.sqrMagnitude > maxStretchSqr) {
			rayToMouse.direction = throwToMouse;
			mouseWorldPoint = rayToMouse.GetPoint(maxStretch);
		}

		
		mouseWorldPoint.z = 0.0;
		transform.position = mouseWorldPoint;
}
