/**
 * State 2 - Game menu
 *
 * @type {{create: create, start: start}}
 */

var menuState = function(game) {

    this.x;
    this.y;
    this.styleTitle;
    this.style;
    this.font = 'Trebuchet MS';
    this.color = '#a3daea';

};

menuState.prototype = {

    init: function() {

        this.x = game.world.width / 2;
        this.y = game.world.height / 6;
        this.styleTitle = { font: "48px " + this.font, fill: this.color };
        this.style = { font: "30px " + this.font, fill: this.color };

    },

    preload: function() {

        game.load.spritesheet('ghost', 'assets/ghost_intro.png', 300, 300);
        game.load.spritesheet('phaser', 'assets/phaser_logo.png');

    },

    create: function() {
        // Store the relevant text based on the device used
        if (game.device.desktop) {
            var startText = '>>> Space bar to continue <<<';
        }
        else {
            var startText = '>>> Touch screen to continue <<<';
        }

        // Phaser logo
        game.add.sprite(30, 30, 'phaser', 1);

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        // Name of the game
        var title = this.game.add.text(this.x, this.y, game.name, this.styleTitle);
        title.align = 'center';
        title.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        this.y += 100;
        startText = this.game.add.text(this.x, this.y, startText, this.style);
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        // Ghost picture
        this.y += 40;
        game.add.sprite(this.x - 175, this.y, 'ghost', 1);
        this.y += 182;

        // Game over
        if (game.gameOver === true) {
            this._gameOver();
        }

        this._copyright();

        game.stage.backgroundColor = '#222';
    },

    /**
     * Game over
     *
     * @private
     */
    _gameOver: function() {

        game.gameOver = false;

        var goText = 'GAME OVER';
        var scoreText = 'Score : ' + game.finalScore;

        this.y += 140;
        goText = this.game.add.text(this.x, this.y, goText, this.style);
        goText.align = 'center';
        goText.anchor.setTo(0.5, 0.5);

        this.y += 35;
        scoreText = this.game.add.text(this.x, this.y, scoreText, this.style);
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

    },

    /**
     * Copyright at the bottom
     *
     * @private
     */
    _copyright: function() {

        var copyright = 'v' + game.version + ' - @nicofisch5 / @theofisch - phaser.io';
        copyright = this.game.add.text(this.x, game.world.height-25, copyright, { font: "16px Arial", fill: "#888" });
        copyright.anchor.setTo(0.5, 0.5);

    },

    /**
     * Start the actual game
     */
    start: function() {

        this.game.state.start('levelManager', true, false);

    }

};
