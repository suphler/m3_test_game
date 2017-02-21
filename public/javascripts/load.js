/**
 * Created by suphler on 21.02.17.
 */
var field = [];
var spotList = [];


var loadState = {

    preload: function () {


// Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.width / 2, 150,
            'loading...', {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5, 0.5);
// Display the progress bar
        var progressBar = game.add.sprite(game.width / 2, 200,
            'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
// Load all our assets
        spotList[0] = game.load.image('img01', 'images/assets/sprites/01.png');
        spotList[1] = game.load.image('img02', 'images/assets/sprites/02.png');
        spotList[2] = game.load.image('img03', 'images/assets/sprites/03.png');
        spotList[3] = game.load.image('img04', 'images/assets/sprites/04.png');
        spotList[4] = game.load.image('img05', 'images/assets/sprites/05.png');
        spotList[5] = game.load.image('img06', 'images/assets/sprites/06.png');
        spotList[6] = game.load.image('bg', 'images/assets/bg/bg1.jpg');
    },
    create: function () {
// Go to the menu state
        game.state.start('menu');
    }
};
