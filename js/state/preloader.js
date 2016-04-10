/**
 * State 0 - Preloader
 *
 * @type {{create: create}}
 */

var preloaderState = function(game) {

    // Game environment
    game.name = 'Super fantôme';

};

preloaderState.prototype = {

    preload: function() {

        new Extra().preload();
        new Player().preload();
        new Enemy().preload();
        new Key().preload();
        new HUD().preload();
        
    },

    create: function() {

        game.state.start('menu');

    }

};
