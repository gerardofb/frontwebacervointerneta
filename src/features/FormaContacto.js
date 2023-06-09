import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { HomeFooter } from './HomeFooter';
import axios from 'axios';
import { getBaseAdressApi } from './MainAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {
    faClose
} from '@fortawesome/free-solid-svg-icons';
import Autocomplete from 'react-autocomplete';

const ENUM_CONTACTO = {
    CORREO_ELECTRONICO: 1,
    MENSAJE: 2,
    VIDEO: 3
}
function isInViewportMenu() {
    const menusuperior = document.querySelector('.container-menu-main')
    const barranav = document.querySelector('.navbar-principal');
    const rect = barranav.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    //console.log('datos de video encabezado', rect.top, rect.left, rect.bottom, rect.right)
    console.log('limite datos de video encabezado ', Math.round(scrollTop - rect.top))
    if (Math.round(scrollTop - rect.top) <= 0) {
        menusuperior.style.display = 'block'

    }
    else {
        menusuperior.style.display = 'none'
    }

}
const FormaContacto = (props) => {
    const [form, setForm] = useState({
        correo_electronico: '',
        mensaje: '',
        video: null
    });
    const handleScroll = () => {
        isInViewportMenu();
    }
    const location = useLocation();
    const [todascategorias, setTodascategorias] = useState([])
    const [videoslistado, setVideosListado] = useState([])
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
    const [listadoVideos, setListadoVideos] = useState([{ id_video: 0, titulo: '...Seleccionar (escriba para buscar)' }]);
    const [videoseleccionado, setVideoSeleccionado] = useState({ valor: 0, titulo: '' });
    const busquedaVideo = (valor) => {
        if (valor.length > 3) {
            const requestSearchUser = axios.get(`${getBaseAdressApi()}api/videos/` + valor).then(response => {
                let respuesta = response.data.results.map((el, idx) => {
                    return { id_video: el.id, titulo: el.titulo }
                });
                setListadoVideos([{ id_video: 0, titulo: '...Seleccionar' }].concat(respuesta));
            }).catch(err => {
                console.log(err);
            });
        }
    }
    useEffect(() => {
        isInViewportMenu();
        if (localStorage.getItem('titulo-descarga-video')) {
            setTimeout(function(){
            setVideoSeleccionado({
                ...videoseleccionado,
                titulo: localStorage.getItem('titulo-descarga-video')
            });
            busquedaVideo(localStorage.getItem('titulo-descarga-video'))
            localStorage.removeItem('titulo-descarga-video')
        },500)
        }
        if (todascategorias.length == 0) {
            const respuesta_cat = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {
                //console.log('dentro de consulta original', response.data.results);
                setTodascategorias(response.data.results);
            });
        }
 
    }, [videoslistado, todascategorias]);
    const [formValidate, setFormValidate] = useState({
        mapeo: {
            correo_electronico: "Correo electrónico",
            mensaje: "Mensaje",
            video: "Seleccione un video"
        },
        correo_electronico: [],
        mensaje: [],
        video: [],
        invalido: false,
        exitoso: false
    });
    const enviarFormulario = () => {
        //console.log('valores enviando el formulario de contacto ', formValidate);
        if (form.correo_electronico.length == 0 || form.mensaje.length == 0 || !form.video || form.video.id_video == 0) {
            setFormValidate({
                ...formValidate,
                correo_electronico: verificaContacto(form.correo_electronico, ENUM_CONTACTO.CORREO_ELECTRONICO),
                mensaje: verificaContacto(form.mensaje, ENUM_CONTACTO.MENSAJE),
                video: verificaContacto(form.video, ENUM_CONTACTO.VIDEO),
                invalido: true,
                exitoso: false
            });

            //console.log('el formulario es, ', form);
        }
        else {
            setFormValidate({
                ...formValidate,
                invalido: false,
                exitoso: true
            })
        }
    }
    const verificaContacto = (valor, enumeracion) => {
        if (enumeracion == ENUM_CONTACTO.CORREO_ELECTRONICO && valor.trim() == "") {
            return ["Este campo es obligatorio"];
        }
        else if (enumeracion == ENUM_CONTACTO.MENSAJE && valor.trim() == "") {
            return ["Este campo es obligatorio"];
        }
        else if (enumeracion == ENUM_CONTACTO.VIDEO && (!valor || valor.id_video == 0)) {
            return ["Este campo es obligatorio"];
        }
        return [];
    }
    const estableceValorFormulario = (valor, enumeracion) => {
        //console.log('estableciendo valor formulario',valor);
        switch (enumeracion) {
            case ENUM_CONTACTO.CORREO_ELECTRONICO:
                setForm({
                    ...form,
                    correo_electronico: valor
                });
                break;
            case ENUM_CONTACTO.MENSAJE:
                setForm({
                    ...form,
                    mensaje: valor
                });
                break;
            case ENUM_CONTACTO.VIDEO:
                setForm({
                    ...form,
                    video: valor
                });

                break;
        }
        //console.log('valores de formulario normal',form);
    }
    const validateErrors = () => {
        let arreglo = Object.keys(formValidate).filter(e => e != "invalido" && e != "exitoso");
        arreglo = arreglo.map((e, i) => {
            if (formValidate[e].length > 0) {
                return e;
            }
        });
        return arreglo.filter(e => e !== undefined)

    }
    return (<div>
        <NavBar></NavBar>
        {
            formValidate.exitoso && <div className='login-success'>
                <div className='standard-close-register' onClick={(e) => setFormValidate({
                    ...formValidate,
                    exitoso: false
                })}></div>
                <p>IEsta funcionalidad no está disponible</p>
            </div>
        }
        {formValidate.invalido && <div className='error-summary'>
            <div className='standard-close-register' onClick={(e) => setFormValidate({
                ...formValidate,
                invalido: false
            })}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></div>
            <ul>
                <li>Se encontraron errores en el formulario:</li>
                {validateErrors().map((e, i) => {
                    return <li key={i}>{formValidate.mapeo[e]}: {formValidate[e].map((error, indice) => {
                        return <span key={indice}>{error}</span>
                    })
                    }
                    </li>
                })}
            </ul>
        </div>}
        <div className='card-login'>
            <div className='grid-address'>
                <div className='item-grid-address'>
                    <label>Correo electrónico</label><input type="text" placeholder='correo@ejemplo.com' value={form.correo_electronico} onChange={(e) => estableceValorFormulario(e.target.value, ENUM_CONTACTO.CORREO_ELECTRONICO)}></input>
                </div>
                <div className='item-grid-address password-validate'>
                    <label>Mensaje</label><textarea placeholder='Escríbanos su mensaje, y le responderemos en breve con un correo electrónico' rows={5} cols={80} value={form.mensaje} onChange={(e) => estableceValorFormulario(e.target.value, ENUM_CONTACTO.MENSAJE)}></textarea>
                </div>
                <div className='item-grid-address'>
                    <label>Seleccione un video:</label>
                    <Autocomplete
                        getItemValue={(item) => item.titulo}
                        items={listadoVideos}
                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.titulo}
                            </div>
                        }
                        value={videoseleccionado.titulo}
                        onChange={(e) => {
                            setVideoSeleccionado({
                                ...videoseleccionado,
                                titulo: e.target.value
                            }); busquedaVideo(e.target.value);
                        }}
                        onSelect={(val) => { let selected = listadoVideos.find(e => e.titulo == val); setVideoSeleccionado(selected); estableceValorFormulario(selected, ENUM_CONTACTO.VIDEO) }}
                    />
                </div>
                <div className='send-login'>
                    <button type="button" onClick={enviarFormulario}>Enviar mensaje</button>
                </div>
            </div>

        </div >
        <div className="footer-login">
            <HomeFooter></HomeFooter>
        </div>
    </div>)
}
export default FormaContacto;