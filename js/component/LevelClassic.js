LevelClassic = function(game, params) {

    Level.call(this, game, params);

    this.nbEnemies = 4;

};

LevelClassic.prototype = Object.create(Level.prototype, {});
LevelClassic.prototype.constructor = LevelClassic;
