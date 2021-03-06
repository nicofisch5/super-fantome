/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = function(game) {

    this.currentExtra;
    this.extraTimer;
    this.state;
    this.backgroundSound;
    this.endSound;
    this.hud;

};

playState.prototype = {

    init: function(currentLevel, numberOflevels) {

        this.level = currentLevel;
        this.player = new Player(game);
        this.enemyGroup = new EnemyGroup(game, this.player, this.level.nbEnemies);

        this.infoSpace = {"x": 1100, "y": 50, "gap": 40};

        this.hud = new HUD(game, this.infoSpace, numberOflevels);

    },

    preload: function() {

        this.state = null;

    },

    create: function() {

        this.level.create();
        this.player.create();
        this.enemyGroup.createEnemy();
        this.hud.create();

        this.emitter = this.game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;

        this.countdown = game.time.events.loop(Phaser.Timer.SECOND, this._updateTimer, this);
        
        // Space bar
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.backgroundSound = game.add.audio('background');
        this.backgroundSound.play();
        this.endSound = game.add.audio('end');

    },
    
    update: function() {

        // Collision between player and world
        game.physics.arcade.collide(this.player.sprite, this.level.layer, this._playerTouchLock, null, this);

        // Collision between enemies and world
        game.physics.arcade.collide(this.enemyGroup, this.level.layer, this._enemyTouchLock);

        // Collision between 2 enemies
        game.physics.arcade.collide(this.enemyGroup, this.enemyGroup, this._enemyTouchEnemy, null, this);

        // Collision between player and enemies - call the kill function when the player and an enemy overlap
        var action = this._endLevel;
        if ('extra' == this.state && 'PlayerCanEatEnemy' == this.currentExtra.type) {
            action = this._playerEatEnemy;
        }
        game.physics.arcade.overlap(this.player.sprite, this.enemyGroup, action, null, this);

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
        //this.enemyGroup.update(this.player);

        this.hud.update(
            this.level.timer,
            this.extraTimer
        );
        
        /*if (this.currentExtra) {
            this.extraCountdownText.text = this.extraTimer;
        }*/

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

        this.enemyGroup.endLevel();
        this._playerDie();

        this.backgroundSound.stop();

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

        this.player.tweenPlayer();
        this.player.playEatSound();
        
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

        this.player.playExplosionSound();

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
            /*keysSprite.x = this.infoSpace.x;
            keysSprite.y = this.infoSpace.y;

            this.infoSpace.y += this.infoSpace.gap;*/

            this.game.score += 10;

            this.player.tweenPlayer();
            keysSprite.creator.playSound();

            this.hud.addStaticLine(keysSprite);

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
/*            this.infoSpace.y -= this.infoSpace.gap;*/

            this.player.tweenPlayer();

            key.playSound();

            this.hud.removeStaticLine(key.sprite);
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
        this.currentExtra.startEffect(this.player, this.enemyGroup);

        // Timer
        /*var extraSpriteHUD = game.add.sprite(this.infoSpace.x, this.infoSpace.y, 'extra', 1);
        extraSpriteHUD.scale.setTo(0.33, 0.33);*/
        
        /*this.extraCountdownText = this.extraTimer;
        this.extraCountdownText = game.add.text(this.infoSpace.x + 38, this.infoSpace.y, this.extraCountdownText, { font: "18px " + this.font, fill: this.color });*/
        this.extraCountdown = game.time.events.loop(Phaser.Timer.SECOND, this._updateExtraTimer, this);
        //this.infoSpace.y += this.infoSpace.gap;

        extraSprite.creator.playSound();
        
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

        this.backgroundSound.stop();
        this.endSound.play();
        
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

        this.endSound.play();
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
            this.currentExtra.stopEffect(this.player, this.enemyGroup);

            this.extraTimer = '';

            // Erase text
            //this.extraCountdownText.destroy();
            //this.infoSpace.y -= this.infoSpace.gap;
        }

    }

}
