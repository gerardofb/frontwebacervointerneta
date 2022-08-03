import React from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import NavBar from '../NavBar';
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
const cssMeses = ['ene', 'feb', 'mar', 'abr','may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const Eventos = () => {
    return (
        <div>
            <Parallax pages={13} className="eventos-main-container">
                <ParallaxLayer offset={0} speed={0}>
                    <div style={{ backgroundColor: 'black', height: '100px' }}>
                        <NavBar></NavBar>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0.16} speed={1}>
                    <div style={{height:'85vh', background:'#feecb8'}} />
                </ParallaxLayer>
                <ParallaxLayer sticky={{ start: 1, end: 12 }}>
                    <div className="calendario-eventos-principal">
                        <header>
                            <p>Enero 2022</p>
                        </header>
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
                    </div>
                </ParallaxLayer>
                {
                    meses && meses.length > 0 ? meses.map((mes, index) => {
                        return <ParallaxLayer offset={index+1} key={index} speed={1}>
                            <div className={"mes-evento-main "+cssMeses[index]}>
                            <h1>{mes}</h1>
                            </div>
                        </ParallaxLayer>
                    }) : null
                }
            </Parallax>
        </div>
    );
}

export default Eventos;