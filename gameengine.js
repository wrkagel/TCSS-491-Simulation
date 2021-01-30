// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.ctx = null;
        this.entities = [];
        this.showOutlines = false;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.pause = false;
        this.pressed = false;
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
        this.debugBox = document.getElementById("debug");
        PARAMS.DEBUG = this.debugBox.checked;
        this.debugBox.addEventListener("change", function (e) {
            PARAMS.DEBUG = e.target.checked;
        }, false)
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        let that = this;

        this.ctx.canvas.addEventListener("keydown", function (e) {
            if (e.code === "Space" && !that.pressed) {
                that.pause = !that.pause;
                that.pressed = true;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            if (e.code === "Space") {
                that.pressed = false;
            }
        }, false);
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };


    loop() {
        if (this.pause) {
            return;
        }
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};

