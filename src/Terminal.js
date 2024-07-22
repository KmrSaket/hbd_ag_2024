class EncChar {
    constructor(p5, value, x, y, size) {
        this.value = value;
        this.p5 = p5;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.size = size;
        this.isBrightcolor = Math.round(Math.random()) === 1;
    }
    render() {
        this.p5.textSize(this.size);
        if (this.isBrightcolor) {
            this.p5.fill(140, 255, 170, 255)
        } else {
            this.p5.fill(0, 255, 70, 120);
        }
        this.p5.text(this.value, this.x, this.y);
    }
}

class Terminal {
    constructor() {
        this.matrix = [];
        this.size = 8;
        this.charRerenderFrame = 10;

        this.w = document.documentElement.clientWidth;
        this.h = window.innerHeight / 2;
    }
    setup(p5, parent, string) {
        this.p5 = p5;
        this.string = string;
        this.x = this.size;
        this.y = this.size;
        this.p5.createCanvas(
            this.w,
            this.h
        ).parent(parent);
        this.p5.background(0);
        this.createMatrix();
    }
    draw(string) {
        this.string = string;
        if (this.p5.frameCount % this.charRerenderFrame === 0) {
            this.p5.background(0);
            this.createMatrix();
        }
    }
    createMatrix() {
        // prepare 2d matrix from string based on w h and size
        let encChar;
        let x = this.x;
        let y = this.y;

        for (const charac of this.string) {
            encChar = new EncChar(this.p5, charac, x, y, this.size);
            this.matrix.push(encChar);
            encChar.render();
            if (x + this.size < this.w - this.size - this.size) {
                x += this.size;
            } else {
                x = this.x;
                y += this.size;
            }
        }
    }
}
export default Terminal;