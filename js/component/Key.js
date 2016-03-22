Key = function(game, params) {

    this.image = 'assets/key_sprite.png';
    this.sprite = null;
    this.params = params;
    this.colors = ["yellow", "orange", "blue", "green"];
    this.currentColor;

};

Key.prototype = {

    preload: function () {

        /**
         * 'key' is the name of the image
         * this.image is the folder location
         * 35 is width
         * 17 is height
         * the fifth element is how many frames
         */
        game.load.spritesheet('key', this.image, 35, 17);

    },

    create: function () {

        this.currentColor = this.params.color;

        this.sprite = game.add.sprite(
            this.params.positionX,
            this.params.positionY,
            'key',
            this.colors.indexOf(this.currentColor)
        );

        //this.sprite.immovable = true;

        game.physics.arcade.enable(this.sprite);

    },

    update: function() {},

    initPosition: function() {

        this.sprite.x = this.params.positionX;
        this.sprite.y = this.params.positionY;

    }

}