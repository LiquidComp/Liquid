#pragma strict

 var force = 4.0;
 var samples = 15;
 var spacing = 0.1;  // Time between samples 
 
 	public  var maxStretch = 3.0;
	private var spring : SpringJoint2D;
	private var tempPlayer : Transform;
	private var clickedOn;
	private var rayToMouse : Ray;
	private var maxStretchSqr : float;
	private var prevVelocity : Vector2;

 private var offset : Vector2;
 private var home : Vector2;
 private var argo : GameObject[];
 
 private var velocity = Vector2.zero;
 private var freeze = true;
 
function Awake () {
		spring = GetComponent(SpringJoint2D) ;
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
 }
 
 function FixedUpdate() {
     if (!freeze) {
           velocity.y += Physics.gravity.y * Time.fixedDeltaTime;
           transform.position += velocity * Time.fixedDeltaTime;
       }
 }
 
 function ReturnHome() {
     transform.position = home;
     velocity = Vector2.zero;
     freeze = true;
     ShowHideIndicators(true);
 
 }
 
 function ShowHideIndicators(show : boolean) {
     for (var i = 0; i < argo.Length; i++) {
         argo[i].GetComponent.<Renderer>().enabled = show;
         argo[i].transform.position = home;
     }
 }
 
 function OnMouseDown() {
     var v2 = Input.mousePosition;
     v2.z = transform.position.z - Camera.main.transform.position.z;
     v2 = Camera.main.ScreenToWorldPoint(v2);
     offset = transform.position - v2;
 }
 
 function OnMouseDrag() {
     var v2 = Input.mousePosition;
     v2.z = transform.position.z - Camera.main.transform.position.z;
     v2 = Camera.main.ScreenToWorldPoint(v2);
     transform.position = v2 + offset;
     DisplayIndicators();
 }
 
 function OnMouseUp() {
     Invoke("ReturnHome", 2.0);
     velocity = force * (home - transform.position);
     freeze = false;
     ShowHideIndicators(false);
 }
 
 function DisplayIndicators() {
     argo[0].transform.position = transform.position;
     var v2 = transform.position;
     var y = (force * (home - transform.position)).y;
     var t = 0.0;
     v2.y = 0.0;
     for (var i = 1; i < argo.Length; i++) {
         v2 +=  force * (home - transform.position) * spacing;
         t += spacing;
         v2.y = y * t + 0.5 * Physics.gravity.y * t * t + transform.position.y;
         argo[i].transform.position = v2;
     }
 }