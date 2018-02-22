/* globals __DEV__ */
import Phaser from 'phaser'
// import Mushroom from '../sprites/Mushroom'
let game = Phaser.Game
let player
let cursors
export default class extends Phaser.State {
  init () { }
  preload () {
    // this.load.baseURL = 'http://examples.phaser.io/assets/';
    // this.load.crossOrigin = 'anonymous';

    this.load.spritesheet('phaser', '../../assets/images/pacman.png', 16, 16)
  }

  create () {
    console.log(this)
    this.physics.startSystem(Phaser.Physics.ARCADE);  
    player = this.add.sprite(0, 0, 'phaser');
    this.physics.arcade.enable(player);
    player.animations.add('right', [0, 1, 2], 10, true)
    player.animations.add('left', [3, 4, 5], 10, true)
    player.animations.add('up', [6, 7, 8], 10, true)
    player.animations.add('down', [9, 10, 11], 10, true)

    cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    if (cursors.left.isDown) {
      player.body.velocity.x = -100
      player.body.velocity.y = 0      
      player.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 100
      player.body.velocity.y = 0
      player.animations.play('right')
    } else if (cursors.up.isDown) {
      player.body.velocity.y = -100
      player.body.velocity.x = 0
      player.animations.play('up')
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 100
      player.body.velocity.x = 0
      player.animations.play('down')
    }   
  }

  render () {

  }
}
