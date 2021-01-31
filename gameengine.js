// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.context = null;
        this.entities = [];
        this.showOutlines = false;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.pause = false;
        this.pressed = false;
    };

    init(ctx) {
        this.context = ctx;
        this.surfaceWidth = this.context.canvas.width;
        this.surfaceHeight = this.context.canvas.height;
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
            requestAnimFrame(gameLoop, that.context.canvas);
        })();
    };

    startInput() {
        let that = this;

        this.context.canvas.addEventListener("keydown", function (e) {
            if (e.code === "Space" && !that.pressed) {
                that.pause = !that.pause;
                that.pressed = true;
            }
        }, false);

        this.context.canvas.addEventListener("keyup", function (e) {
            if (e.code === "Space") {
                that.pressed = false;
            }
        }, false);
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.context);
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

