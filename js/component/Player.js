Player = function(game) {

    this.sprite = null;
    this.cursors = null;
    this.lastYPosition;
    this.velocity = 150;
    this.pointerDelta = 10;

};

Player.prototype = {

    preload: function () {

        /**
         * 'player' is the name of the image
         * 'assets/ghost_sprite_final.png' is the folder location
         * 92 is width
         * 70 is height
         * the fifth element is how many frames
         */
        game.load.spritesheet('player', 'assets/ghost_sprite_final.png', 92, 70);

    },

    create: function () {

        /**
         * Create a new Sprite with specific position and sprite sheet key.
         * This one is player
         *
         * X position of the new sprite.
         * Y position of the new sprite.
         * key This is the image or texture used by the Sprite during rendering
         */
        //this.sprite = game.add.sprite(65, game.world.height - 180, 'player');
        this.sprite = game.add.sprite(game.world.width - 75, 180, 'player', 1);

        // this.player size
        this.sprite.scale.setTo(0.38, 0.38);

        // We need to enable physics
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Player physics properties. Give the little guy a slight bounce.
        //this.sprite.body.bounce.y = 0.2;
        // To fall down
        //this.sprite.body.gravity.y = 300;
        this.sprite.body.collideWorldBounds = false;

        // Camera
        game.camera.follow(this.sprite);

        // Our two animations, walking left and right.
        this.sprite.animations.add('left', [1], 1, true);
        this.sprite.animations.add('right', [0], 1, true);

        // Keyboard cursor + space bar
        this.cursor = game.input.keyboard.createCursorKeys();

        /**
         * Checks if sprite is still within the world each frame
         * when it leaves the world it dispatches Sprite.events.onOutOfBounds and optionally kills the sprite (if Sprite.outOfBoundsKill is true).
         */
        this.sprite.checkWorldBounds = true;;

        // Pass to the other side
        /*this.sprite.events.onOutOfBounds.add(
            function(sprite) {
                if (sprite.x < 0) {
                    sprite.x = 470;
                } else {
                    sprite.x = 0;
                }
            },
            this.sprite
        );*/

        // Player initial Y position, used for camera follow
        this.lastYPosition = game.world.height - (game.camera.height / 2);
    },

    update: function() {

        // If the input is pressed
        if (! game.device.desktop && game.input.activePointer.isDown) {
            // Return the x position of the pointer
            var pointerX = game.input.activePointer.x;
            // Return the y position of the pointer
            var pointerY = game.input.activePointer.y;

            if (pointerX < this.sprite.x - this.pointerDelta) {
                // Move the player to the left
                this.sprite.animations.play('left');
                this.sprite.body.velocity.x = this.velocity * -1;
            } else if (pointerX > this.sprite.x + this.pointerDelta) {
                // Move the player to the right
                this.sprite.animations.play('right');
                this.sprite.body.velocity.x = this.velocity;
            } else {
                this.sprite.body.velocity.x = 0;
                this.sprite.angle = 0;
            }

            if (pointerY < this.sprite.y - this.pointerDelta) {
                // Move the player up
                this.sprite.body.velocity.y = this.velocity * -1;
                this.sprite.angle = this.sprite.body.velocity.y / 10 * (this.sprite.animations.currentAnim.name  == 'right' ? 1 : -1);
            } else if (pointerY > this.sprite.y + this.pointerDelta) {
                // Move the player down
                this.sprite.body.velocity.y = this.velocity;
                this.sprite.angle = this.sprite.body.velocity.y / 10 * (this.sprite.animations.currentAnim.name == 'right' ? 1 : -1);
            } else {
                this.sprite.body.velocity.y = 0;
                this.sprite.angle = 0;
            }

        } else {
            if (this.cursor.left.isDown || this.cursor.right.isDown || this.cursor.up.isDown || this.cursor.down.isDown) {
                // If the left arrow key is pressed
                if (this.cursor.left.isDown) {
                    // Move the player to the left
                    this.sprite.animations.play('left');
                    this.sprite.body.velocity.x = this.velocity * -1;
                }
                // If the right arrow key is pressed
                else if (this.cursor.right.isDown) {
                    // Move the player to the right
                    this.sprite.animations.play('right');
                    this.sprite.body.velocity.x = this.velocity;
                    //this.sprite.angle = 0;
                }

                // If the top arrow key is pressed
                if (this.cursor.up.isDown) {
                    // Move the player up
                    this.sprite.body.velocity.y = this.velocity * -1;
                    this.sprite.angle = this.sprite.body.velocity.y / 10 * (this.sprite.animations.currentAnim.name  == 'right' ? 1 : -1);
                }
                // If the bottom arrow key is pressed
                else if (this.cursor.down.isDown) {
                    // Move the player down
                    this.sprite.body.velocity.y = this.velocity;
                    this.sprite.angle = this.sprite.body.velocity.y / 10 * (this.sprite.animations.currentAnim.name == 'right' ? 1 : -1);
                } else {
                    this.sprite.angle = 0;
                }
            }

            // If no one is pressed
            else {
                // Stop the player
                this.stop();
                this.sprite.angle = 0;
            }
        }

    },

    releaseKey: function() {

        this.key = false;

    },

    stop: function () {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

    },

    /**
     * Set key to player
     *
     * @param Key key
     * @returns {boolean}
     */
    setKey: function (key) {

        if (typeof this.getKey() == 'undefined' || this.getKey() == null || key == null) {
            this.key = key;
            return true;
        }

        return false;

    },

    getKey: function () {

        return this.key;

    },

    releaseKey: function() {

        this.key = null;

    },

    tweenPlayerKey: function() {

        game.add.tween(this.sprite.scale)
            .to({x: 0.6, y: 0.6}, 50)
            .to({x: 0.38, y: 0.38}, 150)
            .start();

    },

    render: function () {

        game.debug.spriteCoords(this.sprite, 32, 500);

    }

}