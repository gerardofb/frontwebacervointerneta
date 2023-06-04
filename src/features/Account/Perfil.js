import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';
import { getBaseAdressApi } from '../MainAPI';
import axios from 'axios';

const Perfil = (props) => {
    const [datosPerfil, setDatosPefil] = useState({});
    useEffect(() => {
        const getAuthorization = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
            }
        }).then(response=>{
                setDatosPefil({
                    usuario:response.data["username"],
                    nombres:response.data["first_name"],
                    apellidos:response.data["last_name"],
                    correo:response.data["email"]
                })
            }).catch(err=>{

            });
    })
    return (
        <div>
            <NavBar></NavBar>
            <div className='miperfil'>
                <h3>Mi Perfil</h3>
                <div className='registros-perfil'>
                    <p>
                        Nombre de usuario:
                    </p>
                    <p>
                        {datosPerfil.usuario}
                    </p>
                    <p>
                        Nombres:
                    </p>
                    <p>
                        {datosPerfil.nombres}
                    </p>
                    <p>
                        Apellidos:
                    </p>
                    <p>
                        {datosPerfil.apellidos}
                    </p>
                    <p>
                        Correo electrónico:
                    </p>
                    <p>
                        {datosPerfil.correo}
                    </p>
                </div>
            </div>
            <HomeFooter></HomeFooter>
        </div>
    )
}
export default Perfil;