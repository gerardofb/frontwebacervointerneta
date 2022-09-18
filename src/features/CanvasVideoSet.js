import React, { useRef, useEffect, useState } from 'react'

const CanvasVideoSet = props =>{
const canvasRef = useRef(null)
useEffect(() => {
const canvas =canvasRef.current;
canvas.width=1360;
canvas.height=784;
const ctx = canvas.getContext('2d');
let raf;
let colores = false;
let orientation = 0;
let orientation2 = 0;
let orientation3 = 0;
let orientation4 = 0;
let orientation5 = 0;
function get_random_color() 
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}
const straight = new Straight2(0,
      canvas.height /2,
      30,
      'rgba(0,0,0,.5)',
      50,15,2)

const straight3 =  new StraightSpecial(0,
      canvas.height/2,
      30,
      'rgba(0,0,0,.3)',
      50, 60,2)
const straight2 =  new Straight(0,
      canvas.height /2,
      2,
      'rgba(0,0,0,.5)',
      100, 30,1)
const straight4 = new Straight4(0,
      canvas.height /2,
      10,
      'rgba(0,0,0,1)',
      50,75,3)
const straight5 = new Straight5(0,
      canvas.height /2,
      3,
      'rgba(0,0,0,.5)',
      50,30,2)

const cursor = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const particle = new Particle(cursor.x, cursor.y, 0.2, 10,2)
const particle2 = new Particle(cursor.x, cursor.y, 0.2, 15,4)

 function Particle (x,y,opacity,speed,size){
  this.x = x;
  this.y = y;
  this.opacity = opacity;
  this.speed = speed;
  this.vx = speed;
  this.vy = speed;
  this.draw = ()=>{
    ctx.beginPath();
    ctx.fillStyle='#fff';
    ctx.arc(this.x, this.y, Math.random()*size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

}
}
function Straight(x, y, particleTrailWidth, strokeColor, speed, orientacionX, orientacionY) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.speed = speed;

  this.move = () => {
    
    const ls = {
      x: this.x,
      y: this.y,
    };
    if(orientation%orientacionX==0)
    this.x +=  Math.random()*speed;
    if(orientation%orientacionY==0)
    this.y +=  Math.random()*speed;
    if(this.x > canvas.width/1.11 || this.x < 0){
      this.x = 0;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = 0;
    }
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = orientation%2 == 0 ? get_random_color() : '#fff';
    ctx.lineCap='square'
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    orientation++;
    
  };
}

function Straight2(x, y, particleTrailWidth, strokeColor, speed, orientacionX, orientacionY) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.speed = speed;

  this.move = () => {
    
    const ls = {
      x: this.x,
      y: this.y,
    };
    if(orientation2%orientacionX==0)
    this.x +=  Math.random()*speed;
    if(orientation2%orientacionY==0)
    this.y +=  speed;
    if(this.x > canvas.width/1.11|| this.x < 0){
      this.x = 0;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = 0;
    }
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = orientation2%2 == 0 ? get_random_color() : '#fff';
    ctx.lineCap='square'
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    orientation2++;
    
  };
}
function StraightSpecial(x, y, particleTrailWidth, strokeColor, speed, orientacionX, orientacionY) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.speed = speed;

  this.move = () => {
    
    const ls = {
      x: this.x,
      y: this.y,
    };
    //if(orientation3%orientacionX==0)
    //this.x +=  speed;
    if(orientation3%orientacionY==0)
    this.y += Math.random()* speed;
    if(this.x > canvas.width/1.11 || this.x < 0){
      this.x = 0;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = 0;
       }
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = orientation3%2 == 0 ? this.strokeColor: '#fff';
    ctx.lineCap='square'
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    orientation3++;
    
  };
}
function Straight4(x, y, particleTrailWidth, strokeColor, speed, orientacionX, orientacionY) {
  
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.speed = speed;

  this.move = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    if(orientation%orientacionX==0)
    this.x +=  Math.random()*speed;
    if(orientation%orientacionY==0)
    this.y +=  Math.random()*speed;
    if(this.x > canvas.width/1.11 || this.x < 0){
      this.x = 0;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = 0;
    }
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = orientation4%2 == 0 ? get_random_color() : '#fff';
    ctx.lineCap='square'
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    orientation4++;
    
  };
}

