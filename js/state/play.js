/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = {

    init: function(currentLevel) {

        this.level = currentLevel;
        this.player = new Player(this.game);
        this.enemy = new Enemy(this.game);

    },

    preload: function() {

        this.player.preload();
        this.enemy.preload();

    },

    create: function() {

        this.level.create();
        this.player.create();
        this.enemy.create(4);

    },

    update: function() {

        // Collision between player and lock
        if (true === this.player.hasKey()) {
            this.level.tilemap.setTileIndexCallback(
                55, // indexes
                this._playerTouchLock, // callback
                this // callbackContext
            );
        }

        // Collision between player and world
        game.physics.arcade.collide(this.player.sprite, this.level.layer);

        // Collision between enemies and world
        game.physics.arcade.collide(this.enemy.getGroup(), this.level.layer);

        // Collision between player and enemies - call the kill function when the player and an enemy overlap
        game.physics.arcade.overlap(this.player.sprite, this.enemy.getGroup(), this._endGame, null, this);

        // Collision between player and key
        if (typeof this.level.key !== 'undefined') {
            game.physics.arcade.collide(this.player.sprite, this.level.key.sprite, this._playerCatchKey, null, this);
        }

        this.player.update();
        this.enemy.update(this.player);

        //this.layer.enableBody = true;
        //this.layer.immovable = true;

    },

    _endGame: function () {

        this._playerDie();

        this.enemy.endGame();
        game.gameOver = true;

        game.time.events.add(1500, function() {
            game.state.start('menu');
        }, this);

    },

    _playerDie: function () {

        this.player.sprite.kill();

    },

    _playerCatchKey: function () {

        this.player.hasKey(true);
        this.level.key.sprite.kill();

    },

    _playerTouchLock: function () {

        if (true === this.player.hasKey()) {
            console.log('You win !!');
            this._goToNextLevel()
        } else {
            console.log('stop');
            //this.player.stop();
        }

    },

    _goToNextLevel: function () {

        this.game.state.start('levelManager');

    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);
        this.player.render();

    }

}