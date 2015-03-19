/*using UnityEngine;
using System.Collections;

public class ProjectileLaunch : MonoBehaviour {
	public float maxStretch = 3.0f;
	public LineRenderer catapultLineFront;
	public LineRenderer catapultLineBack;

	private SpringJoint2D spring;
	private Ray rayToMouse;
	private float maxStretchSqr;

	void Awake () {

		}

	void Start () {
		LineRendererSetup ();
		rayToMouse = new Ray (catapult);
	}

	void Update () {
		if (clickedOn) {
				Dragging ();
		}
	}
	void LineRendererSetup () {
		catapultLineFront.SetPosition (0, catapultLineFront.transform.position);
		catapultLineBack.SetPosition (0, catapultLineBack.transform.position);

		catapultLineFront.sortingLayerName = "Foreground";
		catapultLineBack.sortingLayerName = "Foreground";

		catapultLineFront.sortingOrder = 3;
		catapultLineBack.sortingOrder = 1;
	}

	void OnMouseDown () {
		spring.enabled = false;
		clickedOn = true;
	}
}

*/