function Straight5(x, y, particleTrailWidth, strokeColor, speed, orientacionX, orientacionY) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.speed = speed;

  this.move = () => {
    
    const ls = {
      x: this.x,
      y: this.y,
    };
    if(orientation%orientacionX==0)
    this.x +=  Math.random()*speed;
    if(orientation%orientacionY==0)
    this.y +=  Math.random()*speed;
    if(this.x > canvas.width/1.11 || this.x < 0){
      this.x = 0;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = 0;
    }
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = orientation5%2 == 0 ? get_random_color() : '#fff';
    ctx.lineCap='square'
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    orientation5++;
    
  };
}
const line = {
  x: 100,
  y: 2,
  vx: 5,
  vy: 2,
  color: 'blue',
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x+canvas.width,this.y)
    ctx.lineTo(this.x,this.y)
    ctx.closePath()
    ctx.strokeStyle=orientation%5 == 0 ?
      get_random_color() : "#eee"
    ctx.lineWidth=1.5;
    ctx.stroke()
    
  }
};
const line2 = {
  x: canvas.width,
  y: canvas.height,
  vx: 5,
  vy: 2,
  color: 'blue',
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x+canvas.width,this.y)
    ctx.lineTo(this.x,this.y)
    ctx.closePath()
    ctx.strokeStyle=orientation%5 == 0 ?
      "fff" : "000"
    ctx.lineWidth=20;
    ctx.stroke()
    
  }
};
function draw() {
  
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  particle.draw();                particle.x+=particle.vx;
  particle.y+=particle.vy;
  particle.vx+=Math.random()*particle.speed;
  particle.vy+=Math.random()*particle.speed;
  
  if(particle.x +particle.vx > canvas.width/1.11 || particle.x + particle.vx < 0){
    particle.vx = -particle.vx;
    particle.x = cursor.x;
  }   
   if(particle.y +particle.vy > canvas.height || particle.y + particle.vy < 0){
    particle.vy = -particle.vy;
    particle.y = cursor.y;
   }
  particle2.draw();                particle2.x+=particle2.vx;
  particle2.y+=particle2.vy;
  particle2.vx+=Math.random()*particle2.speed;
  particle2.vy+=Math.random()*particle2.speed;
  
  if(particle2.x +particle2.vx > canvas.width/1.11 || particle2.x + particle2.vx < 0){
    particle2.vx = -particle2.vx;
    particle2.x = cursor.x;
  }   
   if(particle2.y +particle2.vy > canvas.height || particle2.y + particle2.vy < 0){
    particle2.vy = -particle2.vy;
    particle2.y = cursor.y;
   }
  line.draw();
  line.x += line.vx;
  line.y += line.vy;
  line.vx += Math.random()*.99;
  line.vy += .15;
  
  line2.draw();
  line2.x -= line2.vx;
  line2.y -= line2.vy;
  line2.vx += .99;
  line2.vy += .15;

  if (line.y + line.vy > canvas.height ||
      line.y + line.vy < 0) {
    line.vy -= line.vy;
    line.y =2
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }
  if (line.x + line.vx > canvas.width ||
      line.x + line.vx < 0) {
    line.vx = -line.vx;
  }
  
  if (line2.y + line2.vy > canvas.height ||
      line2.y + line2.vy < 0) {
    line2.vy -= line2.vy;
    line2.y =2
    ctx.clearRect(0,0,canvas.width/1.11,canvas.height)
  }
  if (line2.x + line2.vx > canvas.width ||
      line2.x + line2.vx < 0) {
    line2.vx = -line2.vx;
  }
  straight2.move()
  straight.move()
  straight3.move()
  straight4.move()
  straight5.move()
  raf = window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw)


line.draw();

    return () => {
      window.cancelAnimationFrame(draw)
    }
  })
  return <div style={{borderRadius:'50px', margin:'1em', padding:'3em 1em', border:'2px solid black'}}><canvas style={{background:'black', borderRadius:'50px'}} ref={canvasRef} /></div>
}

export default CanvasVideoSet;