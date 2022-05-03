import { Collider, System } from 'detect-collisions'
import { Circle } from 'detect-collisions'
import 'phaser'
import tile from './assets/tile.png'
import rect from './assets/rect.png'
import circ from './assets/circ.png'
import character from './assets/character.png'

export default class Demo extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap
  tiles!: Phaser.Tilemaps.Tileset
  layer!: Phaser.Tilemaps.TilemapLayer

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  character!: Phaser.GameObjects.Sprite
  characterBody!: Circle

  system!: System

  constructor() {
    super('demo')
  }

  preload() {
    this.load.image('tile', tile)
    this.load.image('rect', rect)
    this.load.image('circ', circ)
    this.load.image('character', character)
  }

  create() {
    this.system = new System()

    this.map = this.add.tilemap(undefined, 50, 50, 1600, 1200)
    this.tiles = this.map.addTilesetImage('tile')
    this.layer = this.map.createBlankLayer('layer', this.tiles)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.addCharacter()

    for (let col = 0; col < 50; col++) {
      for (let row = 0; row < 50; row++) {
        this.addWorldPart(col, row)
      }
    }
  }

  update(time: number, delta: number): void {
    const SPEED = 400

    let speedX = 0
    let speedY = 0

    if (this.cursors.down.isDown) {
      speedY = 1
    } else if (this.cursors.up.isDown) {
      speedY = -1
    }

    if (this.cursors.right.isDown) {
      speedX = 1
    } else if (this.cursors.left.isDown) {
      speedX = -1
    }

    if (speedX !== 0 || speedY !== 0) {
      const lenght = Math.sqrt(speedX * speedX + speedY * speedY)

      speedX = speedX / lenght
      speedY = speedY / lenght
    }

    const moveX = (speedX * SPEED * delta) / 1000
    const moveY = (speedY * SPEED * delta) / 1000

    this.moveCharacter(moveX, moveY)

    let counter = 0

    while (counter < 10 && this.checkIfCollidesWithAnything()) {
      this.resolveCollision()
      counter += 1
    }

    this.character.x = this.characterBody.x
    this.character.y = this.characterBody.y
  }

  addWorldPart(x: number, y: number) {
    this.addTile(3 + x * 16, 7 + y * 12)
    this.addTile(3 + x * 16, 8 + y * 12)
    this.addTile(2 + x * 16, 9 + y * 12)
    this.addTile(2 + x * 16, 10 + y * 12)

    this.addTile(5 + x * 16, 7 + y * 12)
    this.addTile(5 + x * 16, 8 + y * 12)
    this.addTile(5 + x * 16, 9 + y * 12)
    this.addTile(5 + x * 16, 10 + y * 12)
    this.addTile(6 + x * 16, 10 + y * 12)
    this.addTile(7 + x * 16, 10 + y * 12)
    this.addTile(8 + x * 16, 10 + y * 12)
    this.addTile(9 + x * 16, 10 + y * 12)
    this.addTile(10 + x * 16, 10 + y * 12)
    this.addTile(11 + x * 16, 10 + y * 12)
    this.addTile(12 + x * 16, 10 + y * 12)

    this.addRect(200 + x * 800, 150 + y * 600)
    this.addRect(350 + x * 800, 150 + y * 600)
    this.addRect(430 + x * 800, 300 + y * 600)

    this.addCircle(600 + x * 800, 300 + y * 600)
    this.addCircle(675 + x * 800, 250 + y * 600)

    this.addCircle(10 + x * 800, 350 + y * 600)
  }

  addTile(x: number, y: number) {
    this.layer.putTileAt(0, x, y)
    this.system.createBox({ x: x * 50, y: y * 50 }, 50, 50)
  }

  addCharacter() {
    this.character = this.add.sprite(100, 100, 'character')
    this.characterBody = this.system.createCircle({ x: 100, y: 100 }, 50)

    this.cameras.main.startFollow(this.character)
  }

  addCircle(x: number, y: number) {
    this.add.sprite(x, y, 'circ')
    this.system.createCircle({ x: x, y: y }, 50)
  }

  addRect(x: number, y: number) {
    this.add.sprite(x, y, 'rect')
    this.system.createBox({ x: x - 50, y: y - 50 }, 100, 100)
  }

  moveCharacter(moveX: number, moveY: number) {
    this.characterBody.x += moveX
    this.characterBody.y += moveY

    this.system.updateBody(this.characterBody)
  }

  resolveCollision() {
    const overlap = { x: 0, y: 0 }
    const currentOverlap = 0

    this.system.getPotentials(this.characterBody).forEach(collider => {
      if (this.system.checkCollision(this.characterBody, collider)) {
        const res = this.system.response

        if (res.overlap > currentOverlap) {
          overlap.x = res.overlapV.x
          overlap.y = res.overlapV.y
        }
      }
    })

    this.characterBody.setPosition(
      this.characterBody.x - overlap.x * 1.05,
      this.characterBody.y - overlap.y * 1.05
    )

    this.system.updateBody(this.characterBody)
  }

  checkIfCollidesWithAnything() {
    let collides = false
    this.system.getPotentials(this.characterBody).forEach(collider => {
      if (collides) {
        return
      }
      if (this.system.checkCollision(this.characterBody, collider)) {
        collides = true
      }
    })

    return collides
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 600,
  scene: Demo
}

const game = new Phaser.Game(config)
