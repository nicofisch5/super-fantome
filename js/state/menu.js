/**
 * State 2 - Game menu
 *
 * @type {{create: create, start: start}}
 */

var menuState = function(game) {

};

menuState.prototype = {

    create: function() {
        // Defining variables
        var copyright = 'v' + game.version + ' - @nicofisch5 / @pouscaille - phaser.io';

        // Store the relevant text based on the device used
        if (game.device.desktop) {
            var startText = '>>> Espace pour continuer <<<';
        }
        else {
            var startText = '>>> Toucher l\'écran pour continuer <<<';
        }

        var goText = 'GAME OVER';
        var scoreText = 'Score : ' + game.finalScore;
        var styleTitle = { font: "48px Sawasdee", fill: "#55ffff" };
        var style = { font: "30px Sawasdee", fill: "#55ffff" };
        var x = game.world.width/2;
        var y = game.world.height/4;

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        // Name of the game
        //this.game.add.sprite(x - 250, 0, 'menu');
        var title = this.game.add.text(x, y, game.name, styleTitle);
        title.align = 'center';
        title.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 130;
        startText = this.game.add.text(x, y, startText, style);
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        // Game over
        if (game.gameOver === true) {
            game.gameOver = false;

            y += 130;
            goText = this.game.add.text(x, y, goText, style);
            goText.align = 'center';
            goText.anchor.setTo(0.5, 0.5);

            y += 75;
            scoreText = this.game.add.text(x, y, scoreText, style);
            scoreText.align = 'center';
            scoreText.anchor.setTo(0.5, 0.5);
        }

        // If the user already played
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

        copyright = this.game.add.text(x, game.world.height-25, copyright, { font: "16px Arial", fill: "#888" });
        copyright.anchor.setTo(0.5, 0.5);

        game.stage.backgroundColor = '#222';
    },

    // Start the actual game
    start: function() {

        this.game.state.start('levelManager', true, false);

    }

};
