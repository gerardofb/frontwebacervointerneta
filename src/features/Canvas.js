import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = ctx => {
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(50, 100, 20, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here
    draw(context)
  }, [draw])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas;