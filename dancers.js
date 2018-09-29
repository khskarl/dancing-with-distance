class Dancers {
	constructor(width, height, quantity) {
		this.width = width;
		this.height = height;
		this.dimensions = new THREE.Vector2(width, height);

		this.quantity = quantity;
		this.positions = []
		this.velocities = []
		this.friends = []
		this.enemies = []

		for (let i = 0; i < quantity; i++) {
			this.positions.push(new THREE.Vector2(
				Math.random() * width,
				Math.random() * height
			));

			this.velocities.push(new THREE.Vector2(
				0.0,
				0.0
			));

			this.friends.push(this.pickNewPartners(i));
			this.enemies.push(this.getRandomDancer(i));
		}
	}

	update(dt) {
		if (Math.random() < 0.0) {
			let lucky_one = this.getRandomDancer();
			this.pickNewPartners(lucky_one);
		}

		this.walkTowardsCenter(dt);
		this.walkTowardsFriend(dt);
		this.walkAwayFromEnemy(dt);
		this.limitVelocity();
		this.applyVelocity(dt);
		this.checkBounds();
	}

	pickNewPartners(index) {
		let friend = index;
		do {
			friend = this.getRandomDancer();
		} while (friend == index);

		let enemy = index;
		do {
			enemy = this.getRandomDancer();
		} while (enemy == index);

		this.friends[index] = friend;
		this.enemies[index] = enemy;
	}

	walkTowardsCenter(dt) {
		for (let i = 0; i < this.positions.length; i++) {
			let center = this.dimensions.clone().multiplyScalar(0.5);
			let force = center.sub(this.positions[i]).multiplyScalar(0.2 * dt);
			this.velocities[i].add(force);
		}
	}

	walkTowardsFriend(dt) {
		for (let i = 0; i < this.positions.length; i++) {
			let friend = this.friends[i];

			let friendPosition = this.positions[friend].clone();
			let force = friendPosition.sub(this.positions[i]).multiplyScalar(0.6 * dt);
			this.velocities[i].add(force);
		}
	}

	walkAwayFromEnemy(dt) {
		for (let i = 0; i < this.positions.length; i++) {
			let enemy = this.enemies[i];

			let enemyPosition = this.positions[enemy].clone();
			let myPosition = this.positions[i].clone();
			let force = myPosition.sub(enemyPosition).multiplyScalar(0.12 * dt);
			this.velocities[i].add(force);
		}
	}

	limitVelocity() {
		let limit = 200.0;
		for (let i = 0; i < this.quantity; i++) {
			if (this.velocities[i].length() > limit) {
				this.velocities[i].normalize().multiplyScalar(limit);
			}
		}
	}

	applyVelocity(dt) {
		for (let i = 0; i < this.quantity; i++) {
			this.positions[i].add(this.velocities[i].clone().multiplyScalar(dt));
		}
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

	getRandomDancer() {
		return Math.floor(Math.random() * this.quantity);
	}
}