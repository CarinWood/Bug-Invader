class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'StartScene'})
    }

    create() {
        this.add.text(250, 120, ' Bug Dodger\nby Carin Wood', {fill: '#000'})
        this.add.text(250, 220, 'Click to start', {fill: '#000'} )

        this.input.on('pointerup', () => {
            this.scene.stop('StartScene')
            this.scene.start('GameScene')
        })
     
    }
}