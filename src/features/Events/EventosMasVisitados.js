import React, { useState, useEffect, useRef, createRef } from "react";
import NavBar from '../NavBar';
import { HomeFooter } from "../HomeFooter";
import { useLocation, useParams } from "react-router-dom";
import DefaultCombo from "./DefaultCombo";
import {
    faTrash, faFlag, faList, faCalendarAlt, faUser, faBars, faClock,
    faArrowDown, faArrowUp, faSearch, faBullseye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getBaseAdressApi } from "../MainAPI";
import { useHistory } from "react-router-dom";

const seleccionaTipoEvento = { MAS_VISITADOS: 2, PROXIMOS: 3, FAVORITOS: 4 };
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`

const ordenBusquedaPredeterminado = {
    Nombre: 1,
    Bandera: 2,
    Fecha: 3,
    Visitas: 4,
    Duracion: 5
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
function fillInDaysMonth(mesinicial, anioinicial) {
    const aniodefecto = new Date(anioinicial, 0, 1).getFullYear();
    const numerodias = getDaysInMonth(aniodefecto, 0);
    const diainicial = new Date(aniodefecto, mesinicial, 1).getDay();
    const diafinal = new Date(aniodefecto, (mesinicial + 1), 0).getDate();
    let salida = [];
    let intermedio = [];
    for (let i = 0; i < diainicial; i++) {
        intermedio.push('');
    }
    for (let i = 1; i <= diafinal; i++) {
        salida.push(i);
    }
    let result = intermedio.concat(salida);
    return result;
}
function devuelveNombreDiaMes(fecha) {
    return new Intl.DateTimeFormat('es-MX', { weekday: 'short' }).format(fecha);
}
function returnHoursDurationEvent(fecha, duracion) {
    let hora = fecha.getHours() + (duracion / 60);
    let minutes = 0;
    if (hora.toString().indexOf('.') !== -1) {
        minutes = 30;
        hora = parseInt(hora.toString())
    }
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hora, minutes, 0);
}
const ListadoOrdenar = [
    {
        indice: 0, title: 'Seleccionar...'
    },
    {
        indice: 1, title: 'Título', icono: faList

    },
    {
        indice: 2, title: 'Bandera', icono: faFlag

    },
    {
        indice: 3, title: 'Fecha', icono: faCalendarAlt

    },
    {
        indice: 4, title: 'Visitas', icono: faUser
    },
    {
        indice: 5, title: "Duración", icono: faClock
    }
]
const ListadoOpcionesEvento = [
    {
        indice: 1, title: 'Marcar', icono: faFlag

    },
    {
        indice: 3, title: "Explorar", icono: faBullseye,
    }
]
const ListadoOpcionesEventoProximos = [
    {
        indice: 1, title: 'Marcar', icono: faFlag

    },
    {
        indice: 3, title: "Explorar", icono: faBullseye,
    }
]
const orderBy = (listado, ordenamiento, desc) => {
    let salida = listado;

    if (ordenamiento == ordenBusquedaPredeterminado.Nombre) {
        if (desc) {
            salida.sort((a, b) => a.title.localeCompare(b.title));
        }
        else {
            salida.sort((a, b) => a.title.localeCompare(b.title));
        }
    }
    if (ordenamiento == ordenBusquedaPredeterminado.Fecha) {
        if (desc) {
            salida.sort((a, b) => a.fecha - b.fecha);
        }
        else {
            salida.sort((a, b) => a.fecha - b.fecha);
        }
    }
    if (ordenamiento == ordenBusquedaPredeterminado.Duracion) {
        if (desc) {
            salida.sort((a, b) => parseInt(a.duracion) - parseInt(b.duracion));
        }
        else {
            salida.sort((a, b) => parseInt(a.duracion) - parseInt(b.duracion));
        }
    }
    if (ordenamiento == ordenBusquedaPredeterminado.Visitas) {
        if (desc) {
            salida.sort((a, b) => parseInt(a.visitas !== null ? a.visitas : 0) - (b.visitas !== null ? parseInt(b.visitas) : 0));
        }
        else {
            salida.sort((a, b) => parseInt(a.visitas !== null ? a.visitas : 0) - (b.visitas !== null ? parseInt(b.visitas) : 0));
        }
    }
    salida = desc ? listado.reverse() : listado;
    //console.log('ordenando listado', ordenamiento, salida, ordenBusquedaPredeterminado);
    return salida;
}
function estableceTituloCalendario(mesinicial, anioinicial) {
    let salida = anioinicial.toString();
    switch (mesinicial) {
        case 0:
            salida = "Enero " + salida;
            break;
        case 1:
            salida = "Febrero " + salida;
            break;
        case 2:
            salida = "Marzo " + salida;
            break;
        case 3:
            salida = "Abril " + salida;
            break;
        case 4:
            salida = "Mayo " + salida;
            break;
        case 5:
            salida = "Junio " + salida;
            break;
        case 6:
            salida = "Julio " + salida;
            break;
        case 7:
            salida = "Agosto " + salida;
            break;
        case 8:
            salida = "Septiembre " + salida;
            break;
        case 9:
            salida = "Octubre " + salida;
            break;
        case 10:
            salida = "Noviembre " + salida;
            break;
        case 11:
            salida = "Diciembre " + salida;
            break;
    }
    return salida;
}
const EventosMasVisitados = (props) => {
    const rutaTipoListado = useParams();
    const history = useHistory();
    // const [tipoListado, setTipoListado] = useState(3);
    const [cargaPaginada, setCargaPaginada] = useState(false);
    const [evtChecked, setEvtChecked] = useState(-1);
    const tipoListado = rutaTipoListado.tipo === "MasVisitados" ? seleccionaTipoEvento.MAS_VISITADOS : rutaTipoListado.tipo === "Favoritos" ?
        seleccionaTipoEvento.FAVORITOS : rutaTipoListado.tipo === "Proximos" ? seleccionaTipoEvento.PROXIMOS : seleccionaTipoEvento.PROXIMOS;

    const [listado, setListado] = useState([]);
    //setTipoListado(valorlistado);
    //let listadoruta = getEventosListado(tipoListado);
    //setListado(listadoruta);
    const [ordenarPor, setOrdenarPor] = useState({ orden: ordenBusquedaPredeterminado.Nombre, descendiente: false });
    const [buscarPor, setBuscarPor] = useState(ordenBusquedaPredeterminado.Nombre);
    const [diaEventoSeleccionado, setDiaEventoSeleccionado] = useState(null);
    const [ordenamientoDesc, setOrdenamientoDesc] = useState(false);
    useEffect(() => {

        const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/visitasdeevento/`).then(response => {
            let eventosvisitados = response.data.map((ev, ind) => {
                return { index: ev.id, selected: false, title: ev.titulo, descripcion: ev.descripcion, fecha: new Date(ev.fechainicio), duracion: ev.duracion, imagen: "", visitas: ev.total_de_visitas }
            });
            if (listado.length == 0) {
                setListado(eventosvisitados)
            }
            setCargaPaginada(true);
        });
    }, [listado])



    const estableceDescendienteAscendiente = (valor, orden) => {
        setOrdenamientoDesc(valor);
        setOrdenarPor({ orden: orden, descendiente: valor });
        setListado(orderBy(listado, orden, valor));
        //setListado(salida);
        //console.log('descendiente ', valor, orden)
    }
    const estableceOrdenamiento = (orden) => {
        setVisibleOpciones(-1);
        setOrdenarPor({ orden: orden.indice, descendiente: ordenamientoDesc });
        setListado(orderBy(listado, orden.indice, ordenamientoDesc));

    }
    const [opcionesSetVisible, setVisibleOpciones] = useState(-1);
    const [opcionEvenotPor, setOpcionEvenotPor] = useState(-1);
    let claseContenedorCalendario = tipoListado == "Proximos" ? "contenedor-calendarios-proximos" : "contenedor-calendario-listado";
    const [textoSearch, setTextoSearch] = useState('');
    const estableceBusqueda = () => {
        setVisibleOpciones(-1);
        setOrdenamientoDesc(ordenamientoDesc);
        setOrdenarPor({ orden: ordenarPor, descendiente: ordenamientoDesc });
        let salida = orderBy(listado, ordenarPor.orden, ordenamientoDesc);
        salida = salida.filter(x => x.title.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1);
        if (textoSearch.trim() != '') {
            setListado(salida);
        }
        else {
            const peticionFavoritos = axios.get(`${getBaseAdressApi()}api/visitasdeevento/`).then(response => {
                let eventosvisitados = response.data.map((ev, ind) => {
                    return { index: ev.id, selected: false, title: ev.titulo, descripcion: ev.descripcion, fecha: new Date(ev.fechainicio), duracion: ev.duracion, imagen: "", visitas: ev.total_de_visitas }
                });
                setListado(eventosvisitados)
                setCargaPaginada(true);
            });
        }
        setEvtChecked(-1);

    }
    const anioinicial = new Date().getFullYear();
    const [daysInitial, setDaysInitial] = useState({ numerodias: fillInDaysMonth(tipoListado == seleccionaTipoEvento.PROXIMOS ? new Date().getMonth() : 0, anioinicial), titulo: estableceTituloCalendario(tipoListado == seleccionaTipoEvento.PROXIMOS ? new Date().getMonth() : 0, anioinicial) });
    const [diaevento, setDiaEvento] = useState(0);
    const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];

    const handleEnter = (fecha, indice) => {
        let numerodefecto = fillInDaysMonth(fecha.getMonth(), fecha.getFullYear());
        setDaysInitial({ numerodias: numerodefecto, titulo: estableceTituloCalendario(fecha.getMonth(), anioinicial) });
        setDiaEvento(fecha.getDate());
        setEvtChecked(indice);
    }
    const setNavegarEvent = (e,index)=>{
        console.log('navegando en menú de opciones',e,opcionEvenotPor)
        if(e.title == 'Explorar')
        history.push('/Eventos/'+index);
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="container-listado-eventos">
                <div className="calendario-eventos-principal active">
                    <header>
                        <p>{daysInitial.titulo}</p>
                    </header>
                    <div className="eventos-main-calendar">

                        {
                            dayOfWeek.map((el, index) => {
                                return (<div className="title-calendar" key={index}><div className="content-title-calendar">
                                    {el}</div></div>)
                            })
                        }

                    </div>
                    <div className="eventos-main-calendar-content">
                        {
                            daysInitial.numerodias.map((dia, indice) => {
                                let clasedia = diaevento === dia ? "day active" : "day";
                                return (<div className={clasedia} key={indice}>
                                    <div className="date">
                                        <span className="day">
                                            {dia}
                                        </span>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className="header-opciones-listado"><span>Ordenar por: </span>
                    <div className="container-default-combo">
                        <DefaultCombo
                            on={ordenarPor} onChange={estableceOrdenamiento} listado={ListadoOrdenar} />
                    </div>
                    <span>Búsqueda: </span>
                    <div>
                        <input type="text" value={textoSearch} onChange={(e) => setTextoSearch(e.target.value)}></input><button type="button" onClick={(e) => { estableceBusqueda() }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div className="listado-default-header">
                    {

                        ListadoOrdenar.map((header, indice) => {
                            let claseHeaderCss = ordenarPor.orden === header.indice ? "item-listado-header-visible" : "item-listado-header-invisible";
                            return (
                                header.title != "Bandera" && header.title != "Seleccionar..." ?
                                    <div key={indice}>{header.title} <span className={claseHeaderCss}
                                        onClick={(e) => { estableceDescendienteAscendiente(!ordenamientoDesc, ordenarPor.orden) }}>
                                        <FontAwesomeIcon icon={ordenamientoDesc ? faArrowUp : faArrowDown} /></span></div>
                                    : null)
                        })

                    }
                    <div>Opciones <br /><span className="opciones-listados-small">(el icono de barras abre las opciones disponibles entre ellas visualizar cada elemento)</span></div>
                </div>

                <div className="listado-default">
                    <div className='default-loader-full' style={cargaPaginada === false ? { display: 'block' } : { display: 'none' }}>
                        <img src={url_loader("Reload_generic.gif", false)} />
                        <pre className="legend-loading-relatos-miniatures">Cargando listado de eventos más visitados...</pre>
                    </div>
                    {
                        listado.map((item, index) => {
                            let fechaevt = item.fecha.getFullYear() + "/" + ((item.fecha.getMonth() + 1) < 10 ? "0" + (item.fecha.getMonth() + 1) : (item.fecha.getMonth() + 1)) +
                                "/" + (item.fecha.getDate() < 10 ? "0" + item.fecha.getDate() : item.fecha.getDate());
                            let claseCssBotonOpciones = opcionesSetVisible == index ? "container-default-combo listado-combo" : "container-default-combo combo-hidden"

                            return (
                                <div className="evt-listado" key={index}>
                                    <div className="check-listado">{evtChecked === item.index ?
                                        <input type="checkbox" checked onChange={(e) => { handleEnter(item.fecha, item.index) }} /> : <input type="checkbox" onChange={(e) => { handleEnter(item.fecha, item.index) }} />
                                    }
                                        {item.title}</div><div>{fechaevt}</div><div style={{ maxWidth: '80px' }}>{item.visitas}</div><div>{item.duracion} minutos</div><div>
                                        <button title="opciones de la lista (doble click para ocultar)"
                                            onClick={(e) => setVisibleOpciones(index)} onDoubleClick={(e) => setVisibleOpciones(-1)}
                                            className="opt-evt-listado"><FontAwesomeIcon icon={faBars} /></button>
                                        <div className={claseCssBotonOpciones}>
                                            <DefaultCombo
                                                on={opcionEvenotPor} onChange={e=> {setNavegarEvent(e,item.index);} } listado={tipoListado !== seleccionaTipoEvento.PROXIMOS ? ListadoOpcionesEvento : ListadoOpcionesEventoProximos} />
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
export default EventosMasVisitados;
