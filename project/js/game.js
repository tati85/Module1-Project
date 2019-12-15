class Game {
    constructor() {
            this.score = 0;
            this.backgroundImg = new Image();
            this.backgroundImg.src = "images/space1.png";
            this.x = 0;
            this.y = 0;
            this.width = undefined;
            this.height = undefined;
            this.canvas = undefined;
            this.ctx = undefined;
            this.lastFrameTime = 0;
            this.totalSeconds = 0;
            this.imgheight = 0;
            this.scrollSpeed = 0;



            //this.asteroids = [];
        }
        // handleKeyDown(e) {
        //     keys[e.keyCode] = true;

    // }
    // handleKeyUp(e) {
    //     keys[e.keyCode] = false;
    //     // if (e.keyCode === 32) {
    //     //     bullets.push(new Bullet(ship.angle));
    //     // }
    // }


    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.myShip = new Ship(350, 350, 75, 75, this.ctx, this.width, this.height);
        this.lastFrameTime = Date.now();



        //draw characters
        //this.drawMainCharacters();

        this.beging();


        // this.createObstacles();
        //console.log(this.myShip.x);


    }
    beging() {
        // console.log(this);
        const interval = setInterval(() => {


            var now = Date.now();
            var deltaSeconds = (now - this.lastFrameTime) / 8000;
            this.lastFrameTime = now;
            this.drawBackground(deltaSeconds);
            this.clear();

            if (this.myShip.visible) {
                //draw characters                
                this.drawBackground(deltaSeconds);
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

            }

        }, 1000 / 60);

    }

    createObstacles() {
        if (Math.floor(Math.random() * 25) % 2 === 0) {
            this.obstacles.push(new Obstacle(this));

        }

        setTimeout(() => {
            this.createObstacles();
        }, 3000);
    }
    drawBackground(delta) {

        this.totalSeconds += delta;

        var vx = 100; // the background scrolls with a speed of 100 pixels/sec
        var numImages = Math.ceil(canvas.width / this.backgroundImg.width) + 1;
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
        let frame = spriteData.frames[index].frame;
        let sx = frame.x;
        let sy = frame.y;
        let src = "images/texture.png";

        this.myShip.drawSprite(src, sx, sy, 200, 200, this.myShip.x, this.myShip.y, this.myShip.width, this.myShip.height);

    }

}