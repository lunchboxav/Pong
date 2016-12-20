var playState = {
    create: function() {
        game.physics.arcade.checkCollision.right = false
        game.physics.arcade.checkCollision.left = false


        this.keyboard = game.input.keyboard;

        var player1Graph = game.add.bitmapData(16, 16);
        player1Graph.ctx.rect(0, 0, 16, 16);
        player1Graph.ctx.fillStyle = "#FF0000";
        player1Graph.ctx.fill();

        var ballGraph = game.add.bitmapData(16, 16);
        ballGraph.ctx.rect(0, 0, 16, 16);
        ballGraph.ctx.fillStyle = "#FFAE00";
        ballGraph.ctx.fill();

        var player2Graph = game.add.bitmapData(16, 16);
        player2Graph.ctx.rect(0, 0, 16, 16);
        player2Graph.ctx.fillStyle = "#FFD000";
        player2Graph.ctx.fill();

        this.p1Score = 0
        this.p2Score = 0

        this.background = game.add.sprite(0, 0, 'Background')
        this.background.scale.setTo(1.65, 1.5)

        this.player1 = game.add.sprite(60, 60, player1Graph);
        game.physics.enable(this.player1, Phaser.Physics.ARCADE);
        this.player1.scale.setTo(1, 7)
        this.player1.body.immovable = true
        this.player1.body.collideWorldBounds = true

        this.player2 = game.add.sprite(560, 60, player2Graph);
        game.physics.enable(this.player2, Phaser.Physics.ARCADE);
        this.player2.scale.setTo(1, 7)
        this.player2.body.immovable = true
        this.player2.body.collideWorldBounds = true

        this.ball = game.add.sprite(310, 200, 'Ball');
        game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.scale.setTo(0.2, 0.2)

        this.BounceSound = game.add.audio('Bounce')

        this.scoreText = game.add.text(16, 16, 'p1Score: 0 | p2Score: 0', { fontSize: '20px', fill: '#000' })

        this.moveBall(200, 0)

        this.resetBall = false
        this.p1Win = false
        this.p2Win = false



    },

    update: function() {

        game.physics.arcade.collide(this.player1, this.ball, this.playAudio, null, this)
        game.physics.arcade.collide(this.player2, this.ball, this.playAudio, null, this)


        if (this.keyboard.isDown(Phaser.Keyboard.W)) {
            this.player1.body.velocity.y = -500;
        } else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
            this.player1.body.velocity.y = 500;
        } else {
            this.player1.body.velocity.y = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player2.body.velocity.y = -500;
        } else if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.player2.body.velocity.y = 500;
        } else {
            this.player2.body.velocity.y = 0;
        }

        if (this.ball.body.x > game.world.width) {
            this.resetBall = true;
            this.p1Win = true
            this.p2Win = false
            this.p1Score++
                console.log("p1: " + this.p1Score + " p2: " + this.p2Score)
            this.scoreText.text = 'p1Score: ' + this.p1Score + '|' + ' p2Score: ' + this.p2Score
        }

        if (this.ball.body.x < 0) {
            this.resetBall = true;
            this.p2Win = true
            this.p1Win = false
            this.p2Score++
                console.log("p1: " + this.p1Score + " p2: " + this.p2Score)
            this.scoreText.text = 'p1Score: ' + this.p1Score + '|' + ' p2Score: ' + this.p2Score
        }

        if (this.resetBall === true) {
            if (this.p1Score === 6 || this.p2Score === 6) {
                this.Win()
            } else {
                this.restartBall()

                if (this.keyboard.isDown(Phaser.Keyboard.E)) {
                    if (this.p1Win) {
                        this.moveBall(200, 100)
                    } else if (this.p2Win) {
                        this.moveBall(-200, 100)
                    }

                    this.resetBall = false;

                }
            }


        }
    },

    moveBall: function(x, y) {

        this.ball.body.velocity.setTo(x, y)
        this.ball.body.collideWorldBounds = true
        this.ball.body.bounce.setTo(1, 1)
    },

    restartBall: function() {
        this.ball.body.x = 310
        this.ball.body.y = 200
        this.ball.body.velocity.setTo(0, 0)

    },

    playAudio: function() {
        this.BounceSound.play()
    },

    Win: function() {
        game.state.start('winp1');
    }

}