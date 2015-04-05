Level = function(game, id) {

    this.game = game;
    this.id = id ? id : 1;

    console.log(this.id);

    this.currentTilemapLevel;
    this.currentTilemapLevelParam;
    this.layer;

    this.tilemapFilename = 'assets/tilemaps/tiles/tiles_spritesheet_small.png';

    this.params = [
        {
            "id": 1,
            "index": 'tilemap-level-1',
            "dataFile": "assets/tilemaps/maps/sf-level-1.json",
            "tilesetName": "sprite-level-1"
        },
        {
            "id": 2,
            "index": 'tilemap-level-2',
            "dataFile": "assets/tilemaps/maps/sf-level-2.json",
            "tilesetName": "sprite-level-2"
        },
        {
            "id": 3,
            "index": 'tilemap-level-3',
            "dataFile": "assets/tilemaps/maps/sf-level-3.json",
            "tilesetName": "sprite-level-3"
        },
        {
            "id": 4,
            "index": 'tilemap-level-4',
            "dataFile": "assets/tilemaps/maps/sf-level-4.json",
            "tilesetName": "sprite-level-4",
            "keyFile": "assets/key_yellow.png"
        }
    ];

};

Level.prototype = {

    preload: function () {

        this.getCurrentLevel();
        console.log(this.currentTilemapLevelParam);

        // Tilemap for Level1
        this.game.load.tilemap(
            this.currentTilemapLevelParam.index, // Unique asset index of the tilemap data
            this.currentTilemapLevelParam.dataFile, // The url of the map data file (csv/json)
            null, // Optional JSON data object, used for map data instead
            Phaser.Tilemap.TILED_JSON // The format of the map data. CSV or TILED_JSON
        );

        // Image used by tilemap
        this.game.load.image('tiles', this.tilemapFilename);

        // Key image
        this.game.load.image('key', this.currentTilemapLevelParam.keyFile);

    },

    getCurrentLevel: function () {

        console.log(this.params);
        for (var prop in this.params) {
            if (this.params[prop].id == this.id) {
                this.currentTilemapLevelParam = this.params[prop];
            }
        }

    },

    create: function () {

        this.getCurrentLevel();

        // New Phaser.Tilemap. Map populated with data from a Tiled JSON file
        this.tilemapLevel1 = this.game.add.tilemap(this.currentTilemapLevelParam.index);

        // Tileset image
        this.tilemapLevel1.addTilesetImage(
            this.currentTilemapLevelParam.tilesetName, // The name of the tileset as specified in the map data
            'tiles' // The index of the Phaser.Cache image used for this tileset
        );

        // Sets collision the given tile
        this.tilemapLevel1.setCollisionByExclusion([0]);
        /*this.tilemapLevel1.setTileIndexCallback(
            3,// indexes
            this.collideTest,// callback
            this // callbackContext
        );*/
        //var tile = this.tilemapLevel1.getTile(1, 1);
        //tile.collideDown = false;

        // New TilemapLayer. It is a set of map data combined with a Tileset in order to render that data to the game.
        // A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.layer = this.tilemapLevel1.createLayer('level-' + this.currentTilemapLevelParam.id);

        // Scale x 2
        //this.layer.scale.setTo(0.5, 0.5);

        // This resizes the game world to match the layer dimensions
        this.layer.resizeWorld();

        //
        this.keySprite = this.game.add.sprite(680, 180, 'key');
        game.physics.arcade.enable(this.keySprite);

        // Lock
        // this.tilemapLevel1.setTileIndexCallback

        // Add debug information
        //this.layer.debug = true;

    },

    update: function () {

    }

}