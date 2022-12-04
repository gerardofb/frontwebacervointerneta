import React, { useEffect, useRef, useState, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import { HomeFooter } from './HomeFooter'
import axios from "axios"
import { getBaseAdressApi } from './MainAPI'
import styled from "styled-components";


const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 1;
  background: lightgray;
  color:#777;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
        `    
    background:#666;
    color:white;
    border-bottom: 2px solid white;
    opacity: 1;
  `}
`;
export const BusquedaEstandar = (props) => {
    const location = useLocation()
    const [resultadoBusqueda, setResultadoBusqueda] = useState([])
    const [paginaBusqueda, setPaginaBusqueda] = useState({ comentarios: 1 })
    const [paginasTotal, setPaginasTotal] = useState({ comentarios: 0 })
    const [totalResultados, setTotalResultados] = useState({ comentarios: 0 })
    useEffect(() => {
        let query = location.search, consulta = '';
        if (query) {
            query = query.split('=');
            consulta = decodeURI(query[query.length - 1])
            console.log('consulta ', consulta)
            let objetoSearchSimple = {
                "query": consulta,
                "categoria": "",
                "frase": false,
                "autor": "",
                "puede": "",
                "prefijo": "",
                "video": "",
                "pagina_inicial": paginaBusqueda.comentarios - 1
            };
            const requestSimple = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                objetoSearchSimple
            ).then(response => {
                setResultadoBusqueda(response.data);
                let totalDeResultados = response.data[0].total;
                let paginacion = response.data[0].paginacion;
                let paginasTotalComentarios = parseInt(totalDeResultados / paginacion) + (totalDeResultados % paginacion > 0) ? 1 : 0
                setPaginasTotal({
                    ...paginasTotal,
                    comentarios: paginasTotalComentarios
                })
                setTotalResultados({
                    ...totalResultados,
                    comentarios: totalDeResultados
                })
            });
        }
        else if(!query){
            setResultadoBusqueda([]);
                
                setPaginasTotal({
                    ...paginasTotal,
                    comentarios: 0
                })
                setTotalResultados({
                    ...totalResultados,
                    comentarios: 0
                })
        }

    }, [location]);
    const tabuladores = ["Comentarios", "Autobiográficos/Podcasts", "Tags"];
    const [active, setActive] = useState(tabuladores[0]);
    const estableceTab = (parameter) => {

        if (parameter == active) {

            return { display: "block" }
        }
        return { display: "none" };
    }
    return (
        <>
            <div>
                <div style={{ backgroundColor: 'black', height: '100px' }}>
                    <NavBar></NavBar>
                </div>
            </div>
            <div className='content-search-site'>
                <div className='content-results-search'>
                    <div className='content-advanced-search'>
                        <div>
                            <label>Contiene obligatoriamente las palabras:</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Contiene opcionalmente las palabras:</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Contiene palabras que inician con:</label>
                            <input type="text"></input>
                        </div>
                        <div className='advanced-search-checkbox-div'>
                            <input type="checkbox"></input>
                            <label>Frase completa (sí/no):</label>
                        </div>
                        <div>
                            <label>Del siguiente autor:</label>
                            <input type="text"></input>
                            <a href="#">Buscar autores</a>
                        </div>
                        <div>
                            <label>De la siguiente categoría:</label>
                            <select name="select_categorias">
                                <option value="0" selected>
                                    Todas
                                </option>
                            </select>
                        </div>
                        <div>
                            <label>Del siguiente vídeo (indicar el título):</label>
                            <select name="select_videos">
                                <option value="0" selected>
                                    Todos
                                </option>
                            </select>
                            <a href="#">Buscar videos</a>
                        </div>
                        <div>
                            <button type="button">Búsqueda</button>
                        </div>
                    </div>
                    <div className='tabuladores-search'>
                        <div className='button-group-search'>
                            {
                                tabuladores.map(type => (
                                    <Tab
                                        key={type}
                                        active={active === type}
                                        onClick={() => { setActive(type); }}
                                    >
                                        {type}
                                    </Tab>
                                ))
                            }
                        </div>
                    </div>
                    <div style={estableceTab(tabuladores[0])}>
                        <h2>Resultados de la búsqueda ({totalResultados.comentarios}):</h2>

                        {

                            resultadoBusqueda.map((el, indice) => {
                                let fecharesult = new Date(el.ultima_fecha)
                                return (
                                    <div className="results-search">
                                        <h4>Categoría</h4>
                                        <h4>Título</h4>
                                        <h4>Autor</h4>
                                        <h4>Fecha</h4>
                                        <p>{el.titulo_categoria}</p>
                                        <p><a href="#">{el.titulo_video}</a></p>
                                        <p>{el.autor}</p>
                                        <p>{fecharesult.toLocaleDateString()}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            paginasTotal.comentarios > 0 && <div className="paginacion-results-search">
                                {paginaBusqueda.comentarios > 1 && paginaBusqueda < paginasTotal.comentarios ? <><button type="button">Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                </p><button type="button">Siguiente</button></> : paginaBusqueda.comentarios <= 1 && paginaBusqueda < paginasTotal.comentarios ?
                                    <><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                    </p><button  type="button">Siguiente</button></> : paginaBusqueda.comentarios > 1 && paginaBusqueda >= paginasTotal.comentarios ?
                                        <><button type="button">Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}</p>
                                        </> : <><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}</p>
                                        </>}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <HomeFooter></HomeFooter>
        </>
    )
}
