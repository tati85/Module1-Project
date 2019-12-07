class Ship extends MovingObjects {
    constructor(w, h, board) {
        super(board.with / 2, board.height / 2, w, h, board);

        this.velX = 0;
        this.velX = 0;
        this.noseX = this.x + this.width / 2;
        this.noseY = this.y;
        this.visible = true;
        this.movingForward = false;
        this.speed = 0.1;
        this.image = new Image();
        this.rotateSpeed = 0.001;
        //this.radius = 15;
        this.angle = 0;


    }
    rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }
    update() {
        // Get current direction ship is facing
        let radians = this.angle / Math.PI * 180;

        // If moving forward calculate changing values of x & y
        // If you want to find the new point x use the 
        // formula oldX + cos(radians) * distance
        // Forumla for y oldY + sin(radians) * distance
        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        // If ship goes off board put on the edges

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.board.canvas.width) {
            this.x = this.board.canvas.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > this.board.canvas.height) {
            this.y = this.board.canvas.height;
        }
        // Slow ship speed when not holding key
        this.velX *= 0.99;
        this.velY *= 0.99;

        // Change value of x & y while accounting for
        // air friction    
        this.x -= this.velX;
        this.y -= this.velY;
    }

    drawRotated() {
        let myCtx = this.board.ctx;
        myCtx.clearRect(0, 0, this.board.width, this.board.height);

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        myCtx.save();

        // move to the center of the canvas
        myCtx.translate(this.board.width / 2, this.board.height / 2);

        // rotate the canvas to the specified degrees
        myCtx.rotate(this.angle * Math.PI / 180);

        // draw the image
        // since the context is rotated, the image will be rotated also
        myCtx.drawImage(this.img, this.x, this.y, this.width, this.height);
        myCtx.drawImage(this.image, -1 * this.image.width / 2, -1 * this.image.width / 2);

        // we’re done with the rotating so restore the unrotated context
        myCtx.restore();
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
        return this.noseX;

    }

    getShuttingY() {
        //return the front image x for shutting------do math
        return this.noseY;

    }

}