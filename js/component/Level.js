Level = function(game, id) {

    this.game = game;
    this.id = id ? id : 1;

    this.currentTilemapLevel;
    this.currentTilemapLevelParam;
    this.layer;

    this.tilemapFilename = 'assets/tilemaps/tiles/tiles_spritesheet.png';

    this.params = [
        {
            "id": 1,
            "key": 'tilemap-level-1',
            "dataFile": "assets/tilemaps/maps/sf-level1.json",
            "tilesetName": "sprite-level-1"
        },
        {
            "id": 2,
            "key": 'tilemap-level-2',
            "dataFile": "assets/tilemaps/maps/sf-level2.json",
            "tilesetName": "sprite-level-2"
        }
    ];

};

Level.prototype = {

    preload: function () {

        this.getCurrentLevel();
        console.log(this.currentTilemapLevelParam);

        // Tilemap for Level1
        this.game.load.tilemap(
            this.currentTilemapLevelParam.key, // Unique asset key of the tilemap data
            this.currentTilemapLevelParam.dataFile, // The url of the map data file (csv/json)
            null, // Optional JSON data object, used for map data instead
            Phaser.Tilemap.TILED_JSON // The format of the map data. CSV or TILED_JSON
        );

        // Image used by tilemap
        this.game.load.image('tiles', this.tilemapFilename);
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
        this.tilemapLevel1 = this.game.add.tilemap(this.currentTilemapLevelParam.key);

        // Tileset image
        this.tilemapLevel1.addTilesetImage(
            this.currentTilemapLevelParam.tilesetName, // The name of the tileset as specified in the map data
            'tiles' // The key of the Phaser.Cache image used for this tileset
        );

        // Sets collision the given tile
        this.tilemapLevel1.setCollision([10]);
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

        // Add debug information
        //this.layer.debug = true;

    },

    update: function () {

    }

}