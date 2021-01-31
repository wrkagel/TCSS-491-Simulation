
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.camera.pos = { x: 0, y: 0};
        this.x = 0;

        for (var i = 20; i > 0; i--) {
            game.addEntity(new Egg1(game, randomInt(1000), randomInt(700)));
        }
    };
}