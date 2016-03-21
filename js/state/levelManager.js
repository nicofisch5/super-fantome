/**
 * State 3 - Level manager
 *
 * @type {{preload: preload, create: create}}
 */


var levelManagerState = function(game) {

    this.params;
    this.font = 'Trebuchet MS';

};

levelManagerState.prototype = {

    preload: function() {

        this.params = game.cache.getJSON('level');

        // Check if no more level
        if (game.levelNumber > this.params.length) {
            game.state.start('end');
        } else {
            this._getCurrentLevelParam();
            this.currentLevel = new Level(this.game, this.currentLevelParam);
            this.currentLevel.preload();
        }

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
            var startText = '>>> Espace pour démarrer <<<';
        }
        else {
            var startText = '>>> Toucher l\'écran pour démarrer <<<';
        }

        var levelText = 'Niveau ' + game.levelNumber;
        var scoreText = 'Score : ' + game.score;
        var livesText = 'Vies : ' + game.lives;
        var x = game.world.width/2;
        var y = game.world.height/4;

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        levelText = this.game.add.text(x, y, levelText, { font: "48px " + this.font, fill: "#55ffff" });
        levelText.align = 'center';
        levelText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 130;
        startText = this.game.add.text(x, y, startText, { font: "30px " + this.font, fill: "#55ffff" });
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        y += 100;
        scoreText = this.game.add.text(x, y, scoreText, { font: "24px " + this.font, fill: "#55ffff" });
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 75;
        livesText = this.game.add.text(x, y, livesText, { font: "24px " + this.font, fill: "#55ffff" });
        livesText.align = 'center';
        livesText.anchor.setTo(0.5, 0.5);

    },

    start: function() {

        this.game.state.start('play', true, false, this.currentLevel);

    }

};
