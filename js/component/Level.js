Level = function(game, params) {

    this.game = game;
    this.params = params;

    this.layer;
    this.keys = new Array();
    this.keysSprite;
    this.extras = new Array();
    this.extrasSprite;
    this.locks = new Array();
    this.timer = 90;
    this.nbEnemies = 4;

};

Level.prototype = {

    preload: function () {

        // Tilemap for level
        this.game.load.tilemap(
            this.params.index, // Unique asset index of the tilemap data
            this.params.dataFile, // The url of the map data file (csv/json)
            null, // Optional JSON data object, used for map data instead
            Phaser.Tilemap.TILED_JSON // The format of the map data. CSV or TILED_JSON
        );

        // Keys
        if (isNaN(this.params.keyParams.length)) {
            this.params.keyParams = [this.params.keyParams];
        }
        this.params.keyParams.forEach(function (keyParam) {
            var key = new Key(this.game, keyParam);
            key.preload();
            this.keys.push(key);
        }, this);

        // Extra
        if (this.params.extraParams) {
            this.params.extraParams = [this.params.extraParams];

            this.params.extraParams.forEach(function (extraParam) {
                var extra = new Extra(this.game, extraParam);
                extra.preload();
                this.extras.push(extra);
            }, this);
        }

        // Locks
        if (isNaN(this.params.lockParams.length)) {
            this.params.lockParams = [this.params.lockParams];
        }

        this.params.lockParams.forEach(function (lockParam) {
            var lock = new Lock(this.game, lockParam);
            lock.preload();
            this.locks.push(lock);
        }, this);

        // Timer
        if (typeof this.params.timer != 'undefined') {
            this.timer = this.params.timer;
        }

        // Number of enemies
        if (typeof this.params.nbEnemies != 'undefined') {
            this.nbEnemies = this.params.nbEnemies;
        }
        if (! this.game.device.desktop) {
            this.nbEnemies--;
        }

    },

    create: function () {

        // New Phaser.Tilemap. Map populated with data from a Tiled JSON file
        this.tilemap = this.game.add.tilemap(this.params.index);

        // Tileset image
        this.tilemap.addTilesetImage(
            this.params.tilesetName, // The name of the tileset as specified in the map data
            'tiles' // The index of the Phaser.Cache image used for this tileset
        );

        // Sets collision the given tile
        this.tilemap.setCollisionByExclusion([0]);

        // New TilemapLayer. It is a set of map data combined with a Tileset in order to render that data to the game.
        // A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.layer = this.tilemap.createLayer('level-' + this.params.id);

        // Scale x 2
        //this.layer.scale.setTo(0.5, 0.5);

        // This resizes the game world to match the layer dimensions
        this.layer.resizeWorld();

        // Key
        this.keysSprite = game.add.group();
        //this.keysSprite.enableBody = true;
        this.keys.forEach(function (key) {
            key.create();
            key.sprite.creator = key;
            this.keysSprite.add(key.sprite);
        }, this);

        // Extra
        this.extrasSprite = game.add.group();
        this.extras.forEach(function (extra) {
            extra.create();
            extra.sprite.creator = extra;
            this.extrasSprite.add(extra.sprite);
        }, this);

        // Lock
        this.locks.forEach(function (lock) {
            lock.create();
        });

        // this.tilemap.setTileIndexCallback

        // Add debug information
        //this.layer.debug = true;

    }

}