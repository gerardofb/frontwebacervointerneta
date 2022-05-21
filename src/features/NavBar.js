import React from 'react'
import {Link} from 'react-router-dom'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.svg${wrap ? ')' : ''}`

const NavBar =(props)=>{
    return <div style={{width:'40%', backgroundColor:'black', float:'left'}}><Link to='/'><img src={url('logo_blanco_interneta')} style={{height:'100px', float:'left'}} /><h1 style={{float:'left',color:'white'}}>Acervo Audiovisual Interneta</h1></Link></div>
}
export default NavBar;
