Lock = function(game, params) {

    this.game = game;
    this.params = params;
    this.colors = [
        {
            "color": "yellow",
            "index": 55
        },
        {
            "color": "orange",
            "index": 67
        },
        {
            "color": "blue",
            "index": 91
        },
        {
            "color": "green",
            "index": 98
        }
    ];
    this.currentColor;

};

Lock.prototype = {

    preload: function () {

    },

    create: function () {

        this.currentColor = this.params.color;

        this.sprite = this.game.add.sprite(
            this.params.positionX,
            this.params.positionY,
            'Lock',
            this.colors.indexOf(this.currentColor)
        );

        game.physics.arcade.enable(this.sprite);

    },

    update: function() {

    }

}