class Game {
    constructor() {

        this.background = undefined;
        this.score = 0;
        this.backgroundImg = new Image();
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.canvas = undefined;
        this.ctx = undefined;
        this.keys = [];
        this.ship = new Ship(150, 100, this);
        //this.asteroids = [];
    }

    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        document.body.addEventListener("keydown", this.handleKeyDown);
        document.body.addEventListener("keyup", this.handleKeyUp);
        this.drawBackground();
        this.drawMainCharacters();
        // this.createObstacles();

        this.start();

    }
    start() {
        this.ship.movingForward = (this.keys[38] || this.keys[87]); //change the image.
        if (this.keys[40] || this.keys[68]) this.ship.rotate(-1);
        if (this.keys[37] || this.keys[65]) this.ship.rotate(1);
        this.clear();
        if (this.ship.visible) {
            this.ship.update();
            this.ship.drawRotated();
        }
        this.drawBackground();
        requestAnimationFrame(this.start);





        // setInterval(() => {
        //     this.clear();
        //     this.drawBackground();
        //     this.drawMainCharacters();
        //     // this.ship.move();
        //     // for (let i = 0; i < this.obstacles.length; obstacles++) {
        //     //     this.obstacles[i].move();
        //     //     this.obstacles[i].draw();
        //     //     this.car.crashCollision(this.obstacles[i]);
        //     //     if (this.obstacles[i].y > 800) {
        //     //         this.obstacles.splice(i, 1);
        //     //     }
        //     // }
        // }, 1000 / 60);
    }
    createObstacles() {
        if (Math.floor(Math.random() * 25) % 2 === 0) {
            this.obstacles.push(new Obstacle(this));
            console.log("obstacle == ", this.obstacles);
        }

        setTimeout(() => {
            this.createObstacles();
        }, 3000);
    }
    drawBackground() {
        this.backgroundImg.src = "./images/nebula.jpg";
        this.ctx.drawImage(
            this.backgroundImg,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMainCharacters() {
        this.ship.drawComponent("/images/fighter_off.png");
    }
    handleKeyDown(e) {
        this.keys[e.keyCode] = true;
    }
    handleKeyUp(e) {
        keys[e.keyCode] = false;
        // if (e.keyCode === 32) {
        //     bullets.push(new Bullet(ship.angle));
        // }
    }


}