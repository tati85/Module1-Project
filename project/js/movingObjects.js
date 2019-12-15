class MovingObjects {
    constructor(x, y, w, h, context, canvasWhidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = new Image();
        this.ctx = context;
        this.canvasWhidth = canvasWhidth;
        this.canvasHeight = canvasHeight;
        this.speed = 0;

    }

    drawSprite(imgSource, sx, sy, sw, sh, dx, dy, dw, dh) {

        this.img.src = imgSource;
        this.ctx.drawImage(this.img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    draw() {
        //this.img.src = imgSource;
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
        return (this.getLeft() < 0 || this.getRight() > this.canvasWhidth || this.getTop() < 0 || this.getBottom > this.canvasHeight);
    }

    //   didCollide(otherComp) {
    //     const crossLeft =
    //       otherComp.x <= this.getRight() && otherComp.x >= this.getLeft();

    //     const crossRight =
    //       otherComp.x + otherComp.width >= this.getLeft() &&
    //       otherComp.x + otherComp.width <= this.getRight();

    //     const crossTop =
    //       otherComp.y <= this.getBottom() && otherComp.y >= this.getTop();

    //     const crossBottom =
    //       otherComp.y + otherComp.height >= this.getTop() &&
    //       otherComp.y + otherComp.height <= this.getBottom();

    //     if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    //       return true;
    //     }
    //     return false;
    //   }
}