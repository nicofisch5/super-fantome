# super-fantome
Super fantôme  
Jeu basé sur la librairie JS phaser (v2.4.6)

## Architecture du projet
Répertoire js/vendors/phaser : librairie phaser  
Répertoire js/component : classes principales  
Répertoire js/state : state (phase de jeu phaser)  
Répertoire assets : images et tiles

## Principe du jeu
Vous dirigez un fantôme du nom de super-fantôme.  
Vous devez récupérer une clé de couleur puis l'insérer dans une serrure, sans vous faire attraper par les patates.  
Super fantôme ne peut prendre qu'une clé à la fois.  
Simple ? A vous de voir ...

## Fonctionnalités à venir
### v1.X
Redéfinition de la classe Enemy
Amélioration menu
Amélioration display temps/score

### v2.X
Passage d'un coté à l'autre de l'espace
Identifier les zones des cartes où les ennemies ne peuvent pas apparaître
Intelligence déplacement patates
Notion de "world" au dessus des "levels"
Finir les worlds avec un Boss
