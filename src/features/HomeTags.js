import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseAdressApi } from './MainAPI';
function random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`

const HomeTags = (props) => {
    const [arreglotags, setArreglotags] = useState([]);
    const [habilitarLoader,setHabilitarLoader] = useState(false);
    useEffect(()=>{
    if (arreglotags.length == 0) {
        setHabilitarLoader(true);
        const peticionTags = axios.post(`${getBaseAdressApi()}api/getpopulartags/`).then(response => {
            let tags = response.data["tags"].map((e, index) => {
                return e["tag_autor"].split('|')[0];
            });
            setArreglotags(tags);
            setHabilitarLoader(false);
        }).catch(err => {
            console.log('error obteniendo tags principales ', err);
            setHabilitarLoader(false);
        });
    }},[arreglotags]);
    // const arreglotags = [
    //     'punk',
    //     'rock',
    //     'proyecto',
    //     'vida',
    //     'grabación',
    //     'vibrante',
    //     'salud',
    //     'nopal',
    //     'drogas',
    //     'marihuana',
    //     'colección',
    //     'antropología',
    //     'ska',
    //     'comunidad',
    //     'barrio',
    //     'mictlan',
    //     'protesta',
    //     'programa',
    //     'producción',
    //     'colaboracón',
    //     'tránsito',
    //     'policía',
    //     'memoria',
    //     'chilango',
    //     'gresca',
    //     'tenis',
    //     'ultravital',
    //     'desobediencia',
    //     'visibilidad',
    //     'latino',
    //     'lágrimas',
    //     'historia',
    //     'radio',
    //     'pasaje',
    //     'cinta',
    //     'cassete',
    //     'transbordar',
    //     'viaje',
    //     'serie',
    //     'vigilantes',
    //     'testimonio',
    //     'menjunje',
    //     'electrónica',
    //     'firma',
    //     'graffiti',
    //     'noche',
    //     'estudio',
    //     'punk',
    //     'rock',
    //     'proyecto',
    //     'vida',
    //     'grabación',
    //     'vibrante',
    //     'salud',
    //     'nopal',
    //     'drogas',
    //     'marihuana',
    //     'colección',
    //     'antropología',
    //     'ska',
    //     'comunidad',
    //     'barrio',
    //     'mictlan',
    //     'protesta',
    //     'programa',
    //     'producción',
    //     'colaboracón',
    //     'tránsito',
    //     'policía',
    //     'memoria',
    //     'chilango',
    //     'gresca',
    //     'tenis',
    //     'ultravital',
    //     'desobediencia',
    //     'visibilidad',
    //     'latino',
    //     'lágrimas',
    //     'historia',
    //     'radio',
    //     'pasaje',
    //     'cinta',
    //     'cassete',
    //     'transbordar',
    //     'viaje',
    //     'serie',
    //     'vigilantes',
    //     'testimonio',
    //     'menjunje',
    //     'electrónica',
    //     'firma',
    //     'graffiti',
    //     'noche',
    //     'estudio',
    //     'punk',
    //     'rock',
    //     'proyecto',
    //     'vida',
    //     'grabación',
    //     'vibrante',
    //     'salud',
    //     'nopal',
    //     'drogas',
    //     'marihuana',
    //     'colección',
    //     'antropología',
    //     'ska',
    //     'comunidad',
    //     'barrio',
    //     'mictlan',
    //     'protesta',
    //     'programa',
    //     'producción',
    //     'colaboracón',
    //     'tránsito',
    //     'policía',
    //     'memoria',
    //     'chilango',
    //     'gresca',
    //     'tenis',
    //     'ultravital',
    //     'desobediencia',
    //     'visibilidad',
    //     'latino',
    //     'lágrimas',
    //     'historia',
    //     'radio',
    //     'pasaje',
    //     'cinta',
    //     'cassete',
    //     'transbordar',
    //     'viaje',
    //     'serie',
    //     'vigilantes',
    //     'testimonio',
    //     'menjunje',
    //     'electrónica',
    //     'firma',
    //     'graffiti',
    //     'noche',
    //     'estudio',
    // ];
    return (
        <div style={{ witdh: '90%', margin: 'auto', color: 'white' }}>
            <div style={{ marginTop: '150px' }}>
                <h1 style={{ color: 'white' }}>Tags recientes</h1>
                <svg height="30" width="1280">
                    <line x1="50" y1="30" x2="1280" y2="30" style={{ stroke: 'rgb(128,128,128)', strokeWidth: '2' }} />
                </svg>
            </div>
            <div style={{ marginTop: '15px' }}>
            <div className="loader-list-videos-home" style={habilitarLoader ? { display: 'block' } : { display: 'none' }}>
                                        <img width="100" src={url_loader("Reload-transparent.gif", false)} />
                                        <br></br>
                                        <p style={{ color: 'white', fontSize: 'large' }}>Cargando...</p>
                                    </div>
                <ul style={{ listStyle: 'none', float: 'left', margin: 'auto' }}>
                    {

                        arreglotags.length > 0 && arreglotags.filter((e, i) => i < 20).map(function (el, index) {
                            return <li key={index}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '3px', backgroundColor: random_color(), float: 'left' }}>
                                </div>
                                <div style={{ marginLeft: '10px', float: 'left' }}>
                                    {el}
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </li>
                        })
                    }
                </ul>
                <ul style={{ listStyle: 'none', float: 'left', margin: 'auto' }}>
                    {

                        arreglotags.length > 0 && arreglotags.filter((e, i) => i > 20 && i < 41).map(function (el, index) {
                            return <li key={index}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '3px', backgroundColor: random_color(), float: 'left' }}>
                                </div>
                                <div style={{ marginLeft: '10px', float: 'left' }}>
                                    {el}
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </li>
                        })
                    }
                </ul>
                <ul style={{ listStyle: 'none', float: 'left', margin: 'auto' }}>
                    {

                        arreglotags.length > 0 && arreglotags.filter((e, i) => i > 41 && i < 62).map(function (el, index) {
                            return <li key={index}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '3px', backgroundColor: random_color(), float: 'left' }}>
                                </div>
                                <div style={{ marginLeft: '10px', float: 'left' }}>
                                    {el}
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </li>
                        })
                    }
                </ul>
                <ul style={{ listStyle: 'none', float: 'left', margin: 'auto' }}>
                    {

                        arreglotags.length > 0 && arreglotags.filter((e, i) => i > 62 && i < 81).map(function (el, index) {
                            return <li key={index}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '3px', backgroundColor: random_color(), float: 'left' }}>
                                </div>
                                <div style={{ marginLeft: '10px', float: 'left' }}>
                                    {el}
                                </div>
                                <div style={{ clear: 'both' }}></div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export { HomeTags }