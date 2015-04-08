/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = {

    preload: function() {

    },

    /*createEnemiesSerie: function() {

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        // Utiliser this.enemies.add sur les sprites créés

        for (var i = 0; i < 4; i++) {
            // Random position
            //positionX = Math.floor(Math.random() * (gameWidth - 40));
            var positionX = game.world.width / 2;
            var positionY = this.pit.sprite.y + 200;

            //  Create a enemie inside of the 'enemies' group
            //var enemie = this.enemies.create(positionX, positionY, 'enemie');

            var enemie = new Enemy(game);
            enemie.setProperties(positionX, positionY);

            this.game.physics.arcade.enable(enemie);
             enemie.body.bounce.y = 0.2;
             enemie.body.collideWorldBounds = true;

            //  This just gives each enemie a slightly random bounce value
            //enemie.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

    },*/

    create: function() {

        console.log('playState - create');

        console.log('call level.create');
        game.level.create();
        console.log('call player.create');
        game.player.create();
        game.enemy.create(4);
        console.log('end enemy.create');


        //game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    update: function() {

        // Collision between player and lock
        if (true === game.player.hasKey()) {
            game.level.tilemapLevel1.setTileIndexCallback(
                55, // indexes
                this._playerTouchLock, // callback
                this // callbackContext
            );
        }

        // Collision between player and world
        game.physics.arcade.collide(game.player.sprite, game.level.layer);

        // Collision between enemies and world
        game.physics.arcade.collide(game.enemy.getGroup(), game.level.layer);

        // Collision between player and enemies - call the kill function when the player and an enemy overlap
        game.physics.arcade.overlap(game.player.sprite, game.enemy.getGroup(), this._endGame, null, this);

        // Collision between player and key
        if (typeof game.level.key !== 'undefined') {
            game.physics.arcade.collide(game.player.sprite, game.level.key.sprite, this._playerCatchKey, null, this);
        }

        game.player.update();
        game.enemy.update();





        //this.layer.enableBody = true;
        //this.layer.immovable = true;

    },

    _endGame: function () {

        this._playerDie();

        game.enemy.endGame();
        game.gameOver = true;

        game.time.events.add(1500, function() {
            game.state.start('menu');
        }, this);

    },

    _playerDie: function () {

        game.player.sprite.kill();

    },

    _playerCatchKey: function () {

        game.player.hasKey(true);
        game.level.key.sprite.kill();

    },

    _playerTouchLock: function () {

        if (true === game.player.hasKey()) {
            console.log('You win !!');
            this._goToNextLevel()
        } else {
            console.log('stop');
            //game.player.stop();
        }

    },

    _goToNextLevel: function () {

        game.currentLevel++;
        game.level = new Level(game);
        //game.level.preload();

        game.state.start('load');

    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);
        game.player.render();

    }

}