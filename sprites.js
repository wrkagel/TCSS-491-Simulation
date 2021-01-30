// JavaScript source code

class Egg extends Agent {
	constructor(game, x, y, spritesheet) {
		Object.assign(this, { game, x, y, spritesheet});
		this.animations = [];
		this.loadanimations();
		// 0: down, 1:downleft, 2:left, 3:upleft, 4:up, 5:upright, 6:right, 7: downright
		this.direction = randomInt(8);
		this.bb = new BoundingBox(this);
		this.lastbb = this.bb;
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
		var up = this.vel.y < 0
			&& (this.lastbb.top) >= entity.bb.bottom
			&& (this.lastbb.left) != entity.bb.right
			&& (this.lastbb.right) != entity.bb.left;
		var left = this.vel.x < 0
			&& (this.lastbb.left) >= entity.bb.right
			&& (this.lastbb.top) != entity.bb.bottom
			&& (this.lastbb.bottom) != entity.bb.top;
		var right = this.vel.x > 0
			&& (this.lastbb.right) <= entity.bb.left
			&& (this.lastbb.top) < entity.bb.bottom
			&& (this.lastbb.bottom) > entity.bb.top;
		return { up, down, left, right };
	}
}

class Egg1 extends Egg {
	constructor(game, x, y) {
		super(game, x, y, ASSET_MANAGER.getAsset("./Sprites/eggs.png"), 23, 32, 2);
		this.movementTime = (randomInt(4) + 1) * Math.random();
	};

	loadanimations() {
		//Eight walking directions. Right animations are flip of left animations.
		for (var i = 0; i < 8; i++) {
			this.animations.push([]);
		}

		this.animations[0] = new Animator(this.spritesheet, 8, 7, this.width, this.height, 7, 0.095, 1, false, true, false);
		this.animations[1] = new Animator(this.spritesheet, 8, 40, this.width, this.height, 7, 0.095, 1, false, true, false);
		this.animations[2] = new Animator(this.spritesheet, 7, 73, this.width, this.height, 7, 0.095, 1, false, true, false);
		this.animations[3] = new Animator(this.spritesheet, 9, 106, this.width, this.height, 7, 0.095, 1, false, true, false);
		this.animations[4] = new Animator(this.spritesheet, 7, 139, this.width, this.height, 7, 0.095, 1, false, true, false);
		this.animations[7] = new Animator(this.spritesheet, 8, 40, this.width, this.height, 7, 0.095, 1, false, true, true);
		this.animations[6] = new Animator(this.spritesheet, 7, 73, this.width, this.height, 7, 0.095, 1, false, true, true);
		this.animations[5] = new Animator(this.spritesheet, 9, 106, this.width, this.height, 7, 0.095, 1, false, true, true);
	}

	update() {
		this.movementTime -= this.game.clockTick;
		if (this.movementTime < 0) {
			this.movementTime = (randomInt(4) + 1) * Math.random();
			this.direction = randomInt(8);
		}

		//Check Moving Down
		if (this.direction === 7 || this.direction < 2) {
			this.vel.y = this.speed;
		//Check Moving Up
		} else if (this.direction > 2 && this.direction < 6) {
			this.vel.y = -this.speed;
		} else {
			this.vel.y = 0;
		}
		//Check Moving Left
		if (this.direction > 0 && this.direction < 4) {
			this.vel.x = -this.speed;
			//Check Moving Right
		} else if (this.direction > 4) {
			this.vel.x = this.speed;
		} else {
			this.vel.x = 0;
		}

		this.bb.update(this);

		this.x += this.vel.x * this.game.clockTick;
		this.y += this.vel.y * this.game.clockTick;

		this.checkCollisions();
		this.bb.update(this);
	};

	checkCollisions() {
		for (var i = 0; i < this.game.entities.length; i++) {
			let entity = this.game.entities[i];
			if (this.bb.collide(entity.bb) && this !== entity) {
				let direction = this.worldCollisionDirection(entity);
				if (direction.right) {
					this.vel.x = -this.vel.x;
					this.x = entity.bb.left - this.width * this.scale - 100;
				}
				if (direction.left) {
					this.vel.x = -this.vel.x;
					this.x = entity.bb.right + 100;
				}
				if (direction.down) {
					this.vel.y = -this.vel.y;
					this.y = entity.bb.top - this.height * this.scale - 100;
				}
				if (direction.up) {
					console.log(this.y);
					this.vel.y = -this.vel.y;
					this.y = entity.bb.bottom + 100;
					console.log(this.y);
				}
				if (this.vel.x > 0) {
					if (this.vel.y > 0) {
						this.direction = 7;
					} else if (this.vel.y < 0) {
						this.direction = 5;
					} else {
						this.direction = 6;
					}
				} else if (this.vel.x < 0) {
					if (this.vel.y > 0) {
						this.direction = 1;
					} else if (this.vel.y < 0) {
						this.direction = 3;
					} else {
						this.direction = 2;
					}
				} else {
					if (this.vel.y > 0) {
						this.direction = 0;
					} else {
						this.direction = 4;
					}
				}
			}
		}
	}

	draw(ctx) {
		this.animations[this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
		this.bb.draw(ctx, this);
	}

};

class BoundingBox {
	constructor(sprite) {
		Object.assign(this, { top: sprite.y, bottom: (sprite.y + sprite.height * sprite.scale), left: sprite.x, right: (sprite.x + sprite.width * sprite.scale) });
	}

	update(sprite) {
		sprite.lastbb = sprite.bb;
		sprite.bb = new BoundingBox(sprite);
	}

	collide(oth) {
		return !(this.top >= oth.bottom || this.bottom <= oth.top
			|| this.left >= oth.right || this.right <= oth.left);
	}

	draw(ctx, sprite) {
		if (PARAMS.DEBUG) {
			ctx.save();
			ctx.strokeStyle = 'red';
			ctx.lineWidth = PARAMS.BB_LINE_WIDTH;
			ctx.strokeRect(
				this.left, this.top, sprite.width * sprite.scale, sprite.height * sprite.scale);
			ctx.stroke();
			ctx.restore();
		}
	}
}
