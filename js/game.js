/**
 * Game launcher
 */

var gameWidth = 70 * 15; // 1050
var gameHeight = 70 * 10; // 700

var game = new Phaser.Game(
    gameWidth,
    gameHeight,
    Phaser.CANVAS,
    'phaser-example'
);

game.name = 'Super fantôme';

/** Define all the states */
// State 1 - Game initialisation
game.state.add('load', loadState);
// State 2 - Game menu
game.state.add('menu', menuState);
// State 3 - Let's play !
game.state.add('play', playState);

// Start with the 'load' state
game.state.start('load');