LevelBoss = function(game, params) {

    Level.call(this, game, params);

};

LevelBoss.prototype = Object.create(Level.prototype, {});
LevelBoss.prototype.constructor = LevelBoss;

/**
 * Create group of enemies
 *
 * @param nb
 */
LevelBoss.prototype.preload = function () {
    alert('Nothing !!!')
};