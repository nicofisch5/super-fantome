LevelClassic = function(game, params) {

    Level.call(this, game, params);

    this.nbEnemies = 4;

};

LevelClassic.prototype = Object.create(Level.prototype, {});
LevelClassic.prototype.constructor = LevelClassic;

/**
 * Create group of enemies
 *
 * @param nb
 */
LevelClassic.prototype.createEnemy = function (nb) {
    
};