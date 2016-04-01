EnemyGroup = function (game, player, nb) {

    Phaser.Group.call(this, game);

    this.player = player;

    this.enableBody = true;
    this.areaMargin = 80;
    this.playerMargin = 70;
    this.nb = nb;
    this.playerMargins;

};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype, {

    /*say2: {
        value: function () {
            console.log("Hello 2");
        }
    }*/

});
EnemyGroup.prototype.constructor = EnemyGroup;

/**
 * Create group of enemies
 * 
 * @param nb
 */
EnemyGroup.prototype.createEnemy = function (nb) {

    nb = nb ? nb : this.nb;

    this.playerMargins = {
        "left": this.player.sprite.x - this.playerMargin,
        "right": this.player.sprite.x + this.playerMargin,
        "top": this.player.sprite.y - this.playerMargin,
        "bottom": this.player.sprite.y + this.playerMargin
    };
    
    for (var i = 0; i < nb; i++) {
        // Get position
        var position = this._getRandomPosition();

        //  Create a enemie inside the 'enemies' group
        var enemy = this.create(position.x, position.y, 'enemy1');
        enemy.component = new Enemy();
        enemy.scale.setTo(0.38, 0.38);

        // And finally, these 2 lines will automatically kill the sprite when it’s no longer in the world (when it
        // falls into the bottom hole). This way we should never run out of dead enemies for getFirstDead .
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }
};

EnemyGroup.prototype._getRandomPosition = function () {

    var positionX
    var positionY

    // Random position X
    while (
            !positionX //Start
            || (positionX > this.playerMargins.left && positionX < this.playerMargins.right) // Margin with player
            || (positionX < this.areaMargin || positionX > (gameWidth - this.areaMargin)) // Margin with area
        ) {
        positionX = Math.floor(Math.random() * (gameWidth - gameInfoSpaceWidth));
    }

    // Random position Y
    while (
            !positionY // Start
            || (positionY > this.playerMargins.top && positionY < this.playerMargins.bottom) // Margin with player
            || (positionY < this.areaMargin || positionY > (gameWidth - this.areaMargin)) // Margin with area
        ) {
        positionY = Math.floor(Math.random() * (gameHeight - this.playerMargin));
    }
    
    return {
        "x": positionX,
        "y": positionY
    };
    
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