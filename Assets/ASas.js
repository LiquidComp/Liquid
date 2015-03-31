
 private var offset : Vector2;
 private var home : Vector2;
 private var argo : GameObject[];
 
 private var velocity = Vector2.zero;
 private var freeze = true;
 
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
 
 function ShowHideIndicators(show : boolean) {
     for (var i = 0; i < argo.Length; i++) {
         argo[i].GetComponent.<Renderer>().enabled = show;
         argo[i].transform.position = home;
     }
 }
 
 function OnMouseUp() {
 	ShowHideIndicators(false);
 }
      
 function OnMouseDrag() {    
      DisplayIndicators();
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