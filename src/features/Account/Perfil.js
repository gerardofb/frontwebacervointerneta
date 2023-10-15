import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';
import { getBaseAdressApi } from '../MainAPI';
import axios from 'axios';
import HelmetMetaData from '../HelmetMetaData';

const Perfil = (props) => {
    const [metaTags, setMetaTags] = useState({
        description: "",
        keywords: [],
        title: ""
    });
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
                let usuario = {
                    usuario: response.data["username"],
                    nombres: response.data["first_name"],
                    apellidos: response.data["last_name"],
                    correo: response.data["email"]
                }
                let cadenausuario = usuario.usuario + (usuario.nombres && usuario.nombres.length > 0 ? " (" + usuario.nombres : "") + (usuario.apellidos && usuario.apellidos.length > 0 ? " " + usuario.apellidos + ")" : "")
                setMetaTags({
                    description: "| Acervo Audiovisual Interneta | En esta página encontrarás tus datos de usuario, como lo encontrarán cada uno de quienes deseen tener presencia virtual o presencial en la difusión del acervo. El perfil registrardo de tu usuario cuenta con los siguientes datos: " + cadenausuario,
                    keywords: ["perfil", "social","vinculación","comunidad", "redes", "usuarios", "navegar", "editar", "buscar", usuario.usuario].concat(
                        (usuario.nombres && usuario.nombres.length > 0 ? usuario.nombres.split(" ").filter(x => x.trim() !== "").map((e, i) => {
                            return e.replace(/\s/g, "").replace(/(?:\r\n|\r|\n|\)|\()/g, "");
                        }) : "")).concat(
                            (usuario.apellidos && usuario.apellidos.length > 0 ? usuario.apellidos.split(" ").filter(x => x.trim() !== "").map((e, i) => {
                                return e.replace(/\s/g, "").replace(/(?:\r\n|\r|\n|\)|\()/g, "");
                            }) : "")),
                    title: "| Acervo Audiovisual Interneta | El perfil registrardo de tu usuario cuenta con los siguientes datos, en síntesis: " + cadenausuario,
                });
            }).catch(err=>{

            });
    })
    return (
        <div>
            <HelmetMetaData
                description={metaTags.description} keywords={metaTags.keywords} title={metaTags.title}></HelmetMetaData>
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