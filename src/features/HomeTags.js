import React, { useState } from 'react'
function random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

const HomeTags = (props) => {
    const arreglotags = [
        'punk',
        'rock',
        'proyecto',
        'vida',
        'grabación',
        'vibrante',
        'salud',
        'nopal',
        'drogas',
        'marihuana',
        'colección',
        'antropología',
        'ska',
        'comunidad',
        'barrio',
        'mictlan',
        'protesta',
        'programa',
        'producción',
        'colaboracón',
        'tránsito',
        'policía',
        'memoria',
        'chilango',
        'gresca',
        'tenis',
        'ultravital',
        'desobediencia',
        'visibilidad',
        'latino',
        'lágrimas',
        'historia',
        'radio',
        'pasaje',
        'cinta',
        'cassete',
        'transbordar',
        'viaje',
        'serie',
        'vigilantes',
        'testimonio',
        'menjunje',
        'electrónica',
        'firma',
        'graffiti',
        'noche',
        'estudio',
        'punk',
        'rock',
        'proyecto',
        'vida',
        'grabación',
        'vibrante',
        'salud',
        'nopal',
        'drogas',
        'marihuana',
        'colección',
        'antropología',
        'ska',
        'comunidad',
        'barrio',
        'mictlan',
        'protesta',
        'programa',
        'producción',
        'colaboracón',
        'tránsito',
        'policía',
        'memoria',
        'chilango',
        'gresca',
        'tenis',
        'ultravital',
        'desobediencia',
        'visibilidad',
        'latino',
        'lágrimas',
        'historia',
        'radio',
        'pasaje',
        'cinta',
        'cassete',
        'transbordar',
        'viaje',
        'serie',
        'vigilantes',
        'testimonio',
        'menjunje',
        'electrónica',
        'firma',
        'graffiti',
        'noche',
        'estudio',
        'punk',
        'rock',
        'proyecto',
        'vida',
        'grabación',
        'vibrante',
        'salud',
        'nopal',
        'drogas',
        'marihuana',
        'colección',
        'antropología',
        'ska',
        'comunidad',
        'barrio',
        'mictlan',
        'protesta',
        'programa',
        'producción',
        'colaboracón',
        'tránsito',
        'policía',
        'memoria',
        'chilango',
        'gresca',
        'tenis',
        'ultravital',
        'desobediencia',
        'visibilidad',
        'latino',
        'lágrimas',
        'historia',
        'radio',
        'pasaje',
        'cinta',
        'cassete',
        'transbordar',
        'viaje',
        'serie',
        'vigilantes',
        'testimonio',
        'menjunje',
        'electrónica',
        'firma',
        'graffiti',
        'noche',
        'estudio',
    ];
    return (
        <div style={{ witdh: '90%', margin: 'auto', color: 'white' }}>
            <div style={{ marginTop: '150px' }}>
                <h1 style={{ color: 'white' }}>Tags recientes</h1>
                <svg height="30" width="1280">
                    <line x1="50" y1="30" x2="1280" y2="30" style={{ stroke: 'rgb(128,128,128)', strokeWidth: '2' }} />
                </svg>
            </div>
            <div style={{ marginTop: '15px' }}>
                <ul style={{ listStyle: 'none', float: 'left', margin: 'auto' }}>
                    {

                        arreglotags.filter((e, i) => i < 25).map(function (el, index) {
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

                        arreglotags.filter((e, i) => i > 25 && i < 50).map(function (el, index) {
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

                        arreglotags.filter((e, i) => i > 50 && i < 75).map(function (el, index) {
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

                        arreglotags.filter((e, i) => i > 75 && i < 100).map(function (el, index) {
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