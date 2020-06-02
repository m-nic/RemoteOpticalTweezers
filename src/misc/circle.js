export class CircleConfig {
    static canvasWidth = 0;
    static canvasHeight = 0;
}

export class Circle {
    constructor(x, y, r, z = 1e-9, props = {color: '#ff0000'}) {
        this.cx = x;
        this.cy = y;
        this.r = r;

        this.z = z;

        this.stroke = props.color;
    }
}

export class DefaultCircle extends Circle {
    constructor(r = 200, props = {color: '#ff0000'}) {
        super(r, r, r, 0, props);
    }
}