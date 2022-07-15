import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { faGamepad, faXmark, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from './SearchBar'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.svg${wrap ? ')' : ''}`

const paletas = [
    { title: 'basic', colors: ['#253237', '#7291d8', '#1f3871', '#5fa3a7', '#274546'] },
    { title: 'aesthetic', colors: ['#66545e', '#a39193', '#aa6f73', '#eea990', '#f6e0b5'] },

]

const NavBar = (props) => {
    const [showTemas, setShowTemas] = useState(false);
    const [paletaActiva, setPaletaActiva] = useState(paletas[0]);
    const switchPaleta = (direccion) => {
        let x = paletas.findIndex(x => x.title == paletaActiva.title);
        let indice = x;
        direccion ? indice++ : indice--;
        console.log('estableciendo paleta en ', indice);
        if (indice > paletas.length - 1 || indice < 0) {
            indice = 0;
        }
        setPaletaActiva(paletas[indice]);
    }
    return <><div className='navbar-principal-basic navbar-principal'><Link to='/'><img src={url('logo_blanco_interneta')} style={{ height: '100px', float: 'left' }} /><h2 style={{ float: 'left', color: 'white' }}>Acervo Audiovisual Interneta</h2></Link>
        <div className='header-control-temas-basic'><button onMouseEnter={(e => setShowTemas(true))}
            title='control temático del sitio'><FontAwesomeIcon icon={faGamepad} /></button></div><SearchBar></SearchBar></div>
        <div className='container-tematica'>
            <div className={!showTemas ? 'tematica-sitio tematica-hidden' : 'tematica-sitio tematica-show'}>
                <div className='close-tematica'><FontAwesomeIcon icon={faXmark} onClick={(e) => setShowTemas(false)} /></div>
                <div className='content-tematica-sitio'>
                    <div className='control-paletas left' onClick={(e) => switchPaleta(false)}><FontAwesomeIcon icon={faAngleLeft} /></div>

                    <div className='contenedor-colores-paleta'>
                        {
                            paletaActiva && paletaActiva.colors.map((color, index) => {
                                return <div className='color-paleta' style={{ background: color }}></div>
                            })
                        }
                    </div>

                    <div className='control-paletas right' onClick={(e) => switchPaleta(true)}><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>
            </div>
        </div>
    </>
}
export default NavBar;
