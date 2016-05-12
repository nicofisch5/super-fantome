playStateClassic = function(game, params) {

    playState.call(this, game, params);

};

playStateClassic.prototype = Object.create(playState.prototype, {});
playStateClassic.prototype.constructor = playStateClassic;

/**
 * Create group of enemies
 *
 * @param nb
 */
/*playStateClassic.prototype.createEnemy = function (nb) {
    
};*/