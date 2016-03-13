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

};

menuState.prototype = {

    init: function() {

        this.x = game.world.width / 2;
        this.y = game.world.height / 4;
        this.styleTitle = { font: "48px " + this.font, fill: "#55ffff" };
        this.style = { font: "30px " + this.font, fill: "#55ffff" };

    },

    create: function() {
        // Store the relevant text based on the device used
        if (game.device.desktop) {
            var startText = '>>> Espace pour continuer <<<';
        }
        else {
            var startText = '>>> Toucher l\'écran pour continuer <<<';
        }

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        // Name of the game
        //this.game.add.sprite(x - 250, 0, 'menu');
        var title = this.game.add.text(this.x, this.y, game.name, this.styleTitle);
        title.align = 'center';
        title.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        this.y += 130;
        startText = this.game.add.text(this.x, this.y, startText, this.style);
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        // Game over
        if (game.gameOver === true) {
            this._gameOver();
        }

        // If the user already played
        //this._score();

        this._copyright();

        game.stage.backgroundColor = '#222';
    },

    _gameOver: function() {

        game.gameOver = false;

        var goText = 'GAME OVER';
        var scoreText = 'Score : ' + game.finalScore;

        this.y += 130;
        goText = this.game.add.text(this.x, this.y, goText, this.style);
        goText.align = 'center';
        goText.anchor.setTo(0.5, 0.5);

        this.y += 75;
        scoreText = this.game.add.text(this.x, this.y, scoreText, this.style);
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

    },

    _score: function() {
        /*if (score > 0) {
         // Display its score
         var score_label = this.game.add.text(x, y+80, "Your Score: " + score, style);
         score_label.anchor.setTo(0.5, 0.5);

         // Highscore
         if (score > highscore) {
         highscore = score;
         var congrats_label = this.game.add.text(x, y+160, "Congratulations, you've got new highscore!", style);
         congrats_label.anchor.setTo(0.5, 0.5);
         }

         var highscore_label = this.game.add.text(x, y+120, "Highscore: " + highscore, style);
         highscore_label.anchor.setTo(0.5, 0.5);
         }*/
    },

    _copyright: function() {

        var copyright = 'v' + game.version + ' - @nicofisch5 / @pouscaille - phaser.io';
        copyright = this.game.add.text(this.x, game.world.height-25, copyright, { font: "16px Arial", fill: "#888" });
        copyright.anchor.setTo(0.5, 0.5);

    },

    // Start the actual game
    start: function() {

        this.game.state.start('levelManager', true, false);

    }

};
