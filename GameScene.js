class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

     preload() {
      this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_1.png');
      this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_2.png');
      this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_3.png');
      this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
      //this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/codey.png');
      this.load.image('bugPellet', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugPellet.png');
      this.load.image('bugRepellent', 'https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugRepellent.png');
      this.load.spritesheet('codey', 'https://content.codecademy.com/courses/learn-phaser/Cave%20Crisis/codey_sprite.png', { frameWidth: 72, frameHeight: 90 })	
      }
      
       create() {
          gameState.codey = this.physics.add.sprite(320, 300, 'codey').setScale(0.5)
          this.anims.create(
            {
                key: 'run',
                frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
              }
          )
          gameState.codey.setCollideWorldBounds(true)
      
          const platforms = this.physics.add.staticGroup()
          platforms.create(320, 350, 'platform').setScale(2, 0.5).refreshBody()
      
          gameState.scoreText = this.add.text(250, 340, 'Score: 0')
      
          this.physics.add.collider(gameState.codey, platforms)
      
          const bugs = this.physics.add.group()
          const bugList = ['bug1', 'bug2', 'bug3']
      
          function bugGen() {
              const xCoord = Math.random() * 640
              let randomBug = bugList[Math.floor(Math.random() * 3)]
              bugs.create(xCoord, 10, randomBug).setScale(0.5)
          }
      
          const bugGenLoop = this.time.addEvent({
              delay: 100,
              callback: bugGen,
              loop: true
          }) 
          
          this.physics.add.collider(bugs, platforms, function(bug){
              bug.destroy()
              gameState.score += 10
              gameState.scoreText.setText(`Score: ${gameState.score}`)
          })
      
          
        
      
          this.physics.add.collider(gameState.codey, bugs, () => {
              bugGenLoop.destroy();
              this.physics.pause();
              this.anims.pauseAll()
      
              this.add.text(280, 150, 'Game Over \n Click to Restart', { fontSize: '15px', fill: '#000' })
              gameState.score = 0
      
              this.input.on('pointerdown', () => {
                  this.scene.restart();
              })
      })
      
         
      }
      
       update() {
          let cursors = this.input.keyboard.createCursorKeys()
      
          if (cursors.right.isDown) {
            gameState.codey.setVelocityX(350);
            gameState.codey.anims.play('run', true);
        
            gameState.codey.flipX = false
            
          } else if (cursors.left.isDown) {
            gameState.codey.setVelocityX(-350);
            gameState.codey.anims.play('run', true);
        
            gameState.codey.flipX = true
            
          } else {
            gameState.codey.setVelocityX(0);
                       
          }
        }
}
