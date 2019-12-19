class Bullet extends MovingObjects {
    constructor(angle, noseX, noseY, ctx) {
        //nose and w and h,contex,
        super(noseX, noseY, 20, 20, ctx)
        this.visible = true;
        this.angle = angle;
        switch (this.angle) {
            case 0:
            case 180:
                this.x -= 10;
                break;
            case 90:
            case 270:
                this.y -= 10
                break;
        }
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
        this.ctx = ctx;
        this.img = new Image();
    }
    update() {
        switch (this.angle) {
            case 0:
                this.y -= this.speed;
                break;
            case 90:
                this.x += this.speed;
                break;

            case 180:
                {
                    this.y += this.speed;
                    //console.log(this.y + " 180 case")
                }
                break;
            case 270:
                this.x -= this.speed;
                break;
        }

        (this.angle % 180 === 0) ? this.img.src = "images/spaceShips/bullet1.png": this.img.src = "images/spaceShips/bullet2.png";
    }



}