class MovingObjects {
    constructor(x, y, w, h, context) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = new Image();
        this.ctx = context;
        this.speed = 0;
    }

    drawSprite(imgSource, sx, sy, sw, sh, dx, dy, dw, dh) {

        this.img.src = imgSource;
        this.ctx.drawImage(this.img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    draw() {

        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    getLeft() {
        return this.x;
    }
    getRight() {
        return this.x + this.width;
    }

    getTop() {
        return this.y;
    }
    getBottom() {
        return this.y + this.height;
    }
    outBoard() {
        return (this.getRight() < 0 || this.getLeft() > canvasWidth || this.getBottom() < 0 || this.getTop() > canvasHeight);
    }

    didCollide(otherComp) {
        const crossLeft =
            otherComp.x <= this.getRight() && otherComp.x >= this.getLeft();

        const crossRight =
            otherComp.x + otherComp.width >= this.getLeft() &&
            otherComp.x + otherComp.width <= this.getRight();

        const crossTop =
            otherComp.y <= this.getBottom() && otherComp.y >= this.getTop();

        const crossBottom =
            otherComp.y + otherComp.height >= this.getTop() &&
            otherComp.y + otherComp.height <= this.getBottom();

        if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
            return true;
        }
        return false;
    }
}