playStateBoss = function(game, params) {

    playState.call(this, game, params);

};

playStateBoss.prototype = Object.create(playState.prototype, {});
playStateBoss.prototype.constructor = playStateBoss;

/**
 * Create group of enemies
 *
 * @param nb
 */
/*playStateClassic.prototype.createEnemy = function (nb) {
    
};*/