import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
const arreglotagscontante = [
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
const HomeTags = (props) => {
    const history = useHistory();
    const [arreglotags, setArreglotags] = useState([]);
    const [habilitarLoader, setHabilitarLoader] = useState(false);
    const [cuentaTagsPopulares, setCuentaTagsPopulares] = useState('');
    useEffect(() => {
        if (arreglotags.length == 0) {
            setHabilitarLoader(true);
            const peticionTags = axios.post(`${getBaseAdressApi()}api/getpopulartags/`).then(response => {
                let tags = response.data["tags"].map((e, index) => {
                    return e["tag"];
                });
                setArreglotags(tags);
                let cuentaPopulares = response.data["last_added_tags"]["date_videos_last_days"];
                let cadenaCuentaPopulares = `Tags más comentados en los últimos 15 días (del ${cuentaPopulares["desde"]} al ${cuentaPopulares["hasta"]}): ${cuentaPopulares["cuenta"]}`;
                setCuentaTagsPopulares(cadenaCuentaPopulares);
                setHabilitarLoader(false);
            }).catch(err => {
                console.log('error obteniendo tags principales ', err);
                setHabilitarLoader(false);
            });
        }
    }, [arreglotags]);
    const navigateToTagVideo = (tag) => {
        console.log('propiedades de categorías en tags ', props.categorias)
        if (props.categorias.length == 0) {
            const peticionTagsNavegar = axios.get(getBaseAdressApi() + 'api/categorias/').then(responsecat => {
                //console.log('respuesta previa de api', response)
                const respuestacategorias = responsecat.data.results.map((el, i) => {
                    el.titulo = el.titulo.replace(/\s/g, '-');
                    return el;
                });
                const peticionSecondNavegarTag = axios.post(`${getBaseAdressApi()}api/searchtags/`,
                    {
                        "tags": [tag],
                        "pagina_inicial": 0
                    }).then(response => {
                        let tagsvideo = response.data.map((e, index) => {
                            console.log('categoría del tag ',e.titulo_categoria.replace(/\s/g, '-'));
                            e["id_categoria"] = respuestacategorias.find(el => el.titulo == e.titulo_categoria.replace(/\s/g, '-')).id;
                            return e
                        });
                        console.log('respuesta navegando en tags', tagsvideo);
                        let video = tagsvideo[0];
                        console.log('respuesta navegando en tags', tagsvideo);
                        let vinculo = "/Reproduccion/" + video.titulo_video + "|" + video.id_video + "|" + video.id_categoria+"?tag_search="+tag.replace("#","");
                        history.push(vinculo);
                    }).catch(err => {
                        console.log('error navegando en tags principales ', err);

                    });
            }).catch(err => {
                console.log('error navegando en categorias tags principales ', err);
            });
        }
        else {
            const peticionSecondNavegarTag = axios.post(`${getBaseAdressApi()}api/searchtags/`,
                {
                    "tags": [tag],
                    "pagina_inicial": 0
                }).then(response => {
                    let tagsvideo = response.data.map((e, index) => {
                        console.log('categoría del tag ',e.titulo_categoria.replace(/\s/g, '-'));
                        e["id_categoria"] = props.categorias.find(el => el.titulo == e.titulo_categoria.replace(/\s/g, '-')).id;
                        return e
                    });
                    let video = tagsvideo[0];
                    console.log('respuesta navegando en tags', tagsvideo);
                    let vinculo = "/Reproduccion/" + video.titulo_video + "|" + video.id_video + "|" + video.id_categoria+"?tag_search="+tag.replace("#","");
                    history.push(vinculo);
                }).catch(err => {
                    console.log('error navegando en tags principales ', err);

                });
        }
    }
    return (
        <div style={{ width: '95%', margin: "auto", color: 'white' }}>
            <div style={{ marginTop: '150px', display: "grid", alignItems: "baseline", gridTemplateColumns: "30% 70%" }}>
                <h1 style={{ color: 'white', gridColumn: 1 }}>Tags recientes</h1><p style={{ gridColumn: 2, verticalAlign: "bottom" }}>{cuentaTagsPopulares}</p>
                <svg height="30" width="350" style={{ gridColumnEnd: 2, gridColumnStart: 1 }}>
                    <line x1="50" y1="30" x2="350" y2="30" style={{ stroke: 'rgb(128,128,128)', strokeWidth: '2' }} />
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
                            return <li key={index} title={"Navegue al video relacionado con este tag para visualizar todos los chats relativos al tag"}
                             onClick={(e) => { navigateToTagVideo(el) }} 
                             style={props.categorias.length > 0 ?{ cursor: "pointer" } : {cursor:"default"}}>
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
                            return <li key={index} title={"Navegue al video relacionado con este tag para visualizar todos los chats relativos al tag"}
                            onClick={(e) => { navigateToTagVideo(el) }} 
                            style={props.categorias.length > 0 ?{ cursor: "pointer" } : {cursor:"default"}}>
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
                            return <li key={index} title={"Navegue al video relacionado con este tag para visualizar todos los chats relativos al tag"}
                            onClick={(e) => { navigateToTagVideo(el) }} 
                            style={props.categorias.length > 0 ?{ cursor: "pointer" } : {cursor:"default"}}>
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
                            return <li key={index} title={"Navegue al video relacionado con este tag para visualizar todos los chats relativos al tag"}
                             onClick={(e) => { navigateToTagVideo(el) }} 
                             style={props.categorias.length > 0 ?{ cursor: "pointer" } : {cursor:"default"}}>
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

                        arreglotags.length > 0 && arreglotags.filter((e, i) => i > 81 && i < 101).map(function (el, index) {
                            return <li key={index} title={"Navegue al video relacionado con este tag para visualizar todos los chats relativos al tag"}
                            onClick={(e) => { navigateToTagVideo(el) }} 
                            style={props.categorias.length > 0 ?{ cursor: "pointer" } : {cursor:"default"}}>
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