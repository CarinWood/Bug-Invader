const gameState = {
    score: 0
}

let score = 0

  const config = {
    type: Phaser.AUTO,
    width: 640,
      height: 360,
      backgroundColor: "b9eaff",
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 100},
              enableBody: true,
              debug: false,
          }
      },
    scene: [StartScene, GameScene]
  }

  const game = new Phaser.Game(config)
