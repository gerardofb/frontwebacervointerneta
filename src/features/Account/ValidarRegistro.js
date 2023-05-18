import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import NavBar from '../NavBar';
import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidarRegistro = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [mensaje, setMensaje] = useState('');
    const [exito, setExito] = useState({ exitoso: null, mensaje: '' });
    const [postMensaje, setpostMensaje] = useState({
        guid: '',
        username: ''
    });
    const validarVinculo = () => {
        axios.post(`${getBaseAdressApi()}api/validateregister/`, postMensaje).then(response => {
            if (response.status == 200) {
                setExito({ ...exito, exitoso: true });
                setTimeout(function () {
                    history.push('/Login')
                }, 7000)
            }
            else setExito({
                ...exito,
                exitoso: false,
                mensaje: 'Ocurrió un error inesperado'
            });
        }).catch(err => {
            console.log('error validando registro',err);
            setExito({
                ...exito,
                exitoso: false,
                mensaje: err.response.data.detail
            });
        })
    }
    let parametros = new URLSearchParams(window.location.search);
    if (location.search) {
        
        if (postMensaje.guid == '' && parametros.get('vinculo') && parametros.get('usuario')) {
            setpostMensaje({
                guid: parametros.get('vinculo'),
                username: parametros.get('usuario')
            });
            setMensaje('Por favor verifique su registro con nosotros haciendo click en el siguiente link');
        }
        else if(postMensaje == '') {
            setMensaje('Al parecer ha llegado a esta página por error. Para salir haga click en el siguiente vínculo:');
        }
    }
    else if(!parametros.get('vinculo') || !parametros.get('usuario')) {
        setMensaje('Al parecer ha llegado a esta página por error. Para salir haga click en el siguiente vínculo:');
    }
    return (
        <div>
            <div style={{ backgroundColor: 'black', height: '100px' }}>
                <NavBar></NavBar>
            </div>
            {
                exito.exitoso === true ? <div className='register-success'>
                    <p>!Felicidades! Su registro fue completado. Redirigiendo al inicio de sesión...</p>
                </div> : exito.exitoso === false ? <div className='error-summary'>
                    <div className='standard-close-register' onClick={(e) => setExito({
                        ...exito,
                        exitoso: null,
                        mensaje: ''
                    })}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></div>
                    <p>{exito.mensaje}</p>
                </div>
                    : null
            }
            <div className='card-register-validar'>
                <p>
                    Bienvenido, en esta página podrá completar su registro en nuestro sitio web.&nbsp;
                    <strong>¡Gracias por su confianza, está a un paso de ser miembro activo de la comunidad del Acervo Audiovisual Interneta!</strong>
                </p>
                {
                    mensaje ? <>
                        <div className='send-registro-validar'>
                            <p>{mensaje}</p>
                            <button type="button" onClick={(e)=>validarVinculo()}>Validar mi registro</button>
                        </div></>
                        : <><p>{mensaje}</p>
                            <div className='send-registro-validar'>
                                <p>{mensaje}</p>
                            </div></>
                }
            </div>
        </div>
    )
}
export default ValidarRegistro;