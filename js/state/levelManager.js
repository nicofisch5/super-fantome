/**
 * State 3 - Level manager
 *
 * @type {{preload: preload, create: create}}
 */


var levelManagerState = function(game) {

    this.params = [
        {
            "id": 1,
            "index": "tilemap-level-1",
            "dataFile": "assets/tilemaps/maps/sf-level-1.json",
            "tilesetName": "sprite-level-1",
            "timer": 45,
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
            "index": "tilemap-level-2",
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
            "index": "tilemap-level-3",
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
            "index": "tilemap-level-4",
            "dataFile": "assets/tilemaps/maps/sf-level-4.json",
            "tilesetName": "sprite-level-4",
            "timer": 100,
            "keyParams":
                [
                    {
                        "color": "green",
                        positionX: 715,
                        positionY: 462
                    },
                    {
                        "color": "blue",
                        positionX: 35,
                        positionY: 562
                    },
                    {
                        "color": "orange",
                        positionX: 500,
                        positionY: 550
                    }
                ],
            "lockParams":
                [
                    {
                        "color": "green",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "blue",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "orange",
                        "action": "goToNextLevel"
                    }
                ]
        },
        {
            "id": 5,
            "index": 'tilemap-level-5',
            "dataFile": "assets/tilemaps/maps/sf-level-5.json",
            "tilesetName": "sprite-level-5",
            "timer": 120,
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
            "id": 6,
            "index": "tilemap-level-6",
            "dataFile": "assets/tilemaps/maps/sf-level-6.json",
            "tilesetName": "sprite-level-6",
            "timer": 100,
            "nbEnemies": 3,
            "keyParams":
                [
                    {
                        "color": "orange",
                        positionX: 35,
                        positionY: 62
                    },
                    {
                        "color": "blue",
                        positionX: 350,
                        positionY: 300
                    },
                    {
                        "color": "green",
                        positionX: 735,
                        positionY: 362
                    },
                    {
                        "color": "yellow",
                        positionX: 560,
                        positionY: 362
                    }
                ],
            "lockParams":
                [
                    {
                        "color": "green",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "blue",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "orange",
                        "action": "tileDisappear"
                    },
                    {
                        "color": "yellow",
                        "action": "goToNextLevel"
                    }
                ]
        },
        {
            "id": 7,
            "index": "tilemap-level-7",
            "dataFile": "assets/tilemaps/maps/sf-level-7.json",
            "tilesetName": "sprite-level-7",
            "timer": 100,
            "keyParams":
                [
                    {
                        "color": "orange",
                        positionX: 560,
                        positionY: 600
                    },
                    {
                        "color": "yellow",
                        positionX: 610,
                        positionY: 605
                    },
                    {
                        "color": "blue",
                        positionX: 660,
                        positionY: 610
                    },
                    {
                        "color": "green",
                        positionX: 710,
                        positionY: 615
                    },

                ],
            "lockParams":
                [
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
                        "action": "tileDisappear"
                    },
                    {
                        "color": "green",
                        "action": "goToNextLevel"
                    }
                ]
        },
        {
            "id": 8,
            "index": "tilemap-level-8",
            "dataFile": "assets/tilemaps/maps/sf-level-8.json",
            "tilesetName": "sprite-level-8",
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
        }
    ];

};

levelManagerState.prototype = {

    preload: function() {

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

        // Store the relevant text based on the device used
        if (game.device.desktop) {
            var startText = '>>> Espace pour démarrer <<<';
        }
        else {
            var startText = '>>> Toucher l\'écran pour démarrer <<<';
        }

        var levelText = 'Niveau ' + game.levelNumber;
        var scoreText = 'Score : ' + game.score;
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

        y += 100;
        scoreText = this.game.add.text(x, y, scoreText, { font: "24px Sawasdee", fill: "#55ffff" });
        scoreText.align = 'center';
        scoreText.anchor.setTo(0.5, 0.5);

        // Adding a text centered on the screen
        y += 75;
        livesText = this.game.add.text(x, y, livesText, { font: "24px Sawasdee", fill: "#55ffff" });
        livesText.align = 'center';
        livesText.anchor.setTo(0.5, 0.5);

    },

    start: function() {

        this.game.state.start('play', true, false, this.currentLevel);

    }

};