function Face(x,y,w,h,color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.w = w;
    this.h = h;
    this.color = color;

    this.show = () => {
        push();
        fill(this.color)
        ellipse(this.x,this.y,this.w,this.h);
        pop();
    }
    this.update = () => {
        this.x+=this.vx;
        this.y+=this.vy;
    }
}