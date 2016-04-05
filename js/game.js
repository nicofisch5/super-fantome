/**
 * Game launcher
 */

var gameInfoSpaceWidth = 180;
var gameWidth = 70 * 15 + gameInfoSpaceWidth; // 1230
var gameHeight = 70 * 10; // 700

var game = new Phaser.Game(
    gameWidth,
    gameHeight,
    Phaser.CANVAS,
    'super-fantome'
);

game.version = '1.1';

/** Define all the states */
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('levelManager', levelManagerState);
game.state.add('play', playState);
game.state.add('end', endState);

// Start with the 'boot' state
game.state.start('boot');
