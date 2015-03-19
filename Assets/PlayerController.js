#pragma strict

var moveLeft : KeyCode;
var moveRight : KeyCode;
var speed : float = 10;

function Update () {
	if (Input.GetKey(moveLeft)) {
		rigidbody2D.velocity.x = speed *-1;
	}
	else if (Input.GetKey(moveRight)) {
		rigidbody2D.velocity.x = speed;
	}
	else {
	rigidbody2D.velocity.x = 0;
	}
}