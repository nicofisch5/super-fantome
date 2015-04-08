/**
 * State 0 - Boot
 *
 * @type {{preload: preload, create: create}}
 */

var bootState = {

    preload: function() {

    },

    create: function() {

        // Game environment
        this.game.name = 'Super fantôme';
        this.game.levelNumber = 0;

        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('load');

    }

};