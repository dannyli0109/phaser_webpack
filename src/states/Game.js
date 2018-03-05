/* globals __DEV__ */
import 'pixi'
import 'p2'
import Phaser from 'phaser'
// import Mushroom from '../sprites/Mushroom'
let game = Phaser.Game
let player
let cursors
let group
let graphics
export default class extends Phaser.State {
  init () { }
  preload () {
    // this.load.baseURL = 'http://examples.phaser.io/assets/';
    // this.load.crossOrigin = 'anonymous';

    this.load.spritesheet('phaser', '../../assets/images/pacman.png', 16, 16)

    this.load.tilemap('maze', '../../assets/images/maze_wall.csv');
    
    this.load.image('maze-img', '../../assets/images/maze.png')
  }

  create () {
    console.log(this)

    this.physics.startSystem(Phaser.Physics.ARCADE);  
    player = this.add.sprite(8, 40, 'phaser');
    this.physics.arcade.enable(player);
    // player.anchor.set(0.5);
    player.body.setSize(16,16,0,0)
    
    // player.scale(0.2)
    player.animations.add('right', [0, 1, 2], 10, true)
    player.animations.add('left', [3, 4, 5], 10, true)
    player.animations.add('up', [6, 7, 8], 10, true)
    player.animations.add('down', [9, 10, 11], 10, true)
    player.animations.add('idel', [2], 10, true)
    player.body.collideWorldBounds = true

    // this.physics.arcade.gravity.y = 20;

    this.map = this.add.tilemap('maze', 8, 8)
    this.map.addTilesetImage('maze-img')
    this.map.setCollisionByExclusion([-1])    
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld()
    // this.layer.body.immovable = true;
    this.physics.arcade.enable(this.layer);
    this.layer.body.immovable = true;

    

    cursors = this.input.keyboard.createCursorKeys();
    console.log(player.body)
    
  }

  update () {
    this.physics.arcade.collide(player, this.layer, this.collisionHandler)
      // console.log(this.lastPressed)
      if (this.lastPressed) {
        if (this.lastPressed == 0) {
          player.body.velocity.x = -50                  
        } else if (this.lastPressed == 1) {
          player.body.velocity.x = 50          
        } else if (this.lastPressed == 2) {
          player.body.velocity.y = -50      
        } else {
          player.body.velocity.y = 50
        }
      }

      // console.log(this.lastPressed, player.body.velocity.x)

    
      if (cursors.left.isDown) {
        player.body.velocity.x = -50
        this.lastPressed = 0
      } else if (cursors.right.isDown) {
        player.body.velocity.x = 50
        this.lastPressed = 1        
      } else if (cursors.up.isDown) {
        player.body.velocity.y = -50
        this.lastPressed = 2        
      } else if (cursors.down.isDown) {
        player.body.velocity.y = 50
        this.lastPressed = 3        
      }

      
    if (player.body.blocked.up || player.body.blocked.right || player.body.blocked.down || player.body.blocked.left) {
      // player.animations.stop();
      return;      
    }
    
    if (player.body.position.x > player.body.prev.x) {
      player.animations.play('right')
    } else if (player.body.position.x < player.body.prev.x) {
      player.animations.play('left')      
    } else if (player.body.position.y > player.body.prev.y) {
      player.animations.play('down')      
    } else if (player.body.position.y < player.body.prev.y) {
      player.animations.play('up')            
    }  else {
      player.animations.stop();
    }

    // console.log(Phaser.Rectangle.intersects(player, this.layer))

    

 

    // console.log(player.body.position.x, player.body.position.y)
    // console.log(player.body.prev.x, player.body.prev.y)
    // console.log(player.body.blocked)




    
  }

  collisionHandler(obj1, obj2) {

    if (this.lastPressed) {
      if (this.lastPressed == 0) {
        // player.body.velocity.x = -50 
        player.body.velocity.x = -50                  
      } else if (this.lastPressed == 1) {
        player.body.velocity.x = 50          
      } else if (this.lastPressed == 2) {
        player.body.velocity.y = -50      
      } else {
        player.body.velocity.y = 50
      }
    }
  }

  // processCallback(obj1, obj2) {
  //   console.log(obj1, obj2,2)
  // }

  render () {
    // this.game.debug.body(player)
    // this.game.debug.body(this.layer)
    this.game.debug.bodyInfo(player, 32, 300)
    
  }
}
