Lock = function(game, params) {

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
    this.currentAction;
    this.currentIndex;

};

Lock.prototype = {

    preload: function () {},

    create: function () {

        this.currentColor = this.params.color;
        this.currentAction = this.params.action;
        this.colors.forEach(function (obj) {
            if (obj.color == this.currentColor) {
                this.currentIndex = obj.index;
            }
        }, this);

    },

    update: function() {}

}