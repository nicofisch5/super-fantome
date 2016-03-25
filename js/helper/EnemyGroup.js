EnemyGroup = function (game, player, nb) {

    Phaser.Group.call(this, game);

    this.player = player;

    this.enableBody = true;
    this.playerMargin = 80;
    this.createEnemy(nb);

};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype, {

    /*say2: {
        value: function () {
            console.log("Hello 2");
        }
    }*/

});
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.createEnemy = function (nb) {

    for (var i = 0; i < nb; i++) {
        // Random position
        var positionX = Math.floor(Math.random() * (gameWidth - gameInfoSpaceWidth - this.playerMargin));
        var positionY = Math.floor(Math.random() * (gameHeight - this.playerMargin));

        positionX = (positionX < 80) ? 80 : positionX;
        positionX = (positionX > (gameWidth - 80)) ? gameWidth - 80 : positionX;

        positionY = (positionY < 80) ? 80 : positionY;
        positionY = (positionY > (gameHeight - 80)) ? gameHeight - 80 : positionY;

        //  Create a enemie inside of the 'enemies' group
        var enemy = this.create(positionX, positionY, 'enemy1');
        enemy.component = new Enemy();
        enemy.scale.setTo(0.38, 0.38);

        // And finally, these 2 lines will automatically kill the sprite when it’s no longer in the world (when it
        // falls into the bottom hole). This way we should never run out of dead enemies for getFirstDead .
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }
};

EnemyGroup.prototype.update = function() {

    if (this.length) {
        this.forEach(function(item) {
            if (item.x < this.player.sprite.x) {
                item.body.velocity.x = item.component.velocity * item.component.direction;
            } else if (item.x > this.player.sprite.x) {
                item.body.velocity.x = item.component.velocity * -1 * item.component.direction;
            }

            if (item.y < this.player.sprite.y) {
                item.body.velocity.y = item.component.velocity * item.component.direction;
            } else if (item.y > this.player.sprite.y) {
                item.body.velocity.y = item.component.velocity * -1 * item.component.direction;
            }

        }, this, true);
    }

};

EnemyGroup.prototype.stop = function () {

    if (this.length) {
        this.setAll('body.velocity', 0);
    }

};

EnemyGroup.prototype.startEscape = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.startEscape();
        });
    }

};

EnemyGroup.prototype.stopEscape = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.stopEscape();
        });
    }

};

/**
 * Normal velocity
 */
EnemyGroup.prototype.setNormalVelocity = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.setNormalVelocity();
        });
    }

};

/**
 * Enemies goes faster
 * Launch by catching an extra
 */
EnemyGroup.prototype.startGoFaster = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.startGoFaster();
        });
    }

};

/**
 * Enemies stop going faster
 */
EnemyGroup.prototype.stopGoFaster = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.stopGoFaster();
        });
    }

};

/**
 * Enemies goes faster
 * Launch by catching an extra
 */
EnemyGroup.prototype.startGoSlowly = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.startGoSlowly();
        });
    }

};

/**
 * Enemies stop going faster
 */
EnemyGroup.prototype.stopGoSlowly = function() {

    if (this.length) {
        this.forEach(function(item) {
            item.component.stopGoSlowly();
        });
    }

};

EnemyGroup.prototype.endLevel = function () {

    this.stop();
    this.removeAll();

};