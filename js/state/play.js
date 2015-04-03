/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = {

    preload: function() {

        this.player = new Player(game);
        this.level = new Level(game);
        this.enemy = new Enemy(game);

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

        this.level.create();
        this.player.create();
        this.enemy.create(4);

        //game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    update: function() {

        // Collision beetween player and world
        game.physics.arcade.collide(this.player.sprite, this.level.layer);

        // Collision beetween enemies and world
        game.physics.arcade.collide(this.enemy.getGroup(), this.level.layer);

        // // Collision beetween player and enemies - call the kill function when the player and an enemy overlap
        game.physics.arcade.overlap(this.player.sprite, this.enemy.getGroup(), this.playerDie, null, this);

        this.player.update();
        this.enemy.update();

        //this.layer.enableBody = true;
        //this.layer.immovable = true;

    },

    playerDie: function () {

        console.log('I die ...');
        this.player.sprite.kill();

        game.time.events.add(1500, function() {
            game.state.start('menu');
        }, this);

    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);
        this.player.render();

    }

}