class Game {
    constructor() {
        this.canvas = undefined;
        this.ctx = undefined;
        this.ship = new Ship(200, 550, 150, 100, this);
        this.asteroids = [];
        this.background = undefined;
        this.score = 0;
        this.backgroundImg = new Image();
        this.x = undefined;
        this.y = undefined;
        this.width = 1000;
        this.height = 700;
    }
    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.start();
        // this.createObstacles();
    }
    start() {
        this.drawBackground();
        this.drawMainCharacters();
        setInterval(() => {
            this.clear();
            this.drawBackground();
            this.drawMainCharacters();
            // this.ship.move();
            // for (let i = 0; i < this.obstacles.length; obstacles++) {
            //     this.obstacles[i].move();
            //     this.obstacles[i].draw();
            //     this.car.crashCollision(this.obstacles[i]);
            //     if (this.obstacles[i].y > 800) {
            //         this.obstacles.splice(i, 1);
            //     }
            // }
        }, 1000 / 60);
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
        // this.backgroundImg.src = "./images/nebula.jpg";
        // this.ctx.drawImage(
        //     this.backgroundImg,
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // );
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMainCharacters() {
        this.ship.drawComponent("/images/580b585b2edbce24c47b2d2a.png");
    }

}