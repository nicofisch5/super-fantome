HUDImageText = function(name, properties) {

    this.name = name;
    this.params = properties;
    this.sprite;
    this.display;
    this.xGap = 38;

};

HUDImageText.prototype = {

    preload: function () {},

    create: function (font, infoSpace, text) {

        var sprite = this.params.image.sprite ? this.params.image.sprite : 0;
        this.sprite = game.add.sprite(infoSpace.x, infoSpace.y, this.name, sprite);
        this.sprite.scale.setTo(this.params.image.scale, this.params.image.scale);
        this.sprite.visible = false;
        
        this.display = game.add.text(
            infoSpace.x + this.xGap,
            infoSpace.y,
            text,
            { font: font.size + " " + font.family, fill: font.color }
        );

    },

    update: function (text) {

        text = undefined === text ? '' : text;
        
        if ('' === text) {
            this.sprite.visible = false;
        } else {
            this.sprite.visible = true;
        }
        
        this.display.text = text;

    },

}