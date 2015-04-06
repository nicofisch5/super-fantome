/**
 * State 1 - Game initialisation
 *
 * @type {{preload: preload, create: create}}
 */

var loadState = {

    preload: function() {

        game.player.preload();
        game.level.preload();
        game.enemy.preload();

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }

};