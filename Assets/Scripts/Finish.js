#pragma strict

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "Finish")
		 Application.LoadLevel ("Level_0"); 
}

function Update () {
}