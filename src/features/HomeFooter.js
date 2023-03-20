import React, { useState } from 'react'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.png${wrap ? ')' : ''}`

const HomeFooter = (props)=>{
    return (
        <div className='footer-site footer-site-black' style={{WebkitBorderTopRightRadius:'20px', width:'100%', margin:'auto', borderTopLeftRadius:'20px', opacity:'100%'}}>
            <div className='empty-container'></div>
            <div className='container-list-red'>
            <ul className='footer-list-red'>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Vínculos
                </h3>
                </li>
                <li style={{fontSize:'small'}}>
                    Acerca de
                </li>
                <li style={{fontSize:'small'}}>
                    Contacto
                </li>
                <li style={{fontSize:'small'}}>
                    Acuerdo de privacidad
                </li>

            </ul>
            <ul className='footer-list-red'>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Eventos
                </h3>
                </li>
                <li style={{fontSize:'small', color:'red'}}>
                    Suscribirse
                </li>
            </ul>
            <ul className='footer-list-red'>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Categorías
                </h3>
                </li>
                <li style={{fontSize:'small'}}>
                    Más visitadas
                </li>
                <li style={{fontSize:'small'}}>
                    Podcasts
                </li>
                <li style={{fontSize:'small'}}>
                    Autobiográficos
                </li>
            </ul>
            <ul className='footer-list-red'>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Salas de chat
                </h3>
                </li>
            </ul>
            </div>
            <div className='logos-patrocinadores-footer'>
                <div className='logo-imcine'>

                </div>
                <div className='logo-focine'>
                    
                </div>
                <div className='logo-sec-cultura'>
                    
                </div>
            </div>    
        </div>
    )
}
export {HomeFooter}