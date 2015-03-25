#pragma strict

var btnTexture : Texture;
function OnGUI() {
 GUI.backgroundColor = new Color(0,0,0,0);
	if (!btnTexture) {
		Debug.LogError("Please assign a texture on the inspector");
		return;
	}
	if (GUI.Button(Rect(10,10,50,50),btnTexture)) {
		Application.LoadLevel(Application.loadedLevel);
	}
}