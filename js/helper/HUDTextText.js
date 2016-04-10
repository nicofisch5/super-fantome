HUDTextText = function(name, properties) {

    this.name = name;
    this.params = properties;
    this.display;

};

HUDTextText.prototype = {

    preload: function () {},

    create: function (font, infoSpace, text) {

        this.display = game.add.text(
            infoSpace.x,
            infoSpace.y,
            text,
            { font: font.size + " " + font.family, fill: font.color }
        );
        
    },

    update: function (text) {

        this.display.text = undefined == text ? '' : text;
        
    },

}