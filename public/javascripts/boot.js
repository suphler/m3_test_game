/**
 * Created by suphler on 21.02.17.
 */
var bootState = {
    preload: function () {
// Load the image
        game.load.image('progressBar', 'images/assets/sprites/progressBar.png');
    },
    create: function () {
// Set some game settings
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;



// Start the load state
game.state.start('load');
}

};