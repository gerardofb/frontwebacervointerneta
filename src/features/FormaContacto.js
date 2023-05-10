import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { HomeFooter } from './HomeFooter';
import axios from 'axios';
import { getBaseAdressApi } from './MainAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose
} from '@fortawesome/free-solid-svg-icons';

const ENUM_CONTACTO = {
    CORREO_ELECTRONICO: 1,
    MENSAJE: 2,
    VIDEO: 3
}
const FormaContacto = (props) => {
    const [form, setForm] = useState({
        correo_electronico: '',
        mensaje: '',
        video: ''
    });

    const [todascategorias, setTodascategorias] = useState([])
    const [videoslistado, setVideosListado] = useState([])
    let respuesta_cat = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {
        //console.log('dentro de consulta original', response.data.results);
        setTodascategorias(response.data.results);
    })
    const requestVideos = axios.get(`${getBaseAdressApi()}api/shortlistvideos/`).then(response => {
        let videos = response.data.results.map((el, indice) => {
            return { id: el.id, titulo: el.titulo }
        })
        setVideosListado(videos);
    })
    const [formValidate, setFormValidate] = useState({
        mapeo: {
            correo_electronico: "Correo electrónico",
            mensaje: "Mensaje",
            video: "Seleccione un video"
        },
        correo_electronico:[],
        mensaje:[],
        video:[],
        invalido:false,
        exitoso:false
    });
    const enviarFormulario = () => {
        //console.log('valores enviando el formulario de contacto ', formValidate);
        if (form.correo_electronico.length == 0 || form.mensaje.length == 0 || form.video.length == 0) {
            setFormValidate({
                ...formValidate,
                correo_electronico:verificaContacto(form.correo_electronico,ENUM_CONTACTO.CORREO_ELECTRONICO),
                mensaje:verificaContacto(form.mensaje,ENUM_CONTACTO.MENSAJE),
                video:verificaContacto(form.video,ENUM_CONTACTO.VIDEO),
                invalido: true,
                exitoso: false
            })
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
        if (valor.trim() == "" && enumeracion == ENUM_CONTACTO.CORREO_ELECTRONICO) {
            return ["Este campo es obligatorio"];
        }
        else if (valor.trim() == "" && enumeracion == ENUM_CONTACTO.MENSAJE) {
            return ["Este campo es obligatorio"];
        }
        else if ((valor.trim() == "" || valor.trim == "0") && enumeracion == ENUM_CONTACTO.VIDEO) {
            return ["Este campo es obligatorio"];
        }
        //console.log('valores enviando el formulario de contacto ', formValidate);
        return [];
    }
    const estableceValorFormulario = (valor, enumeracion) => {
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
    return (<>
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
                    <label>Correo electrónico</label><input type="text" value={form.correo_electronico} onChange={(e) => estableceValorFormulario(e.target.value, ENUM_CONTACTO.CORREO_ELECTRONICO)}></input>
                </div>
                <div className='item-grid-address password-validate'>
                    <label>Mensaje</label><input type="password" value={form.mensaje} onChange={(e) => estableceValorFormulario(e.target.value, ENUM_CONTACTO.MENSAJE)}></input>
                </div>
                <div className='send-login'>
                    <button type="button" onClick={enviarFormulario}>Enviar mensaje</button>
                </div>
            </div>

        </div >
        <div class="footer-login">
            <HomeFooter></HomeFooter>
        </div></>)
}
export default FormaContacto;