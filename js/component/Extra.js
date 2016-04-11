Extra = function(game, params) {

    this.image = 'assets/img/gift_final.png';
    this.soundFilename = 'assets/audio/extra.mp3';
    this.sound;
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
        game.load.audio('extraSound', this.soundFilename);

    },

    create: function () {

        this.sprite = game.add.sprite(this.params.positionX, this.params.positionY, 'extra');
        this.sprite.scale.setTo(0.38, 0.38);
        game.physics.arcade.enable(this.sprite);

        this.type = this.availableTypes[game.rnd.integerInRange(0, this.availableTypes.length - 1)];

        this.sound = game.add.audio('extraSound');

    },

    /**
     * Start extra effect
     *
     * @param player
     * @param enemyGroup
     */
    startEffect: function(player, enemyGroup) {

        if ("InvertedCursorKeys" == this.type) {
            player.startInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemyGroup.startGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.startGoSlowly();
        } else if ("EnemiesGoSlowly" == this.type) {
            enemyGroup.startGoSlowly();
        } else if ("PlayerGoesFaster" == this.type) {
            player.startGoFaster();
        } else if ("PlayerCanEatEnemy" == this.type) {
            enemyGroup.startEscape();
        }

    },

    /**
     * Stop extra effect
     *
     * @param player
     * @param enemyGroup
     */
    stopEffect: function(player, enemyGroup) {

        if ("InvertedCursorKeys" == this.type) {
            player.stopInvertedCursorKeys();
        } else if ("EnemiesGoFaster" == this.type) {
            enemyGroup.stopGoFaster();
        } else if ("PlayerGoesSlowly" == this.type) {
            player.stopGoSlowly();
        } else if ("EnemiesGoSlowly" == this.type) {
            enemyGroup.stopGoSlowly();
        } else if ("PlayerGoesFaster" == this.type) {
            player.stopGoFaster();
        } else if ("PlayerCanEatEnemy" == this.type) {
            enemyGroup.stopEscape();
        }

    },

    /**
     * Play sound
     */
    playSound: function() {

        this.sound.play();

    }

}
