const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.fillStyle = "green";
ctx.strokeStyle = "green";

console.log(ctx);

class particles{
    constructor(rad){
        this.radius = 2;
        this.angularPosn = rad;
        this.phase= 0;
        this.speed  = 0;
        this.axisMid = 200;
        this.x = 0;
        this.y = 0;
    }
    drawAxis(){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.width/2);
        ctx.rotate(this.angularPosn);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(2*this.axis,0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawBall(){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.width/2);
        ctx.rotate(this.angularPosn);
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update(){       
        this.phase += 0.01;
        this.x = this.axisMid+this.axisMid*Math.sin( this.phase);
    }
}





let time = 0;
let particleArray = [];
let rad = 0;

function generate(){
    particleArray.push(new particles(rad));
    rad += Math.PI/2;
}

function render(){
    particleArray.forEach((e)=>{
        e.drawAxis();
        e.drawBall();
        e.update();
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    time += 0.008;
    generate();
    render();
    requestAnimationFrame(animate);
}
animate();
// console.log(ctx);