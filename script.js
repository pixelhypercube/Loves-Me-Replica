var canvasOptions = {
    // canvasWidth:window.innerWidth,
    // canvasHeight:window.innerHeight,
    canvasWidth:350,
    canvasHeight:350,
    bgColor:"gold"
}
var {canvasWidth,canvasHeight,bgColor} = canvasOptions;

let face,petals = [];
let lovesMe,clicked = false;
let initialFrameCount;
let lovesMeScore = 0;
let makeAllPetalsFall = false;
let restartBtn = new RestartBtn();

function genPetals(n,r) {
    if (n==1 || n==2) {
        makeAllPetalsFall = true;
    } else {
        makeAllPetalsFall = false;
    }
    for (let i = 0;i<n;i++) {
        var angle = (PI/n*2)*i;
        var petal = new Petal(width/2+atan(cos(angle))*r,height/2+atan(sin(angle))*r,80,50,angle,"rgb(255,230,120)");
        if (makeAllPetalsFall) {
            petal.clicked = true;
        }
        petals.push(petal);
    }
}

function restartGame() {
    face = new Face(width/2,height/2,80,80,"orange");
    // lovesMe = random(0,1)<0.5;
    lovesMe = 0;
    genPetals(floor(random(1,16)),70);
    clicked = false;
}

function setup() {
    let renderer = createCanvas(canvasWidth,canvasHeight);
    renderer.parent("canvas");
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
        if (makeAllPetalsFall) {
            petals[i].gravity = 0.1;
        }
        if (petals[i].y>canvasHeight+100) {
            petals.splice(i,1);
            if (petals.length==0) {
                if (lovesMe) {
                    if (lovesMeScore>=0) {
                        lovesMeScore+=1;
                    } else {
                        lovesMeScore = 1;
                    }
                } else {
                    if (lovesMeScore<=0) {
                        lovesMeScore-=1;
                    } else {
                        lovesMeScore = -1;
                    }
                }
            }
        }
    }
    face.show();
    face.update();
    /* 
    
    f8b8b8 - d80800
    f7e7ff - a539ef
    
    */
    if (clicked && ((!petals.map(i=>i["clicked"]).every(i=>i) || petals.length==0))) {
        push();
        fill((lovesMe)?"#d80800":"#a539ef");
        textAlign(CENTER,CENTER);
        textStyle(BOLD);
        stroke(0);
        strokeWeight(2);
        if (petals.length==0 && !makeAllPetalsFall) {
            if (lovesMeScore>0 && lovesMeScore<3) {
                textSize(40);
                text("Loves Me",width/2,height/8);           
            } else if (lovesMeScore>=3) {
                textSize(30);
                text("Really Loves Me!",width/2,height/8);
            } else if (lovesMeScore<0 && lovesMeScore>-3) {
                textSize(40);
                text("Loves Me Not",width/2,height/8);   
            } else if (lovesMeScore<=-3) {
                textSize(30);
                text("Really Loves Me... Not!",width/2,height/8);
            }
        } else {
            textSize(40);
            text((lovesMe)?"Loves Me":"Loves Me Not",width/2,height/8);
        }
        pop();

        if (initialFrameCount>frameCount-100) {
            push();
            face.color = (lovesMe)?"red":"lime";
            textAlign(CENTER,CENTER);
            textSize(40);
            stroke(0);
            strokeWeight(1);
            text((lovesMe)?"😀":"😐",face.x,face.y+5);
            pop();
        } else {
            if (petals.length!=0) {
                push();
                face.color = "orange";
                textAlign(CENTER,CENTER);
                textSize(40);
                text("🙂",face.x,face.y+5);
                pop();
            } else {
                push();
                face.color = (lovesMe)?"red":"navy";
                textAlign(CENTER,CENTER);
                textSize(40);
                text((lovesMe)?"😍":"😭",face.x,face.y+5);
                pop();
            }
        }
    } else if (makeAllPetalsFall && petals.length==0) {
        push();
        face.color = (lovesMe)?"red":"navy";
        textAlign(CENTER,CENTER);
        textSize(40);
        text((lovesMe)?"😍":"😭",face.x,face.y+5);
        pop();
    } else {
        face.color = "orange";
        push();
        textAlign(CENTER,CENTER);
        textSize(40);
        text("🙂",face.x,face.y+5);
        pop();
    }
    if (petals.length==0) {
        push();
        fill("black");
        textAlign(CENTER,CENTER);
        textSize(20);
        text("Press any key \nor click anywhere to restart!",width/2,height/1.2);
        pop();
    }
}

function windowResized() {
    resizeCanvas(canvasWidth,canvasHeight);
}
function mousePressed() {
    for (let i = petals.length-1;i>=0;i--) {
        if (petals[i].detect()) {
            if (!petals[i].clicked) {
                lovesMe = !lovesMe;
                initialFrameCount = frameCount;
                clicked = true;
            }
            petals[i].clicked = true;
            break;
        }
    }
    if (petals.length==0) {
        restartGame();
    }
}
function keyPressed(e) {
    if (petals.length==0) {
        restartGame();
    }
}