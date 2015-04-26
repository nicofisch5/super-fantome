/**
 * State 3 - Level manager
 *
 * @type {{preload: preload, create: create}}
 */

var levelManagerState = {

    preload: function() {

        this.params = [
            {
                "id": 1,
                "index": 'tilemap-level-1',
                "dataFile": "assets/tilemaps/maps/sf-level-1.json",
                "tilesetName": "sprite-level-1",
                "timer": 60,
                "keyParams":
                {
                    "color": "yellow",
                    positionX: 500,
                    positionY: 100
                },
                "lockParams":
                {
                    "color": "yellow",
                    "action": "goToNextLevel"
                }
            },
            {
                "id": 2,
                "index": 'tilemap-level-2',
                "dataFile": "assets/tilemaps/maps/sf-level-2.json",
                "tilesetName": "sprite-level-2",
                "keyParams":
                [
                    {
                        "color": "blue",
                        positionX: 125,
                        positionY: 110
                    },
                    {
                        "color": "green",
                        positionX: 100,
                        positionY: 500
                    }
                ],
                "lockParams":
                [
                    {
                        "color": "blue",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "green",
                        "action": "goToNextLevel"
                    }
                ]
            },
            {
                "id": 3,
                "index": 'tilemap-level-3',
                "dataFile": "assets/tilemaps/maps/sf-level-3.json",
                "tilesetName": "sprite-level-3",
                "keyParams":
                    [
                        {
                            "color": "green",
                            positionX: 500,
                            positionY: 125
                        },
                        {
                            "color": "orange",
                            positionX: 500,
                            positionY: 405
                        },
                        {
                            "color": "yellow",
                            positionX: 550,
                            positionY: 445
                        },
                        {
                            "color": "blue",
                            positionX: 135,
                            positionY: 460
                        }
                    ],
                "lockParams":
                    [
                        {
                            "color": "green",
                            "action": "tileDisappear"
                        },
                        {
                            "color": "orange",
                            "action": "tileDisappear"
                        },
                        {
                            "color": "yellow",
                            "action": "tileDisappear"
                        },
                        {
                            "color": "blue",
                            "action": "goToNextLevel"
                        }
                    ]

            },
            {
                "id": 4,
                "index": 'tilemap-level-4',
                "dataFile": "assets/tilemaps/maps/sf-level-4.json",
                "tilesetName": "sprite-level-4",
                "keyParams":
                    [
                        {
                            "color": "orange",
                            positionX: 110,
                            positionY: 500
                        },
                        {
                            "color": "green",
                            positionX: 455,
                            positionY: 30
                        }
                    ],
                "lockParams":
                    [
                        {
                            "color": "orange",
                            "action": "tileDisappear"
                        },
                        {
                            "color": "green",
                            "action": "goToNextLevel"
                        }
                    ]
            },
            {
                "id": 5,
                "index": 'tilemap-level-5',
                "dataFile": "assets/tilemaps/maps/sf-level-5.json",
                "tilesetName": "sprite-level-5",
                "keyParams":
                    [
                        {
                            "color": "orange",
                            positionX: 100,
                            positionY: 500
                        },
                        {
                            "color": "green",
                            positionX: 455,
                            positionY: 30
                        }
                    ],
                "lockParams":
                    [
                        {
                            "color": "orange",
                            "action": "tileDisappear"
                        },
                        {
                            "color": "green",
                            "action": "goToNextLevel"
                        }
                    ]
            },
        ];

        this._getCurrentLevelParam();
        this.currentLevel = new Level(this.game, this.currentLevelParam);
        this.currentLevel.preload();

    },

    _getCurrentLevelParam: function () {

        for (var prop in this.params) {
            if (this.params[prop].id == this.game.levelNumber) {
                this.currentLevelParam = this.params[prop];
                break;
            }
        }

    },

    create: function() {

        var startText = '>>> Espace pour démarrer <<<';
        var levelText = 'Niveau ' + game.levelNumber;
        var livesText = 'Vies : ' + game.lives;
        var x = game.world.width/2;
        var y = game.world.height/4;

        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        game.input.onDown.add(this.start, this);

        levelText = this.game.add.text(x, y, levelText, { font: "48px Sawasdee", fill: "#55ffff" });
        levelText.align = 'center';
        levelText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 130;
        startText = this.game.add.text(x, y, startText, { font: "30px Sawasdee", fill: "#55ffff" });
        startText.align = 'center';
        startText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 130;
        livesText = this.game.add.text(x, y, livesText, { font: "24px Sawasdee", fill: "#55ffff" });
        livesText.align = 'center';
        livesText.anchor.setTo(0.5, 0.5);

    },

    start: function() {

        this.game.state.start('play', true, false, this.currentLevel);

    }

};