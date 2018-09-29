class Dancers {
	constructor(width, height, quantity) {
		this.width = width;
		this.height = height;
		this.dimensions = new THREE.Vector2(width, height);

		this.positions = []
		for (let i = 0; i < quantity; i++) {
			this.positions.push(new THREE.Vector2(
				Math.random() * width,
				Math.random() * height)
			);
		}
	}

	update() {
		this.moveToCenter();
		this.moveToFriend();
		this.moveToEnemy();
		this.checkBounds();
	}

	checkBounds() {
		for (let i = 0; i < this.positions.length; i++) {
			if (this.positions[i].x < 0) {
				this.positions[i].x = this.width - 1;
			}
			else if (this.positions[i].x >= this.width) {
				this.positions[i].x = 0;
			}

			if (this.positions[i].y < 0) {
				this.positions[i].y = this.height - 1;
			}
			else if (this.positions[i].y >= this.height) {
				this.positions[i].y = 0;
			}
		}
	}

	moveToCenter() {
		for (let i = 0; i < this.positions.length; i++) {
			let center = this.dimensions.clone().multiplyScalar(0.5);
			let force = center.sub(this.positions[i]).multiplyScalar(0.01);
			this.positions[i].add(force);
		}
	}

	moveToFriend() {
	}
	moveToEnemy() {
	}
}