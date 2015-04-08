Level = function(game, params) {

    this.game = game;
    this.params = params;

    this.layer;
    this.key;

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

        // Key
        this.key = new Key(this.game, this.params.keyParams);
        this.key.preload();

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
        this.key.create();
        console.log('Level - END create');
        // Lock
        // this.tilemap.setTileIndexCallback

        // Add debug information
        //this.layer.debug = true;

    }

}