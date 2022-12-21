import React, { useEffect, useRef, useState, useContext } from 'react'
import { ControlBar, LoadingSpinner, Player } from 'video-react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
} from '@react-spring/web';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faComment,
    faFaceSmile,
    faArrowRight,
    faMicrophoneLines,
    faClone,
    faReply,
    faBan,
    faHeart,
    faCalendarDays,
    faVolumeHigh,
    faBook,
    faCircleInfo,
    faShare,
    faSave,
    faScissors,
    faToggleOff,
    faToggleOn,
    faStar,
    faHeadphones
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import NavBar from '../NavBar';
import ContextMenu from '../ContextMenu';
import { HomeFooter } from '../HomeFooter';
import { ThemesContext } from '../../ThemeProvider';
import { getBaseAdressApi } from '../MainAPI';
import { useLayoutEffect } from 'react';
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/SocialNetwork/${name}${wrap ? ')' : ''}`
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`
const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const Vinculo = styled(Link)`
display:block;
width:100%;
height:100%`;
const MODAL_CREDITOS = 0;
const MODAL_REDES = 1;
const MODAL_DESCARGAS = 2;
const MODAL_CALIFICACION = 3;

let items = [
    { titulo: "Gerardo Flores Barrie", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet suscipit mi. Integer lacinia nisl sit amet sapien porta, nec posuere ante dictum. Aliquam erat volutpat. Pellentesque sem purus, laoreet at quam eget, ullamcorper efficitur mi. Integer pretium fringilla placerat. Suspendisse bibendum, neque quis vestibulum interdum, tortor metus scelerisque." },
    { titulo: "Zosim Silva Gómez", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan, orci vitae efficitur placerat, quam odio tempor arcu, non commodo elit velit quis augue. Morbi luctus pellentesque diam id ultrices. Proin massa augue, fermentum eget nibh nec, semper fringilla ipsum. Duis ut ipsum erat. Etiam sollicitudin pulvinar augue, et dapibus erat interdum non. Aenean et lacus dignissim, faucibus justo eu, maximus ex. Quisque eu justo eget nisl eleifend mollis sit amet eget arcu. Quisque tincidunt, nibh ut lobortis sollicitudin, metus orci eleifend metus, ac viverra quam mi ut elit. Quisque aliquet tincidunt nisi. Nullam viverra purus at odio dictum viverra. Quisque eleifend magna eget turpis hendrerit, eget molestie dolor tincidunt. Phasellus at nisi massa. In sollicitudin blandit rhoncus. Duis mattis dictum mi, eget consequat nibh. Morbi vulputate, purus molestie sodales gravida, nisi odio efficitur sem, vitae ornare lacus est eget massa. Sed ornare massa lectus, non tincidunt purus rhoncus vel. Aenean cursus erat at tristique faucibus." },
    { titulo: "Atanasios Gatzios", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { titulo: "Gabriela Rueda", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut accumsan mauris. Integer pellentesque euismod maximus. Phasellus eget est vulputate." },
    { titulo: "Eric del Valle", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus, dui quis porttitor gravida, nulla sem consequat nibh, eget fermentum ex orci ornare sem. Curabitur viverra vehicula elit, a pretium mi pretium a. Curabitur sed accumsan enim. Donec ultricies odio non congue cursus. Phasellus finibus lorem quis bibendum scelerisque." },
    { titulo: "Alejandro Mercado", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet suscipit mi. Integer lacinia nisl sit amet sapien porta, nec posuere ante dictum. Aliquam erat volutpat. Pellentesque sem purus, laoreet at quam eget, ullamcorper efficitur mi. Integer pretium fringilla placerat. Suspendisse bibendum, neque quis vestibulum interdum, tortor metus scelerisque." },
    { titulo: "Tatiana Alvarez", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan, orci vitae efficitur placerat, quam odio tempor arcu, non commodo elit velit quis augue. Morbi luctus pellentesque diam id ultrices. Proin massa augue, fermentum eget nibh nec, semper fringilla ipsum. Duis ut ipsum erat. Etiam sollicitudin pulvinar augue, et dapibus erat interdum non. Aenean et lacus dignissim, faucibus justo eu, maximus ex. Quisque eu justo eget nisl eleifend mollis sit amet eget arcu. Quisque tincidunt, nibh ut lobortis sollicitudin, metus orci eleifend metus, ac viverra quam mi ut elit. Quisque aliquet tincidunt nisi. Nullam viverra purus at odio dictum viverra. Quisque eleifend magna eget turpis hendrerit, eget molestie dolor tincidunt. Phasellus at nisi massa. In sollicitudin blandit rhoncus. Duis mattis dictum mi, eget consequat nibh. Morbi vulputate, purus molestie sodales gravida, nisi odio efficitur sem, vitae ornare lacus est eget massa. Sed ornare massa lectus, non tincidunt purus rhoncus vel. Aenean cursus erat at tristique faucibus." },
    { titulo: "Cynthia Aguilar", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { titulo: "Patricia Aguilar", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut accumsan mauris. Integer pellentesque euismod maximus. Phasellus eget est vulputate." },
    { titulo: "Ernesto Flores", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus, dui quis porttitor gravida, nulla sem consequat nibh, eget fermentum ex orci ornare sem. Curabitur viverra vehicula elit, a pretium mi pretium a. Curabitur sed accumsan enim. Donec ultricies odio non congue cursus. Phasellus finibus lorem quis bibendum scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." }
]
let catdata = [
    {
        name: 'Saint Petersburg',
        description: '#f5f7fa → #c3cfe2',
        css: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        image: 'url("/images/Classification/Cat_2.png")',
        url: "Screenshot_3",
        height: 400,
    },
    {
        name: 'Deep Blue',
        description: '#e0c3fc → #8ec5fc',
        css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        image: 'url("/images/Classification/Cat_3.png")',
        url: "Screenshot_8",
        height: 400,
    },
    {
        name: 'Ripe Malinka',
        description: '#f093fb → #f5576c',
        css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'url("/images/Classification/Cat_4.png")',
        url: "Screenshot_28",
        height: 400,
    },
    {
        name: 'Perfect White',
        description: '#fdfbfb → #ebedee',
        css: 'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
        image: 'url("/images/Classification/Cat_5.png")',
        url: "Screenshot_29",
        height: 400,
    },
    {
        name: 'Near Moon',
        description: '#5ee7df → #b490ca',
        css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        image: 'url("/images/Classification/Cat_6.png")',
        url: "Screenshot_30",
        height: 400,
    },
    {
        name: 'Wild Apple',
        description: '#d299c2 → #fef9d7',
        css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        image: 'url("/images/Classification/Cat_7.png")',
        url: "Screenshot_31",
        height: 200,
    },
    {
        name: 'Ladoga Bottom',
        description: '#ebc0fd → #d9ded8',
        css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
        image: 'url("/images/Classification/Cat_8.png")',
        url: "Screenshot_42",
        height: 400,
    },
    {
        name: 'Sunny Morning',
        description: '#f6d365 → #fda085',
        css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        image: 'url("/images/Classification/Cat_9.png")',
        url: "Screenshot_48",
        height: 200,
    },
    {
        name: 'Lemon Gate',
        description: '#96fbc4 → #f9f586',
        css: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
        image: 'url("/images/Classification/Cat_10.png")',
        url: "Screenshot_49",
        height: 400,
    },
    {
        name: 'Salt Mountain',
        description: ' #FFFEFF → #D7FFFE',
        css: 'linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)',
        image: 'url("/images/Classification/Cat_11.png")',
        url: "Screenshot_67",
        height: 200,
    },
    {
        name: 'New York',
        description: ' #fff1eb → #ace0f9',
        css: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
        image: 'url("/images/Classification/Cat_12.png")',
        url: "Screenshot_68",
        height: 400,
    },
    {
        name: 'Soft Grass',
        description: ' #c1dfc4 → #deecdd',
        css: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        image: 'url("/images/Classification/Cat_13.png")',
        url: "Screenshot_69",
        height: 400,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_14.png")',
        url: "Screenshot_70",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_15.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_16.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_17.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_18.png")',
        url: "Screenshot_71",
        height: 200,
    },
]

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();

    //console.log('datos de video clip ', rect.top, rect.left, rect.bottom, rect.right)

    return rect.bottom > 0;
    // return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
}
function isInViewportFooter(element) {
    const rect = element.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    // console.log('datos de video clip footer ', rect.top, rect.left, rect.bottom, rect.right)
    // console.log('limite datos de video clip footer ', Math.round(scrollTop - rect.top))
    return Math.round(scrollTop - rect.top) > -350;
    // return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
}

function isInViewportMenu(element) {
    const rect = element.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    // console.log('datos de video encabezado', rect.top, rect.left, rect.bottom, rect.right)
    // console.log('limite datos de video encabezado ', Math.round(scrollTop - rect.top))
    return Math.round(scrollTop - rect.top) > 0;
}
const mensajes = [
    { autor: "Gerardo Flores", fecha: "02/06/2022 2:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum.", propio: false },
    { autor: "Gabriela Romo", fecha: "02/06/2022 2:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", propio: false },
    { autor: "Ibeth Santamaría", fecha: "03/06/2022 2:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur.", propio: false },
    { autor: "Gerardo Flores", fecha: "03/06/2022 3:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis neque risus.", propio: false },
    { autor: "Camila Alcantar", fecha: "04/06/2022 2:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit tempor dui, eget maximus felis sodales sit amet.", propio: false },
    { autor: "Pedro Solis", fecha: "04/06/2022 3:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis pretium orci, vel.", propio: false },
    { autor: "Marcelo Fernandez", fecha: "06/06/2022 5:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis maximus elit, in vulputate turpis lacinia quis. Curabitur ut lectus elit. Mauris porttitor sed purus.", propio: false },
    { autor: "Marcelo Fernandez", fecha: "07/06/2022 5:28PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum scelerisque porttitor. Morbi suscipit risus elit, a finibus metus porta et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per.", propio: false },
    { autor: "Gabriela Romo", fecha: "07/06/2022 5:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor quam. Aliquam sit amet sodales erat, auctor fermentum nisl. Integer imperdiet ullamcorper maximus. Pellentesque sed convallis justo. Pellentesque tincidunt massa ut ligula condimentum pharetra at nec sem. Donec vehicula ultrices volutpat. Pellentesque fringilla arcu nisi. Vivamus vel diam ex. Donec molestie rhoncus augue, et consectetur nisl imperdiet at. In rutrum consequat sapien, quis rutrum mi rutrum eget. Maecenas feugiat diam ac felis maximus interdum. Quisque sodales dolor at diam euismod, eget mattis lacus porttitor. Morbi id tellus consequat, interdum neque quis, volutpat quam. Integer bibendum leo dignissim, varius turpis eu, placerat nunc. Integer nec rutrum ligula. Vivamus a cursus nisl. Fusce consectetur ipsum magna, non scelerisque augue posuere at.", propio: false },
    { autor: "Gerardo Flores", fecha: "08/06/2022 5:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus dolor dui, at feugiat tortor efficitur sit amet. Quisque id commodo arcu. Vestibulum et nisi id urna iaculis faucibus vitae sit amet quam. Ut in lacinia tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc porttitor odio nec massa eleifend mattis. Sed rhoncus cursus lectus a elementum. Aenean consectetur aliquam tellus, ac commodo dolor semper id. Ut congue mollis dui, at fringilla justo tempus nec. Proin et nunc id lorem pulvinar mollis. Duis eu eros at arcu luctus dapibus. Proin nec ante quis nulla accumsan varius. Aliquam quis neque at odio malesuada ultricies pharetra eget lacus. Mauris a porta neque. Pellentesque quis justo ultricies, venenatis ante in, tincidunt arcu.", propio: false }
]

let autobiograficos = [
    { autor: 'Gabriela Romo', fecha: new Date(2022, 6, 3).toLocaleDateString(), reciente: true, podcast: false, guid: '6006c5d85f7c417f8714496c418d58ec' },
    { autor: 'Camila Alcantar', fecha: new Date(2022, 5, 2).toLocaleDateString(), reciente: true, podcast: true, guid: 'a7845b49f90f48e3b87578e359c821cc' },
    { autor: 'Pedro Solis', fecha: new Date(2022, 4, 3).toLocaleDateString(), reciente: true, podcast: false, guid: 'a4d52f71f1ec429db2e8da542ec6f3d4' },
    { autor: 'Marcelo Fernández', fecha: new Date(2022, 5, 13).toLocaleDateString(), reciente: true, podcast: false, guid: '8247c7b95aca4d2aadb5f1dfae6b4aeb' },
    { autor: 'Gerardo Flores', fecha: new Date(2022, 6, 12).toLocaleDateString(), reciente: true, podcast: true, guid: 'c24d4188410548f881e2f3b5ae447569' },
    { autor: 'Zosim Silva', fecha: new Date(2022, 3, 12).toLocaleDateString(), reciente: true, podcast: false, guid: 'add2fafc085d4121a4da88d351cb9e8e' },
    { autor: 'Alexis Gutiérrez', fecha: new Date(2022, 5, 15).toLocaleDateString(), reciente: true, podcast: false, guid: 'ec5ce4499ca84760aa635745439859c6' },
    { autor: 'Nayelli Lobato', fecha: new Date(2022, 5, 18).toLocaleDateString(), reciente: true, podcast: true, guid: '40c1c16bcd35435eb30826c890ab17fb' },
    { autor: 'Francisco Parada', fecha: new Date(2022, 5, 22).toLocaleDateString(), reciente: true, podcast: false, guid: 'c97a8c0997d04c7d93ce31269d7441a4' },
    { autor: 'David Yáñez', fecha: new Date(2022, 4, 29).toLocaleDateString(), reciente: true, podcast: false, guid: '9fc7db8b680642bc9c2edf55ef11ad00' },

    { autor: 'Gabriela Romo', fecha: new Date(2021, 6, 13).toLocaleDateString(), reciente: false, podcast: false, guid: 'adcf2f17b6074d47ac3031d39c021e1b' },
    { autor: 'Gerardo Flores', fecha: new Date(2021, 6, 12).toLocaleDateString(), reciente: false, podcast: true, guid: '7220e1dc01ec4aec8dedcf923a91dd8c' },
    { autor: 'Pedro Solis', fecha: new Date(2020, 5, 3).toLocaleDateString(), reciente: false, podcast: false, guid: '5e67a5aee6694bfea6c3b26531d38811' },
    { autor: 'Zosim Silva', fecha: new Date(2020, 6, 3).toLocaleDateString(), reciente: false, podcast: false, guid: '447335ac134445b08e9d200d06a63ca3' },
    { autor: 'Eric del Valle', fecha: new Date(2021, 6, 3).toLocaleDateString(), reciente: false, podcast: true, guid: '9e0ff745446e4b528a7ba1fbf0857db9' },
    { autor: 'Alexis Gutiérrez', fecha: new Date(2021, 3, 17).toLocaleDateString(), reciente: false, podcast: false, guid: 'a081d33ae8024922bab8118c60f35224' },
    { autor: 'Ernesto Flores', fecha: new Date(2019, 2, 23).toLocaleDateString(), reciente: false, podcast: true, guid: '927fe6d4e3864f6285c5632be57b040e' },
    { autor: 'Aaron González', fecha: new Date(2019, 6, 23).toLocaleDateString(), reciente: false, podcast: false, guid: '6ee5cfd17efd465db4ac09510ee5ceaf' },
    { autor: 'Jesús Alejandro Lima', fecha: new Date(2021, 4, 12).toLocaleDateString(), reciente: false, podcast: true, guid: 'b523ef0eac284179a25e5e71127630df' },
    { autor: 'Gabriela Romo', fecha: new Date(2018, 5, 13).toLocaleDateString(), reciente: false, podcast: false, guid: '98e45f888485452381c1524a52b807f3' },
]

const redesSociales = [{ title: "incrustar", icon: 'embed_icon.png' }, { title: 'Blogger', icon: 'blogger_logo.png' },
{ title: "Facebook", icon: 'facebook_logo.png' }, { title: "Linkedin", icon: 'linkedin_logo.png' },
{ title: "Pinterest", icon: 'pinterest_logo.png' }, { title: "Reddit", icon: 'reddit_logo.png' },
{ title: "Twitter", icon: 'twitter_logo.png' }, { title: "Whats App", icon: 'whatsapp_logo.jpg' }]

const opcionesDescarga = [
    { title: "Calidad Baja (Gratis)", free: true, index: 0, active: true },
    { title: "Calidad Media ($20.00 M.N. ó 30 puntos)", free: false, index: 1, active: false },
    { title: "Calidad Alta ($50.00 M.N. ó 100 puntos)", free: true, index: 2, active: false }
]

export const AutoComments = () => {

    const { video } = useParams();
    const [sourcevideo, setSourceVideo] = useState('');
    const [datostransicion, setDatosTransicion] = useState(null);
    const [videoreproduciendo, setVideoReproduciendo] = useState(null);
    const [videoscategoria, setVideosCategoria] = useState(null);
    const [creditosvideo, setCreditosVideo] = useState(null);
    const location = useLocation();
    const tabuladores = ["Comentarios", "Autobiográficos/Podcasts", "Eventos"];
    const [alturaPlayer, setAlturaPlayer] = useState(true);
    const [alturaPlayerMax, setAlturaPlayerMax] = useState(false);
    const { styles } = useContext(ThemesContext);
    const CustomMenu = () => (
        <div className="menu-personalizado">
            <div><FontAwesomeIcon icon={faClone}></FontAwesomeIcon>&nbsp;Copiar</div>
            <div><FontAwesomeIcon icon={faReply}></FontAwesomeIcon>&nbsp;Responder</div>
            <div><FontAwesomeIcon icon={faBan}></FontAwesomeIcon>&nbsp;Quitar</div>
        </div>
    );
    const [msjesChat, setMsjesChat] = useState({ chat: mensajes, show: false });
    const [elems, setItems] = useState([]);
    const [videoaleatorio, setVideoAleatorio] = useState('');
    const [busquedaComentarios, setBusquedaComentarios] = useState(null);
    const obtenervideo = video.split('|')
    const categoriareproduciendo = obtenervideo[obtenervideo.length - 1];
    const titulo = videoaleatorio === "" ? obtenervideo[obtenervideo.length - 3] : "Screenshot-" + videoaleatorio;
    const [comentarios, setComentarios] = useState([]);
    const idvideo = obtenervideo[obtenervideo.length - 2]
    const [newComment, setNewComment] = useState('');
    const growers = document.querySelectorAll(".grow-wrap");
    const [paginacion,setPaginacion] = useState({comentarios:{pagina:0,habilitado:false,total:0,tamanio:0}})
    growers.forEach((grower) => {
        const textarea = grower.querySelector("textarea");
        textarea.addEventListener("input", () => {
            grower.dataset.replicatedValue = textarea.value;
        });
    });
    useEffect(() => {
        let parametros;
        if (location.search) {
            parametros = new URLSearchParams(window.location.search);
            if (parametros.get("q") == "true" && parametros.get("cat") == "Comentarios") {
                let consulta_actual = JSON.parse(localStorage.getItem("queryComentarios"));
                console.log('consulta de parametros comentarios ', consulta_actual);
                setBusquedaComentarios(consulta_actual);
                localStorage.removeItem("queryComentarios");
                const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                    consulta_actual
                ).then(response => {
                    let comentarios_search = response.data.map((el, indice) => {
                        return { titulo: el.autor, content: el.comentario }
                    });
                    setItems(comentarios_search);
                    console.log('en respuesta de búsqueda comentarios ', comentarios_search)
                });
            }
        }
        else {
            let consulta_actual = {
                "query": "",
                "categoria": "",
                "frase": false,
                "autor": "",
                "puede": "",
                "prefijo": "",
                "video": parseInt(idvideo),
                "pagina_inicial": 0
            };
            setBusquedaComentarios(consulta_actual);
            console.log('en consulta por defecto ', consulta_actual)
            const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                consulta_actual
            ).then(response => {
                let comentarios_search = response.data.map((el, indice) => {
                    return { titulo: el.autor, content: el.comentario }
                });
                setItems(comentarios_search);
                let numeropaginas = response.data.length > 0 ? response.data[0].paginacion : 0;
                    let totalpaginas = response.data.length > 0 ? response.data[0].total : 0;
                    let paginasTotales = 0;
                    if(totalpaginas > 0){
                        paginasTotales = parseInt(totalpaginas / numeropaginas) +(totalpaginas%numeropaginas > 0 ? 1 : 0);
                    }
                setPaginacion({
                    ...paginacion,
                    comentarios:{pagina:0,habilitado:false,total: paginasTotales,tamanio:numeropaginas}})
                console.log('respuesta de api por defecto', comentarios_search)
                
            }).catch(reason => console.log('error en consulta por defecto ', reason));
        }

        // console.log("Location changed");

        // console.log('obteniendo fuente del video ',obtenervideo)
        const requestone = axios.get(`${getBaseAdressApi()}api/video/${idvideo}`).then(response => {
            if (sourcevideo === '') {
                console.log('el video a cargar como fuente es ', response.data.contenedor_aws)
                setSourceVideo(response.data.contenedor_aws);
                //console.log('la fuente del video es ', response.data.contenedor_aws);
                setVideoReproduciendo(response.data);
            }
        });
        const requesttwo = axios.get(`${getBaseAdressApi()}api/creditosvideo/${idvideo}`).then(response => {
            if (creditosvideo === null) {
                setCreditosVideo(response.data[0]);
                //console.log('los creditos del video son ', response.data[0])
            }
        });
        const requestthree = axios.get(`${getBaseAdressApi()}api/categoria/${categoriareproduciendo}`).then(response => {
            if (videoscategoria === null) {
                setVideosCategoria(response.data.videos_por_categoria)
                const nuevo_listadovideos = response.data.videos_por_categoria.map((el, indice) => {
                    return {
                        name: 'Rare Wind',
                        description: '#a8edea → #fed6e3',
                        css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        image: 'url("' + el.contenedor_img + '")',
                        url: el.titulo + "|" + obtenervideo[obtenervideo.length - 2] + "|" + obtenervideo[obtenervideo.length - 1],
                        height: 200,
                    }
                }).slice(0, response.data.videos_por_categoria.length);
                if (datostransicion === null) {
                    setDatosTransicion(nuevo_listadovideos)
                    //console.log('los videos listados en la categoria son después', nuevo_listadovideos);
                }
            }
        });
        items = shuffleArray(items);
        let videoaleatorio = randomBetween10_19();
        ;
        if (location.search) {
            setVideoAleatorio(videoaleatorio);
        }
        setMsjesChat({
            chat: msjesChat.chat.filter(a => a.propio == false),
            show: false
        });
        let elementotop = document.querySelector('.header-reproduccion-individual');
        //elementotop.scrollIntoView({ behavior: 'smooth' });

    }, [location]);
    // console.log('la fuente del video en el estado es ', sourcevideo)
    // console.log('el video aleatorio es ', videoaleatorio);
    console.log('la transición tiene los siguientes elementos ', datostransicion && datostransicion.length);
    function randomBetween10_19() {

        let arreglo = [11, 12, 13, 14, 15, 16, 17, 18, 19]
        let aleatorio = Math.floor(Math.random() * arreglo.length)
        //if(aleatorio >= 11 && aleatorio < 20){
        return "" + arreglo[aleatorio];
        //}
        //else return '11';
    }



    const bottomRef = useRef()
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    let listadovideoscategoria = [];
    const [open, set] = useState(false)
    const categoriestitle = open ? "" : "Ver otros videos en esta categoría:";
    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '20%', backgroundColor: 'black' },
        to: {
            size: open ? '100%' : '20%',
            backgroundColor: open ? 'white' : 'black',
        },
    })
    const transApi = useSpringRef()
    const transition = useTransition(open && datostransicion ? datostransicion : [], {
        ref: transApi,
        trail: datostransicion ? 400 / datostransicion.length : 0,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })
    const imgApi = useSpringRef()
    const { ...opacidad } = useSpring({
        ref: imgApi,
        config: config.stiff,
        from: { opacity: '100%' },
        to: {
            opacity: open ? '0%' : '100%'
        }
    })

    useChain(open ? [springApi, transApi, imgApi] : [transApi, springApi, imgApi], [
        0,
        open ? 0.1 : 0.6,
    ])
    const [active, setActive] = useState(tabuladores[0]);
    const [relatos, setRelatos] = useState(autobiograficos.filter(x => x.reciente == false));
    const handleClickOptionRelatos = (parametro) => {
        if (parametro == 'recientes') {
            let elementos = autobiograficos.filter(x => x.reciente == true);
            setRelatos(elementos);
        }
        else {
            let elementos = autobiograficos.filter(x => x.reciente == false);
            setRelatos(elementos);
        }
    }
    const handleScroll = (event) => {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
        if (bottomOfWindow) {
            if (active == tabuladores[0]) {
                // let item = items[Math.floor(Math.random() * items.length)];
                // items = items.concat(item);
                // !location.search && setItems(items)
                let numero_pagina = paginacion.comentarios.pagina;
                numero_pagina+=1;
                console.log('probando condicion para scroll' ,paginacion)
                if(paginacion.comentarios.total > numero_pagina){
                setPaginacion({
                    ...paginacion,
                    comentarios:{pagina:numero_pagina,habilitado:true,total:paginacion.comentarios.total,tamanio:paginacion.comentarios.tamanio}});
                let consulta_actual = {
                    "query": "",
                    "categoria": "",
                    "frase": false,
                    "autor": "",
                    "puede": "",
                    "prefijo": "",
                    "video": parseInt(idvideo),
                    "pagina_inicial": numero_pagina*paginacion.comentarios.tamanio
                };
                
                const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                    consulta_actual
                ).then(response => {
                    
                    
                    console.log('consulta para paginar ',consulta_actual);
                    let comentarios_search = response.data.map((el, indice) => {
                        return { titulo: el.autor, content: el.comentario }
                    });
                    let elementos = comentarios_search;
                    console.log('añadiendo elementos ',elementos)
                    setItems(
                        elems.concat(elementos)
                    );
                    
                    setPaginacion({
                        ...paginacion,
                        comentarios:{pagina:numero_pagina,habilitado:false,total:paginacion.comentarios.total,tamanio:paginacion.comentarios.tamanio}})
                }).catch(reason => console.log('error en consulta por defecto paginando', reason));
            }
        }
            // else if (active == tabuladores[1] && autobiograficos.lengcatdatath < 100) {
            //     let relato = autobiograficos[Math.floor(Math.random() * autobiograficos.length)];
            //     autobiograficos = autobiograficos.concat(relato);
            //     setRelatos(autobiograficos);
            // }
        }
        setHeightChat();

    }
    const estableceTab = (parameter) => {

        if (parameter == active) {

            return { display: "block" }
        }
        return { display: "none" };
    }
    const [texting, setTexting] = useState({ mensaje: '', write: false });
    const writeTextMessage = (message) => {
        if (message.length > 0) {
            setTexting({ mensaje: message, write: true });
        }
        else {
            setTexting({ mensaje: message, write: false })
        }
    }
    const setHeightChat = (param) => {
        const elementoVideo = document.querySelector('.player-container');
        const elementoFooter = document.querySelector('.footer-site');
        const footerenfocado = isInViewportFooter(elementoFooter);
        const enfocado = isInViewport(elementoVideo) || footerenfocado;

        if (param && !enfocado) {
            setAlturaPlayerMax(!alturaPlayerMax);
            setAlturaPlayer(true);

        }
        else if (param && enfocado) {
            setAlturaPlayerMax(false);
            setAlturaPlayer(true);
        }
        else if (enfocado) {
            setAlturaPlayerMax(false);
            setAlturaPlayer(false);
        }
        else if (!enfocado) {
            setAlturaPlayer(true);
        }
    }
    const referencia = useRef();
    const [menuContextual, setMenuContextual] = useState({ foucused: false, show: false });
    const handleContextMenu = (enfocado, bandera) => {
        setMenuContextual({ focused: enfocado, show: bandera });
    }
    const addMessage = () => {
        //console.log('el texto a agregar es ' + texting.mensaje)
        if (texting.mensaje.length > 0) {
            let fecha = new Date().toLocaleDateString();
            let tiempo = new Date().getHours() + ":" + new Date().getMinutes();
            setMsjesChat({
                chat: [...msjesChat.chat, { autor: 'Anonimo ' + fecha + " " + tiempo, mensaje: texting.mensaje, propio: true }]
            });
            chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
    const chatRef = useRef();
    const cssBottomChat = (Math.round(texting.mensaje.length / 100) * 20) + 'px';

    // console.log('la altura del bottom es ', cssBottomChat);

    /*
    Eventos
    */
    const [resetevents, setResetEvents] = useState({ resetear: false, aplicar: false });
    //console.log('afectando calendario ', resetevents);
    function Number(numero) {
        const { number } = useSpring({
            from: { number: 0 },
            number: numero,
            delay: 200,
            reset: true,
            reverse: !resetevents.resetear,
            config: config.molasses,
        })
        return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
    }
    function Year(numero) {
        const { number } = useSpring({
            from: { number: 1972 },
            number: numero,
            delay: 200,
            reset: true,
            reverse: !resetevents.resetear,
            config: config.molasses,
        })
        return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
    }
    const eventos = [
        {
            index: 36, selected: false, title: "Conferencia ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 8, 14, 22, 0, 0), imagen: "/images/Eventos/arte_urbano.jpg"
        },
        {
            index: 1, selected: false, title: "Conferencia ejemplo dos", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 8, 27, 20, 0, 0), imagen: "/images/Eventos/cultura_urbana.jpg"
        },
        {
            index: 2, selected: false, title: "Conferencia ejemplo tres", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 8, 2, 23, 0, 0), imagen: "/images/Eventos/mov_contraculturales.jpg"
        },
        {
            index: 3, selected: false, title: "Conferencia ejemplo cuatro", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 9, 13, 14, 0, 0), imagen: "/images/Eventos/mov_defensa_territorio.jpg"
        },
        {
            index: 4, selected: false, title: "Conferencia ejemplo cinco", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 9, 12, 14, 0, 0), imagen: "/images/Eventos/pueblos_originarios.jpg"
        },
        {
            index: 5, selected: false, title: "Conferencia ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
            fecha: new Date(2022, 9, 19, 18, 0, 0), imagen: "/images/Eventos/mov_sociales.jpg"
        }
    ]
    const [myevents, setMyEvents] = useState(eventos);
    const resetMyEvents = (evento, bandera) => {
        if (!bandera) {
            setMyEvents(myevents.map((elemento, indice) => {
                if (elemento.index == evento.index) {
                    elemento.selected = true;
                }
                else {
                    elemento.selected = false;
                }
                return elemento;
            }));
            setResetEvents({ resetear: true, aplicar: true });
        }
        else {
            setMyEvents(myevents.map((elemento, indice) => {
                elemento.selected = false;
                return elemento;
            }));
        }
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [childrenModal, setChildrenModal] = useState(-1);
    const toggleState = (e, indice) => {
        //console.log('estableciendo estado ', modalOpen);
        setChildrenModal(indice);
        setModalOpen(!modalOpen);
        let elementoheader = document.querySelector('.box-header');
        elementoheader.scrollIntoView({ behavior: 'smooth' });
        //console.log('estableciendo estado final ', modalOpen);
    };
    const [radioDescarga, setRadioDescarga] = useState(opcionesDescarga);
    const estableceRadiosDescarga = (parametro) => {
        let nuevasopciones = opcionesDescarga.map((el, index) => {
            if (el.index !== parametro) {
                el.active = false;
            }
            else { el.active = true; }

            return el;
        })
        setRadioDescarga(
            nuevasopciones
        );
        //console.log('el indice del radio es ', radioDescarga, parametro);
    }
    const [clicked, setClicked] = React.useState([false, false, false, false, false]);
    const handleStarClick = (e, index) => {
        e.preventDefault();
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            if (i <= index) clickStates[i] = true;
            else clickStates[i] = false;
        }

        setClicked(clickStates);
    };
    const [esFavorito, setEsFavorito] = useState({ valor: false, cuenta: 4056 });
    //console.log('estrellas marcadas para calificar', clicked);
    //console.log('los videos en la categoría son ', videoscategoria)
    const sendComment = () => {
        if (newComment.trim() !== "") {
            const requesttwo = axios.put(`${getBaseAdressApi()}api/commentvideo/`,
                {
                    "id_autor": "usuario_generico",
                    "id_video": parseInt(idvideo),
                    "comentario": newComment
                }
            ).then(response => {
                if (response.status == 201) {
                    setNewComment('')
                    let consulta_actual = {
                        "query": "",
                        "categoria": "",
                        "frase": false,
                        "autor": "",
                        "puede": "",
                        "prefijo": "",
                        "video": parseInt(idvideo),
                        "pagina_inicial": 0
                    };
                    console.log('en consulta por defecto ', consulta_actual)
                    const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchcomment/`,
                        consulta_actual
                    ).then(response => {
                        let comentarios_search = response.data.map((el, indice) => {
                            return { titulo: el.autor, content: el.comentario }
                        });
                        setItems(comentarios_search);
                        console.log('respuesta de api por defecto al enviar comentario', comentarios_search)
                    }).catch(reason => console.log('error en consulta por defecto al enviar comentario ', reason));
                }
            });
        }
    }
    return (
        <div className='player-individual' onScroll={handleScroll}>
            {
                menuContextual.show ?
                    <ContextMenu menu={CustomMenu()} referencia={referencia} style={{ position: 'absolute', zIndex: '9999' }}></ContextMenu>
                    : null
            }
            <div style={{ backgroundColor: 'black', height: '100px' }} onContextMenu={(e) => handleContextMenu(false, false)}>
                <NavBar></NavBar>
            </div>
            <h2 className='header-reproduccion-individual' style={{ padding: '1.5em 1.3em' }} onContextMenu={(e) => handleContextMenu(false, false)}>
                Reproduciendo: {titulo}
            </h2>
            <div onClick={(e) => resetMyEvents(null, true)} className='player-container' onContextMenu={(e) => handleContextMenu(false, false)}>
                <div className="player-inner">
                    {sourcevideo &&
                        <Player>

                            <source src={sourcevideo}></source>
                            <ControlBar disableCompletely={false}></ControlBar>
                            <LoadingSpinner></LoadingSpinner>
                        </Player>
                    }
                </div>
                <div className='acciones-reproduccion'>
                    <div className='item-acciones-repro' onClick={(e) => toggleState(e, MODAL_CREDITOS)}>
                        <FontAwesomeIcon icon={faCircleInfo} /><span>Créditos</span>
                    </div>
                    <div className='item-acciones-repro' onClick={(e) => toggleState(e, MODAL_REDES)}>
                        <FontAwesomeIcon icon={faShare} /><span>Compartir</span>
                    </div>
                    <div className='item-acciones-repro' onClick={(e) => toggleState(e, MODAL_DESCARGAS)}>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Descargar</span>
                    </div>
                    <div className='item-acciones-repro'>
                        <FontAwesomeIcon icon={faScissors} /><span>Clip</span>
                    </div>
                    <div className='item-acciones-repro' onClick={(e) => toggleState(e, MODAL_CALIFICACION)}>
                        {[0].map((el, index) => {
                            return <div style={{ marginLeft: '.25em' }} key={index}>
                                <FontAwesomeIcon icon={faStar} className="clickedstar" />
                                <FontAwesomeIcon icon={faStar} className="clickedstar" />
                                <FontAwesomeIcon icon={faStar} className="clickedstar" />
                                <FontAwesomeIcon icon={faStar} className="clickedstar" />
                                <FontAwesomeIcon icon={faStar} className="clickedstar" />
                                <span>(5)</span>
                            </div>
                        })
                        }
                    </div>
                    <div className='item-acciones-repro' onClick={(e) => {
                        setEsFavorito({
                            ...esFavorito, valor: !esFavorito.valor,
                            cuenta: !esFavorito.valor ? ++esFavorito.cuenta : --esFavorito.cuenta
                        })
                    }}>
                        <FontAwesomeIcon style={esFavorito.valor ? { color: 'red' } : { color: 'darkgray' }} icon={faHeart} /><span>Favoritos <span className="cuenta-favoritos-small">{esFavorito.cuenta}</span></span>
                    </div>
                    <div className='item-acciones-repro'>
                        <FontAwesomeIcon icon={faHeadphones} /><span>Encolar</span>
                    </div>
                </div>
            </div>


            <div className='content-player'>
                <div className="break" onContextMenu={(e) => handleContextMenu(false, false)}>
                    {!open ?
                        <h3 style={{ color: "lightgray", position: 'relative', borderBottom: '1px solid black' }}>{categoriestitle}</h3>
                        : null}
                </div>
                <div className='tabuladores-repro' onContextMenu={(e) => handleContextMenu(false, false)}>
                    <div className='button-group-repro'>
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
                <div onClick={(e) => resetMyEvents(null, true)} className='category-player' onContextMenu={(e) => handleContextMenu(false, false)}>

                    <div className="category-wrapper">
                        <animated.div
                            style={{ ...rest, width: size, height: size }}
                            className="category-container"
                            onClick={() => set(open => !open)}>
                            {transition((style, item) => {
                                console.log('iterando en transicion ', item)
                                return (

                                    <animated.div
                                        className="category-item"
                                        style={{ ...style, background: item.css, backgroundImage: item.image, backgroundPosition: 'center center', backgroundSize: '200px', backgroundRepeat: 'no-repeat' }}
                                    ><Vinculo to={'/Reproduccion/' + item.url} /></animated.div>
                                )
                            })}
                            <p>
                                <span style={{ color: 'red', display: 'inline-block', margin: 'auto' }}>{open ? "" : <animated.img src="/images/Stills/Categories/PLAY_OVER.png"
                                    style={{ ...opacidad, width: '5em', position: 'absolute', top: '30%', left: '25%' }} />}</span>
                            </p>
                        </animated.div>
                    </div>
                </div>
                <div className="scroll-list" onContextMenu={(e) => handleContextMenu(false, false)} ref={bottomRef} style={estableceTab(tabuladores[0])}>

                    <label class="caja-expandible-label" for="text_comentario">Comentar:</label>
                    <div class="grow-wrap">
                        <textarea maxLength={2000} value={newComment} onChange={(e) => setNewComment(e.target.value)} name="text_comentario" id="text_comentario"></textarea>
                    </div>
                    <div className="button-send-expandible-text">
                        <button type="button" onClick={sendComment}>Enviar</button>
                    </div>
                    {elems &&
                        elems.map((item, index) => (
                            <div key={index}>
                                <h4>{item.titulo}</h4>
                                <p>{`${index + 1}. ${item.content}`}</p>
                            </div>
                        ))}
                    <div className='default-loader' style={paginacion.comentarios.habilitado ?{display:'block'}: {display:'none'}}>
                        <img src={url_loader("Reload_generic.gif",false)} />
                    </div>
                    <div className="list-bottom"></div>
                </div>
                <div className='scroll-list' onContextMenu={(e) => handleContextMenu(false, false)} style={estableceTab(tabuladores[1])}>
                    <div className={styles.OpcionesAutobiograficosReprod}>
                        <button onClick={(e) => handleClickOptionRelatos('popular')} className='autobiografico-reprod-white'>Populares<br /><FontAwesomeIcon icon={faHeart} style={{ paddingTop: '20px', display: 'inline-block' }} /></button>
                        <button onClick={(e) => handleClickOptionRelatos('recientes')} className='autobiografico-reprod-white'>Recientes<br /><FontAwesomeIcon icon={faCalendarDays} style={{ paddingTop: '20px', display: 'inline-block' }} /></button>
                    </div>
                    <div className='content-relatos-reprod'>
                        {relatos &&
                            relatos.map((relato, index) => {
                                return (<div key={index}>
                                    <Link to={'/Autobiograficos/' + relato.guid + "?podcast=" + relato.podcast} className="link-relatos-reprod-white">
                                        <p>{relato.fecha}</p>
                                        <h4><span className='header-relato-reprod'>{relato.podcast ? <FontAwesomeIcon icon={faVolumeHigh} /> : <FontAwesomeIcon icon={faBook} />}</span>{relato.autor}</h4>
                                    </Link>
                                </div>)
                            })}
                    </div>
                </div>
                <div className='scroll-list' onContextMenu={(e) => handleContextMenu(false, false)} style={estableceTab(tabuladores[2])}>
                    {
                        myevents.map((elem, index) => {
                            let llave = "/Eventos/" + elem.index + "?previous=" + video;
                            return (
                                <div className="evento-reproduccion" key={index}>
                                    <div className="control-evento-reproduccion" onClick={(e) => resetMyEvents(elem)}>
                                        <Link to={llave}>
                                            <div className='eventos-titulo'><h2>{elem.title}</h2><div><img src={elem.imagen} height={200} align="right" /></div></div>
                                        </Link>
                                        <div>
                                            {elem.selected ?
                                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                                : <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                                            }
                                        </div>
                                    </div>
                                    <div className={elem.selected ? 'header-evento' : 'header-evento-hidden'}>
                                        <h3>{Number(elem.fecha.getDate())}<span> del</span></h3>
                                        <h3>{Number(elem.fecha.getMonth() + 1)}<span> de</span></h3>
                                        <h3>{Year(elem.fecha.getFullYear())}</h3>
                                        <h3>a las {elem.fecha.getHours()} horas</h3>
                                    </div>
                                    <div className={elem.selected ? 'content-evento' : 'content-evento-hidden'}>
                                        {elem.descripcion}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div onClick={(e) => resetMyEvents(null, true)} className={alturaPlayer && alturaPlayerMax ? "chat" : alturaPlayer && !alturaPlayerMax ? "chat-min" : "chat-hidden"}>
                    <div className='top-chat' onClick={(e) => { setHeightChat(true); handleContextMenu(false, false); }} onContextMenu={(e) => handleContextMenu(false, false)}>
                        <p><FontAwesomeIcon icon={faComment}></FontAwesomeIcon>&nbsp; Chat de Interneta
                        </p>
                        {alturaPlayer && alturaPlayerMax ?
                            <span>
                                <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon></span>
                            : alturaPlayer ? <span><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></span>
                                : null
                        }
                    </div>
                    <div className='content-chat' onScroll={(e) => handleContextMenu(false, false)}>
                        {alturaPlayer && alturaPlayerMax ? msjesChat.chat.map(function (msj, index) {
                            return (
                                <div className='origen-mensaje-chat' ref={referencia} key={(index + "-" + msj.autor)}
                                    onContextMenu={(e) => handleContextMenu(true, true)} onMouseEnter={(e) => handleContextMenu(true, true)}>
                                    <span style={{ gridColumn: "1" }}>{msj.autor} &nbsp; {msj.fecha}</span>
                                    {!msj.propio ?
                                        <span style={{ gridColumn: "2" }} title="Reaccionar"><FontAwesomeIcon icon={faFaceSmile}></FontAwesomeIcon></span>
                                        : null
                                    }<div className={msj.propio ? 'mensaje-chat-propio' : 'mensaje-chat-other'}>
                                        {msj.mensaje}
                                    </div>
                                </div>
                            )
                        }) : null}
                        <div ref={chatRef} style={{ height: { cssBottomChat }, minHeight: '100px' }}></div>
                    </div>
                    <div className='chat-input' onContextMenu={(e) => handleContextMenu(false, false)}>
                        <textarea rows="2" onKeyUp={(e) => { writeTextMessage(e.target.value) }} onBlur={(e) => { writeTextMessage(e.target.value) }}></textarea>
                        <div className='chat-input-actions'>
                            <button onClick={addMessage}>{texting.write ?
                                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon> :
                                <FontAwesomeIcon icon={faMicrophoneLines}></FontAwesomeIcon>
                            }</button>
                        </div>
                    </div>
                </div>
            </div>
            <HomeFooter></HomeFooter>
            <Modal id="modal" isOpen={modalOpen} modalSize="lg" onClose={toggleState} modalClass={
                childrenModal == MODAL_CREDITOS ?
                    "darkmodal" : ""} title={
                        childrenModal == MODAL_CREDITOS ? "Créditos del vídeo" : childrenModal == MODAL_REDES ? "Compartir por"
                            : childrenModal == MODAL_DESCARGAS ? "Descargar vídeo" : childrenModal == MODAL_CALIFICACION ? "Calificar vídeo" : null
                    }>
                {childrenModal == MODAL_CREDITOS && creditosvideo ?
                    <div>
                        <dl><dt>Título:</dt><dd>{titulo}</dd>
                            <dt>Dirección:</dt><dd>{creditosvideo.direccion_realizacion}</dd>
                            <dt>Guión:</dt><dd>{creditosvideo.guion}</dd>
                            <dt>Cámara:</dt><dd>{creditosvideo.camara}</dd>
                            <dt>Sinopsis:</dt><dd>{creditosvideo.sinopsis}</dd>
                            <dt>Tema:</dt><dd>Ninguno establecido</dd>
                            <dt>Colección:</dt><dd>Ninguna establecida</dd>
                            <dt>Año:</dt><dd>{creditosvideo.anio_produccion}</dd>
                            <dt>Producción:</dt><dd>{creditosvideo.produccion_ejecutiva}</dd>
                            <dt>Duración:</dt><dd>{creditosvideo.duracion_mins}</dd>
                            <dt>Formato de producción:</dt><dd>Ninguno establecido</dd>
                            <dt>Formatos disponibles:</dt><dd>Ninguno establecido</dd>
                        </dl>
                    </div>
                    : childrenModal == MODAL_REDES ?
                        <div className='modal-redes-regular'>
                            {redesSociales.map((logo, index) => {
                                let background_size = logo.icon == "blogger_logo.png" ? "80%" : logo.icon == "reddit_logo.png" ? "60%" :
                                    logo.icon == "twitter_logo.png" ? "85%" : logo.icon == "whatsapp_logo.jpg" ? "220%" :
                                        "contain";
                                return <button title={logo.title} className={`social-network-regular`} style={{
                                    backgroundImage: url(logo.icon, true), backgroundSize: background_size
                                }}>&nbsp;</button>
                            })}
                        </div> : childrenModal == MODAL_DESCARGAS ?
                            <div className='download-reprod-std'>
                                {
                                    radioDescarga && radioDescarga.map((radio, indice) => {
                                        //console.log('el radio esta activo ', radio.active, radio.index)
                                        let claseCssRadio = radio.active ? "radio-button-std-active" : "radio-button-std"
                                        return (
                                            <div key={radio.index} onClick={(e) => estableceRadiosDescarga(radio.index)}>

                                                <h4>{radio.title}</h4>
                                                <button className={claseCssRadio}>
                                                    {
                                                        !radio.active ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />
                                                    }
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                                <button className='download-video-std'>
                                    Descargar
                                </button>
                            </div>
                            : childrenModal == MODAL_CALIFICACION ?
                                <div className='calificacion-reprod-std'>
                                    {[0].map((el, index) => {
                                        return <>
                                            <FontAwesomeIcon icon={faStar} className={clicked[0] ? "clickedstar" : "std-star"} onClick={(e) => handleStarClick(e, 0)} />
                                            <FontAwesomeIcon icon={faStar} className={clicked[1] ? "clickedstar" : "std-star"} onClick={(e) => handleStarClick(e, 1)} />
                                            <FontAwesomeIcon icon={faStar} className={clicked[2] ? "clickedstar" : "std-star"} onClick={(e) => handleStarClick(e, 2)} />
                                            <FontAwesomeIcon icon={faStar} className={clicked[3] ? "clickedstar" : "std-star"} onClick={(e) => handleStarClick(e, 3)} />
                                            <FontAwesomeIcon icon={faStar} className={clicked[4] ? "clickedstar" : "std-star"} onClick={(e) => handleStarClick(e, 4)} />
                                        </>
                                    })
                                    }
                                </div>
                                : null}
            </Modal>

        </div>

    )
}