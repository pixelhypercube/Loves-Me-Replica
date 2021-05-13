var canvasOptions = {
    windowWidth:window.innerWidth,
    windowHeight:window.innerHeight,
    bgColor:"gold"
}
var {windowWidth,windowHeight,bgColor} = canvasOptions;

let face,petals = [];
let lovesMe,clicked = false;
let initialFrameCount;
let restartBtn = new RestartBtn();

function genPetals(n,r) {
    for (let i = 0;i<n;i++) {
        var angle = (PI/n*2)*i;
        petals.push(new Petal(width/2+atan(cos(angle))*r,height/2+atan(sin(angle))*r,80,50,angle,"rgb(255,230,120)"));
    }
}

function restartGame() {
    face = new Face(width/2,height/2,80,80,"orange");
    lovesMe = random(0,1)<0.5;
    genPetals(floor(random(1,25)),70);
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    restartGame();
    initialFrameCount = frameCount;
}

function RestartBtn() {
    this.renderBtn = () => {
        fill((this.intersect())?"deepskyblue":"skyblue");
        rectMode(CENTER);
        rect(width/2,height/1.2,140,70);
        fill("black");
        textSize(24);
        text("Restart",width/2,height/1.2);
    }
    this.intersect = () => {
        if (mouseX>width/2-70 && mouseX<width/2+70 && mouseY>height/2-35 && mouseY<height/2+35) {
            return true;
        } else {
            return false;
        }
    }
}

function draw() {
    fill(bgColor);
    rect(0,0,width,height);
    for (let i = 0;i<petals.length;i++) {
        petals[i].show();
        petals[i].update();
        if (petals[i].detect()) {
            if (petals[i].clicked) {
                if (mouseIsPressed) {
                    petals[i].vy = 0;
                    petals[i].grab(mouseX,mouseY);
                }
                petals[i].gravity = 0.1;
            }
        }
        if (petals[i].y>windowHeight+100) {
            petals.splice(i,1);
        }
    }
    face.show();
    face.update();
    if (clicked && ((!petals.map(i=>i["clicked"]).every(i=>i) || petals.length==0))) {
        fill((lovesMe)?"navy":"maroon");
        textAlign(CENTER,CENTER);
        textStyle(BOLD);
        textSize(50);
        text((lovesMe)?"Loves Me":"Loves Me Not",width/2,height/8);
        
        if (initialFrameCount>frameCount-100) {
            face.color = (lovesMe)?"red":"lime";
            textAlign(CENTER,CENTER);
            textSize(40);
            text((lovesMe)?"😀":"😐",face.x,face.y+5);
        } else {
            if (petals.length!=0) {
                face.color = "orange";
                textAlign(CENTER,CENTER);
                textSize(40);
                text("🙂",face.x,face.y+5);
            } else {
                face.color = (lovesMe)?"red":"navy";
                textAlign(CENTER,CENTER);
                textSize(40);
                text((lovesMe)?"😍":"😭",face.x,face.y+5);
            }
        }
    } else {
        face.color = "orange";
        textAlign(CENTER,CENTER);
        textSize(40);
        text("🙂",face.x,face.y+5);
    }
    if (petals.length==0) {
        // restartBtn.renderBtn();
    }
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}
function mousePressed() {
    // for (let i = petals.length-1;i>=0;i--) {
    //     if (petals[i].clicked) {
            
    //         break;
    //     }
    // }
}
function mouseClicked() {
    for (let i = petals.length-1;i>=0;i--) {
        if (petals[i].detect()) {
            if (!petals[i].clicked) {
                lovesMe = !lovesMe;
                initialFrameCount = frameCount;
            }
            petals[i].clicked = true;
            clicked = true;
            break;
        }
    }
    if (petals.length==0 && restartBtn.intersect()) {
        restartGame();
    }
}
function mouseMoved() {
    // console.log(mouseIsPressed)
    // for (let i = petals.length-1;i>=0;i--) {
    //     if (petals[i].click()) {
    //         if (mouseIsPressed) {
    //             // console.log("HEY")
    //             petals[i].grab(mouseX,mouseY);
    //         }
    //         // break;
    //     }
    // }
}
