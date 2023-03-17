import React, { useState, useRef, useEffect } from "react";
import NavBar from '../NavBar';
import { HomeFooter } from "../HomeFooter";
import { useParams } from "react-router-dom";
import DefaultCombo from "../Events/DefaultCombo";
import {
    faTrash, faList, faUser, faBars, faStar,
    faArrowDown, faArrowUp, faSearch, faPlay, faTag, faBook, faBullseye, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getBaseAdressApi } from "../MainAPI";
import { useHistory } from 'react-router-dom';
const videosMin = [];
let arreglotags = [
    { popular: false, content: 'punk' },
    { popular: false, content: 'rock' },
    { popular: false, content: 'proyecto' },
    { popular: true, content: 'vida' },
    { popular: true, content: 'grabación' },
    { popular: false, content: 'vibrante' },
    { popular: false, content: 'salud' },
    { popular: false, content: 'nopal' },
    { popular: false, content: 'drogas' },
    { popular: false, content: 'marihuana' },
    { popular: false, content: 'colección' },
    { popular: true, content: 'antropología' },
    { popular: true, content: 'ska' },
    { popular: false, content: 'comunidad' },
    { popular: false, content: 'barrio' },
    { popular: false, content: 'mictlan' },
    { popular: false, content: 'protesta' },
    { popular: false, content: 'programa' },
    { popular: true, content: 'producción' },
    { popular: true, content: 'colaboracón' },
    { popular: true, content: 'tránsito' },
    { popular: true, content: 'policía' },
    { popular: true, content: 'memoria' },
    { popular: false, content: 'chilango' },
    { popular: false, content: 'gresca' },
    { popular: false, content: 'tenis' },
    { popular: false, content: 'ultravital' },
    { popular: false, content: 'desobediencia' },
    { popular: false, content: 'visibilidad' },
    { popular: false, content: 'latino' },
    { popular: false, content: 'lágrimas' },
    { popular: true, content: 'historia' },
    { popular: true, content: 'radio' },
    { popular: true, content: 'pasaje' },
    { popular: true, content: 'cinta' },
    { popular: true, content: 'cassete' },
    { popular: false, content: 'transbordar' },
    { popular: false, content: 'viaje' },
    { popular: false, content: 'serie' },
    { popular: false, content: 'vigilantes' },
    { popular: false, content: 'testimonio' },
    { popular: false, content: 'menjunje' },
    { popular: false, content: 'electrónica' },
    { popular: false, content: 'firma' },
    { popular: false, content: 'graffiti' },
    { popular: true, content: 'noche' },
    { popular: true, content: 'estudio' },
    { popular: true, content: 'punk' },
    { popular: true, content: 'rock' },
    { popular: true, content: 'proyecto' },
    { popular: true, content: 'vida' },
    { popular: true, content: 'grabación' },
    { popular: false, content: 'vibrante' },
    { popular: false, content: 'salud' },
    { popular: false, content: 'nopal' },
    { popular: false, content: 'drogas' },
    { popular: false, content: 'marihuana' },
    { popular: false, content: 'colección' },
    { popular: false, content: 'antropología' },
    { popular: true, content: 'ska' },
    { popular: true, content: 'comunidad' },
    { popular: true, content: 'barrio' },
    { popular: true, content: 'mictlan' },
    { popular: true, content: 'protesta' },
    { popular: false, content: 'programa' },
    { popular: false, content: 'producción' },
    { popular: false, content: 'colaboracón' },
    { popular: false, content: 'tránsito' },
    { popular: false, content: 'policía' },
    { popular: false, content: 'memoria' },
    { popular: true, content: 'chilango' },
    { popular: true, content: 'gresca' },
    { popular: true, content: 'tenis' },
    { popular: true, content: 'ultravital' },
    { popular: true, content: 'desobediencia' },
    { popular: true, content: 'visibilidad' },
    { popular: true, content: 'latino' },
    { popular: true, content: 'lágrimas' },
    { popular: false, content: 'historia' },
    { popular: false, content: 'radio' },
    { popular: false, content: 'pasaje' },
    { popular: false, content: 'cinta' },
    { popular: false, content: 'cassete' },
    { popular: false, content: 'transbordar' },
    { popular: false, content: 'viaje' },
    { popular: true, content: 'serie' },
    { popular: true, content: 'vigilantes' },
    { popular: true, content: 'testimonio' },
    { popular: true, content: 'menjunje' },
    { popular: false, content: 'electrónica' },
    { popular: false, content: 'firma' },
    { popular: false, content: 'graffiti' },
    { popular: false, content: 'noche' },
    { popular: false, content: 'estudio' },
    { popular: false, content: 'punk' },
    { popular: true, content: 'rock' },
    { popular: true, content: 'proyecto' },
    { popular: true, content: 'vida' },
    { popular: true, content: 'grabación' },
    { popular: true, content: 'vibrante' },
    { popular: true, content: 'salud' },
    { popular: false, content: 'nopal' },
    { popular: false, content: 'drogas' },
    { popular: false, content: 'marihuana' },
    { popular: false, content: 'colección' },
    { popular: false, content: 'antropología' },
    { popular: false, content: 'ska' },
    { popular: true, content: 'comunidad' },
    { popular: true, content: 'barrio' },
    { popular: true, content: 'mictlan' },
    { popular: true, content: 'protesta' },
    { popular: true, content: 'programa' },
    { popular: false, content: 'producción' },
    { popular: false, content: 'colaboracón' },
    { popular: false, content: 'tránsito' },
    { popular: false, content: 'policía' },
    { popular: true, content: 'memoria' },
    { popular: true, content: 'chilango' },
    { popular: true, content: 'gresca' },
    { popular: true, content: 'tenis' },
    { popular: false, content: 'ultravital' },
    { popular: false, content: 'desobediencia' },
    { popular: false, content: 'visibilidad' },
    { popular: false, content: 'latino' },
    { popular: false, content: 'lágrimas' },
    { popular: false, content: 'historia' },
    { popular: false, content: 'radio' },
    { popular: false, content: 'pasaje' },
    { popular: false, content: 'cinta' },
    { popular: false, content: 'cassete' },
    { popular: false, content: 'transbordar' },
    { popular: true, content: 'viaje' },
    { popular: true, content: 'serie' },
    { popular: true, content: 'vigilantes' },
    { popular: true, content: 'testimonio' },
    { popular: true, content: 'menjunje' },
    { popular: false, content: 'electrónica' },
    { popular: false, content: 'firma' },
    { popular: false, content: 'graffiti' },
    { popular: true, content: 'noche' },
    { popular: true, content: 'estudio' },
];

