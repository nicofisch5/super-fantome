# super-fantome
Super fantôme  
HTML5 game based on JS phaser library (v2.4.6)

## Project architecture
js/vendors/phaser : phaser library  
js/component : main classes  
js/state : state (phaser game step)  
assets : images and tiles

## Game object
You control a ghost, the goal is to find the lock that opens the end of the level. You have to find keys to open locks.
The potatoes are your enemies.

For desktop :
- 4 arrows keys to move
- space bar to release a key

For smartphone / pad :
- touch the screen in the direction you want the ghost move

The gift visible on each level is an extra which gives you bonus or malus.  
You can only hold one key at a time.

## Futures features
### v1.1
Refactoring of Enemy class  
Gap between player and enemies at the beginning of the level  
Spooky music  

### v1.X
Refactoring HUD  
Add sounds when:
- player dies
- player catchs a key
- player opens a lock
- game over

Increase display time/score  
Possibility to release key on smartphone/pad

### v2.X
"World" entity above "levels"  
Boss at the end of each world  
Map areas where enemies can't appear  
Intelligence of enemies motion

### vX.X
Way from one side to another site of the map
