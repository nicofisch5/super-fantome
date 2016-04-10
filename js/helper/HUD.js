HUD = function(game, infoSpace, numberOflevels) {

    this.font;
    this.infoSpace;
    this.numberOflevels = numberOflevels;

    this.classes = {
        "text_text": HUDTextText, //prototype.constructor,
        "image_text": HUDImageText
    };
    
    this.objectGroup = {};
    this.infoSpace = {};
    this.params;
    this.stats;

};

HUD.prototype = {

    preload: function () {

        var params = game.cache.getJSON('hud');

        // Loading all assets needed by HUD
        for (var eltName in params.elements) {
            if ('image_text' == params.elements[eltName].type) {
                var imageProperties = params.elements[eltName].properties.image;
                var width = imageProperties.width ? imageProperties.width : null;
                var height = imageProperties.height ? imageProperties.height : null;
                
                game.load.spritesheet(eltName, imageProperties.path, width, height);
            }
        }

    },

    create: function () {

        this.params = game.cache.getJSON('hud');
        this.font = this.params.font;
        this.infoSpace.main = Object.assign({}, this.params.infoSpace.main);
        this.infoSpace.sub = Object.assign({}, this.params.infoSpace.sub);
        
        // Creating all objects
        for (var eltName in this.params.elements) {
            this.objectGroup[eltName] = new this.classes[this.params.elements[eltName].type](eltName, this.params.elements[eltName].properties);
        }

        this._prepareStats();
        this._firstDisplay()

    },

    _prepareStats: function (levelTimer, extraTimer) {

        levelTimer = levelTimer ? levelTimer : '';
        extraTimer = extraTimer ? extraTimer : '';
        
        this.stats = {
            "level": 'Level ' + game.levelNumber + '/' + this.numberOflevels,
            "score": 'Score ' + game.score,
            "time": levelTimer, //this.level.timer
            "lives": game.lives,
            "extra": extraTimer
        };
        
    },

    _firstDisplay: function () {

        for (var eltName in this.objectGroup) {
            this.objectGroup[eltName].create(
                this.font,
                this.infoSpace.main,
                this.stats[eltName]
            );

            this.infoSpace.main.y += this.infoSpace.main.gap;
        }

    },

    update: function (levelTimer, extraTimer) {

        this._prepareStats(levelTimer, extraTimer);

        for (var eltName in this.objectGroup) {
            this.objectGroup[eltName].update(
                this.stats[eltName]
            );
        }
        
    },

    addStaticLine: function (object) {
        
        if (object instanceof Phaser.Sprite) {
            object.x = this.infoSpace.sub.x;
            object.y = this.infoSpace.sub.y;

            this.infoSpace.sub.y += this.infoSpace.sub.gap;  
        }
        
    },

    removeStaticLine: function (object) {

        if (object instanceof Phaser.Sprite) {
            this.infoSpace.sub.y -= this.infoSpace.sub.gap;
        }

    }

}