Enemy = function(game) {

    this.game = game;
    this.image = 'assets/potatoe.png';
    this.sprite = null;
    this.enemies = null;
    this.velocity = 50;

};

Enemy.prototype = {

    preload: function () {

        this.game.load.image('enemy1', this.image);

    },

    init: function () {

        if (this.enemies == null) {
            // Group of enemies
            this.enemies = game.add.group();
            this.enemies.enableBody = true;
        }

    },

    create: function (nb) {

        this.init();

        // Force to 1 if null
        nb = nb ? nb : 1;


        for (var i = 1; i <= nb; i++) {
            this._createEnemy();
        }

    },

    _createEnemy: function () {

        // Random position
        positionX = Math.floor(Math.random() * (gameWidth));
        positionY = Math.floor(Math.random() * (gameHeight));

        positionX = (positionX < 80) ? 80 : positionX;
        positionX = (positionX > (gameWidth - 80)) ? gameWidth - 80 : positionX;

        positionY = (positionY < 80) ? 80 : positionY;
        positionY = (positionY > (gameHeight - 80)) ? gameHeight - 80 : positionY;


        //  Create a enemie inside of the 'enemies' group
        var enemy = this.enemies.create(positionX, positionY, 'enemy1');
        enemy.scale.setTo(0.38, 0.38);

        // Set the anchor point centered at the bottom
        //enemy.anchor.setTo(0.5, 1);
        // Add gravity to see it fall
        //enemy.body.gravity.y = 500;

        // We give some horizontal velocity to the enemy to make it move right or left. We use Phaser.Math.randomSign()
        // that will randomly return 1 or -1, to have a velocity of 100 or -100:
        //enemy.body.velocity.x = 100 * Phaser.Math.randomSign();

        // When an enemy is moving right and hits a wall, we want it to start moving left. One easy way
        // to do this is to use the bounce property that can be set with a value between 0 and 1. 0 means no
        // bounce, 1 means a perfect bounce. So this will make the enemy change direction when hitting a wall
        // horizontally:
        /*enemy.body.bounce.x = 1;
        enemy.body.bounce.y = 1;*/

        // And finally, these 2 lines will automatically kill the sprite when it’s no longer in the world (when it
        // falls into the bottom hole). This way we should never run out of dead enemies for getFirstDead .
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },

    update: function(player) {

        if (this.enemies) {
            this.enemies.forEach(function(item) {
                if (item.x < player.sprite.x) {
                    item.body.velocity.x = this.velocity;
                } else if (item.x > player.sprite.x) {
                    item.body.velocity.x = this.velocity * -1;
                }

                if (item.y < player.sprite.y) {
                    item.body.velocity.y = this.velocity;
                } else if (item.y > player.sprite.y) {
                    item.body.velocity.y = this.velocity * -1;
                }

            }, this);
        }

    },

    getGroup: function () {

        return this.enemies;

    },

    endGame: function () {

        this.enemies = null;

    }

}