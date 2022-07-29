import React, {useContext} from 'react'
import {
    faSearch,
    faArrowRight
  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemesContext } from '../ThemeProvider'

const SearchBar = (props)=>{
    const {styles} = useContext(ThemesContext);
    return(
        <div className={styles.SearchBarMain}>
        <div style={{display:'flex', textAlign:'left', verticalAlign:'center', maxWidth:'100%'}}>
            <label className={styles.SearchBarBtn} style={{gridColumn:'1', fontSize:'30px', float:'left'}}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></label>&nbsp;
            <input type="text" style={{ float:'left', borderRadius:'5px', minHeight:'30px', minWidth:'30rem', width:'100%', border:'1px solid grey', gridColumn:'2'}}></input>
        </div>
        <p>Ir a Búsqueda avanzada&nbsp;<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></p>
        </div>
    )
}
export default SearchBar;