const seleccionaTipoVideo = { MAS_VISITADOS: 2, FAVORITOS: 3 };
function getVideosListado(tipoEvento) {
    let salida = [];
    for (let i = 0; i < videosMin.length; i++) {
        if (i % tipoEvento == 0) {
            salida.push(videosMin[i])
        }
    }
    return salida;
}
const ordenBusquedaPredeterminado = {
    Titulo: 1,
    Categoria: 2,
    Calificacion: 3,
    ListaReproduccion: 4,
    Tags: 5,
    Relato: 6
}

const ListadoOrdenar = [
    {
        indice: 0, title: 'Seleccionar...'
    },
    {
        indice: 1, title: 'Título', icono: faList

    },
    {
        indice: 2, title: 'Categoría', icono: faBook
    },
    {
        indice: 3, title: "Calificación", icono: faStar
    },
    ,
    {
        indice: 4, title: "Resumen", icono: faPlay
    },
    ,
    {
        indice: 5, title: "Tags", icono: faTag
    },
    {
        indice: 6, title: "Usuarios", icono: faUser
    }
]
const ListadoOpcionesVideo = [
    {
        indice: 1, title: 'Explorar', icono: faBullseye

    },
    {
        indice: 2, title: 'Eliminar', icono: faTrash

    },
    {
        indice: 3, title: 'Encolar', icono: faHeadphones
    }
]
const ListadoOpcionesVideoVisitados = [
    {
        indice: 1, title: 'Explorar', icono: faBullseye

    },
    ,
    {
        indice: 3, title: 'Encolar', icono: faHeadphones
    }
]
const tipoBusquedaPagina = {
    TITULO: 1,
    CATEGORIA: 2,
    USUARIO: 3,
    LISTAREPRODUCCION: 4,
    TAG: 5
}
const orderBy = (listado, ordenamiento, desc) => {
    let salida = listado;

    if (ordenamiento == ordenBusquedaPredeterminado.Titulo) {
        salida.sort((a, b) => a.Video.localeCompare(b.Video));
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Categoria) {
        salida.sort((a, b) => a.Categoria.localeCompare(b.Categoria));
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Calificacion) {
        salida.sort((a, b) => a.Calificacion - b.Calificacion);
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Tags) {
        salida.sort((a, b) => a.Tags.length - b.Tags.length);
    }
    salida = desc ? listado.reverse() : listado;
    console.log('ordenando listado', ordenamiento, salida, ordenBusquedaPredeterminado);
    return salida;
}
function random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`
const ListadoRelatosFavoritos = (props) => {
    const history = useHistory();
    const rutaTipoListado = useParams();
    const tipoListado = rutaTipoListado.tipo === "MasVisitados" ? seleccionaTipoVideo.MAS_VISITADOS : rutaTipoListado.tipo === "Favoritos" ?
        seleccionaTipoVideo.FAVORITOS : seleccionaTipoVideo.MAS_VISITADOS;
    const [listado, setListado] = useState([]);
    const [searchBy, setSearchBy] = useState([-1]);
    const [ordenarPor, setOrdenarPor] = useState({ orden: ordenBusquedaPredeterminado.Nombre, descendiente: false });
    const [ordenamientoDesc, setOrdenamientoDesc] = useState(false);
    const [cargaPaginada, setCargaPaginada] = useState(false);
    const [idFilaFavorito, setIdFilaFavorito] = useState({vinculo:'',idvideo:0});
    const [resumenRelato,setResumenRelato] = useState({guid:'',resumen:''});
    console.log('tipo listado ', rutaTipoListado, tipoListado, listado)
    useEffect(() => {
        const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
            let categories = respuesta.data.results.map((cat, idx) => {
                return { titulo: cat.titulo, id_cat: cat.id }
            });
            const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/detailfavoritesrelatobyuser/`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                    }
                }).then(response => {
                    let videosfavoritos = response.data.map((vid, ind) => {
                        let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                        let relatovideohightlight = vid.relatos_por_video.length > 0 ? vid.relatos_por_video.filter(x=> x.favoritos_por_relato.length > 0) : "";
                        let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                            return tag.content
                        });
                        console.log('los relatos del video son ', relatovideohightlight);
                        console.log('indice de los tags ', sliceIndex, tagsselected);
                        return { Documento:relatovideohightlight[0].document_id, Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: Math.ceil(Math.random() * 5), ListaReproduccion: {}, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                    });
                    setListado(videosfavoritos)
                    setCargaPaginada(true);
                });
        })
    }, [])
    const estableceRelatoHover = (documento)=>{
        const peticionRelato = axios.post(`${getBaseAdressApi()}api/singlerelato/`,{
            identificador:documento
        }).then(response=>{
            console.log('la respuesta del relato resumido es ',response.data);
            if(response.data[0].relato && response.data[0].relato.length > 150){
                setResumenRelato({...resumenRelato,guid:documento,resumen:response.data[0].relato.substring(0,150)+"..."});
            }
            else if(response.data[0].relato && response.data[0].relato.length < 150){
                setResumenRelato({...resumenRelato,guid:documento,resumen:response.data[0].relato+"..."})
            }
        })
    }
    const estableceDescendienteAscendiente = (valor, orden) => {

        if (orden != ordenBusquedaPredeterminado.ListaReproduccion && orden != ordenBusquedaPredeterminado.Relato) {
            setOrdenamientoDesc(valor);
            setOrdenarPor({ orden: orden, descendiente: valor });
            let salida = orderBy(listado.slice(0), orden, valor);
            setListado(salida);
            // console.log('descendiente ', valor, orden)
        }
    }
    const estableceOrdenamiento = (orden) => {
        setVisibleOpciones(-1);
        setOrdenarPor({ orden: orden.indice, descendiente: ordenamientoDesc });
        let salida = orderBy(listado.slice(0), orden.indice, ordenamientoDesc);
        setListado(salida);
    }
    const [opcionesSetVisible, setVisibleOpciones] = useState(-1);
    const [opcionVideoPor, setOpcionVideoPor] = useState(-1);
    const [textoSearch, setTextoSearch] = useState('');
    const estableceBusqueda = () => {
        setVisibleOpciones(-1);
        setOrdenamientoDesc(ordenamientoDesc);
        setOrdenarPor({ orden: ordenarPor, descendiente: ordenamientoDesc });
        let salida = orderBy(listado.slice(0), ordenarPor.orden, ordenamientoDesc);

        if (textoSearch.trim() != '') {
            setCargaPaginada(false);
            let salidaTitulo = [];
            let salidaCategoria = [];
            let salidaUsuario = [];
            let salidaListaRepro = [];
            let salidaTags = [];
            searchBy.map((busquedapor, indice) => {
                switch (busquedapor) {
                    case tipoBusquedaPagina.TITULO:
                        salidaTitulo = salidaTitulo.concat(salida.filter(x => x.Video.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                        break;
                    case tipoBusquedaPagina.CATEGORIA:
                        salidaCategoria = salidaCategoria.concat(salida.filter(x => x.Categoria.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                        break;
                    case tipoBusquedaPagina.USUARIO:
                        let salidaautores = [];
                        let autorRelato = salida.map((el, idx) => {
                            let exit = el.Relato.map((rel, ind) => {
                                return { autor: rel.id_autor.username, id_video: el.Id }
                            });
                            salidaautores = salidaautores.concat(exit);
                            return exit;
                        });
                        console.log('autores filtrados del relato ', salidaautores);
                        let autorbuscado = salidaautores.find(x => x.autor.toLowerCase() == textoSearch.toLowerCase())
                        salidaUsuario = autorbuscado != undefined ?
                            salidaUsuario.concat(salida.filter(x => x.Relato != "" && x.Id == autorbuscado.id_video)) : [];
                        break;
                    case tipoBusquedaPagina.LISTAREPRODUCCION:
                        salidaListaRepro = salidaListaRepro.concat(salida.filter(x => x.ListaReproduccion.Titulo != undefined &&
                            x.ListaReproduccion.Titulo.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                        break;
                    case tipoBusquedaPagina.TAG:
                        let busqueda = salida.map((tag, i) => {
                            console.log('en búsqueda de tags ', tag.Tags);
                        })
                        salidaTags = salidaTags.concat(salida.filter(x => x.Tags.length > 0 && x.Tags.find(a => a.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1)));
                        break;
                }
                console.log('buscando en todos los tipos ', salidaTitulo, salidaCategoria, salidaUsuario, salidaListaRepro, salidaTags);
            });

            salida = salidaTitulo.concat(salidaCategoria).concat(salidaUsuario).concat(salidaListaRepro).concat(salidaTags);
            setListado(salida);
            setCargaPaginada(true);
        }
        else {
            setCargaPaginada(false);
            const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
                let categories = respuesta.data.results.map((cat, idx) => {
                    return { titulo: cat.titulo, id_cat: cat.id }
                });
                const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/detailfavoritesvideobyuser/`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                        }
                    }).then(response => {
                        let videosfavoritos = response.data.map((vid, ind) => {
                            let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                            let relatovideohightlight = vid.relatos_por_video.length > 0 ? vid.relatos_por_video : "";
                            let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                                return tag.content
                            });
                            console.log('los relatos del video son ', relatovideohightlight);
                            console.log('indice de los tags ', sliceIndex, tagsselected);
                            return { Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: Math.ceil(Math.random() * 5), ListaReproduccion: {}, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                        });
                        setListado(videosfavoritos);
                        setCargaPaginada(true);
                    });
            })
        }
    }
    const estableceTipoBusqueda = (tipo, checado) => {
        let listado = searchBy;
        if (checado) {
            listado.push(tipo);
        }
        else {
            listado = listado.map((el, indice) => {
                return el !== tipo;
            });
        }
        listado.reduce(x => (a, b) => {
            return a != b;
        });
        setSearchBy(listado);
    }
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    const setActionRowFavorito = (elemento) => {

        console.log('acción de combo ', opcionVideoPor, elemento)
        let accion = ListadoOpcionesVideo.find(x => x.indice == elemento.indice);
        if (accion != undefined) {
            switch (accion.title) {
                case 'Explorar':
                    console.log('el vinculo a navegar es ', idFilaFavorito);
                    if(idFilaFavorito.vinculo!=''){
                    console.log('el vinculo a navegar es navegando a vinculo')
                    history.push(idFilaFavorito.vinculo);
                    }
                    break;

                case 'Eliminar':
                    setCargaPaginada(false);
                    const deletefav = axios.delete(`${getBaseAdressApi()}api/addfavoritevideo/`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                        }, data:{
                        "id_video": parseInt(idFilaFavorito.idvideo)
                    }}).then(response => {
                        
                        const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
                            let categories = respuesta.data.results.map((cat, idx) => {
                                return { titulo: cat.titulo, id_cat: cat.id }
                            });
                            const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/detailfavoritesvideobyuser/`,
                                {
                                    headers: {
                                        "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                                    }
                                }).then(response => {
                                    let videosfavoritos = response.data.map((vid, ind) => {
                                        let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                                        let relatovideohightlight = vid.relatos_por_video.length > 0 ? vid.relatos_por_video : "";
                                        let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                                            return tag.content
                                        });
                                        console.log('los relatos del video son ', relatovideohightlight);
                                        console.log('indice de los tags ', sliceIndex, tagsselected);
                                        return { Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: Math.ceil(Math.random() * 5), ListaReproduccion: {}, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                                    });
                                    setListado(videosfavoritos);
                                    setCargaPaginada(true);
                                });
                        });
                    }).catch(err=>{
                        console.log('error eliminando el favorito ',err);
                    });
            }
        }
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="container-listado-videos">
                <div className="busqueda-videos-listado">
                    <div className="row-busqueda-videos-listado">
                        <label>Búsqueda: </label>
                        <input type="text" value={textoSearch} onChange={(e) => setTextoSearch(e.target.value)}></input><button type="button" onClick={(e) => { estableceBusqueda() }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Título:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.TITULO, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Categoria:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.CATEGORIA, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Usuario:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.USUARIO, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Resumen:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.LISTAREPRODUCCION, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Tag:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.TAG, e.target.checked)} type="checkbox"></input>
                    </div>
                </div>
                <div className="header-opciones-listado"><span>Ordenar por: </span>
                    <div className="container-default-combo">
                        <DefaultCombo
                            on={ordenarPor} onChange={estableceOrdenamiento} listado={ListadoOrdenar} />
                    </div>

                </div>
                <div className="listado-default-header-vid">
                    {

                        ListadoOrdenar.map((header, indice) => {
                            let claseHeaderCss = ordenarPor.orden === header.indice ? "item-listado-header-visible" : "item-listado-header-invisible";
                            return (
                                header.title != "Bandera" && header.title != "Publicador" && header.title != "Seleccionar..." ?
                                    <div key={indice}>{header.title} <span className={claseHeaderCss}
                                        onClick={(e) => { estableceDescendienteAscendiente(!ordenamientoDesc, ordenarPor.orden) }}>
                                        <FontAwesomeIcon icon={ordenamientoDesc ? faArrowUp : faArrowDown} /></span></div>
                                    : null)
                        })

                    }
                    <div>Opciones</div>
                </div>

                <div className="listado-default">
                <div className='default-loader-full' style={cargaPaginada === false ? { display: 'block' } : { display: 'none' }}>
                        <img src={url_loader("Reload_generic.gif", false)} />
                    </div>
                    {
                        listado.map((item, index) => {
                            let vinculo = "/Autobiograficos/"+item.Documento+"?s=true&cat=Relatos";
                            let autores = item.Relato.map((rel, idx) => {
                                return rel.id_autor.username
                            }).filter(onlyUnique)
                            let claseCssBotonOpciones = opcionesSetVisible == index ? "container-default-combo listado-combo" : "container-default-combo combo-hidden"
                            let listareproduccion = item.ListaReproduccion.Titulo ? item.ListaReproduccion.Titulo : "";
                            let autorRelato = item.Relato != "" ? autores.join(', ') : "";
                            console.log('autores del relato de video ', item.Relato, autores);
                            return (
                                <div className="vid-listado" onMouseEnter={(e)=>estableceRelatoHover(item.Documento)} key={index}>
                                    <div>{item.Video}</div><div>{item.Categoria}</div><div>{item.Calificacion}</div>
                                    <div>{resumenRelato.guid == item.Documento ? resumenRelato.resumen : ''}
                                    </div>

                                    <div><div className="nowrap-tags-listado">{item.Tags.map((tag, i) => {
                                        return (

                                            <button className="tag-listado-vid" type="button" key={i}>{tag}</button>

                                        )
                                    })}</div></div>
                                    <div>{autorRelato}</div>
                                    <div>
                                        <button title="opciones de la lista (doble click para ocultar)"
                                            onClick={(e) => {setVisibleOpciones(index);setIdFilaFavorito({...idFilaFavorito,vinculo:vinculo,
                                                idvideo:item.Id})}} onDoubleClick={(e) => setVisibleOpciones(-1)}>
                                            <FontAwesomeIcon icon={faBars} /></button>
                                        <div className={claseCssBotonOpciones}>
                                            <DefaultCombo
                                                onChange={setActionRowFavorito}
                                                on={opcionVideoPor} listado={tipoListado !== seleccionaTipoVideo.MAS_VISITADOS ? ListadoOpcionesVideo : ListadoOpcionesVideoVisitados} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <HomeFooter></HomeFooter>
        </>
    )
}
export default ListadoRelatosFavoritos;
