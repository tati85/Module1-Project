class MovingObjects {
    constructor(x, y, w, h, board) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = new Image();
        this.board = board;
        this.speed = 0;
    }

    drawComponent(imgSource) {
        let myCtx = this.board.ctx;
        this.img.src = imgSource;
        // this.img.addEventListener("load", () => {
        myCtx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // });
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