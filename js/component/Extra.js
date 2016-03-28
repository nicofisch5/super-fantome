Extra = function(game, params) {

    this.image = 'assets/gift_final.png';
    this.texture;
    this.sprite = null;
    this.params = params;
    this.availableTypes = ["InvertedCursorKeys", "EnemiesGoFaster", "PlayerGoesSlowly", "PlayerCanEatEnemy", "EnemiesGoSlowly", "PlayerGoesFaster"];
    this.type;

};

Extra.prototype = {

    init: function () {},

    preload: function () {

        game.load.spritesheet('extra', this.image);

    },

    create: function () {

        this.sprite = game.add.sprite(this.params.positionX, this.params.positionY, 'extra');
        this.sprite.scale.setTo(0.38, 0.38);
        game.physics.arcade.enable(this.sprite);

        this.type = this.availableTypes[game.rnd.integerInRange(0, this.availableTypes.length - 1)];

    },

    /**
     * Start extra effect
     *
     * @param player
     * @param enemy
     */
    startEffect: function(player, enemy) {

        if ("InvertedCursorKeys" == this.type) {
            player.startInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemy.startGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.startGoSlowly();
        } else if ("EnemiesGoSlowly" == this.type) {
            enemy.startGoSlowly();
        } else if ("PlayerGoesFaster" == this.type) {
            player.startGoFaster();
        } else if ("PlayerCanEatEnemy" == this.type) {
            enemy.startEscape();
        }

    },

    /**
     * Stop extra effect
     *
     * @param player
     * @param enemy
     */
    stopEffect: function(player, enemy) {

        if ("InvertedCursorKeys" == this.type) {
            player.stopInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemy.stopGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.stopGoSlowly();
        } else if ("EnemiesGoSlowly" == this.type) {
            enemy.stopGoSlowly();
        } else if ("PlayerGoesFaster" == this.type) {
            player.stopGoFaster();
        } else if ("PlayerCanEatEnemy" == this.type) {
            enemy.stopEscape();
        }

    }

}
