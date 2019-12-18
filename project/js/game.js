class Game {
    constructor() {
        this.score = 0;
        this.backgroundImg = new Image();
        this.backgroundImg.src = "images/space5.jpg";
        this.x = 0;
        this.y = 0;
        this.canvas = undefined;
        this.ctx = undefined;
        this.lastFrameTime = 0;
        this.totalSeconds = 0;
        this.asteroids = [];
        this.asteroidsNumber = 3;
        this.lives = 3;
    }


    init() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        canvasWidth = this.canvas.width;
        canvasHeight = this.canvas.height;
        this.myShip = new Ship(this.canvas.width * 0.5, this.canvas.height * 0.5, 130, 130, this.ctx);

        //create asteroids
        for (let i = 0; i < this.asteroidsNumber; i++) {
            this.asteroids.push(new Asteroid());
        }
        this.lastFrameTime = Date.now();


        this.beging();

    }
    beging() {
        const interval = setInterval(() => {
            //background
            var now = Date.now();
            var deltaSeconds = (now - this.lastFrameTime) / 9000;
            this.lastFrameTime = now;
            this.clear();
            this.drawBackground(deltaSeconds);
            this.displayScore();
            //check game over
            if (this.lives <= 0)
                this.GameOver();
            this.drawLifeShips();

            // Check for collision of ship with asteroid
            if (this.asteroids.length !== 0) {
                for (let k = 0; k < this.asteroids.length; k++) {
                    if (this.myShip.didCollide(this.asteroids[k])) {
                        //show explosion

                        this.resetShip();
                        this.asteroids.splice(k, 1);
                        //console.log("************Collision ship with asteroid")
                    }
                }
            }
            //check for collision of bullets with asteroids
            if (this.asteroids.length !== 0 && this.myShip.bullets.length !== 0) {
                for (let l = 0; l < this.asteroids.length; l++) {
                    for (let m = 0; m < this.myShip.bullets.length; m++) {
                        if (this.asteroids[l].didCollide(this.myShip.bullets[m])) {
                            // Check if asteroid can be broken into smaller pieces
                            if (this.asteroids[l].level === 1) {
                                this.asteroids.push(new Asteroid(this.asteroids[l].x - 5, this.asteroids[l].y - 5, 50, 50, 2, this.ctx));
                                this.asteroids.push(new Asteroid(this.asteroids[l].x + 5, this.asteroids[l].y + 5, 50, 50, 2, this.ctx));
                            } else
                            if (this.asteroids[l].level === 2) this.asteroids.push(new Asteroid(this.asteroids[l].x - 5, this.asteroids[l].y - 5, 30, 30, 3, this.ctx));
                            this.asteroids.push(new Asteroid(this.asteroids[l].x + 5, this.asteroids[l].y + 5, 30, 30, 3, this.ctx));
                            console.log("colision bullet with asteroid");
                            this.asteroids.splice(l, 1);
                            this.myShip.bullets.splice(m, 1);
                            this.score += 20;
                            //console.log("score: " + this.score);
                            // Used to break out of loop                         
                            m = this.myShip.bullets.length;
                        }

                    }
                }
            }



            if (this.myShip.visible) {

                this.drawMainCharacters();
                this.myShip.move();
                this.myShip.update();

                //bullets
                if (this.myShip.bullets.length !== 0) {
                    for (let i = 0; i < this.myShip.bullets.length; i++) {
                        this.myShip.bullets[i].update();
                        this.myShip.bullets[i].draw();
                    }
                }
                //asteroids
                if (this.asteroids.length !== 0) {
                    for (let i = 0; i < this.asteroids.length; i++) {
                        this.asteroids[i].update();
                        this.asteroids[i].draw("images/asteroid_01.png", this.ctx);
                    }
                }

            }

        }, 1000 / 60);

    }
    drawLifeShips() {
        let startX = 1350;
        let startY = 10;
        let points = [
            [9, 9],
            [-9, 9]
        ];
        this.ctx.strokeStyle = 'white'; // Stroke color of ships
        // Cycle through all live ships remaining
        for (let i = 0; i < this.lives; i++) {
            // Start drawing ship
            this.ctx.beginPath();
            // Move to origin point
            this.ctx.moveTo(startX, startY);
            // Cycle through all other points
            for (let j = 0; j < points.length; j++) {
                this.ctx.lineTo(startX + points[j][0],
                    startY + points[j][1]);
            }
            // Draw from last point to 1st origin point
            this.ctx.closePath();
            // Stroke the ship shape white
            this.ctx.stroke();
            // Move next shape 30 pixels to the left
            startX -= 30;
        }
    }
    displayScore() {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '21px Arial';
            this.ctx.fillText("SCORE : " + this.score.toString(), 20, 35);
        }
        // createObstacles() {
        //     if (Math.floor(Math.random() * 25) % 2 === 0) {
        //         this.obstacles.push(new Obstacle(this));

    //     }

    //     setTimeout(() => {
    //         this.createObstacles();
    //     }, 3000);
    // }
    resetShip() {
        this.myShip.visible = true;
        this.myShip.x = this.canvas.width / 2;
        this.myShip.y = this.canvas.height / 2;
        this.myShip.angle = 0;
        this.lives -= 1;
    }

    GameOver() {
        this.myShip.visible = false;
        let img = new Image();
        img.src = "images/game over.png";
        //this.clear();
        this.ctx.drawImage(img, this.canvas.width * 0.5 - 30, this.canvas.height * 0.5 - 30, 60, 60)
            // this.ctx.fillStyle = 'white';
            // this.ctx.font = '50px Arial';
            // this.ctx.fillText("GAME OVER", this.canvas.width / 2 - 150, this.canvas.height / 2);
    }
    drawBackground(delta) {
        this.totalSeconds += delta;
        var vx = 100; // the background scrolls with a speed of 100 pixels/sec
        var numImages = Math.ceil(this.canvas.width / this.backgroundImg.width) + 1;
        var xpos = this.totalSeconds * vx % this.backgroundImg.width;
        this.ctx.save();
        this.ctx.translate(-xpos, 0);
        for (var i = 0; i < numImages; i++) {
            this.ctx.drawImage(this.backgroundImg, i * this.backgroundImg.width, 0);
        }
        this.ctx.restore();
    }

    clear() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        // draw ship from sprite sheet
    drawMainCharacters() {
        let index = this.myShip.index;
        let sx = spriteData.frames[index].frame.x;
        let sy = spriteData.frames[index].frame.y;
        let src = "images/spaceShips/redSS.png";
        this.myShip.drawSprite(src, sx, sy, 160, 160, this.myShip.x, this.myShip.y, this.myShip.width, this.myShip.height);
    }

}