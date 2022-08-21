import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { faGamepad, faXmark, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StaticSearchBar from './StaticSearchBar'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.svg${wrap ? ')' : ''}`



const StaticNavBar = (props) => {
    
    
    return (
        <>
        <div className='navbar-principal-static navbar-principal'><Link to='/'><img src={url('logo_blanco_interneta')} style={{ height: '100px', float: 'left', marginLeft:'1.3em' }} /><h2 style={{ float: 'left', color: 'white' }}>Acervo Audiovisual Interneta</h2></Link>
        <StaticSearchBar></StaticSearchBar></div>
        </>
    )
}
export default StaticNavBar;
