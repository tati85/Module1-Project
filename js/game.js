class Game {
    constructor() {
        this.explodingasteroid = null;
        //background       
        this.lastFrameTime = 0;
        this.totalSeconds = 0;
        this.backgroundImg = new Image();
        this.backgroundImg.src = "images/backgrounds/space5.jpg";
        this.canvasScene = undefined;
        this.ctxScene = undefined;
        this.stopScene = 0;
        //explosions
        this.canvasExplosion = undefined;
        this.ctxExplosion = undefined;
        this.explosions = new Image();
        this.explosions.src = "images/explosions/explosion.png"
        this.explosionFrames = 0;
        this.stopExplosion = 0;
        this.stopExpAster1 = 0;
        this.stopExpAster2 = 0;

        //canvas for players
        this.x = 0;
        this.y = 0;
        this.canvas = undefined;
        this.ctx = undefined;
        this.asteroids = [];
        this.asteroidsNumber = 5;
        this.lives = 3;
        this.score = 0;
    }


    init() {
        //set up players's canvas
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        canvasWidth = this.canvas.width;
        canvasHeight = this.canvas.height;

        //set up background canvas
        this.canvasScene = document.getElementById("scene");
        this.canvasScene.width = canvasWidth;
        this.canvasScene.height = canvasHeight;
        this.ctxScene = this.canvasScene.getContext("2d");

        //set up canvas explosion
        this.canvasExplosion = document.getElementById("top");
        this.canvasExplosion.width = canvasWidth;
        this.canvasExplosion.height = canvasHeight;
        this.ctxExplosion = this.canvasExplosion.getContext("2d");

        //for resize window
        // window.addEventListener('resize', this.resizeCanvas, false);



        this.myShip = new Ship(this.canvas.width * 0.5, this.canvas.height * 0.5, 160, 160, this.ctx);

        //create asteroids
        for (let i = 0; i < this.asteroidsNumber; i++) {
            this.asteroids.push(new Asteroid());
            this.asteroids[i].setContext(this.ctx);
            this.asteroids[i].randomImage(0, 2);
        }

        this.lastFrameTime = Date.now();
        this.beging();

    }
    reset = () => {
        window.location.reload()
    }
    beging() {
            let interval = setInterval(() => {
                //background
                var now = Date.now();
                var deltaSeconds = (now - this.lastFrameTime) / 10000;
                this.lastFrameTime = now;
                this.clear(this.ctxScene);
                this.drawBackground(deltaSeconds);

                //players
                this.clear(this.ctx);
                this.displayScore();
                //check game over
                if (this.lives <= 0) {
                    this.GameOver();
                    // clearInterval(interval)
                    setTimeout(
                        this.reset,
                        2000
                    )
                }
                this.drawLifeShips();

                // Check for collision of ship with asteroid
                if (this.asteroids.length !== 0) {
                    var soundFlag = true;
                    for (let k = 0; k < this.asteroids.length; k++) {
                        if (this.myShip.didCollide(this.asteroids[k])) {


                            //show explosion                             
                            this.myShip.visible = false;
                            let x = 0;
                            let stopExplosion = setInterval(() => {
                                this.drawExplosion(this.myShip.x, this.myShip.y);
                                if (++x === 8) {
                                    this.clear(this.ctxExplosion);
                                    window.clearInterval(stopExplosion);
                                }
                            }, 100);
                            this.asteroids.splice(k, 1)
                            k = this.asteroids.length
                            setTimeout(() => {
                                this.resetShip();
                            }, 1000);

                        }
                    }
                }
                //check for collision of bullets with asteroids
                if (this.asteroids.length !== 0 && this.myShip.bullets.length !== 0) {
                    for (let l = 0; l < this.asteroids.length; l++) {
                        for (let m = 0; m < this.myShip.bullets.length; m++) {
                            if (this.asteroids[l].didCollide(this.myShip.bullets[m])) {
                                this.exploding = false;
                                // Check if asteroid can be broken into smaller pieces
                                if (this.asteroids[l].level === 1) {

                                    //add 2 new asteroids
                                    this.asteroids.push(new Asteroid(this.asteroids[l].x - 10, this.asteroids[l].y - 10, 50, 50, 2, this.ctx));
                                    this.asteroids[this.asteroids.length - 1].randomImage(3, 5);
                                    this.asteroids[this.asteroids.length - 1].setContext(this.ctx);
                                    this.asteroids.push(new Asteroid(this.asteroids[l].x + 10, this.asteroids[l].y + 10, 50, 50, 2, this.ctx));
                                    this.asteroids[this.asteroids.length - 1].randomImage(3, 5);
                                    this.asteroids[this.asteroids.length - 1].setContext(this.ctx);

                                } else if (this.asteroids[l].level === 2) {


                                    this.asteroids.push(new Asteroid(this.asteroids[l].x - 5, this.asteroids[l].y - 5, 30, 30, 3, this.ctx));
                                    this.asteroids[this.asteroids.length - 1].randomImage(6, 7);
                                    this.asteroids[this.asteroids.length - 1].setContext(this.ctx);
                                    this.asteroids.push(new Asteroid(this.asteroids[l].x + 5, this.asteroids[l].y + 5, 30, 30, 3, this.ctx));
                                    this.asteroids[this.asteroids.length - 1].randomImage(6, 7);
                                    this.asteroids[this.asteroids.length - 1].setContext(this.ctx);
                                }
                                if (this.asteroids[l].level === 3) {
                                    //show explosion
                                    this.asteroids[l].visible = false;
                                    this.explodingasteroid = { x: this.asteroids[l].x, y: this.asteroids[l].y }

                                    let x = 0;
                                    if (!this.exploding) {

                                        var stopExpAster1 = setInterval(() => {
                                            this.exploding = true
                                            this.drawExplosion(this.explodingasteroid.x, this.explodingasteroid.y);
                                            if (++x >= 8) {
                                                this.exploding = false;
                                                this.clear(this.ctxExplosion);
                                                clearInterval(stopExpAster1);
                                            }
                                        }, 100);

                                    }
                                }

                                // setTimeout(() => {
                                // }, 800);
                                this.asteroids.splice(l, 1);
                                this.myShip.bullets.splice(m, 1);
                                this.score += 20;
                                m = this.myShip.bullets.length;




                            }

                        }
                    }
                }

                if (this.myShip.visible) {

                    this.drawMainCharacters();
                    this.myShip.move();
                    this.myShip.update();
                }
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
                        let sx = this.asteroids[i].sx;
                        let sy = this.asteroids[i].sy;
                        let sw = this.asteroids[i].sw;
                        let sh = this.asteroids[i].sh;
                        let dx = this.asteroids[i].x;
                        let dy = this.asteroids[i].y;
                        let dw = this.asteroids[i].width;
                        let dh = this.asteroids[i].height;
                        if (this.asteroids[i].visible)
                            this.asteroids[i].drawSprite(sx, sy, sw, sh, dx, dy, dw, dh);
                    }
                }

            }, 1000 / 60);

        }
        // resizeCanvas() {
        //     this.canvas.width = window.innerWidth;
        //     this.canvas.height = window.innerHeight;
        //     this.canvasScene.width = window.innerWidth;
        //     this.canvasScene.height = window.innerHeight;
        //     canvasHeight = window.innerHeight;
        //     canvasWidth = window.innerWidth;
        // }
    drawLifeShips() {
        let startX = this.canvas.width - 30;
        let startY = 10;
        let points = [
            [9, 9],
            [-9, 9]
        ];
        this.ctx.strokeStyle = 'white'; // Stroke color of ships
        // Cycle through all live ships remaining
        for (let i = 0; i < this.lives; i++) {
            this.ctx.fill();
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            // Cycle through all other points
            for (let j = 0; j < points.length; j++) {
                this.ctx.lineTo(startX + points[j][0],
                    startY + points[j][1]);
            }
            this.ctx.closePath();
            this.ctx.fill();
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
    resetShip() {
        this.myShip.visible = true;
        this.myShip.x = this.canvas.width / 2;
        this.myShip.y = this.canvas.height / 2;
        this.myShip.angle = 0;
        this.myShip.index = 0;
        this.lives -= 1;
    }
    GameOver() {
        this.myShip.visible = false;
        this.myShip.bullets = [];
        this.asteroids = [];
        this.clear(this.ctx);
        this.clear(this.ctxExplosion);
        let img = new Image();
        img.src = "images/backgrounds/gameOver.png"
        this.ctx.drawImage(img, this.canvas.width * 0.5 - 200, this.canvas.height * 0.5 - 200, 500, 500)

    }
    drawBackground(delta) {
            this.totalSeconds += delta;
            var vx = 100; // the background scrolls with a speed of 100 pixels/sec
            var numImages = Math.ceil(this.canvasScene.width / this.backgroundImg.width) + 1;
            var xpos = this.totalSeconds * vx % this.backgroundImg.width;
            this.ctxScene.save();
            this.ctxScene.translate(-xpos, 0);
            for (var i = 0; i < numImages; i++) {
                this.ctxScene.drawImage(this.backgroundImg, i * this.backgroundImg.width, 0);
            }
            this.ctxScene.restore();
        }
        //explosion animation 
    drawExplosion(dx, dy) {
        this.clear(this.ctxExplosion);
        let srcX = this.explosionFrames * 140;
        this.ctxExplosion.drawImage(this.explosions, srcX, 0, 140, 140, dx, dy, 140, 140);
        this.explosionFrames = ++this.explosionFrames % 9;

    }

    clear(ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // draw ship from sprite sheet
    drawMainCharacters() {
        let index = this.myShip.index;
        let sx = spriteData.frames[index].frame.x;
        let sy = spriteData.frames[index].frame.y;
        this.myShip.drawSprite(sx, sy, this.myShip.width, this.myShip.height, this.myShip.x, this.myShip.y, this.myShip.width, this.myShip.height);
    }
}