import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { HomeFooter } from '../HomeFooter';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const historia = useHistory();
    useEffect(() => {
        localStorage.removeItem("credencial");
        setTimeout(function () {
            window.location = '/';
        }, 5000)
    })
    
    
    return <div className='contenedor-logout'>
        <div style={{ backgroundColor: 'black', height: '100px' }}>
            <NavBar></NavBar>
        </div>
        <div style={{margin:'2em'}}>
            <img src="/images/Reload-transparent.gif" alt="cargando" />
            <p>
                Cerrando su sesión, espere...
            </p>
        </div>
        <HomeFooter></HomeFooter>
    </div>
}
export default Logout;