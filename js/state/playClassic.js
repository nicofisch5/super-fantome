playStateClassic = function(game, params) {

    playState.call(this, game, params);

};

playStateClassic.prototype = Object.create(playState.prototype, {});
playStateClassic.prototype.constructor = playStateClassic;

playStateClassic.prototype.init = function(currentLevel, numberOflevels) {
    playState.prototype.init.call(this, currentLevel, numberOflevels);
};