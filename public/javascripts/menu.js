/**
 * Created by suphler on 21.02.17.
 */
var menuState = {
    create: function() {

        game.add.image(0, 0, 'bg');

        var nameLabel = game.add.text(game.width/3, 80,'Press Up to  start', { font: '50px Arial', fill: '#ffffff' });


        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },
    start: function() {

        console.log("UP key  is  fire");
        game.state.start('main');
    }
};

