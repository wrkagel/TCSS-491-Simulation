var ASSET_MANAGER = new AssetManager();
var gameEngine = new GameEngine();

ASSET_MANAGER.queueDownload("./Sprites/eggs.png");

ASSET_MANAGER.downloadAll(function () {


	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
