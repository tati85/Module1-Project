class Ship extends MovingObjects {
    constructor(x, y, w, h, context) {
        super(x, y, w, h, context);
        this.image = new Image();
        this.img.src = "images/spaceShips/redSS.png";
        this.movingForward = false;
        this.speed = 4;
        this.index = 0;
        this.noseX = this.x + this.width / 2;
        this.noseY = this.y;
        this.visible = true;
        this.angle = 0;
        this.bullets = [];
    }
    updateNose() {
        switch (this.angle) {
            case 0:
                this.noseX = this.x + this.width / 2;
                this.noseY = this.y;
                break;
            case 90:
                this.noseX = this.x + this.width;
                this.noseY = this.y + this.height / 2;
                break;
            case 180:
                this.noseX = this.x + this.width / 2;
                this.noseY = this.y + this.height;
                break;
            case 270:
                this.noseX = this.x;
                this.noseY = this.y + this.height / 2;
                break;
        }

    }
    rotate(dir) {
            if (dir > 0 && this.angle === 270) {
                this.angle = 0;
                this.index = 0;
            } else if (dir < 0 && this.angle === 0) {
                this.angle = 270;
                this.index = 3;
            } else {
                this.angle += 90 * dir;
                this.index += dir;
            }
            this.updateNose();
        }
        //update x and y after rotation
    update() {
        if (this.movingForward) {
            switch (this.angle) {
                case 0:
                    {
                        this.y -= this.speed;
                        this.updateNose();
                    }
                    break;
                case 90:
                    {
                        this.x += this.speed;
                        this.updateNose();
                    }
                    break;
                case 180:
                    {
                        this.y += this.speed;
                        this.updateNose();
                    }
                    break;
                case 270:
                    {
                        this.x -= this.speed;
                        this.updateNose();
                    }
                    break;
            }
        }
        // If ship goes off board put on the edges

        if (this.getLeft() < 0) {
            this.x = 0;
        }
        if (this.getRight() > canvasWidth) {
            this.x = canvasWidth - this.width;
            console.log("Outside right");
        }
        if (this.getTop() < 0) {
            this.y = 0;
        }
        if (this.getBottom() > canvasHeight) {
            this.y = canvasHeight - this.height;
        }
        //check if bullet goes off board and delete
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].outBoard()) {
                this.bullets.splice(i, 1);
            }
        }

    }
    move() {
        const possibleKeystrokes = [37, 65, 38, 39, 83, 87, 32];
        document.onkeydown = event => {
            let key = event.keyCode;
            //console.log(key);        
            if (possibleKeystrokes.includes(key)) {
                event.preventDefault();
                switch (key) {
                    //rotating right
                    case 37:
                    case 65:
                        {
                            this.movingForward = false;
                            this.rotate(-1);
                        }
                        break;
                        //moving foward
                    case 38:
                    case 87:
                        this.movingForward = true;
                        break;
                        //rotating left
                    case 39:
                    case 83:
                        {
                            this.movingForward = false;
                            this.rotate(1);
                        }
                        break;
                        //shooting
                    case 32:
                        {
                            this.bullets.push(new Bullet(this.angle, this.noseX, this.noseY, this.ctx))

                        }
                        break;

                }
            }
        };
        document.onkeyup = event => {
            let key = event.keyCode;
            console.log("key up    " + key)

            if (possibleKeystrokes.includes(key)) {
                event.preventDefault();
                if (key === 38 || key === 87) {
                    this.movingForward = false;
                }
            }

        }
    }

}