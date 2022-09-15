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
const line = {
  x: 100,
  y: 2,
  vx: 5,
  vy: 2,

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x+canvas.width,this.y)
    ctx.lineTo(this.x,this.y)
    ctx.closePath()
    ctx.strokeStyle='rgba(255, 255, 255, 0.5)';
    ctx.lineWidth=Math.floor(Math.random()*6);
    ctx.stroke()
    
  }
};

function draw() {
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  line.draw();
  line.x += line.vx;
  line.y += line.vy;
  line.vx += .99;
  line.vy += .25;

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