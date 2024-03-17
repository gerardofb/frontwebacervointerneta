import React, { useState, useEffect } from 'react'
import { HomeFooter } from './HomeFooter';
import { useHistory } from 'react-router-dom';
const devuelve_aleatorio=()=>{
    return Math.random()*500
}
const Pagina_404 = () => {
    const historia = useHistory();
    const [estadoAnimado, setEstadoAnimado] = useState(true);
    const [imagenaleatoria,setImagenAleatoria] = useState("/images/clock-countdown.gif?v=");
    useEffect(() => {
        setImagenAleatoria(imagenaleatoria+devuelve_aleatorio())
        setTimeout(function () {
            setEstadoAnimado(false);
        }, 11100)
    },[estadoAnimado])
    
    let claseCss = estadoAnimado ? 'pagina_vacia_animacion show' : 'pagina_vacia_animacion hide'
    return <div className='contenedor-pagina-vacia'>
         <div className='header-baja-home'>
        </div>
        <div className={claseCss}>
            <img src={imagenaleatoria} />
            <p>
                <strong>Http 404.</strong> Parece que aquí no hay nada... Favor de no quedarse mirando. <a href="#" onClick={(e)=>historia.push('/')}>Regresar al inicio</a>
            </p>
        </div>
        <HomeFooter></HomeFooter>
    </div>
}
export default Pagina_404;