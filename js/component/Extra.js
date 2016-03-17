Extra = function(game, params) {

    this.pixelWidth = 2;
    this.pixelHeight = 2;
    this.texture;
    this.sprite = null;
    this.params = params;
    //this.availableTypes = ["InvertedCursorKeys", "EnemiesGoFaster", "PlayerGoesSlowly", "EatEnemy", "EnemiesGoSlowly", "PlayerGoesFaster"];
    this.availableTypes = ["PlayerGoesSlowly"];
    this.type;

};

Extra.prototype = {

    preload: function () {

        this.texture = [
            '.....828.....',
            '....72227....',
            '....82228....',
            '...7222227...',
            '2222222222222',
            '8222222222228',
            '.72222222227.',
            '..787777787..',
            '..877777778..',
            '.78778887787.',
            '.27887.78872.',
            '.787.....787.'
        ];

        game.create.texture('extra', this.texture, this.pixelWidth, this.pixelHeight);

        this.type = this.availableTypes[game.rnd.integerInRange(0, this.availableTypes.length - 1)];

    },

    init: function () {},

    create: function () {

        this.sprite = game.add.sprite(this.params.positionX, this.params.positionY, 'extra');
        game.physics.arcade.enable(this.sprite);

    },

    /**
     * Start extra effect
     *
     * @param player
     */
    startEffect: function(player, enemy) {

        if ("InvertedCursorKeys" == this.type) {
            player.startInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemy.startGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.startGoSlowly();
        }

    },

    /**
     * Stop extra effect
     *
     * @param player
     */
    stopEffect: function(player, enemy) {

        if ("InvertedCursorKeys" == this.type) {
            player.stopInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemy.stopGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.stopGoSlowly();
        }

    }

}
