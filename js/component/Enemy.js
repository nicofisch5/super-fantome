Enemy = function(game) {

    this.game = game;
    this.image = 'assets/potatoe.png';
    this.sprite = null;
    this.enemies = null;
    this.normalVelocity = 50;
    this.slowVelocity = 30;
    this.fastVelocity = 110;
    this.velocity = this.normalVelocity;
    this.playerMargin = 80;
    this.direction = 1;

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
        var positionX = Math.floor(Math.random() * (gameWidth - gameInfoSpaceWidth - this.playerMargin));
        var positionY = Math.floor(Math.random() * (gameHeight - this.playerMargin));

        positionX = (positionX < 80) ? 80 : positionX;
        positionX = (positionX > (gameWidth - 80)) ? gameWidth - 80 : positionX;

        positionY = (positionY < 80) ? 80 : positionY;
        positionY = (positionY > (gameHeight - 80)) ? gameHeight - 80 : positionY;

        //  Create a enemie inside of the 'enemies' group
        var enemy = this.enemies.create(positionX, positionY, 'enemy1');
        enemy.scale.setTo(0.38, 0.38);

        // And finally, these 2 lines will automatically kill the sprite when it’s no longer in the world (when it
        // falls into the bottom hole). This way we should never run out of dead enemies for getFirstDead .
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },

    update: function(player) {

        if (this.enemies) {
            this.enemies.forEach(function(item) {
                if (item.x < player.sprite.x) {
                    item.body.velocity.x = this.velocity * this.direction;
                } else if (item.x > player.sprite.x) {
                    item.body.velocity.x = this.velocity * -1 * this.direction;
                }

                if (item.y < player.sprite.y) {
                    item.body.velocity.y = this.velocity * this.direction;
                } else if (item.y > player.sprite.y) {
                    item.body.velocity.y = this.velocity * -1 * this.direction;
                }

            }, this);
        }

    },

    startEscape: function() {

        this.direction = -1;

    },

    stopEscape: function() {

        this.direction = 1;

    },

    stop: function () {

        if (this.enemies) {
            this.enemies.setAll('body.velocity', 0);
        }

    },

    getGroup: function () {

        return this.enemies;

    },

    endLevel: function () {

        this.stop();
        this.enemies = null;

    },

    /**
     * Normal velocity
     */
    setNormalVelocity: function() {

        this.velocity = this.normalVelocity;

    },

    /**
     * Enemies goes faster
     * Launch by catching an extra
     */
    startGoFaster: function() {

        this.velocity = this.fastVelocity;

    },

    /**
     * Enemies stop going faster
     */
    stopGoFaster: function() {

        this.setNormalVelocity();

    },

    /**
     * Enemies goes faster
     * Launch by catching an extra
     */
    startGoSlowly: function() {

        this.velocity = this.slowVelocity;

    },

    /**
     * Enemies stop going faster
     */
    stopGoSlowly: function() {

        this.setNormalVelocity();

    }

}