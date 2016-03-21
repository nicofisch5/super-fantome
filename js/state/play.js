/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = function(game) {

    this.font = 'Trebuchet MS';
    this.currentExtra;
    this.extraTimer;
    this.state;

};

playState.prototype = {

    init: function(currentLevel) {

        this.level = currentLevel;
        this.player = new Player(game);
        this.enemy = new Enemy(game);

        this.infoSpace = {"x": 1100, "y": 50, "gap": 40};

    },

    preload: function() {

        this.state = null;

    },

    create: function() {

        this.level.create();
        this.player.create();
        this.enemy.create(this.level.nbEnemies);

        this.emitter = this.game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;

        // Lives
        this.scoreText = 'Score ' + this.game.score;
        this.scoreText = this.game.add.text(this.infoSpace.x, this.infoSpace.y, this.scoreText, { font: "18px " + this.font, fill: "#55ffff" });
        this.infoSpace.y += this.infoSpace.gap;

        // Timer
        this.countdownText = 'Temps ' + this.level.timer;
        this.countdownText = this.game.add.text(this.infoSpace.x, this.infoSpace.y, this.countdownText, { font: "18px " + this.font, fill: "#55ffff" });
        this.countdown = game.time.events.loop(Phaser.Timer.SECOND, this._updateTimer, this);
        this.infoSpace.y += this.infoSpace.gap;

        // Lives
        var livesText = 'Vies ' + this.game.lives;
        this.game.add.text(this.infoSpace.x, this.infoSpace.y, livesText, { font: "18px " + this.font, fill: "#55ffff" });
        this.infoSpace.y += this.infoSpace.gap;

        // Space bar
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {

        // Collision between player and world
        game.physics.arcade.collide(this.player.sprite, this.level.layer, this._playerTouchLock, null, this);

        // Collision between enemies and world
        game.physics.arcade.collide(this.enemy.getGroup(), this.level.layer, this._enemyTouchLock);

        // Collision between 2 enemies
        game.physics.arcade.collide(this.enemy.getGroup(), this.enemy.getGroup(), this._enemyTouchEnemy, null, this);

        // Collision between player and enemies - call the kill function when the player and an enemy overlap
        var action = this._endLevel;
        if ('extra' == this.state && 'PlayerCanEatEnemy' == this.currentExtra.type) {
            action = this._playerEatEnemy;
        }
        game.physics.arcade.overlap(this.player.sprite, this.enemy.getGroup(), action, null, this);

        // Collision between player and key
        game.physics.arcade.overlap(this.player.sprite, this.level.keysSprite, this._playerCatchKey, null, this);

        // Collision between player and extra
        game.physics.arcade.overlap(this.player.sprite, this.level.extrasSprite, this._playerCatchExtra, null, this);

        // Player release key
        if (this.spaceKey.isDown) {
            this._playerReleaseKey();
        }

        // Player out of bounds
        this.player.sprite.events.onOutOfBounds.add(this._endLevel, this);

        this.player.update();
        this.enemy.update(this.player);

        this.countdownText.text = 'Temps ' + this.level.timer;
        this.scoreText.text = 'Score ' + this.game.score;

        if (this.currentExtra) {
            this.extraCountdownText.text = 'Extra ' + this.extraTimer;
        }

    },

    /**
     * When 2 enemies collides
     *
     * @param enemySprite1
     * @param enemySprite2
     */
    _enemyTouchEnemy: function (enemySprite1, enemySprite2) {

        // The simple presence of this function avoid enemies to be on the same place

    },

    /**
     * End of the level
     *
     * @private
     */
    _endLevel: function () {

        if ('endLevel' == this.state) {
            return;
        }

        this._stopExtraEffect();

        this.state = 'endLevel';

        this.enemy.endLevel();
        this._playerDie();

        var goToState = 'levelManager';
        game.lives--;
        if (game.lives == 0) {
            game.gameOver = true;
            this.game.finalScore = this.game.score;
            goToState = 'boot';
        }

        game.time.events.add(1500, function() {
            game.state.start(goToState);
        }, this);

    },

    /**
     * Miam, player eat an enemy
     *
     * @param playerSprite
     * @param enemySprite
     * @private
     */
    _playerEatEnemy: function (playerSprite, enemySprite) {

        this.player.tweenPlayerKey();
        enemySprite.kill();
        this.game.score += 10;

    },

    /**
     * Event when player is dying
     *
     * @private
     */
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
            keysSprite.x = this.infoSpace.x;
            keysSprite.y = this.infoSpace.y;

            this.infoSpace.y += this.infoSpace.gap;

            this.game.score += 10;

            this.player.tweenPlayerKey();

        }

    },

    /**
     * Event when player release a key
     *
     * @private
     */
    _playerReleaseKey: function () {

        var key = this.player.getKey();

        if (key) {
            key.initPosition();

            this.player.releaseKey();

            this.game.score -= 10;
            this.infoSpace.y -= this.infoSpace.gap;

            this.player.tweenPlayerKey();
        }

    },

    /**
     * Event when player catch an extra
     *
     * @param Sprite playerSprite
     * @param Sprite keysSprite
     * @private
     */
    _playerCatchExtra: function (playerSprite, extraSprite) {

        this.state = 'extra';
        this.currentExtra = extraSprite.creator;
        this.extraTimer = this.currentExtra.params.timer
        this.currentExtra.startEffect(this.player, this.enemy);

        // Timer
        this.extraCountdownText = 'Extra ' + this.extraTimer;
        this.extraCountdownText = game.add.text(this.infoSpace.x, this.infoSpace.y, this.extraCountdownText, { font: "18px " + this.font, fill: "#55ffff" });
        this.extraCountdown = game.time.events.loop(Phaser.Timer.SECOND, this._updateExtraTimer, this);
        this.infoSpace.y += this.infoSpace.gap;

        extraSprite.kill();

    },

    /**
     * Event when player touch a lock
     *
     * @param Sprite playerSprite
     * @param Tile tile
     * @private
     */
    _playerTouchLock: function (playerSprite, levelTile) {

        // Get lock by index
        var currentLock;
        this.level.locks.forEach(function (lock) {
            if (levelTile.index === lock.currentIndex) {
                currentLock = lock;
            }
        }, this);

        // Check if key matches with lock
        var currenKey = this.player.getKey();
        if (currenKey && currentLock && currenKey.currentColor === currentLock.currentColor) {
            if (currentLock.currentAction == 'goToNextLevel') {
                this._goToNextLevel();
                return;
            } else if (currentLock.currentAction == 'tileDisappear') {
                this.player.setKey(null);
                this._tileDisappear(levelTile);
                return;
            }
        }

    },

    /**
     * Event when enemy touch the world
     *
     * @param Sprite enemySprite
     * @param Tile tile
     * @private
     */
    _enemyTouchLock: function (enemySprite, levelTile) {},

    /**
     * Go to next level
     *
     * @private
     */
    _goToNextLevel: function () {

        this.game.score += this.level.timer;

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
            this._endLevel();
        }

    },

    /**
     * Update Extra timer
     *
     * @private
     */
    _updateExtraTimer: function () {

        this.extraTimer -= 1;
        if (this.extraTimer <= 0) {
            // Stop effect
            this._stopExtraEffect();
        }

    },

    /**
     * Stop Extra effect
     *
     * @private
     */
    _stopExtraEffect: function() {

        if (null != this.state) {
            this.state = null;
            game.time.events.remove(this.extraCountdown);
            this.currentExtra.stopEffect(this.player, this.enemy);

            // Erase text
            this.extraCountdownText.destroy();
            this.infoSpace.y -= this.infoSpace.gap;
        }

    }

}