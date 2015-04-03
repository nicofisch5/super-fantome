/**
 * State 3 - Let's play !
 *
 * @type {{}}
 */

var playState = {

    preload: function() {

        this.player = new Player(game);
        this.level = new Level(game);

    },

    createEnemiesSerie: function() {

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

            /*this.game.physics.arcade.enable(enemie);
             enemie.body.bounce.y = 0.2;
             enemie.body.collideWorldBounds = true;*/

            //  This just gives each enemie a slightly random bounce value
            //enemie.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

    },

    create: function() {

        //game.physics.arcade.gravity.y = 250;

        // Updates the size of this world. Note that this doesn't modify the world x/y coordinates, just the width and height.
        //game.world.setBounds(0, 0, 256, 2848);

        //game.physics.startSystem(Phaser.Physics.P2JS);


        this.level.create();

        this.player.create();

        game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    update: function() {

        game.physics.arcade.collide(this.player.sprite, this.level.layer);

        this.player.update();

        //this.layer.enableBody = true;
        //this.layer.immovable = true;

    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);
        this.player.render();

    }

}