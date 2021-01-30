
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        for (var i = 4; i > 0; i--) {
            game.addEntity(new egg1(game, randomInt(1000), randomInt(700)));
        }
    };
}