import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { faGamepad, faXmark, faAngleRight, faAngleLeft, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from './SearchBar'
import { ThemesContext } from '../ThemeProvider'
import SideBar from './Menu/Sidebar';
import styled from 'styled-components';
import SubMenu from './Menu/Submenu';
import { getMenuData } from './Menu/menuAPI'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.svg${wrap ? ')' : ''}`

const paletas = [
    { title: 'basic', colors: ['#253237', '#7291d8', '#1f3871', '#5fa3a7', '#274546'], dark: false, indice: 0 },
    { title: 'aesthetic', colors: ['#66545e', '#a39193', '#aa6f73', '#eea990', '#f6e0b5'], dark: false, indice: 1 },
    { title: 'basicDark', colors: ['#253237', '#7291d8', '#1f3871', '#5fa3a7', '#274546'], dark: true, indice: 2 },
    { title: 'aestheticDark', colors: ['#66545e', '#a39193', '#aa6f73', '#eea990', '#f6e0b5'], dark: true, indice: 3 },

]

const NavBar = (props) => {
    const [showTemas, setShowTemas] = useState(false);
    const [paletaActiva, setPaletaActiva] = useState(paletas[0]);
    const [darkMode, setDarkMode] = useState(false);
    const switchDarkMode = (bandera) => {
        setDarkMode(bandera);
        let lapaleta = paletas.filter(x => x.dark == bandera)[0]
        console.log('estableciendo la siguiente paleta ', lapaleta.title);
        updateTheme(lapaleta.title);

    }
    const switchPaleta = (direccion) => {

        let x = paletas.find(x => x.dark === darkMode && x.title === paletaActiva.title) != undefined ?
            paletas.find(x => x.dark === darkMode && x.title === paletaActiva.title).indice : paletas.find(x => x.dark === darkMode).indice;
        console.log('previo estableciendo paleta en ', x);

        let indice = x;
        direccion ? indice++ : indice--;

        if (indice > paletas.length - 1 || indice < 0) {
            indice = 0;
        }
        console.log('estableciendo paleta en ', indice);
        setPaletaActiva(paletas[indice]);
    }
    const { styles, updateTheme } = useContext(ThemesContext);
    const estableceTemaAdecuado = () => {
        let lapaleta = paletas.find(x => x.dark === darkMode && x.title === paletaActiva.title) != undefined ?
            paletas.find(x => x.dark === darkMode && x.title === paletaActiva.title) : paletas.find(x => x.dark === darkMode);
        updateTheme(lapaleta.title)
    }
    const logotipo = !darkMode ? 'logo_blanco_interneta' : 'logo_negro_interneta';
    return (
        <>
            <div className={styles.NavbarPrincipal}><Link to='/'><img src={url(logotipo)} style={{ height: '100px', float: 'left' }} /><h2 style={{ float: 'left' }}>Acervo Audiovisual Interneta</h2></Link>
                <div className='container-tematica'>
                    <div className={!showTemas ? 'tematica-sitio tematica-hidden' : 'tematica-sitio tematica-show'}>
                        <div className='close-tematica'><FontAwesomeIcon icon={faXmark} onClick={(e) => setShowTemas(false)} /></div>
                        <div className='control-temas-claros-oscuros'>
                            <span title='cambiar entre tema claro y oscuro'>
                                {
                                    !darkMode ? <FontAwesomeIcon icon={faSun} onClick={(e) => switchDarkMode(true)} /> :
                                        <FontAwesomeIcon icon={faMoon} onClick={(e) => switchDarkMode(false)} />
                                }
                            </span>
                        </div>
                        <div className='content-tematica-sitio'>
                            <div className='control-paletas left' onClick={(e) => switchPaleta(false)}><FontAwesomeIcon icon={faAngleLeft} /></div>

                            <div className='contenedor-colores-paleta' onClick={(e) => estableceTemaAdecuado()}>
                                {

                                    paletaActiva && paletaActiva.colors.map((color, index) => {
                                        return <div className='color-paleta' key={index} style={{ background: color }}></div>
                                    })

                                }
                            </div>

                            <div className='control-paletas right' onClick={(e) => switchPaleta(true)}><FontAwesomeIcon icon={faAngleRight} /></div>
                        </div>
                    </div>
                </div>
                <div className={styles.ControlTematicoBtn}><button onMouseEnter={(e => setShowTemas(true))}
                    title='control temático del sitio'><FontAwesomeIcon icon={faGamepad} /></button></div><SearchBar></SearchBar></div>

        </>
    )
}
export default NavBar;
