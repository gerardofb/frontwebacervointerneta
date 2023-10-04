import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';
import { ThemesContext } from '../../ThemeProvider';
import axios from 'axios';
import { getBaseAdressApi, getBaseChatApi } from '../MainAPI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ReactGA  from 'react-ga4'
import HelmetMetaData from '../HelmetMetaData';


const ENUM_LOGIN = {
    USERNAME:1,
    PASSWORD:2
}
const Login = (props) => {
    const location = useLocation();
    const {updateUser} = useContext(ThemesContext);
    const [formLogin, setFormLogin]= useState({
        username: '',
        password: ''
    });
    const [formValidate, setFormValidate] = useState({
        username: [],
        password: [],
        mapeo: {
            username: "Nombre de usuario",
            password: "Contraseña",
        },
        invalido:false,
        exitoso:false
    });
    
    const verificaPassword = (valor,enumeracion) => {
        if (valor.trim()== "" && enumeracion ==ENUM_LOGIN.USERNAME) {
            setFormValidate({
                ...formValidate,
                username:"Este campo es obligatorio"
            })
        }
        else if (valor.trim()== "" && enumeracion ==ENUM_LOGIN.PASSWORD) {
            setFormValidate({
                ...formValidate,
                password:"Este campo es obligatorio"
            })
        }
    }
    const estableceValorLogin = (valor, enumeracion) => {
        switch (enumeracion) {
            case ENUM_LOGIN.USERNAME:
                setFormLogin({
                    ...formLogin,
                    username: valor
                });
                break;
            case ENUM_LOGIN.PASSWORD:
                setFormLogin({
                    ...formLogin,
                    password: valor
                });
                break;
        }
    }
    const validateErrors = () => {
        let arreglo = Object.keys(formValidate).filter(e => e!="invalido" && e != "exitoso");
        arreglo = arreglo.map((e, i) => {
            if (formValidate[e].length > 0) {
                //console.log('hallado en llaves ', e, formValidate[e])
                return e;
            }
        });
        //console.log('errores de validación ',arreglo.filter(e => e !== undefined))
        return arreglo.filter(e => e !== undefined)

    }
    const enviarLogin= () => {
        const post_login = axios.post(`${getBaseAdressApi()}api/token/`, {
            "username": formLogin.username,
            "password": formLogin.password,
        }).then(response => {
            //updateUser(formLogin.username);
            const post_login_refresh = axios.post(`${getBaseAdressApi()}api/token/refresh/`, {
                "refresh":response.data["refresh"]
            }).then(respuesta => {
                localStorage.setItem('usuario_general',formLogin.username);
                localStorage.setItem("credencial",respuesta.data["access"]);
                ReactGA.event('login',{
                    method:'backend-std'
                });
                const post_chat_login = axios.post(getBaseChatApi(), {
                    "username": formLogin.username,
                    "password": formLogin.password,
                }).then(reschat=>{
                localStorage.setItem("credencial_chat",reschat.data["access"]);
                setFormValidate({
                    ...formValidate,
                    invalido: false,
                    exitoso: true
                });
                setTimeout(function(){
                    window.location = '/';
                },2000);
            }).catch(errchat=>{
                console.log('fallo al login del chat ',errchat);
                setFormValidate({
                    ...formValidate,
                    username:[formLogin.username],
                    password:["Ocurrió un error al iniciar sesión en las salas de chat, consulte a su administrador del sistema"],
                    invalido: true,
                    exitoso:false
                })
            });

            }).catch(err=>{
                console.log('error obteniendo token',err);
                setFormValidate({
                    ...formValidate,
                    username:[formLogin.username],
                    password:["Ocurrió un error al iniciar sesión en las salas de chat, consulte a su administrador del sistema"],
                    invalido: true,
                    exitoso:false
                })
            })
        }).catch(err => {
            //console.log('error en el login ',err, err.response.data)
            setFormValidate({
                ...formValidate,
                username:err.response.data["username"] ? err.response.data["username"] : [err.response.data["detail"]],
                password:err.response.data["password"] ? err.response.data["password"] : "",
                invalido: true,
                exitoso:false
            })
        })
    };
    return (<>
    <HelmetMetaData 
    currentUrl={location.href}
    description="Página de inicio de sesión con cuenta registrada. Acervo Audiovisual Interneta | Memoria de las y los invisibles |"
    title='Inicio de sesión con su cuenta registrada. Acervo Audiovisual Interneta | Memoria de las y los invisibles |'></HelmetMetaData>
        <NavBar></NavBar>
        {
            formValidate.exitoso && <div className='login-success'>
                <div className='standard-close-register' onClick={(e)=>setFormValidate({
                    ...formValidate,
                    exitoso:false
                })}></div>
                <p>Inicio de sesión exitoso, redirigiendo</p>
            </div>
        }
        {formValidate.invalido && <div className='error-summary'>
            <div className='standard-close-register'onClick={(e)=>setFormValidate({
                    ...formValidate,
                    invalido:false
                })}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></div>
            <ul>
                <li>Se encontraron errores en el inicio de sesión:</li>
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
                    <label>Nombre de usuario</label><input type="text" value={formLogin.username} onChange={(e) => estableceValorLogin(e.target.value, ENUM_LOGIN.USERNAME)}></input>
                </div>
                <div className='item-grid-address password-validate'>
                    <label>Contraseña</label><input type="password" value={formLogin.password} onChange={(e) => estableceValorLogin(e.target.value, ENUM_LOGIN.PASSWORD)}></input>
                </div>
                <div className='send-login'>
                    <button type="button" onClick={enviarLogin}>Iniciar sesión</button>
                </div>
            </div>

        </div >
        <div class="footer-login">
        <HomeFooter></HomeFooter>
        </div></>)
}
export default Login