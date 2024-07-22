
class Symbol {
    constructor(x, y, speed, first, opacity, p5) {

        this.x = x;
        this.y = y;
        this.value = '';
        this.p5 = p5;

        this.speed = speed;
        this.first = first;
        this.opacity = opacity;

        this.switchInterval = Math.round(this.p5.random(10, 20));
    }

    setToRandomSymbol() {
        let charType = Math.round(this.p5.random(0, 5));
        if (this.p5.frameCount % this.switchInterval === 0) {
            if (charType > 1) {
                // set it to Katakana
                this.value = String.fromCharCode(
                    0x30A0 + Math.floor(this.p5.random(0, 97))
                );
            } else {
                // set it to numeric
                this.value = Math.floor(this.p5.random(0, 10));
            }
        }
    }

    rain() {
        this.y = (this.y >= this.p5.height) ? 0 : this.y += this.speed;
    }

}
class Stream {
    constructor(p5) {
        this.p5 = p5;
        this.symbols = [];
        this.totalSymbols = Math.round(this.p5.random(5, 35));
        this.speed = this.p5.random(5, 7);
    }

    generateSymbols(x, y) {
        var opacity = 255;
        var first = Math.round(this.p5.random(0, 4)) === 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            let symbol = new Symbol(
                x,
                y,
                this.speed,
                first,
                opacity,
                this.p5
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / this.fadeInterval;
            y -= this.symbolSize;
            first = false;
        }
    }

    render() {
        var p5 = this.p5;
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                p5.fill(140, 255, 170, symbol.opacity);
            } else {
                p5.fill(0, 255, 70, symbol.opacity);
            }
            p5.text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
class Matrix {
    streams = [];
    fadeInterval = 1.6;
    symbolSize = 20;

    setup(p5, parent) {
        this.p5 = p5;
        this.p5.createCanvas(
            document.documentElement.clientWidth,
            window.innerHeight
        ).parent(parent);
        this.p5.background(0);

        var x = 0;
        for (var i = 0; i <= this.p5.width / this.symbolSize; i++) {
            var stream = new Stream(this.p5);
            stream.generateSymbols(x, this.p5.random(-2000, 0));
            this.streams.push(stream);
            x += this.symbolSize
        }

        this.p5.textFont('Consolas');
        this.p5.textSize(this.symbolSize);
    }

    draw() {
        this.p5.background(0, 150);
        this.streams.forEach(function (stream) {
            stream.render();
        });
    }
}


export default Matrix;