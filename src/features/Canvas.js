import React, { useRef, useEffect } from 'react'

const Canvas = props =>{
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 1360;
    canvas.height = 784;
    let win;
const context = canvas.getContext('2d')
const cursor = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const particles = [];
const particle = new Particle(cursor.x, cursor.y, 0.5, 6)
const particle2 = new Particle(cursor.x, cursor.y, 0.5, 3)
const straight = new Straight(canvas.width / 2,
      canvas.height /2,
      .5,
      '#fff',
      90)
const straight2 = new Straight(10,
      0,
      1,
      '#fff',
     150, true)
const draw=()=>{
  
  context.clearRect(0,0,canvas.width, canvas.height)
  particle.draw();                particle.x+=particle.vx;
  particle.y+=particle.vy;
  particle.vx+=Math.random()*particle.speed;
  particle.vy+=Math.random()*particle.speed;
  
  if(particle.x +particle.vx > canvas.width || particle.x + particle.vx < 0){
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
  
  if(particle2.x +particle2.vx > canvas.width || particle2.x + particle2.vx < 0){
    particle2.vx = -particle2.vx;
    particle2.x = cursor.x;
  }   
   if(particle2.y +particle2.vy > canvas.height || particle2.y + particle2.vy < 0){
    particle2.vy = -particle2.vy;
    particle2.y = cursor.y;
   }
  straight.move();
  straight2.move()
  win = requestAnimationFrame(draw);
}
const generateParticles = (cantidad)=>{
  for(let i = 0; i < cantidad; i++){
     particles[i]=new Particle(cursor.x, cursor.y, 0.5, 6)
  }
}
function Particle (x,y,opacity,speed){
  this.x = x;
  this.y = y;
  this.opacity = opacity;
  this.speed = speed;
  this.vx = speed;
  this.vy = speed;
  this.draw = ()=>{
    context.beginPath();
    context.fillStyle='#fff';
    context.arc(this.x, this.y, Math.random()*6, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}
}
function Straight(x, y, particleTrailWidth, strokeColor, speed, orientacion) {
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
    if(!orientacion)
    this.x +=  Math.random()*speed;
    
    this.y +=  Math.random()*speed;
    if(this.x > canvas.width || this.x < 0){
      this.x = canvas.width/3;
    }
    if(this.y > canvas.height || this.y < 0){
      this.y = !orientacion ?canvas.height/3 : 0;
    }
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}
window.requestAnimationFrame(draw);


    return () => {
      window.cancelAnimationFrame(draw)
    }
  }, [])

  return <canvas ref={canvasRef}  />
}

export default Canvas;