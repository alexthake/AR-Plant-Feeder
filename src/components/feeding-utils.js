AFRAME.registerComponent("throw-food", {
	schema: {
		buttonID: {
			type: "string",
			default: "",
		},
		modelID: {
			type: "string",
			default: "",
		},
		mouthID: {
			type: "string",
			default: "",
		},
		plantID: {
			type: "string",
			default: "",
		},
		power: {
			default: 10,
		}
	},
	init() {
		const button = document.querySelector(this.data.buttonID)
		const mouth = document.querySelector(this.data.mouthID)
		const plant = document.querySelector(this.data.plantID)
		let eating = false
		button.addEventListener("click", () => {
			let newSteak = document.createElement('a-entity')
			newSteak.setAttribute('gltf-model', this.data.modelID)
			newSteak.setAttribute('position', {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z})
			newSteak.setAttribute('rotation', {x:0, y:45, z:0})
			newSteak.setAttribute('color', "red")
			newSteak.setAttribute('ammo-body', {
				type: "dynamic",
				mass: "5",
			})
			newSteak.setAttribute('ammo-shape', {
				type: "box",
				fit: "manual",
				halfExtents: "0.12 0.025 0.075",
				offset: "0.01 0 0"
			})
			this.el.sceneEl.appendChild(newSteak)

			newSteak.addEventListener("body-loaded", () => {
				var velocity = new Ammo.btVector3()
				const projectileWorldDirection = new THREE.Vector3()
				this.el.object3D.getWorldDirection(projectileWorldDirection)
				velocity.setValue(projectileWorldDirection.x * - 1 * this.data.power, projectileWorldDirection.y * - 1 * this.data.power, projectileWorldDirection.z * - 1 * this.data.power)
				newSteak.components["ammo-body"].body.setLinearVelocity(velocity)
			})
		})
		mouth.addEventListener("collidestart", (e) => {
			eating = true
			plant.setAttribute("animation-mixer", {
				clip: "A_Attack",
				clampWhenFinished: false,
				timeScale: 1.5,
				loop: "repeat",
				repetitions: "infinity"
			})
			setTimeout(() => {  
				e.detail.targetEl.parentNode.removeChild(e.detail.targetEl)
			}, 200)
			setTimeout(() => {  
				if(eating === true) {
					eating = false
					plant.removeAttribute('animation-mixer')
					plant.setAttribute('animation-mixer', {
						clip: "Animation"
					})
				}
			}, 1633)
		})
	},
});