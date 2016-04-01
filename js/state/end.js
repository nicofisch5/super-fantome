/**
 * State 2 - Game menu
 *
 * @type {{create: create, start: start}}
 */

var endState = function(game) {

    this.x;
    this.y;
    this.styleTitle;
    this.style;
    this.font = 'Trebuchet MS';

};

endState.prototype = {

    init: function() {

        this.x = game.world.width / 2;
        this.y = game.world.height / 4;
        this.styleTitle = { font: "48px " + this.font, fill: "#55ffff" };
        this.style = { font: "30px " + this.font, fill: "#55ffff" };

    },

    create: function() {

        var startText = '>>> Congratulations you have finished the game <<<';

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.restart, this);
        game.input.onDown.add(this.restart, this);

        // Name of the game
        var title = this.game.add.text(this.x, this.y, game.name, this.styleTitle);
        title.align = 'center';
        title.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        this.y += 130;
        startText = this.game.add.text(this.x, this.y, startText, this.style);
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        this._score();

        game.stage.backgroundColor = '#222';
    },

    /**
     * Score of the player
     *
     * @private
     */
    _score: function() {

        this.y += 100;
        var scoreText = 'Score : ' + game.score;
        scoreText = this.game.add.text(this.x, this.y, scoreText, this.style);
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

    },

    /**
     * Restart the game
     */
    restart: function() {

        this.game.state.start('boot', true, false);

    }

};
