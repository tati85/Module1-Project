class Bullet extends MovingObjects {
    constructor(angle, noseX, noseY, ctx, canvasWhidth, canvasHeight) {
        //nose and w and h,contex,canvasw and canvash
        super(noseX, noseY, 20, 20, ctx, canvasWhidth, canvasHeight)
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
        // let radians = this.angle / Math.PI * 180;
        // this.x -= Math.cos(this.angle) * this.speed;
        // this.y -= Math.sin(this.angle) * this.speed;
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
                    console.log(this.y + " 180 case")
                }
                break;

            case 270:
                this.x -= this.speed;
                break;

                // (this.x = this.x * Math.cos(this.angle) - this.y * Math.sin(this.angle)) / 100;
                // (this.y = this.x * Math.sin(this.angle) - this.y * Math.cos(this.angle)) / 100;
        }



        (this.angle % 180 === 0) ? this.img.src = "images/fire1.png": this.img.src = "images/fire2.png"
        console.log(this.x + " " + this.y + " yyyyyyyyyyyyyy");
        console.log(this.img.src)
    }



}