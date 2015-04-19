/**
 * Game launcher
 */

var gameWidth = 70 * 15 + 180; // 1150
var gameHeight = 70 * 10; // 700

var game = new Phaser.Game(
    gameWidth,
    gameHeight,
    Phaser.CANVAS,
    'phaser-example'
);

/** Define all the states */
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('levelManager', levelManagerState);
game.state.add('play', playState);

// Start with the 'load' state
game.state.start('boot');