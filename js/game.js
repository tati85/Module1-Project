class Game {
    constructor() {
        this.explodingasteroid = null;
        this.deleting = false;
        //background       
        this.lastFrameTime = 0;
        this.totalSeconds = 0;
        this.backgroundImg = new Image();
        this.backgroundImg.src = "images/backgrounds/space5.jpg";
        this.canvasScene = undefined;
        this.ctxScene = undefined;
        //explosions
        this.canvasExplosion = undefined;
        this.explodingShip = undefined;
        this.ctxExplosion = undefined;
        this.explosions = new Image();
        this.explosions.src = "images/explosions/explosion.png"
        this.explosionFrames = 0;

        //canvas for players
        this.x = 0;
        this.y = 0;
        this.canvas = undefined;
        this.ctx = undefined;
        this.asteroids = [];
        this.asteroidsNumber = asteroidsNumber;
        this.lives = 3;
        this.score = 0;
        this.levelTwo = false;
        this.displayingLevel2Text = false;
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
        console.log(this.asteroidsNumber)

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
        window.location.reload();
    }
    moveBackground() {
        var now = Date.now();
        var deltaSeconds = (now - this.lastFrameTime) / 10000;
        this.lastFrameTime = now;
        return deltaSeconds
    }


    beging() {
            let interval = setInterval(() => {
                //background
                console.log(this.asteroidsNumber, '>>> s')
                this.clear(this.ctxScene);
                this.drawBackground(this.moveBackground());

                //players
                this.clear(this.ctx);
                this.displayScore();
                this.drawLifeShips();

                //check game over
                if (this.lives <= 0) {
                    this.GameOver(interval);
                    // // clearInterval(interval)
                    // setTimeout(
                    //     this.reset,
                    //     2000
                    // )
                }

                //check for level2
                if (this.asteroids.length === 0 && !this.levelTwo) {
                    // console.log("level2 ***********************")

                    // this.displayLevel2();


                    // setTimeout(() => {
                    //     this.resetShip();
                    //     //create asteroids
                    //     for (let i = 0; i < this.asteroidsNumber; i++) {
                    //         this.asteroids.push(new Asteroid());
                    //         this.asteroids[i].setContext(this.ctx);
                    //         this.asteroids[i].randomImage(0, 2);
                    //         this.asteroids[i] += 0.5;
                    //     }
                    //     //change imag background
                    //     this.backgroundImg.src = "images/backgrounds/space4.jpg";
                    //     this.displayingLevel2Text = false;
                    // }, 3000);
                    this.deleting = true;
                    let img = new Image();
                    img.src = "images/backgrounds/you-win.png";
                    this.ctx.drawImage(img, 250, 250, 400, 400);
                }

                //check end
                // if (this.asteroids.length === 0 && this.levelTwo) {


                // }


                // Check for collision of ship with asteroid
                if (this.asteroids.length !== 0 && !this.deleting && !this.displayingLevel2Text) {
                    var soundFlag = true;
                    for (let k = 0; k < this.asteroids.length; k++) {
                        if (this.myShip.didCollide(this.asteroids[k])) {

                            //show explosion  
                            this.explodingShip = { x: this.myShip.x, y: this.myShip.y }
                            this.myShip.visible = false;
                            let x = 0;
                            let stopExplosionShip = setInterval(() => {
                                this.drawExplosion(this.explodingShip.x, this.explodingShip.y);
                                if (++x === 8) {
                                    this.clear(this.ctxExplosion);
                                    clearInterval(stopExplosionShip);
                                }
                            }, 100);
                            this.asteroids.splice(k, 1)
                            k = this.asteroids.length
                            setTimeout(() => {
                                this.resetShip();
                                this.lives -= 1;

                            }, 1000);

                        }
                    }
                }
                //check for collision of bullets with asteroids
                if (this.asteroids.length !== 0 && this.myShip.bullets.length !== 0 && !this.deleting && !this.displayingLevel2Text) {
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

                if (this.myShip.visible && !this.deleting && !this.displayingLevel2Text) {

                    this.drawMainCharacters();
                    this.myShip.move();
                    this.myShip.update();
                }
                //bullets
                if (this.myShip.bullets.length !== 0 && !this.deleting && !this.displayingLevel2Text) {
                    for (let i = 0; i < this.myShip.bullets.length; i++) {
                        this.myShip.bullets[i].update();
                        this.myShip.bullets[i].draw();
                    }
                }
                //asteroids
                if (this.asteroids.length !== 0 && !this.deleting && !this.displayingLevel2Text) {
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
    displayGameOver() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '21px Arial';
        this.ctx.fillText("PRESS ENTER TO STAR...", this.canvas.width - 500, canvas.height - 150);
        let img = new Image();
        img.src = "images/backgrounds/gameOver.png"
        this.ctx.drawImage(img, this.canvas.width * 0.5 - 200, this.canvas.height * 0.5 - 200, 500, 500)
    }
    displayLevel2() {
        this.displayingLevel2Text = true;
        this.clear(this.ctxScene);
        this.clear(this.ctx);
        this.clear(this.ctxExplosion);
        //change the background to black
        this.backgroundImg.src = "images/backgrounds/space.jpg";
        this.drawBackground(this.moveBackground);
        //display Level2 text
        this.ctxExplosion.fillStyle = 'white';
        this.ctxExplosion.font = '45px Arial';
        this.ctxExplosion.fillText("LEVEL 2!!!", 200, canvas.height - 200);

    }

    resetShip() {
            this.myShip.visible = true;
            this.myShip.x = this.canvas.width / 2;
            this.myShip.y = this.canvas.height / 2;
            this.myShip.angle = 0;
            this.myShip.index = 0;

        }
        // theEnd(inter) {
        //     this.deleting = true;
        //     this.myShip.visible = false;
        //     this.ctx.fillStyle = 'white';
        //     this.ctx.font = '21px Arial';
        //     this.ctx.fillText("PRESS ENTER TO STAR...", this.canvas.width - 500, canvas.height - 150);
        //     let img = new Image();
        //     img.src = "images/backgrounds/you-win.png"
        //     this.ctx.drawImage(img, this.canvas.width * 0.5 - 200, this.canvas.height * 0.5 - 200, 500, 500);
        //     document.onkeydown = event => {
        //         let key = event.keyCode;
        //         if (key === 13 && this.deleting) {
        //             this.deleteGame();
        //             //stop the main interval
        //             clearInterval(inter);
        //             this.clear(this.ctxScene);
        //             this.clear(this.ctx);

    //             //show main page
    //             window.open("main.html", "_self");

    //         }
    //     }
    // }
    GameOver(inter) {
        this.deleting = true;
        this.myShip.visible = false;
        this.displayGameOver();
        //for press star to restar the game
        document.onkeydown = event => {
            let key = event.keyCode;
            if (key === 13 && this.deleting) {
                this.deleteGame();
                //stop the main interval
                clearInterval(inter);
                this.clear(this.ctxScene);
                this.clear(this.ctx);

                //show main page
                window.open("main.html", "_self");

            }
        }
    }
    deleteGame() {
        this.myShip.bullets = [];
        this.asteroids = [];

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