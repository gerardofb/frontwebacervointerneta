import React, { useEffect, useRef, useState, useContext } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
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
const categorias = {COMENTARIOS:0}
export const BusquedaEstandar = (props) => {
    const location = useLocation()
    const history = useHistory();
    const [resultadoBusqueda, setResultadoBusqueda] = useState([])
    const [paginaBusqueda, setPaginaBusqueda] = useState({ comentarios: 1 })
    const [paginasTotal, setPaginasTotal] = useState({ comentarios: 0 })
    const [totalResultados, setTotalResultados] = useState({ comentarios: 0 })
    const [paginacion,setPaginacion] = useState({comentarios:0})
    const [actualQuery,setActualQuery] = useState(null)
    const [todascategorias,setTodascategorias] = useState(null);
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
                "pagina_inicial": 0
            };
            const requestSimple = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                objetoSearchSimple
            ).then(response => {
                setActualQuery(
                    JSON.stringify(objetoSearchSimple));
                setResultadoBusqueda(response.data);
                let totalDeResultados = response.data[0].total;
                let paginacion_primera = response.data[0].paginacion;
                setPaginacion({...paginacion,
                    comentarios:paginacion_primera});
                let paginasTotalComentarios = parseInt(totalDeResultados / paginacion_primera) + ((totalDeResultados % paginacion_primera > 0) ? 1 : 0)
                //console.log('en consulta inicial ',paginasTotalComentarios)
                setPaginasTotal({
                    ...paginasTotal,
                    comentarios: paginasTotalComentarios
                })
                setTotalResultados({
                    ...totalResultados,
                    comentarios: totalDeResultados
                })
            });
            let respuesta_cat = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response=>{
                console.log('dentro de consulta original',response.data);
                setTodascategorias(response.data);  })
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

    }, [location.search]);
    const tabuladores = ["Comentarios", "Autobiográficos/Podcasts", "Tags"];
    const [active, setActive] = useState(tabuladores[0]);
    const estableceTab = (parameter) => {

        if (parameter == active) {

            return { display: "block" }
        }
        return { display: "none" };
    }
    const cambiarPagina =(direccion, tipo)=>{
        let paginaActual = 0;
        if(direccion && tipo == tabuladores[0]){
            paginaActual = (paginaBusqueda.comentarios+1);

            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    comentarios:paginaActual
                });
        }
        else if(!direccion && tipo == tabuladores[0]){
            paginaActual = (paginaBusqueda.comentarios-1);
            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    comentarios:paginaActual
                });
        }
        let query = location.search, consulta = '';
        if (query) {
            query = query.split('=');
            consulta = decodeURI(query[query.length - 1])
            let objetoSearchPagina = {
                "query": consulta,
                "categoria": "",
                "frase": false,
                "autor": "",
                "puede": "",
                "prefijo": "",
                "video": "",
                "pagina_inicial": ((paginacion.comentarios)*(paginaActual-1))
            };
            //console.log('en cambio de página ',paginaActual,objetoSearchPagina, paginacion.comentarios)
            const requestPagina = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
            objetoSearchPagina
            ).then(response => {
                setResultadoBusqueda(response.data);
                let totalDeResultados = response.data[0].total;
                let paginasTotalComentarios = parseInt(totalDeResultados / paginacion.comentarios) + ((totalDeResultados % paginacion.comentarios > 0) ? 1 : 0)
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
    }
    const navigateToSearch=(categoria,video)=>{
        switch(categoria){
            case categorias.COMENTARIOS:
            localStorage.setItem("queryComentarios",actualQuery);   
           
                let indice_categoria = todascategorias.find(e=> e.titulo == video.categoria);
                console.log('en navegar ',todascategorias,video.categoria,indice_categoria);
                history.push("/Reproduccion/"+video.titulo+"|"+video.id_video+"|"+indice_categoria.id+"?q=true&cat=Comentarios");           
            break;
        }
    }
    console.log('paginas',paginaBusqueda.comentarios,paginasTotal.comentarios,totalResultados.comentarios)
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
                                        <p><a href="#" onClick={(e)=>navigateToSearch(categorias.COMENTARIOS, {titulo:el.titulo_video,id_video:el.id_video, categoria:el.titulo_categoria})}>{el.titulo_video}</a></p>
                                        <p>{el.autor}</p>
                                        <p>{fecharesult.toLocaleDateString()}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            paginasTotal.comentarios > 0 && <div className="paginacion-results-search">
                                {paginaBusqueda.comentarios > 1 && paginaBusqueda < paginasTotal.comentarios ? <><button type="button" onClick={(e)=>{cambiarPagina(false,tabuladores[0])}}>Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                </p><button type="button" onClick={(e)=>{cambiarPagina(true,tabuladores[0])}}>Siguiente</button></> : paginaBusqueda.comentarios <= 1 && paginaBusqueda.comentarios < paginasTotal.comentarios ?
                                    <><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                    </p><button onClick={(e)=>{cambiarPagina(true,tabuladores[0])}} type="button">Siguiente</button></> : paginaBusqueda.comentarios > 1 && paginaBusqueda.comentarios >= paginasTotal.comentarios ?
                                        <><button onClick={(e)=>{cambiarPagina(false,tabuladores[0])}} type="button">Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}</p>
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
