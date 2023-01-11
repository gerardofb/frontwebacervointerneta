import React, { useRef, useEffect } from 'react'

const CanvasTitleCategorie = props => {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 1360;
        canvas.height = 200;
        const ctx = canvas.getContext('2d')
        const reel = new Reel()
        reel.initialize()
        function Reel() {
            this.initialize = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                const miImgLeft = new Image();

                miImgLeft.onload = function () {
                    ctx.drawImage(miImgLeft, (canvas.width / 2) - 118, 19, 35, 35)
                }
                miImgLeft.src = '/images/circlecat.png';
                const miImgRight = new Image();

                miImgRight.onload = function () {
                    ctx.drawImage(miImgRight, (canvas.width / 2) + 48, 19, 35, 35)
                }
                miImgRight.src = '/images/circlecat.png';
                const miImgCenter = new Image();

                miImgCenter.onload = function () {
                    ctx.drawImage(miImgCenter, (canvas.width / 2)-48, 88, 58, 58)
                }
                miImgCenter.src = '/images/circlecat.png';
               
                ctx.font = "120px Helvetica"
                ctx.fillStyle = '#2B9230'
                ctx.strokeStyle = "#2B9230"
                ctx.lineWidth = 4
                ctx.beginPath()
                ctx.moveTo(0, canvas.height - 10);
                ctx.lineTo(canvas.width, canvas.height - 10)
                ctx.stroke();
                ctx.fillText("CATEG", (canvas.width / 2) - 490, 150)
                ctx.fillText("RIAS", (canvas.width / 2) + 50, 150)
                ctx.beginPath();
                ctx.moveTo(0, 10)
                ctx.lineTo((canvas.width / 2) - 100, 10)

                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) - 100, 35, 25, 1.5 * Math.PI, 0)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) - 75, 35)
                ctx.lineTo((canvas.width / 2) - 60, 130)
                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) - 20, 125, 40, 0, 1 * Math.PI)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) + 20, 125)
                ctx.lineTo((canvas.width / 2) + 40, 33)
                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) + 65, 35, 25, 1 * Math.PI, 1.5 * Math.PI)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) + 65, 10)
                ctx.lineTo(canvas.width, 10)
                ctx.stroke()
            }

            this.move = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                const miImgLeft = new Image();

                miImgLeft.onload = function () {
                    ctx.drawImage(miImgLeft, (canvas.width / 2) - 138, 19, 35, 35)
                }
                miImgLeft.src = '/images/circlecat.png';
                const miImgRight = new Image();

                miImgRight.onload = function () {
                    ctx.drawImage(miImgRight, (canvas.width / 2) + 58, 19, 35, 35)
                }
                miImgRight.src = '/images/circlecat.png';
                const miImgCenter = new Image();

                miImgCenter.onload = function () {
                    ctx.drawImage(miImgCenter, (canvas.width / 2)-48, 88, 58, 58)
                }
                miImgCenter.src = '/images/circlecat.png';
                ctx.font = "120px Helvetica"
                ctx.fillStyle = '#2B9230'
                ctx.strokeStyle = "#2B9230"
                ctx.lineWidth = 4
                ctx.beginPath()
                ctx.moveTo(0, canvas.height - 10);
                ctx.lineTo(canvas.width, canvas.height - 10)
                ctx.stroke();
                ctx.fillText("CATEG", (canvas.width / 2) - 510, 150)
                ctx.fillText("RIAS", (canvas.width / 2) + 60, 150)
                ctx.beginPath();
                ctx.moveTo(0, 10)
                ctx.lineTo((canvas.width / 2) - 120, 10)
                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) - 120, 35, 25, 1.5 * Math.PI, 1.89 * Math.PI)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) - 96, 26)
                ctx.lineTo((canvas.width / 2) - 62, 130)
                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) - 22, 125, 40, 0.07 * Math.PI, 0.95 * Math.PI)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) + 18, 134)
                ctx.lineTo((canvas.width / 2) + 50, 30)
                ctx.stroke()
                ctx.beginPath()
                ctx.arc((canvas.width / 2) + 75, 35, 25, 1.08 * Math.PI, 1.5 * Math.PI)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo((canvas.width / 2) + 75, 10)
                ctx.lineTo(canvas.width, 10)
                ctx.stroke()
                ctx.font = "18px Helvetica"
                ctx.fillStyle = 'black'
                ctx.fillText("Explorar...",(canvas.width/2)-55,182)
            }
        }
        canvas.addEventListener('mouseover', function () {
            reel.move()
        })
        canvas.addEventListener('mouseout', function () {
            reel.initialize()
        })
    }, [])

    return <canvas ref={canvasRef} />
}

export default CanvasTitleCategorie;