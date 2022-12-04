import React, {useContext, useState} from 'react'
import {
    faSearch,
    faArrowRight
  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemesContext } from '../ThemeProvider'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SearchBar = (props)=>{
    const historia = useHistory();
    const {styles} = useContext(ThemesContext);
    const navigateBusqueda = (evento)=>{
        if(evento.keyCode == 13){
            historia.push('/BusquedaEstandar?q='+encodeURIComponent(busquedaSimple))
        }
    }
    const [busquedaSimple,setBusquedaSimple]=useState('');
    return(
        <div className={styles.SearchBarMain}>
        <div style={{display:'flex', textAlign:'left', verticalAlign:'center', maxWidth:'100%'}}>
            <label className={styles.SearchBarBtn} style={{gridColumn:'1', fontSize:'30px', float:'left'}}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></label>&nbsp;
            <input type="text" className='search-bar-principal-input' onChange={(e)=>setBusquedaSimple(e.target.value)} onKeyDown={(e)=>navigateBusqueda(e)} value={busquedaSimple}></input>
        </div>
        <p><Link to='/BusquedaEstandar' style={{textDecoration:'none', color:"white"}}>Ir a Búsqueda avanzada&nbsp;<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></Link></p>
        </div>
    )
}
export default SearchBar;