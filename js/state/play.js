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

        this.game.load.image('pixel', 'assets/pixel.png');

    },

    create: function() {

        this.level.create();
        this.player.create();
        this.enemy.create(4);

        this.emitter = this.game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;

    },

    update: function() {

        // Collision between player and lock
        /*if (true === this.player.hasKey()) {
            this.level.tilemap.setTileIndexCallback(
                55, // indexes
                this._playerTouchLock, // callback
                this // callbackContext
            );
        }*/

        this.level.locks.forEach(function (lock) {
            this.level.tilemap.setTileIndexCallback(
                lock.currentIndex, // indexes
                this._playerTouchLock, // callback
                this // callbackContext
            );
        }, this);

        // Collision between player and world
        game.physics.arcade.collide(this.player.sprite, this.level.layer);

        // Collision between enemies and world
        game.physics.arcade.collide(this.enemy.getGroup(), this.level.layer);

        // Collision between player and enemies - call the kill function when the player and an enemy overlap
        game.physics.arcade.overlap(this.player.sprite, this.enemy.getGroup(), this._endGame, null, this);

        // Collision between player and key
        /*if (typeof this.level.key !== 'undefined') {
            game.physics.arcade.collide(this.player.sprite, this.level.key.sprite, this._playerCatchKey, null, this);
        }*/
        game.physics.arcade.collide(this.player.sprite, this.level.keysSprite, this._playerCatchKey, null, this);

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
        this.emitter.x = this.player.sprite.x;
        this.emitter.y = this.player.sprite.y;
        this.emitter.start(true, 600, null, 15);

    },

    _playerCatchKey: function (playerSprite, keysSprite) {

        this.player.setKey(keysSprite.creator);
        keysSprite.kill();
        this.game.add.tween(playerSprite.scale)
            .to({x: 0.6, y:0.6}, 50)
            .to({x: 0.38, y:0.38}, 150)
            .start();

    },

    _playerTouchLock: function (playerSprite, tile) {

        // Get lock by index
        var currentLock;
        this.level.locks.forEach(function (lock) {
            if (tile.index === lock.currentIndex) {
                currentLock = lock;
            }
        }, this);

        // Check if key matches with lock
        var currenKey = this.player.getKey();
        if (currenKey.currentColor === currentLock.currentColor) {
            if (currentLock.currentAction == 'goToNextLevel') {
                this._goToNextLevel();
            }
        }

        /*if (true === this.player.hasKey()) {
            console.log('You win !!');
            this._goToNextLevel()
        } else {
            console.log('stop');
            //this.player.stop();
        }*/

    },

    _goToNextLevel: function () {

        this.game.state.start('levelManager');

    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);
        this.player.render();

    }

}