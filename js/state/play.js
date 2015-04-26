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

        var x = 1100;
        var y = 50;

        // Timer
        this.countdownText = 'Temps ' + this.level.timer;
        this.countdownText = this.game.add.text(x, y, this.countdownText, { font: "18px Sawasdee", fill: "#55ffff" });
        this.countdown = game.time.events.loop(Phaser.Timer.SECOND, this._updateTimer, this);

        // Lives
        y += 40;
        var livesText = 'Vies ' + this.game.lives;
        this.game.add.text(x, y, livesText, { font: "18px Sawasdee", fill: "#55ffff" });

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
        game.physics.arcade.overlap(this.player.sprite, this.level.keysSprite, this._playerCatchKey, null, this);

        // Player out of bounds
        this.player.sprite.events.onOutOfBounds.add(this._endGame, this);

        this.player.update();
        this.enemy.update(this.player);

        this.countdownText.text = 'Temps ' + this.level.timer;

        //this.layer.enableBody = true;
        //this.layer.immovable = true;

    },

    _endGame: function () {

        this._playerDie();

        this.enemy.endGame();

        var goToState = 'levelManager';
        game.lives--;
        if (game.lives == 0) {
            game.gameOver = true;
            goToState = 'boot';
        }

        game.time.events.add(1500, function() {
            game.state.start(goToState);
        }, this);

    },

    _playerDie: function () {

        this.player.sprite.kill();
        this.emitter.x = this.player.sprite.x;
        this.emitter.y = this.player.sprite.y;
        this.emitter.start(true, 600, null, 15);

    },

    /**
     * Event when player catch a key
     *
     * @param Sprite playerSprite
     * @param Sprite keysSprite
     * @private
     */
    _playerCatchKey: function (playerSprite, keysSprite) {

        if (true === this.player.setKey(keysSprite.creator)) {
            keysSprite.kill();
            this.game.add.tween(playerSprite.scale)
                .to({x: 0.6, y: 0.6}, 50)
                .to({x: 0.38, y: 0.38}, 150)
                .start();
        }

    },

    /**
     * Event when player touch a lock
     *
     * @param Sprite playerSprite
     * @param Tile tile
     * @private
     */
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
        if (currenKey && currenKey.currentColor === currentLock.currentColor) {
            if (currentLock.currentAction == 'goToNextLevel') {
                this._goToNextLevel();
            } else if (currentLock.currentAction == 'tileDisappear') {
                this.player.setKey(null);
                this._tileDisappear(tile);
            }
        }

    },

    /**
     * Go to next level
     *
     * @private
     */
    _goToNextLevel: function () {

        this.game.levelNumber++;
        this.game.state.start('levelManager');

    },

    /**
     * Tile disappear
     *
     * @param Tile tile
     * @private
     */
    _tileDisappear: function (tile) {

        this.level.tilemap.removeTile(tile.x, tile.y);

    },

    /**
     * Countdown
     *
     * @private
     */
    _updateTimer: function () {

        this.level.timer -= 1;
        if (this.level.timer == 0) {
            game.time.events.remove(this.countdown);
            this._endGame();
        }

    },

    render: function() {

        /*game.debug.cameraInfo(game.camera, 32, 32);
        this.player.render();*/

    }

}