PlayStateFactory = function() {

    this.state = {
        "classic": "playClassic", //prototype.constructor,
        "boss": "playBoss"
    };

};

PlayStateFactory.prototype = {

    /**
     * Get object according to params
     * 
     * @param params
     * @return string
     */
    getState: function (params) {

        params.type = params.type ? params.type : "classic";
        return this.state[params.type];

    }

}