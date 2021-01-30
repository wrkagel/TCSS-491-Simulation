// JavaScript source code
class egg1 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		this.game.egg1 = this;

		this.spritesheet = ASSET_MANAGER.getAsset("./Sprites/eggs.png");
		this.direction = 0; //0: down, 1: downleft, 2: left, 3: upleft, 4: up
		this.animations = [];
		this.loadanimations();
	};

	loadanimations() {
		//Eight walking directions. Three are flips of the others.
		for (var i = 0; i < 8; i++) {
			this.animations.push([]);
		}

		this.animations[0] = new Animator(this.spritesheet, 8, 7, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, false);
		this.animations[1] = new Animator(this.spritesheet, 8, 40, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, false);
		this.animations[2] = new Animator(this.spritesheet, 7, 73, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, false);
		this.animations[3] = new Animator(this.spritesheet, 9, 106, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, false);
		this.animations[4] = new Animator(this.spritesheet, 7, 139, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, false);
		this.animations[5] = new Animator(this.spritesheet, 8, 40, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, true);
		this.animations[6] = new Animator(this.spritesheet, 7, 73, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, true);
		this.animations[7] = new Animator(this.spritesheet, 9, 106, params.WIDTH, params.HEIGHT, 7, 0.095, 1, false, true, true);
	}

	update() {
		if (this.game.left) {
			if (this.game.down) {
				this.direction = 1;
			} else if (this.game.up) {
				this.direction = 3;
			} else {
				this.direction = 2
			}
		} else if (this.game.right) {
			if (this.game.down) {
				this.direction = 5;
			} else if (this.game.up) {
				this.direction = 7;
			} else {
				this.direction = 6;
			}
		} else if (this.game.down) {
			this.direction = 0;
		} else if (this.game.up) {
			this.direction = 4;
		}
		switch (this.direction) {
			case 0:
				this.y += 3;
				break;
			case 1:
				this.x -= 2;
				this.y += 1;
				break;
			case 2:
				this.x -= 3;
				break;
			case 3:
				this.x -= 2;
				this.y -= 1;
				break;
			case 4:
				this.y -= 3;
				break;
			case 5:
				this.x += 2;
				this.y += 1;
				break;
			case 6:
				this.x += 3;
				break;
			case 7:
				this.x += 2;
				this.y -= 1;
				break;
		}

		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;
		if (this.x > (800 - 23 * 3)) this.x = 800 - 23*3;
		if (this.y > (this.game.surfaceHeight - params.HEIGHT * 3)) this.y = this.game.surfaceHeight - params.HEIGHT * 3;
	};

	draw(ctx) {
		this.animations[this.direction].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, 3);
	}

};
