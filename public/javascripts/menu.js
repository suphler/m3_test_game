/**
 * Created by suphler on 21.02.17.
 */
var menuState = {
    create: function() {
// Add a background image
        game.add.image(0, 0, 'bg');
// Display the name of the game
        var nameLabel = game.add.text(game.width/3, 80,
            'Press Up to  start', { font: '50px Arial', fill: '#ffffff' });

// Create a new Phaser keyboard variable: the up arrow key
// When pressed, call the 'start'
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },
    start: function() {
// Start the actual game
        console.log("UP key  is  fire");
        game.state.start('main');
    },
};

