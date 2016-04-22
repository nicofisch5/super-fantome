LevelFactory = function() {

    this.classes = {
        "classic": LevelClassic, //prototype.constructor,
        "boss": LevelBoss
    };

};

LevelFactory.prototype = {

    /**
     * Get object according to params
     * 
     * @param game
     * @param params
     * @return Level
     */
    getObject: function (game, params) {

        params.type = params.type ? params.type : "classic";
        return new this.classes[params.type](game, params);

    }

}