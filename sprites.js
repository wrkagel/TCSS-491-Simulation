// JavaScript source code

class Egg extends Agent {
	constructor(game, x, y, spritesheet) {
		super(game, x, y, spritesheet);
		this.setDimensions(2, 23, 32);
		// 0: down, 1:downleft, 2:left, 3:upleft, 4:up, 5:upright, 6:right, 7: downright
		this.facing = randomInt(8);
		this.vel = { x: 0, y: 0 };
		this.speed = 50;
	}


	//Below function taken from group project
	/**
 * Returns a tuple of boolean values that tells what direction or directions this object
 * has collided with entity. Values are stored in up, down, left, and right properties 
 * of the tuple.
 * @param {BoundingBox} bb
 */
	worldCollisionDirection(entity) {
		var down = this.vel.y > 0
			&& this.lastWorldBB.bottom <= entity.worldBB.top
			&& this.lastWorldBB.left < entity.worldBB.right
			&& this.lastWorldBB.right > entity.worldBB.left;
		var up = this.vel.y < 0
			&& (this.lastWorldBB.top) >= entity.worldBB.bottom
			&& (this.lastWorldBB.left) != entity.worldBB.right
			&& (this.lastWorldBB.right) != entity.worldBB.left;
		var left = this.vel.x < 0
			&& (this.lastWorldBB.left) >= entity.worldBB.right
			&& (this.lastWorldBB.top) != entity.worldBB.bottom
			&& (this.lastWorldBB.bottom) != entity.worldBB.top;
		var right = this.vel.x > 0
			&& (this.lastWorldBB.right) <= entity.worldBB.left
			&& (this.lastWorldBB.top) < entity.worldBB.bottom
			&& (this.lastWorldBB.bottom) > entity.worldBB.top;
		return { up, down, left, right };
	}
}

class Egg1 extends Egg {
	constructor(game, x, y) {
		super(game, x, y, "./Sprites/eggs.png", 23, 32, 2);
		this.movementTime = (randomInt(4) + 1) * Math.random();
	};

	loadAnimations() {
		//Eight walking directions. Right animations are flip of left animations.
		for (var i = 0; i < 8; i++) {
			this.animations.push([]);
		}

		this.animations[0] = new Animator(this.spritesheet, 8, 7, 23, 32, 7, 0.095, 1, false, true, false);
		this.animations[1] = new Animator(this.spritesheet, 8, 40, 23, 32, 7, 0.095, 1, false, true, false);
		this.animations[2] = new Animator(this.spritesheet, 7, 73, 23, 32, 7, 0.095, 1, false, true, false);
		this.animations[3] = new Animator(this.spritesheet, 9, 106, 23, 32, 7, 0.095, 1, false, true, false);
		this.animations[4] = new Animator(this.spritesheet, 7, 139, 23, 32, 7, 0.095, 1, false, true, false);
		this.animations[7] = new Animator(this.spritesheet, 8, 40, 23, 32, 7, 0.095, 1, false, true, true);
		this.animations[6] = new Animator(this.spritesheet, 7, 73, 23, 32, 7, 0.095, 1, false, true, true);
		this.animations[5] = new Animator(this.spritesheet, 9, 106, 23, 32, 7, 0.095, 1, false, true, true);
	}

	update() {
		this.movementTime -= this.game.clockTick;
		if (this.movementTime < 0) {
			this.movementTime = (randomInt(4) + 1) * Math.random();
			this.facing = randomInt(8);
		}

		//Check Moving Down
		if (this.facing === 7 || this.facing < 2) {
			this.vel.y = this.speed;
		//Check Moving Up
		} else if (this.facing > 2 && this.facing < 6) {
			this.vel.y = -this.speed;
		} else {
			this.vel.y = 0;
		}
		//Check Moving Left
		if (this.facing > 0 && this.facing < 4) {
			this.vel.x = -this.speed;
			//Check Moving Right
		} else if (this.facing > 4) {
			this.vel.x = this.speed;
		} else {
			this.vel.x = 0;
		}
		this.move(this.game.clockTick);
	};

	checkCollisions() {
		for (var i = 0; i < this.game.entities.length; i++) {
			let entity = this.game.entities[i];
			if (this.worldBB.collide(entity.worldBB) && this !== entity) {
				let direction = this.worldCollisionDirection(entity);
				if (direction.right) {
					this.vel.x = -this.vel.x;
					this.pos.x = entity.worldBB.left - this.scaleDim.x;
				}
				if (direction.left) {
					this.vel.x = -this.vel.x;
					this.pos.x = entity.worldBB.right;
				}
				if (direction.down) {
					this.vel.y = -this.vel.y;
					this.pos.y = entity.worldBB.top - this.scaleDim.y;
				}
				if (direction.up) {
					this.vel.y = -this.vel.y;
					this.pos.y = entity.worldBB.bottom;
				}
				if (this.vel.x > 0) {
					if (this.vel.y > 0) {
						this.facing = 7;
					} else if (this.vel.y < 0) {
						this.facing = 5;
					} else {
						this.facing = 6;
					}
				} else if (this.vel.x < 0) {
					if (this.vel.y > 0) {
						this.facing = 1;
					} else if (this.vel.y < 0) {
						this.facing = 3;
					} else {
						this.facing = 2;
					}
				} else {
					if (this.vel.y > 0) {
						this.facing = 0;
					} else {
						this.facing = 4;
					}
				}
			}
		}
	}

};
