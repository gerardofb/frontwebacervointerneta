import React, { useContext, useEffect, useState } from 'react'
import {
    faSearch,
    faArrowRight
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemesContext } from '../ThemeProvider'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SearchBar = (props) => {
    const historia = useHistory();
    const ruta = useLocation();
    const { styles } = useContext(ThemesContext);
    const navigateBusqueda = (evento) => {
        if (evento.keyCode == 13) {
            historia.push('/BusquedaEstandar?q=' + encodeURIComponent(busquedaSimple))
        }
    }
    const [busquedaSimple, setBusquedaSimple] = useState('');
    const [deshabilitar, setDeshabilitar] = useState(false);
    useEffect(() => {
        console.log('en página para barra de búsqueda', ruta.pathname)
        if (ruta.pathname == '/BusquedaEstandar') {
            setDeshabilitar(true)
        }
        else {
            setDeshabilitar(false)
        }
    }, [ruta])
    return (
        <div className={styles.SearchBarMain}>
            <div style={{ display: 'flex', textAlign: 'left', verticalAlign: 'center', maxWidth: '100%' }}>
                <label className={styles.SearchBarBtn} style={{ gridColumn: '1', fontSize: '30px', float: 'left' }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></label>&nbsp;
                {!deshabilitar ?
                    <input type="text" className='search-bar-principal-input' onChange={(e) => setBusquedaSimple(e.target.value)} onKeyDown={(e) => navigateBusqueda(e)} value={busquedaSimple}></input>:
                    <input type="text" disabled className='search-bar-principal-input' onChange={(e) => setBusquedaSimple(e.target.value)} onKeyDown={(e) => navigateBusqueda(e)} value={busquedaSimple}></input>}
            </div>
            <p><Link to='/BusquedaEstandar' style={{ textDecoration: 'none' }}>Ir a Búsqueda avanzada&nbsp;<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></Link></p>
        </div>
    )
}
export default SearchBar;