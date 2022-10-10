AFRAME.registerComponent("animation-cycler", {
	schema: {
	button: {
		type: "string",
		default: "",
	},
	},
	init() {
	this.el.addEventListener("model-loaded", () => {
		this.animationIndex = 0
		this.animationList = this.el.object3D.children[0].animations;
		this.animationList.reverse();
		this.el.setAttribute("animation-mixer", {
		clip: this.animationList[this.animationList.length - 1].name,
		clampWhenFinished: false,
		repetitions: 2
		});
	});
	document
		.getElementById(this.data.button)
		.addEventListener("click", () => {
		this.el.setAttribute("animation-mixer", {
			clip: this.animationList[this.animationIndex].name,
			clampWhenFinished: true,
			loop: 'once',
			repetitions: 1,
			timeScale: 1,
			startFrame: 0
		});
		this.animationIndex++;
		if (this.animationIndex === this.animationList.length) {
			this.animationIndex = 0;
		}
		});
	},
});

AFRAME.registerComponent("ar-place-once", {
	init() {
	this.el.addEventListener("ar-hit-test-select", () => {
		this.el.setAttribute("ar-hit-test", {
		enabled: false,
		});
	});
	},
});

AFRAME.registerComponent("preview-spin", {
	init() {
	this.enabled = true
	this.el.object3D.position.set(0, 0, -3)
	this.el.sceneEl.addEventListener("ar-hit-test-start", () => {
		this.enabled = false
		this.el.object3D.rotation.set(0, 0, 0)
		this.el.object3D.position.set(0, 0, 0)
	})
	},
	tick: function() {
	if(this.enabled){
		this.el.object3D.rotateY(0.1 * Math.PI/180)
	}
	}
});