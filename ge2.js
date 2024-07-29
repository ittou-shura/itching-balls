const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
console.log(canvas);
ctx.fillStyle = "red";
ctx.strokeStyle = "red";


class particles{
    constructor(rad,phase){
        this.radius = 4;
        this.angularPosn = rad;
        this.phase= phase;
        this.speed  = 0;
        this.axisMid = 200;
        this.x = 0;
        this.y = 0;
        this.pos = {x:0,y:0};
    }
    drawAxis(){
        ctx.save();
        ctx.translate(canvas.width*0.5, canvas.height*0.5);
        ctx.rotate(this.angularPosn);
        ctx.beginPath();
        ctx.lineWidth = 0.05;
        ctx.moveTo(0,0);
        ctx.lineTo(2*this.axisMid,0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawBall(){
        ctx.save();
        ctx.translate(canvas.width*0.5, canvas.height*0.5);
        ctx.rotate(this.angularPosn);
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update(){        
        this.x = this.axisMid+this.axisMid*Math.sin( time + this.phase);
        this.pos.x = this.x*Math.cos(this.angularPosn) + canvas.width/2;
        this.pos.y = this.x*Math.sin(this.angularPosn) + canvas.height/2 ;
    }
}





let time = 0;
let particleArray = [];
let rad = 0;
let phase = 0;

function generate(){
    if(particleArray.length < 80){
    particleArray.push(new particles(rad,phase));
    rad += Math.PI/50;
    phase += Math.PI*0.04;
    }
}

function render(){
    particleArray.forEach((e)=>{
        // e.drawAxis();
        // e.drawBall();
        e.update();
    });
    for(let i = 0 ; i < particleArray.length ; i ++){
        for(let j = i ; j < particleArray.length; j++){
            if(Math.sqrt((Math.pow(particleArray[i].pos.x-particleArray[j].pos.x),2) + (Math.pow(particleArray[i].pos.y-particleArray[j].pos.y),2)) < 130){
            ctx.save();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].pos.x, particleArray[i].pos.y);
            ctx.lineTo(particleArray[j].pos.x,particleArray[j].pos.y);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            }
        }
    }
}

// function destroy(){
//     if(particleArray.length > 10){
//         particleArray.pop();
//     }
// }
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    time += 0.008;
    generate();
    render();
    // destroy();
    console.log(particleArray.length);
    setTimeout(function(){requestAnimationFrame(animate)}, 0);
}
animate();
// console.log(ctx);