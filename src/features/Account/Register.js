import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';
import { ThemesContext } from '../../ThemeProvider';
import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ENUM_REGISTRO = {
    EMAIL: 1,
    USERNAME: 2,
    PASSWORD: 3,
    CONFIRM_PASSWORD: 4,
    FIRST_NAME: 5,
    LAST_NAME: 6
}
const Register = (props) => {
    const [formRegister, setFormRegister] = useState({
        email: '',
        username: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        password_confirm: false

    });
    const [formValidate, setFormValidate] = useState({
        email: [],
        username: [],
        password: [],
        first_name: [],
        invalido: false,
        exitoso: false,
        mapeo: {
            email: "Correo electrónico",
            username: "Nombre de usuario",
            password: "Contraseña",
            first_name: "Nombre o apellidos"
        }
    });
    const verificaPassword = () => {
        if (formRegister.password == formRegister.password2) {
            setFormRegister({
                ...formRegister,
                password_confirm: true,
            })
        }
        else {
            setFormRegister({
                ...formRegister,
                password_confirm: false,
            })
        }
    }
    const estableceValorRegistro = (valor, enumeracion) => {
        switch (enumeracion) {
            case ENUM_REGISTRO.EMAIL:
                setFormRegister({
                    ...formRegister,
                    email: valor
                });
                break;
            case ENUM_REGISTRO.USERNAME:
                setFormRegister({
                    ...formRegister,
                    username: valor
                });
                break;
            case ENUM_REGISTRO.PASSWORD:
                setFormRegister({
                    ...formRegister,
                    password: valor
                });
                break;
            case ENUM_REGISTRO.CONFIRM_PASSWORD:
                setFormRegister({
                    ...formRegister,
                    password2: valor
                });
                break;
            case ENUM_REGISTRO.FIRST_NAME:
                setFormRegister({
                    ...formRegister,
                    first_name: valor
                });
                break;
            case ENUM_REGISTRO.LAST_NAME:
                setFormRegister({
                    ...formRegister,
                    last_name: valor
                });
                break;
        }
    }
    const validateErrors = () => {
        let arreglo = Object.keys(formValidate).filter(e => e != "invalido" && e != "mapeo");
        arreglo = arreglo.map((e, i) => {
            if (formValidate[e].length > 0) {
                //console.log('hallado en llaves ', e, formValidate[e])
                return e;
            }
        });
        return arreglo.filter(e => e !== undefined)

    }
    const enviarRegistro = () => {
        const post_register = axios.post(`${getBaseAdressApi()}api/register/`, {
            "username": formRegister.username,
            "first_name": formRegister.first_name,
            "last_name": formRegister.last_name,
            "email": formRegister.email,
            "password": formRegister.password,
            "password2": formRegister.password2
        }).then(response => {
            setFormValidate({
                ...formValidate,
                invalido: false,
                exitoso: true
            });
        }).catch(err => {
            //console.log('trate de cachar la respuesta del registro ', err);
            //console.log('errores encontrados username', err.response.data["username"])
            setFormValidate({
                ...formValidate,
                username: "username" in err.response.data ? err.response.data["username"] : [],
                email: "email" in err.response.data ? err.response.data["email"] : [],
                password: "password" in err.response.data ? err.response.data["password"] : [],
                first_name: "first_name" in err.response.data ? err.response.data["first_name"] : [],
                invalido: true,
                exitoso:false
            })
        })
    };
    return (<>
        <NavBar></NavBar>
        {
            formValidate.exitoso && <div className='register-success'>
                <div className='standard-close-register' onClick={(e)=>setFormValidate({
                    ...formValidate,
                    exitoso:false
                })}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></div>
                <p>!Felicidades! Su registro ha sido exitoso, en breve recibirá un correo electrónico para verificar el registro en el sitio.</p>
            </div>
        }
        {formValidate.invalido && <div className='error-summary'>
            <div className='standard-close-register'onClick={(e)=>setFormValidate({
                    ...formValidate,
                    invalido:false
                })}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></div>
            <ul>
                <li>Se encontraron errores en el registro:</li>
                {validateErrors().map((e, i) => {
                    return <li key={i}>{formValidate.mapeo[e]}: {formValidate[e].map((error, indice) => {
                        return <span key={indice}>{error}</span>
                    })
                    }
                    </li>
                })}
            </ul>
        </div>}
        <div className='card-register'>
            <div className='grid-address'>
                <div className='item-grid-address'>
                    <label>Correo electrónico</label><input type="text" value={formRegister.email} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.EMAIL)}></input>
                </div>
                <div className='item-grid-address'>
                    <label>Nombre de usuario</label><input type="text" value={formRegister.username} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.USERNAME)}></input>
                </div>
                <div className='item-grid-address password-validate'>
                    <label>Contraseña</label><input type="password" value={formRegister.password} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.PASSWORD)}></input>
                    <span style={{ color: "green" }}>{formRegister.password_confirm && <FontAwesomeIcon icon='fa-check'></FontAwesomeIcon>}</span>
                </div>
                <div className='item-grid-address password-validate'>
                    <label>Confirmar contraseña</label><input type="password" value={formRegister.password2} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.CONFIRM_PASSWORD)}
                        onBlur={verificaPassword}></input><span style={{ color: "green" }}>{formRegister.password_confirm && <FontAwesomeIcon icon='fa-check'></FontAwesomeIcon>}</span>
                </div>
                <div className='item-grid-address'>
                    <label>Nombre(s)</label><input type="text" value={formRegister.first_name} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.FIRST_NAME)}></input>
                </div>
                <div className='item-grid-address'>
                    <label>Apellidos</label><input type="text" value={formRegister.last_name} onChange={(e) => estableceValorRegistro(e.target.value, ENUM_REGISTRO.LAST_NAME)}></input>
                </div>
                <div className='send-registro'>
                    <button type="button" onClick={enviarRegistro}>Registrarse</button>
                </div>
            </div>

        </div >
        <div class="footer-registro">
        <HomeFooter></HomeFooter>
        </div></>)
}
export default Register