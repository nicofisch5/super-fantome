HUDTextText = function(name, properties) {

    this.name = name;
    this.params = properties;
    this.display;

};

HUDTextText.prototype = {

    /**
     * Preload, called by HUD helper
     */
    preload: function () {},

    /**
     * Create, called by HUD helper
     */
    create: function (font, infoSpace, text) {

        this.display = game.add.text(
            infoSpace.x,
            infoSpace.y,
            text,
            { font: font.size + " " + font.family, fill: font.color }
        );
        
    },

    /**
     * Update, called by HUD helper
     */
    update: function (text) {

        this.display.text = undefined == text ? '' : text;
        
    },

}