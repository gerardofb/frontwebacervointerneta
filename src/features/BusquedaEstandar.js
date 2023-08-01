import React, { useEffect, useRef, useState, useContext } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import { HomeFooter } from './HomeFooter'
import axios from "axios"
import { getBaseAdressApi } from './MainAPI'
import styled from "styled-components";
import ModalAlt from './ModalAlt';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactGA from 'react-ga4'

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
const categorias = { COMENTARIOS: 0, RELATOS: 1 }
const tiposBusqueda = { QUERY: 0, CATEGORIA: 1, FRASE: 2, AUTOR: 3, OPCIONAL: 4, PREFIJO: 5, VIDEO: 6 }
const MODAL_SEARCH_USERS = 0;
const MODAL_SEARCH_VIDEOS = 1;
export const BusquedaEstandar = (props) => {
    const location = useLocation()
    const history = useHistory();
    const [resultadoBusqueda, setResultadoBusqueda] = useState([])
    const [paginaBusqueda, setPaginaBusqueda] = useState({ comentarios: 1, relatos: 1 })
    const [paginasTotal, setPaginasTotal] = useState({ comentarios: 0, relatos: 0 })
    const [totalResultados, setTotalResultados] = useState({ comentarios: 0, relatos: 0 })
    const [modalOpen, setModalOpen] = useState(false);
    const [childrenModal, setChildrenModal] = useState(-1);
    const [resultadoBusquedaRelato, setResultadoBusquedaRelato] = useState([])

    const [paginacion, setPaginacion] = useState({ comentarios: 0, relatos:0 })
    const [actualQuery, setActualQuery] = useState(null)
    const [todascategorias, setTodascategorias] = useState(null);
    const [videoslistado,setVideosListado] = useState([]);
    const [valorVideoSearch,setValorVideoSearch] = useState(0);
    const [consultaAvanzada, setConsultaAvanzada] = useState({
        "query": "",
        "categoria": "",
        "frase": false,
        "autor": "",
        "puede": "",
        "prefijo": "",
        "video": "",
        "pagina_inicial": 0
    })
    const [esBusquedaAvanzada, setEsBusquedaAvanzada] = useState(null);
    const refModalUsuario = useRef(null);
    const refModalVideos = useRef(null);
    const toggleState = (e, indice) => {
        e.preventDefault();
        setUsuariosSearch([])
        setVideosSearch([])
        setValueUserSearch('')
        setValueVideoSearch('')
        //console.log('levantando modal con ',indice);
        setChildrenModal(indice);
        refModalUsuario.current && refModalUsuario.current.focus()
        refModalVideos.current && refModalVideos.current.focus()
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        let query = location.search, consulta = '';
        if (query) {
            query = query.split('=');
            consulta = decodeURI(query[query.length - 1])
            //console.log('consulta ', consulta)
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
            setActualQuery(
                JSON.stringify(objetoSearchSimple));
            const requestVideos = axios.get(`${getBaseAdressApi()}api/shortlistvideos/`).then(response=>{
                let videos = response.data.results.map((el,indice)=>{
                    return {id:el.id,titulo:el.titulo}
                })
                setVideosListado(videos);
            })
            const requestSimple = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                objetoSearchSimple
            ).then(response => {
                ReactGA.event('search',{
                    search_term:consulta
                });
                setResultadoBusqueda(response.data);
                let totalDeResultados = response.data.length > 0 ? response.data[0].total : 0;
                let paginacion_primera =  response.data.length > 0 ? response.data[0].paginacion : 1;
                setPaginacion({
                    ...paginacion,
                    comentarios: paginacion_primera
                });
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
            }).catch(err=>{

            });
            const requestRelato = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                objetoSearchSimple
            ).then(response => {
                
                setResultadoBusquedaRelato(response.data);
                let totalDeResultadosRelato = response.data[0].total;
                let paginacion_primera = response.data[0].paginacion;
                setPaginacion({
                    ...paginacion,
                    relatos: paginacion_primera
                });
                let paginasTotalRelatos = parseInt(totalDeResultadosRelato / paginacion_primera) + ((totalDeResultadosRelato % paginacion_primera > 0) ? 1 : 0)
                //console.log('en consulta inicial ',paginasTotalComentarios)
                setPaginasTotal({
                    ...paginasTotal,
                    relatos: paginasTotalRelatos
                })
                setTotalResultados({
                    ...totalResultados,
                    relatos: totalDeResultadosRelato
                })
            }).catch(err=>{
                
            });
            let respuesta_cat = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {
                //console.log('dentro de consulta original', response.data.results);
                setTodascategorias(response.data.results);
            })
        }
        else if (!query) {
            setResultadoBusqueda([]);

            setPaginasTotal({
                ...paginasTotal,
                comentarios: 0,
                relatos: 0
            })
            setTotalResultados({
                ...totalResultados,
                comentarios: 0,
                relatos: 0
            })
            let respuesta_cat = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {
                //console.log('dentro de consulta original', response.data.results);
                setTodascategorias(response.data.results);
            })
            const requestVideos = axios.get(`${getBaseAdressApi()}api/shortlistvideos/`).then(response=>{
                let videos = response.data.results.map((el,indice)=>{
                    return {id:el.id,titulo:el.titulo}
                })
                setVideosListado(videos);
            })
        }

    }, [location.search]);
    const searchAvanzado = () => {
        if (consultaAvanzada.query.trim() != "" || consultaAvanzada.categoria != "" ||
            consultaAvanzada.puede.trim() != "" || consultaAvanzada.prefijo.trim() != "" || consultaAvanzada.video != "") {
            setEsBusquedaAvanzada(true);
            let objetoSearchAvanzado = {
                "query": consultaAvanzada.query,
                "categoria": consultaAvanzada.categoria != "Todas" ? consultaAvanzada.categoria : "",
                "frase": consultaAvanzada.frase,
                "autor": consultaAvanzada.autor,
                "puede": consultaAvanzada.puede,
                "prefijo": consultaAvanzada.prefijo,
                "video": valorVideoSearch == 0 ? "" : parseInt(valorVideoSearch),
                "pagina_inicial": 0
            };
            //console.log('el objeto búsqueda es ',objetoSearchAvanzado)
            const requestSimple = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                objetoSearchAvanzado
            ).then(response => {
                setActualQuery(
                    JSON.stringify(objetoSearchAvanzado));
                setResultadoBusqueda(response.data);
                let totalDeResultados = response.data.length > 0 ? response.data[0].total : 0;
                let paginacion_primera = response.data.length > 0 ? response.data[0].paginacion : 1;
                setPaginacion({
                    ...paginacion,
                    comentarios: paginacion_primera
                });
                let paginasTotalComentarios = parseInt(totalDeResultados / paginacion_primera) + ((totalDeResultados % paginacion_primera > 0) ? 1 : 0)
                //console.log('en consulta avanzada ',paginasTotalComentarios)
                setPaginasTotal({
                    ...paginasTotal,
                    comentarios: paginasTotalComentarios
                })
                setTotalResultados({
                    ...totalResultados,
                    comentarios: totalDeResultados
                });
                setPaginaBusqueda({
                    comentarios:1,
                    relatos:1
                })
                
            });
            const requestRelato = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                objetoSearchAvanzado
            ).then(response => {
                // setActualQuery(
                //     JSON.stringify(objetoSearchSimple));
                setResultadoBusquedaRelato(response.data);
                let totalDeResultadosRelato = response.data.length > 0 ? response.data[0].total : 0;
                let paginacion_primera = response.data.length > 0 ? response.data[0].paginacion : 1;
                setPaginacion({
                    ...paginacion,
                    relatos: paginacion_primera
                });
                let paginasTotalRelatos = parseInt(totalDeResultadosRelato / paginacion_primera) + ((totalDeResultadosRelato % paginacion_primera > 0) ? 1 : 0)
                //console.log('en consulta inicial ',paginasTotalComentarios)
                setPaginasTotal({
                    ...paginasTotal,
                    relatos: paginasTotalRelatos
                })
                setTotalResultados({
                    ...totalResultados,
                    relatos: totalDeResultadosRelato
                });
                setPaginaBusqueda({
                    comentarios:1,
                    relatos:1
                })
            });
        }
    }
    const setBuscarAvanzado = (valor, tipo) => {
        switch (tipo) {
            case tiposBusqueda.QUERY:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "query": valor
                })
                break;
            case tiposBusqueda.CATEGORIA:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "categoria": valor
                })
                break;
            case tiposBusqueda.FRASE:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "frase": valor
                })
                break;
            case tiposBusqueda.AUTOR:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "autor": valor
                })
                break;
            case tiposBusqueda.OPCIONAL:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "puede": valor
                })
                break;
            case tiposBusqueda.PREFIJO:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "prefijo": valor
                })
                break;
            case tiposBusqueda.VIDEO:
                setConsultaAvanzada({
                    ...consultaAvanzada,
                    "video": valor
                })
                break;
        }
        //console.log('consulta avanzada ', consultaAvanzada);
    }
    const tabuladores = ["Comentarios", "Autobiográficos/Podcasts", "Tags"];
    const [active, setActive] = useState(tabuladores[0]);
    const estableceTab = (parameter) => {

        if (parameter == active) {

            return { display: "block" }
        }
        return { display: "none" };
    }
    const cambiarPagina = (direccion, tipo) => {
        let paginaActual = 0;
        if (direccion && tipo == tabuladores[0]) {
            paginaActual = (paginaBusqueda.comentarios + 1);

            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    comentarios: paginaActual
                });
        }
        else if (!direccion && tipo == tabuladores[0]) {
            paginaActual = (paginaBusqueda.comentarios - 1);
            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    comentarios: paginaActual
                });
        }
        else if (direccion && tipo == tabuladores[1]) {
            paginaActual = (paginaBusqueda.relatos + 1);

            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    relatos: paginaActual
                });
        }
        else if (!direccion && tipo == tabuladores[1]) {
            paginaActual = (paginaBusqueda.relatos - 1);
            setPaginaBusqueda(
                {
                    ...paginaBusqueda,
                    relatos: paginaActual
                });
        }
        let query = location.search, consulta = '';
        if (query && !esBusquedaAvanzada) {
            query = query.split('=');
            consulta = decodeURI(query[query.length - 1])
            if (tipo == tabuladores[0]) {
                let objetoSearchPagina = {
                    "query": consulta,
                    "categoria": "",
                    "frase": false,
                    "autor": "",
                    "puede": "",
                    "prefijo": "",
                    "video": "",
                    "pagina_inicial": ((paginacion.comentarios) * (paginaActual - 1))
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
            else if (tipo == tabuladores[1]) {
                let objetoSearchPagina = {
                    "query": consulta,
                    "categoria": "",
                    "frase": false,
                    "autor": "",
                    "puede": "",
                    "prefijo": "",
                    "video": "",
                    "pagina_inicial": ((paginacion.relatos) * (paginaActual - 1))
                };
                //console.log('en cambio de página ',paginaActual,objetoSearchPagina, paginacion.comentarios)
                const requestPagina = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                    objetoSearchPagina
                ).then(response => {
                    setResultadoBusqueda(response.data);
                    let totalDeResultadosRelato = response.data[0].total;
                    let paginasTotalRelatos = parseInt(totalDeResultadosRelato / paginacion.relatos) + ((totalDeResultadosRelato % paginacion.relatos > 0) ? 1 : 0)
                    setPaginasTotal({
                        ...paginasTotal,
                        relatos: paginasTotalRelatos
                    })
                    setTotalResultados({
                        ...totalResultados,
                        relatos: totalDeResultadosRelato
                    })
                });
            }
        }
        else if (esBusquedaAvanzada) {

            if (tipo == tabuladores[0]) {
                let objetoSearchAvanzado = {
                    "query": consultaAvanzada.query,
                    "categoria": consultaAvanzada.categoria != "Todas" ? consultaAvanzada.categoria : "",
                    "frase": consultaAvanzada.frase,
                    "autor": consultaAvanzada.autor,
                    "puede": consultaAvanzada.puede,
                    "prefijo": consultaAvanzada.prefijo,
                    "video": valorVideoSearch == 0 ? "" : parseInt(valorVideoSearch),
                    "pagina_inicial": 0
                };
                //console.log('en cambio de página ',paginaActual,objetoSearchPagina, paginacion.comentarios)
                const requestPagina = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                objetoSearchAvanzado
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
            else if (tipo == tabuladores[1]) {
                let objetoSearchAvanzado = {
                    "query": consultaAvanzada.query,
                    "categoria": consultaAvanzada.categoria != "Todas" ? consultaAvanzada.categoria : "",
                    "frase": consultaAvanzada.frase,
                    "autor": consultaAvanzada.autor,
                    "puede": consultaAvanzada.puede,
                    "prefijo": consultaAvanzada.prefijo,
                    "video": valorVideoSearch== 0 ? "" : parseInt(valorVideoSearch),
                    "pagina_inicial": 0
                };
                //console.log('en cambio de página ',paginaActual,objetoSearchPagina, paginacion.comentarios)
                const requestPagina = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                    objetoSearchAvanzado
                ).then(response => {
                    setResultadoBusqueda(response.data);
                    let totalDeResultadosRelato = response.data[0].total;
                    let paginasTotalRelatos = parseInt(totalDeResultadosRelato / paginacion.relatos) + ((totalDeResultadosRelato % paginacion.relatos > 0) ? 1 : 0)
                    setPaginasTotal({
                        ...paginasTotal,
                        relatos: paginasTotalRelatos
                    })
                    setTotalResultados({
                        ...totalResultados,
                        relatos: totalDeResultadosRelato
                    })
                });
            }
        }
    }
    const navigateToSearch = (categoria, video) => {
        switch (categoria) {
            case categorias.COMENTARIOS:
                let objetoConsulta = JSON.parse(actualQuery);
                objetoConsulta.video = video.id_video;

                localStorage.setItem("queryComentarios", JSON.stringify(objetoConsulta));

                let indice_categoria = todascategorias.find(e => e.titulo == video.categoria);
                //console.log('en navegar ', todascategorias, video.categoria, indice_categoria);
                history.push("/Reproduccion/" + video.titulo + "|" + video.id_video + "|" + indice_categoria.id + "?q=true&cat=Comentarios");
                break;
                case categorias.RELATOS:
                    let objetoConsultaRelato = JSON.parse(actualQuery);
                    //console.log('navegando a relato ',video,actualQuery);
                    objetoConsultaRelato.video = video.id_video;
    
                    localStorage.setItem("queryRelatos", JSON.stringify(objetoConsultaRelato));
    
                    //let indice_categoria_relato = todascategorias.find(e => e.titulo == video.categoria);
                    history.push("/Autobiograficos/add2fafc085d4121a4da88d351cb9e8e?q=true&cat=Relatos");
                    break;
        }
    }
    const [usuariosSearch,setUsuariosSearch] = useState([]);
    const [valueUserSearch,setValueUserSearch] = useState('')
    const searchUsuario = ()=>{
        const requestSearchUser = axios.get(`${getBaseAdressApi()}api/users/`+valueUserSearch).then(response=>{
            setUsuariosSearch(response.data.results);
        })
    }
    const [videosSearch,setVideosSearch] = useState([]);
    const [valueVideoSearch,setValueVideoSearch] = useState('')
    const searchVideo = ()=>{
        const requestSearchUser = axios.get(`${getBaseAdressApi()}api/videos/`+valueVideoSearch).then(response=>{
            setVideosSearch(response.data.results);
        })
    }
    //console.log('paginas', paginaBusqueda.comentarios, paginasTotal.comentarios, totalResultados.comentarios)
    const [valueAutorSearch,setValueAutorSearch] = useState('')
    const setUserSearch = (e,usuario)=>{
        setValueAutorSearch(usuario);
        setBuscarAvanzado(usuario,tiposBusqueda.AUTOR);
        toggleState(e,MODAL_SEARCH_USERS);
    }
    const setVideoSearch = (e,video)=>{
        setValorVideoSearch(video.id);
        setVideosListado([...videoslistado,{id:video.id,titulo:video.titulo}]);
        setBuscarAvanzado(video.id,tiposBusqueda.VIDEO);
        toggleState(e,MODAL_SEARCH_VIDEOS);

    }
    return (
        <div>
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
                            <input type="text" onChange={(e) => setBuscarAvanzado(e.target.value, tiposBusqueda.QUERY)}></input>
                        </div>
                        <div>
                            <label>Contiene opcionalmente las palabras:</label>
                            <input type="text" onChange={(e) => setBuscarAvanzado(e.target.value, tiposBusqueda.OPCIONAL)}></input>
                        </div>
                        <div>
                            <label>Contiene palabras que inician con:</label>
                            <input type="text" onChange={(e) => setBuscarAvanzado(e.target.value, tiposBusqueda.PREFIJO)}></input>
                        </div>
                        <div className='advanced-search-checkbox-div'>
                            <input type="checkbox" onChange={(e) => setBuscarAvanzado(e.target.checked, tiposBusqueda.FRASE)}></input>
                            <label>Frase completa (sí/no):</label>
                        </div>
                        <div>
                            <label>Del siguiente autor:</label>
                            <input type="text" value={valueAutorSearch} onChange={(e) => {setBuscarAvanzado(e.target.value, tiposBusqueda.AUTOR);setValueAutorSearch(e.target.value)}}></input>
                            <a href="#" onClick={(e) => toggleState(e, MODAL_SEARCH_USERS)}>Buscar autores</a>
                        </div>
                        <div>
                            <label>De la siguiente categoría:</label>
                            <select name="select_categorias" defaultValue={0} onChange={(e) => setBuscarAvanzado(e.target.options[e.target.selectedIndex].text, tiposBusqueda.CATEGORIA)}>
                                <option value="0">
                                    Todas
                                </option>
                                {
                                    todascategorias && todascategorias.map((cat, indice) => {
                                        return <option key={indice} value={cat.id}>{cat.titulo}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label>Del siguiente vídeo (indicar el título):</label>
                            <select name="select_videos" value={valorVideoSearch} onChange={(e) => {setValorVideoSearch(e.target.value);}}>
                                <option value="0">
                                    Todos
                                </option>
                                {videoslistado.map((el,indice)=>{
                                    return <option key={indice} value={el.id}>{el.titulo}</option>
                                })}
                            </select>
                            <a href="#"onClick={(e) => toggleState(e, MODAL_SEARCH_VIDEOS)}>Buscar videos</a>
                        </div>
                        <div>
                            <button type="button" onClick={(e)=>searchAvanzado()}>Búsqueda</button>
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
                        <h2>Resultados de la búsqueda:</h2>

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
                                        <p><a href="#" onClick={(e) => navigateToSearch(categorias.COMENTARIOS, { titulo: el.titulo_video, id_video: el.id_video, categoria: el.titulo_categoria })}>{el.titulo_video}</a></p>
                                        <p>{el.autor}</p>
                                        <p>{fecharesult.toLocaleDateString()}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            paginasTotal.comentarios > 0 && <div className="paginacion-results-search">
                                {paginaBusqueda.comentarios > 1 && paginaBusqueda < paginasTotal.comentarios ? <><button type="button" onClick={(e) => { cambiarPagina(false, tabuladores[0]) }}>Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                </p><button type="button" onClick={(e) => { cambiarPagina(true, tabuladores[0]) }}>Siguiente</button></> : paginaBusqueda.comentarios <= 1 && paginaBusqueda.comentarios < paginasTotal.comentarios ?
                                    <><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}
                                    </p><button onClick={(e) => { cambiarPagina(true, tabuladores[0]) }} type="button">Siguiente</button></> : paginaBusqueda.comentarios > 1 && paginaBusqueda.comentarios >= paginasTotal.comentarios ?
                                        <><button onClick={(e) => { cambiarPagina(false, tabuladores[0]) }} type="button">Anterior</button><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}</p>
                                        </> : <><p>Página {paginaBusqueda.comentarios} de {paginasTotal.comentarios}</p>
                                        </>}
                            </div>
                        }
                    </div>
                    <div style={estableceTab(tabuladores[1])}>
                        <h2>Resultados de la búsqueda:</h2>

                        {

                            resultadoBusquedaRelato.map((el, indice) => {
                                
                                let fecharesult = new Date(el.ultima_fecha)
                                return (
                                    <div className="results-search">
                                        <h4>Categoría</h4>
                                        <h4>Título</h4>
                                        <h4>Autor</h4>
                                        <h4>Fecha</h4>
                                        <p>{el.titulo_categoria}</p>
                                        <p><a href="#"  onClick={(e) => navigateToSearch(categorias.RELATOS, { titulo: el.titulo_video, id_video: el.id_video, categoria: el.titulo_categoria })}>{el.titulo_video}</a></p>
                                        <p>{el.autor}</p>
                                        <p>{fecharesult.toLocaleDateString()}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            paginasTotal.relatos > 0 && <div className="paginacion-results-search">
                                {paginaBusqueda.relatos > 1 && paginaBusqueda < paginasTotal.relatos ? <><button type="button" onClick={(e) => { cambiarPagina(false, tabuladores[1]) }}>Anterior</button><p>Página {paginaBusqueda.relatos} de {paginasTotal.relatos}
                                </p><button type="button" onClick={(e) => { cambiarPagina(true, tabuladores[1]) }}>Siguiente</button></> : paginaBusqueda.relatos <= 1 && paginaBusqueda.relatos < paginasTotal.relatos ?
                                    <><p>Página {paginaBusqueda.relatos} de {paginasTotal.relatos}
                                    </p><button onClick={(e) => { cambiarPagina(true, tabuladores[1]) }} type="button">Siguiente</button></> : paginaBusqueda.relatos > 1 && paginaBusqueda.relatos >= paginasTotal.relatos ?
                                        <><button onClick={(e) => { cambiarPagina(false, tabuladores[1]) }} type="button">Anterior</button><p>Página {paginaBusqueda.relatos} de {paginasTotal.relatos}</p>
                                        </> : <><p></p>
                                        </>}
                            </div>
                        }
                    </div>
                </div>
                
            </div>
            <HomeFooter></HomeFooter>
            <ModalAlt id="modal-search" isOpen={modalOpen} modalSize="lg" onClose={toggleState} title={
                        childrenModal == MODAL_SEARCH_USERS ? "Búsqueda de usuarios" : 
                        childrenModal == MODAL_SEARCH_VIDEOS ? "Búsqueda de videos" : null}>{childrenModal == MODAL_SEARCH_USERS
                            ? <div className='search-list-container'><div className='search-list-advanced'><input ref={refModalUsuario} autoFocus type="text" value={valueUserSearch} onChange={(e)=>setValueUserSearch(e.target.value)}></input>
                            <button type="button" onClick={searchUsuario}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button></div>
                            <div className='results-search-list-advanced'>
                                {usuariosSearch.map((el,index)=>{
                                    return <button type="button" onClick={(e) => setUserSearch(e,el.username)}>{el.username}</button>
                                })}
                            </div>
                            </div>: childrenModal == MODAL_SEARCH_VIDEOS?
                            <div className='search-list-container'><div className='search-list-advanced'><input ref={refModalVideos} autoFocus type="text" value={valueVideoSearch} onChange={(e)=>setValueVideoSearch(e.target.value)}></input>
                            <button type="button" onClick={searchVideo}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button></div>
                            <div className='results-search-list-advanced'>
                                {videosSearch.map((el,index)=>{
                                    return <button type="button" onClick={(e) => setVideoSearch(e,el)}>{el.titulo}</button>
                                })}
                            </div></div> : null}</ModalAlt>
        </div>
    )
}
