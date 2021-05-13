function Petal(x,y,w,h,rot,color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0;
    this.w = w;
    this.h = h;
    this.rot = rot;
    this.color = color;
    this.clicked = false;

    this.show = () => {
        push();
        fill(this.color);
        translate(this.x,this.y);
        rotate(this.rot);
        ellipse(0,0,this.w,this.h);
        pop();
    }
    this.update = () => {
        this.x+=this.vx;
        this.y+=this.vy;
        this.vy += this.gravity;
    }
    this.detect = () => {
        var d = dist(mouseX,mouseY,this.x,this.y);
        if (d<this.h/2) {
            return true;
        } else {
            return false;
        }
    }
    this.click = () => {
        
    }
    this.grab = (x,y) => {
        this.x = x;
        this.y = y;
    }
}