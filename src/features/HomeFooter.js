import React, { useState } from 'react'

const HomeFooter = (props)=>{
    return (
        <div className='footer-site footer-site-black' style={{WebkitBorderTopRightRadius:'20px', width:'99%', margin:'auto', borderTopLeftRadius:'20px', opacity:'65%'}}>
            <div style={{textAlign:'left',float:'none', color:'white', marginLeft:'5%', fontSize:'large'}}>
                <h2>
                    Acervo Audiovisual Interneta
                </h2>
            </div>
            <ul className='footer-list-red' style={{float:'left', color:'red', margin:'3%', listStyle:'none', textAlign:'left'}}>
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
            <ul className='footer-list-red' style={{float:'left', margin:'3%', listStyle:'none', textAlign:'left', color:'red'}}>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Eventos
                </h3>
                </li>
                <li style={{fontSize:'small', color:'red'}}>
                    Suscribirse
                </li>
            </ul>
            <ul className='footer-list-red' style={{float:'left', margin:'3%', listStyle:'none', textAlign:'left', color:'red'}}>
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
            <ul className='footer-list-red' style={{float:'left', margin:'3%', listStyle:'none', textAlign:'left', color:'red'}}>
                <li>
                <h3 style={{borderBottom:'2px red solid'}}>
                    Salas de chat
                </h3>
                </li>
            </ul>
            <div style={{clear:'both'}}></div>
        </div>
    )
}
export {HomeFooter}