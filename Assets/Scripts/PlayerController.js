#pragma strict

var moveLeft : KeyCode;
var moveRight : KeyCode;
var speed : float = 10;

function Update () {
	if (Input.GetKey(moveLeft)) {
		GetComponent.<Rigidbody2D>().velocity.x = speed *-1;
	}
	else if (Input.GetKey(moveRight)) {
		GetComponent.<Rigidbody2D>().velocity.x = speed;
	}
	else {
	GetComponent.<Rigidbody2D>().velocity.x = 0;
	}
}