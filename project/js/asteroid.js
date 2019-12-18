class Asteroid extends MovingObjects {
    constructor(x, y, w, h, level, ctx) {
        super(0, 0, 0, 0, ctx);
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth - 5);
        this.y = y || Math.floor(Math.random() * canvasHeight - 5);
        this.angle = Math.floor(Math.random() * 359);
        this.width = w || (Math.floor(Math.random() * 23) + 80);
        this.height = h || this.width;
        this.level = level || 1; //the biggest level---(3levels)
        this.speed = 1;
        this.img = new Image();
        this.sx = 0;
        this.sy = 0;
    }
    update() {
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        //if goes out of board put in tho other edge
        if (this.getRight() < 0) {
            this.x = canvasWidth - 10;
        }
        if (this.getLeft() > canvasWidth) {
            this.x = 0;
        }
        if (this.getBottom() < 0) {
            this.y = canvasHeight - 10;
        }
        if (this.getTop() > canvas.height) {
            this.y = 0;
        }
    }

    draw(imgSource, ctx) {
        this.ctx = ctx;
        this.img.src = imgSource;
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    getLeft() {
        return this.x - 10;
    }
    getRight() {
        return this.x + this.width - 10;
    }

    getTop() {
        return this.y - 10;
    }
    getBottom() {
        return this.y + this.height - 10;
    }
    randomImage(min, max) {
        let index = Math.floor(Math.random() * (max - min + 1) + min);
        this.sx = spriteAsteroids.frames[index].frame.x;
        this.sy = spriteAsteroids.frames[index].frame.y;
        this.img.src = "images/spaceShips/asteroids.png";


    }

}