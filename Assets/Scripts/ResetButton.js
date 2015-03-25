#pragma strict

private var restart = false;

function OnMouseDown () {
		restart = true;
	}

function Update () {
	if(restart) {
		Application.LoadLevel(Application.loadedLevel);	
	}



}
