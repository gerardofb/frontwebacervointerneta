import React from "react";
import {Parallax,ParallaxLayer} from '@react-spring/parallax'
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const Eventos = () => {
    return (
        <div className="eventos-main-container">
            <Parallax pages={12}>
                <ParallaxLayer sticky={{ start: 0, end: 12 }}>
                    <div className="eventos-main-calendar">

                        {
                            dayOfWeek.map((el, index) => {
                                return (<div className="title-calendar" key={index}><div className="content-title-calendar">
                                    {el}</div></div>)
                            })
                        }

                    </div>
                    <div className="eventos-main-calendar-content">
                        {
                            days.map((dia, indice) => {

                                return (<div className="day" key={indice}>
                                    <div className="date">
                                        <span className="day">
                                            {dia}
                                        </span>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </ParallaxLayer>
                {
                    meses && meses.length > 0 ? meses.map((mes, index) => {
                        return <ParallaxLayer offset={index} key={index} speed={1} className="mes-evento-main">
                            <h1>{mes}</h1>
                        </ParallaxLayer>
                    }) : null
                }
            </Parallax>
        </div>
    );
}

export default Eventos;