import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  const {draw,...rest} = props;
  const canvasRef = useRef(null)
  
  useEffect(() => {
    console.log('animando canvas');
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      console.log('en animación de canvas ',frameCount)
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;