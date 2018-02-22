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
    // player.scale(0.2)
    player.animations.add('right', [0, 1, 2], 10, true)
    player.animations.add('left', [3, 4, 5], 10, true)
    player.animations.add('up', [6, 7, 8], 10, true)
    player.animations.add('down', [9, 10, 11], 10, true)
    player.body.collideWorldBounds = true

    // this.physics.arcade.gravity.y = 20;

    this.map = this.add.tilemap('maze', 8, 8)
    this.map.addTilesetImage('maze-img')
    this.map.setCollisionByExclusion([-1, 0])    
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld()

    // this.layer.resizeWorld()

    // this.map = this.add.tilemap('maze')

    // this.map.addTilesetImage('mmm', 'maze-img')

    // this.layer = this.map.createLayer("layer01");
    


    // this.add.image(0, 0, 'maze')
    // let map = this.add.tilemap()
    // map.addTilesetImage('maze')

    // let layer = map.create("Level1", 40, 30, 32, 32)
    // layer.resizeWorld();
    

    // graphics = this.make.graphics()
    // graphics.lineStyle(2, 0xFFFFFF, 1);
    // graphics.drawRect(200, 200, 250, 250);

    // group = this.add.group()
    // this.physics.arcade.enable(group)
    // this.physics.add.collider(player, group)

    // group.add(graphics)

    console.log()


    cursors = this.input.keyboard.createCursorKeys();
  }

  update () {

    this.physics.arcade.collide(player, this.layer)
    if (cursors.left.isDown) {
      player.body.velocity.x = -50
      player.body.velocity.y = 0      
      player.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 50
      player.body.velocity.y = 0
      player.animations.play('right')
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -50
      player.body.velocity.x = 0
      player.animations.play('up')
    } else if (cursors.down.isDown) {
        if (!player.body.blocked.down) {
            player.body.velocity.y = 50
            player.body.velocity.x = 0
            player.animations.play('down')            
        }

    }   

    // console.log(player.body.touching)
    // player.x = Math.round(player.x)
    // player.x = Math.round(player.y)
    
    // this.physics.arcade.collide(player, graphics, this.collisionHandler, null, this)
    console.log(player.body)
  }

  collisionHandler() {
      console.log('hi')
  }

  render () {
    
    
  }
}
