import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { getBaseAdressApi } from "../MainAPI";
import HelmetMetaData from "../HelmetMetaData";

const HomeEvents = (props) => {
    const location = useLocation();
    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        const request_next_evt = axios.get(`${getBaseAdressApi()}api/visitasproximoseventos/`).then((response) => {
            const salidaevt = response.data.map((el, idx) => {
                return {
                    "titulo": el.titulo,
                    "id": el.id,
                    "fecha_inicio": el.fechainicio,
                    "duracion": el.duracion + " minutos",
                    "img": el.contenedor_img,
                    "vinculo": "/Eventos/" + el.id,
                }
            });
            setEventos(salidaevt);
        })
    }, [eventos]);
    return (
        
            eventos.length > 0 ? 
        <div className="wrapper_home_events"> <h1 style={{ color: 'white', gridColumn: 1 }}>Eventos próximos</h1><p style={{ gridColumn: 2, verticalAlign: "bottom", color: "white" }}>{eventos.length}&nbsp;{eventos.length > 1 ? "eventos" : "evento" }</p>
            <div className="home_events">
                {
                    eventos.map((el, idx) => {
                        console.log(el.vinculo,"vinculo")
                        return <div className="home_events_item">
                            <Link to={el.vinculo} style={{ textDecoration: 'none', color: "white" }}>
                                <div className="content_text_events_home_item"><h4>{el.titulo}</h4>
                                    <p>Comienza el {el.fecha_inicio} y tiene una duración de {el.duracion}.</p>
                                </div>
                                <img alt={el.titulo} src={el.img}></img>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
        : null
    )
}
export default HomeEvents;