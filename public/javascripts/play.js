/**
 * Created by suphler on 21.02.17.
 */
// New name for the state
var playState = {
// Removed the preload function
    create: function() {
// Removed background color, physics system, and roundPixels
// Then everything is the same, except at the end...
// replace 'var score = 0' by this
        game.global.score = 0;
    },
    update: function() {
// No changes
    },
    movePlayer: function() {
// No changes
    },
    takeCoin: function(player, coin) {
// Use the new score variable
        game.global.score += 5;
// Use the new score variable
        this.scoreLabel.text = 'score: ' + game.global.score;
// Then no changes
    },
    updateCoinPosition: function() {
// No changes
    },
    addEnemy: function() {
// No changes
    },
    createWorld: function() {
// No changes
    },
    playerDie: function() {
// When the player dies, we go to the menu
        game.state.start('menu');
    },
};

