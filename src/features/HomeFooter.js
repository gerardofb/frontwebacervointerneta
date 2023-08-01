import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getBaseAdressApi } from './MainAPI'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.png${wrap ? ')' : ''}`

const HomeFooter = (props) => {
    const history = useHistory();
    const setRelatosAleatorios = () => {
        //console.log('buscando relatos')
        let objetoSearchPagina = {
            "query": "",
            "categoria": "",
            "frase": false,
            "autor": "",
            "puede": "",
            "prefijo": "",
            "video": "",
            "pagina_inicial": 0
        };
        const requestSearchRelatos = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
            objetoSearchPagina
        ).then(response => {
            let biografias = response.data.map((elemento, indice) => {
                return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '' };
            });
            if (biografias.length > 0) {
                let indice = parseInt(Math.random() * biografias.length);
                history.push('/Autobiogràficos/' + biografias[indice].documento_id);
            }
            //else console.log('no se encontraron relatos');
        }).catch(err => {
            //console.log('error buscando relatos', err);
        });
    }
    const eventoAleatorio = () => {
        const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/visitasdeevento/`).then(response => {
            let eventosvisitados = response.data.map((ev, ind) => {
                return { index: ev.id, selected: false, title: ev.titulo, descripcion: ev.descripcion, fecha: new Date(ev.fechainicio), duracion: ev.duracion, imagen: "", visitas: ev.total_de_visitas }
            });
            if (eventosvisitados.length > 0) {
                let indice = parseInt(Math.random() * eventosvisitados.length);
                history.push('/Eventos/' + eventosvisitados[indice].index);
            }
            //console.log('eventos aleatorios ', eventosvisitados)
        }).catch(err => {
            //console.log('error consultando eventos aleatorios ', err);
        });
    }
    return (
        <div className='footer-site footer-site-black' style={{ WebkitBorderTopRightRadius: '20px', width: '100%', margin: 'auto', borderTopLeftRadius: '20px', paddingBottom: '2em', opacity: '100%' }}>
            <div className='empty-container'></div>
            <div className='container-list-red'>
                <ul className='footer-list-white'>
                    <li>
                        <h3 id="footer-vinculos" style={{ borderBottom: '2px white solid' }}>
                            Vínculos
                        </h3>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        <Link to="/QuienesSomos">Acerca de nosotros</Link>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        <Link to="/Contacto">Contacto</Link>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        <Link to="/AvisoPivacidad">Acuerdo de privacidad</Link>
                    </li>

                </ul>
                <ul className='footer-list-white'>
                    <li>
                        <h3 id="footer-eventos" style={{ borderBottom: '2px white solid' }}>
                            Eventos
                        </h3>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        Suscribirse
                    </li>
                    
                    <li style={{ fontSize: 'small' }}>
                    <Link to="#" onClick={eventoAleatorio}>Evento aleatorio</Link>
                    </li>
                </ul>
                <ul className='footer-list-white'>
                    <li>
                        <h3 id="footer-categorias" style={{ borderBottom: '2px white solid' }}>
                            Categorías
                        </h3>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        Más visitadas
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        <Link to="#" onClick={(e) => setRelatosAleatorios()}>Podcasts</Link>
                    </li>
                    <li style={{ fontSize: 'small' }}>
                        <Link to="#" onClick={(e) => setRelatosAleatorios()}>Autobiográficos</Link>
                    </li>
                </ul>
                <ul className='footer-list-white'>
                    <li>
                        <h3 id="footer-salaschat" style={{ borderBottom: '2px white solid' }}>
                            Salas de chat
                        </h3>
                    </li>
                </ul>
            </div>
            <div className='logos-sociales-footer'>
                <div className="spline-logos-sociales-footer-1"></div>
                <a href="https://www.facebook.com/internetamx/" target="_blank">Facebook&nbsp;<img src="/images/SocialNetwork/facebook_logo.png" alt="Búscanos en facebook" /></a>
                <a href="https://www.instagram.com/internetamx/" target="_blank">Instagram&nbsp;<img src="/images/SocialNetwork/instagram_gradient.png" alt="Búscanos en instagram" /></a>
                <div className="spline-logos-sociales-footer-2"></div>
            </div>
            <div className='logos-patrocinadores-footer'>
                <div className='logo-imcine'>

                </div>
                <div className='logo-focine'>

                </div>
                <div className='logo-sec-cultura'>

                </div>
            </div>
        </div>
    )
}
export { HomeFooter }