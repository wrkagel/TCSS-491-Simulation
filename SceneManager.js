
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        game.addEntity(new egg1(game, 100, 100));
    };
}