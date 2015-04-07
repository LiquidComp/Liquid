public var maxStretch = 3.0;
public var force = 15.0;
public var samples = 15;
public var spacing = 0.1;
public var trajectoryDots : Material;

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

function Awake () {
		spring = gameObject.GetComponent(SpringJoint2D);
		tempPlayer = spring.connectedBody.transform;

	}
	
 
 function Start () {
     home = transform.position;
     argo = new GameObject[samples];
     for (var i = 0; i < argo.Length; i++) {
     	 balls = balls + 0.007;
         //var go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
         var go = GameObject();
         //go.GetComponent.<Collider>().enabled = false;
         go.transform.localScale = Vector3((0.2 - balls), (0.2 - balls), 0.2);
         go.AddComponent.<SpriteRenderer>();
         go.(SpriteRenderer).sprite = newSprite;
         //go.GetComponent.<Renderer>().material = trajectoryDots;
         //go.GetComponent.<Renderer>().sortingLayerName = "Foreground";
		 //go.GetComponent.<Renderer>().sortingOrder = 3;
         argo[i] = go;
     }
     ShowHideIndicators(false);
     rayToMouse = new Ray (tempPlayer.position, Vector3.zero);
	 maxStretchSqr = maxStretch * maxStretch;
 }
 
 function Update () {
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
 
 function ShowHideIndicators(show : boolean) {
     for (var i = 0; i < argo.Length; i++) {
         //argo[i].GetComponent.<Renderer>().enabled = show;
         //argo[i].transform.position = home;
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
