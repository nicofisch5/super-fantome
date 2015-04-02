/**
 * State 1 - Game initialisation
 *
 * @type {{preload: preload, create: create}}
 */

var loadState = {

    preload: function() {

        this.player = new Player(game);
        this.player.preload();

        this.level = new Level(game);
        this.level.preload();

        this.enemy = new Enemy(game);
        this.enemy.preload();

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }

};