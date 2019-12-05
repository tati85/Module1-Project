class Ship extends MovingObjects {
    constructor(x, y, w, h, board) {
        super(x, y, w, h, board);
        this.speed = 20;

    }
    move() {
        document.onkeydown = event => {
            //   console.log("event: ", event.keyCode);
            const key = event.keyCode;
            const possibleKeystrokes = [37, 65, 38, 87, 39, 83, 40, 68];
            if (possibleKeystrokes.includes(key)) {
                event.preventDefault();
                switch (key) {
                    case 37:
                    case 65:
                        if (this.x >= 0) this.x -= this.speed;
                        break;
                    case 38:
                    case 87:
                        if (this.y >= 10) this.y -= this.speed;
                        break;
                    case 39:
                    case 83:
                        if (this.x <= 1000 - this.width) this.x += this.speed;
                        break;
                    case 40:
                    case 68:
                        if (this.y <= 500 - this.height) this.y += this.speed;
                        break;
                }
            }
        };
    }
    getShuttingX() {
        //return the front image x for shutting------do math
        return this.x;

    }

    getShuttingY() {
        //return the front image x for shutting------do math
        return this.y;

    }

}