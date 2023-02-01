import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { HomeFooter } from './HomeFooter';
const devuelve_aleatorio=()=>{
    return Math.random()*500
}
const Pagina_404 = () => {
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
        <div style={{ backgroundColor: 'black', height: '100px' }}>
            <NavBar></NavBar>
        </div>
        <div className={claseCss}>
            <img src={imagenaleatoria} />
            <p>
                Parece que aquí no hay nada... Favor de no quedarse mirando.
            </p>
        </div>
        <HomeFooter></HomeFooter>
    </div>
}
export default Pagina_404;