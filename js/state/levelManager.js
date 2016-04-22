/**
 * State 3 - Level manager
 *
 * @type {{preload: preload, create: create}}
 */


var levelManagerState = function(game) {

    this.params;
    this.font = 'Trebuchet MS';
    this.color = '#a3daea';
    this.backgroundSound = 'assets/audio/world1.mp3';
    this.endSound = 'assets/audio/end.mp3';

};

levelManagerState.prototype = {

    preload: function() {

        this.params = game.cache.getJSON('level');

        // Check if no more level
        if (game.levelNumber > this.params.length) {
            game.state.start('end');
            // @todo Go to next world
        } else {
            this._getCurrentLevelParam();
            var levelFactory = new LevelFactory();
            this.currentLevel = levelFactory.getObject(game, this.currentLevelParam);
            this.currentLevel.preload();
        }

        // Sound
        game.load.audio('background', this.backgroundSound);
        game.load.audio('end', this.endSound);

    },

    _getCurrentLevelParam: function () {

        for (var prop in this.params) {
            if (this.params[prop].id == this.game.levelNumber) {
                this.currentLevelParam = this.params[prop];
                break;
            }
        }

    },

    create: function() {

        // Store the relevant text based on the device used
        if (game.device.desktop) {
            var startText = '>>> Space bar to start <<<';
        }
        else {
            var startText = '>>> Touch screen to start <<<';
        }

        // Phaser logo
        game.add.sprite(30, 30, 'phaser', 1);

        var levelText = 'Level ' + game.levelNumber;
        var scoreText = 'Score : ' + game.score;
        var livesText = 'Lifes : ' + game.lives;
        var x = game.world.width/2;
        var y = game.world.height/4;

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        levelText = this.game.add.text(x, y, levelText, { font: "48px " + this.font, fill: this.color });
        levelText.align = 'center';
        levelText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 130;
        startText = this.game.add.text(x, y, startText, { font: "30px " + this.font, fill: this.color });
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        y += 100;
        scoreText = this.game.add.text(x, y, scoreText, { font: "24px " + this.font, fill: this.color });
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 75;
        livesText = this.game.add.text(x, y, livesText, { font: "24px " + this.font, fill: this.color });
        livesText.align = 'center';
        livesText.anchor.setTo(0.5, 0.5);

        // Ghost picture
        game.add.sprite(game.world.width - 250, game.world.height - 200, 'ghost', 1).scale.setTo(0.50, 0.50);

    },

    /**
     * Next state
     */
    start: function() {

        this.game.state.start('play', true, false, this.currentLevel, this.params.length);

    }

};
