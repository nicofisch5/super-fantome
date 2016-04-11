Enemy = function(game) {

    this.image = 'assets/img/potatoe.png';
    this.sprite = null;
    this.normalVelocity = 50;
    this.slowVelocity = 30;
    this.fastVelocity = 110;
    this.velocity = this.normalVelocity;
    this.direction = 1;
    this.component;

};

Enemy.prototype = {

    preload: function () {

        game.load.image('enemy1', this.image);

    },

    startEscape: function() {

        this.direction = -1;

    },

    stopEscape: function() {

        this.direction = 1;

    },

    /**
     * Normal velocity
     */
    setNormalVelocity: function() {

        this.velocity = this.normalVelocity;

    },

    /**
     * Enemies goes faster
     * Launch by catching an extra
     */
    startGoFaster: function() {

        this.velocity = this.fastVelocity;

    },

    /**
     * Enemies stop going faster
     */
    stopGoFaster: function() {

        this.setNormalVelocity();

    },

    /**
     * Enemies goes faster
     * Launch by catching an extra
     */
    startGoSlowly: function() {

        this.velocity = this.slowVelocity;

    },

    /**
     * Enemies stop going faster
     */
    stopGoSlowly: function() {

        this.setNormalVelocity();

    }

}
