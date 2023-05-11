import React, { useContext, useEffect, useRef, useState } from 'react';
import utilidadMenuSuperior from '../utilidadMenuSuperior';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faMicrophone,
    faAlignCenter,
    faVolumeHigh,
    faBook,
    faSearch,
    faStop,
    faL,
    faMultiply,
    faHeartBroken,
    faHeart
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom";
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';
import { ThemesContext } from '../../ThemeProvider'
import ReactAudioPlayer from 'react-audio-player';
import { ControlBar, LoadingSpinner, Player, PlayToggle } from 'video-react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import Accordion from './Accordion';
import Card from './Card';
import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';
import { v4 as uuidv4 } from 'uuid'

const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`

function random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
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

const MovimientosSoc = [
    "Screenshot_5",
    "Screenshot_6",
    "Screenshot_7",
    "Screenshot_9",
    "Screenshot_12",
    "Screenshot_53",
    "Screenshot_55",
    "Screenshot_60",
    "Screenshot_61",
    "Screenshot_62",
    "Screenshot_64",
];
const MovimientosContra = [
    "Screenshot_4",
    "Screenshot_10",
    "Screenshot_16",
    "Screenshot_21",
    "Screenshot_23",
    "Screenshot_24",
    "Screenshot_25",
    "Screenshot_37",
    "Screenshot_38",
    "Screenshot_39",
    "Screenshot_40",
    "Screenshot_41",
    "Screenshot_52",
    "Screenshot_59",
    "Screenshot_65",
    "Screenshot_66",
];
const MovimientosUrbanos = [
    "Screenshot_1",
    "Screenshot_3",
    "Screenshot_8",
    "Screenshot_28",
    "Screenshot_29",
    "Screenshot_30",
    "Screenshot_31",
    "Screenshot_42",
    "Screenshot_48",
    "Screenshot_49",
    "Screenshot_67",
    "Screenshot_68",
    "Screenshot_69",
    "Screenshot_70",
    "Screenshot_71",
];
const MovimientosDefensa = [
    "Screenshot_2",
    "Screenshot_11",
    "Screenshot_33",
    "Screenshot_34",
    "Screenshot_43",
    "Screenshot_75",
    "Screenshot_76",
    "Screenshot_77",
    "Screenshot_79",
    "Screenshot_80",
    "Screenshot_81",
];
const ArteUrbano = [
    "Screenshot_26",
    "Screenshot_27",
    "Screenshot_32",
    "Screenshot_35",
    "Screenshot_36",
    "Screenshot_50",
    "Screenshot_51",
    "Screenshot_54",
    "Screenshot_56",
    "Screenshot_57",
    "Screenshot_58",
    "Screenshot_63",
];
const PueblosOriginarios = [
    "Screenshot_44",
    "Screenshot_45",
    "Screenshot_46",
    "Screenshot_47",
    "Screenshot_48",
    "Screenshot_72",
    "Screenshot_73",
    "Screenshot_74",
    "Screenshot_78",
];
const GeneracionTransparente = [
    "Screenshot_13",
    "Screenshot_14",
    "Screenshot_15",
    "Screenshot_17",
    "Screenshot_18",
    "Screenshot_19",
    "Screenshot_20",
    "Screenshot_22",
];
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

let autobiograficos = [
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Gabriela Romo', fecha: new Date(2022, 6, 3).toLocaleDateString(), reciente: true, podcast: false, guid: '6006c5d85f7c417f8714496c418d58ec', tags: arreglotags.slice(0, 30) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Camila Alcantar', fecha: new Date(2022, 5, 2).toLocaleDateString(), reciente: true, podcast: true, guid: 'a7845b49f90f48e3b87578e359c821cc', tags: arreglotags.slice(31, 50) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Pedro Solis', fecha: new Date(2022, 4, 3).toLocaleDateString(), reciente: true, podcast: false, guid: 'a4d52f71f1ec429db2e8da542ec6f3d4', tags: arreglotags.slice(51, 60) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Marcelo Fernández', fecha: new Date(2022, 5, 13).toLocaleDateString(), reciente: true, podcast: false, guid: '8247c7b95aca4d2aadb5f1dfae6b4aeb', tags: arreglotags.slice(61, 80) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Gerardo Flores', fecha: new Date(2022, 6, 12).toLocaleDateString(), reciente: true, podcast: true, guid: 'c24d4188410548f881e2f3b5ae447569', tags: arreglotags.slice(81, 90) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Zosim Silva', fecha: new Date(2022, 3, 12).toLocaleDateString(), reciente: true, podcast: false, guid: 'add2fafc085d4121a4da88d351cb9e8e', tags: arreglotags.slice(91, 100) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Alexis Gutiérrez', fecha: new Date(2022, 5, 15).toLocaleDateString(), reciente: true, podcast: false, guid: 'ec5ce4499ca84760aa635745439859c6', tags: arreglotags.slice(101, 120) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Nayelli Lobato', fecha: new Date(2022, 5, 18).toLocaleDateString(), reciente: true, podcast: true, guid: '40c1c16bcd35435eb30826c890ab17fb', tags: arreglotags.slice(121, 130) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Francisco Parada', fecha: new Date(2022, 5, 22).toLocaleDateString(), reciente: true, podcast: false, guid: 'c97a8c0997d04c7d93ce31269d7441a4', tags: arreglotags.slice(0, 10) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'David Yáñez', fecha: new Date(2022, 4, 29).toLocaleDateString(), reciente: true, podcast: false, guid: '9fc7db8b680642bc9c2edf55ef11ad00', tags: arreglotags.slice(131, 140) },

    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Gabriela Romo', fecha: new Date(2021, 6, 13).toLocaleDateString(), reciente: false, podcast: false, guid: 'adcf2f17b6074d47ac3031d39c021e1b', tags: arreglotags.slice(0, 20) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Gerardo Flores', fecha: new Date(2021, 6, 12).toLocaleDateString(), reciente: false, podcast: true, guid: '7220e1dc01ec4aec8dedcf923a91dd8c', tags: arreglotags.slice(21, 40) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Pedro Solis', fecha: new Date(2020, 5, 3).toLocaleDateString(), reciente: false, podcast: false, guid: '5e67a5aee6694bfea6c3b26531d38811', tags: arreglotags.slice(41, 50) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Zosim Silva', fecha: new Date(2020, 6, 3).toLocaleDateString(), reciente: false, podcast: false, guid: '447335ac134445b08e9d200d06a63ca3', tags: arreglotags.slice(51, 60) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Eric del Valle', fecha: new Date(2021, 6, 3).toLocaleDateString(), reciente: false, podcast: true, guid: '9e0ff745446e4b528a7ba1fbf0857db9', tags: arreglotags.slice(61, 65) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Alexis Gutiérrez', fecha: new Date(2021, 3, 17).toLocaleDateString(), reciente: false, podcast: false, guid: 'a081d33ae8024922bab8118c60f35224', tags: arreglotags.slice(66, 70) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Ernesto Flores', fecha: new Date(2019, 2, 23).toLocaleDateString(), reciente: false, podcast: true, guid: '927fe6d4e3864f6285c5632be57b040e', tags: arreglotags.slice(71, 90) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Aaron González', fecha: new Date(2019, 6, 23).toLocaleDateString(), reciente: false, podcast: false, guid: '6ee5cfd17efd465db4ac09510ee5ceaf', tags: arreglotags.slice(91, 120) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet malesuada lectus, sed euismod turpis. Curabitur convallis vehicula massa, ut convallis velit ornare a. Ut rutrum id libero sit amet vestibulum. Sed dictum neque ac ipsum elementum ultricies. Vivamus quis nibh condimentum, ornare augue in, tempor elit. Integer viverra, lacus laoreet fermentum pulvinar, erat lectus sollicitudin elit, eget pellentesque ligula odio eu nunc. Donec sit amet lorem quam. Sed convallis tincidunt ultrices. Aliquam pellentesque diam metus. Nulla ut pulvinar erat, sit amet tristique ex. Donec vel rutrum ante. Aenean quis laoreet justo, ut eleifend elit. Nam tempus tellus nunc, quis commodo urna mollis et. Proin feugiat purus id finibus interdum. Etiam eleifend metus mauris, non vehicula augue ullamcorper id. In hac habitasse platea dictumst. Maecenas laoreet nulla in turpis laoreet, id imperdiet massa blandit. Pellentesque lobortis augue tellus, ut eleifend erat condimentum in. Quisque egestas varius porttitor. Suspendisse fermentum, augue ac egestas aliquam, felis ante ornare tortor, pretium cursus enim odio nec odio. Aenean vel ullamcorper sem. Donec blandit mi nec urna vulputate, sit amet rhoncus est lacinia. Integer eleifend enim a dolor dignissim euismod. Donec blandit libero ultricies, bibendum nisi eu, scelerisque neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel urna eget nibh mattis eleifend dapibus vel magna. Etiam metus ligula, accumsan sit amet purus nec, aliquet pellentesque lorem. Morbi mollis pharetra nunc eget finibus. Donec eleifend nec velit sed pellentesque. Integer ut arcu quis nunc mollis ultrices a a lectus. Praesent et diam sagittis, tempus risus vel, elementum ligula. Integer semper nibh ut odio pretium pellentesque. Sed congue ipsum odio, sed consectetur ligula lobortis id. Aenean pretium eros vitae dapibus condimentum. Phasellus vitae consequat nisi. Phasellus ex felis, sagittis a luctus eget, gravida nec risus. Duis suscipit ex et urna dignissim, vitae vehicula sem pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam vitae sapien et nunc interdum pretium id id dolor. Sed velit orci, blandit nec tempus sed, feugiat id diam. Suspendisse potenti. Duis imperdiet, diam sit amet faucibus ullamcorper, enim elit placerat lorem, ac posuere est mauris ac justo. Duis sodales est tellus, et pellentesque arcu blandit bibendum. Sed rutrum venenatis erat at porttitor. Quisque eleifend nibh a semper dapibus. Integer eget nibh bibendum, finibus orci lacinia, facilisis ipsum. Sed sit amet tristique neque. Mauris vestibulum at augue ac dapibus. Aenean sagittis odio et nisl ultrices, vitae convallis lacus condimentum. Nunc ac porttitor magna, porttitor accumsan dolor. Suspendisse non lectus sit amet neque mattis tincidunt. Nunc nec dolor eget tortor placerat mattis.', autor: 'Jesús Alejandro Lima', fecha: new Date(2021, 4, 12).toLocaleDateString(), reciente: false, podcast: true, guid: 'b523ef0eac284179a25e5e71127630df', tags: arreglotags.slice(121, 130) },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet nunc non dolor tincidunt, vitae imperdiet justo viverra. Aliquam erat volutpat. Sed lacus augue, scelerisque sed sollicitudin et, volutpat id sem. Donec non nisl et purus malesuada suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean purus elit, tristique nec fringilla et, ullamcorper ut purus. Morbi vitae leo id dui tempus facilisis ut eu justo. Curabitur nec ipsum rutrum velit efficitur luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In elit libero, molestie eu semper in, tempor sed elit. Mauris eu lectus sit amet magna consequat tempor ac at nunc. Aenean vel fringilla nisi. Morbi eleifend lectus sed erat laoreet, ut feugiat urna tempor. Aliquam maximus dui nibh. Fusce in leo suscipit, porttitor lectus nec, ullamcorper ligula. Mauris finibus elit sit amet mi dictum interdum. Maecenas et elit mauris. Vestibulum sit amet mi vel diam lobortis congue. Aenean eu consectetur tellus. Praesent sed efficitur nisi. Morbi imperdiet justo mauris, in luctus ante auctor quis. Proin tincidunt est eget mauris feugiat, sit amet interdum neque iaculis. Etiam aliquet dictum nisl at commodo. Vestibulum et rhoncus nulla, at rhoncus dui. Aenean posuere feugiat ex, non ultricies lorem facilisis quis. Donec nec magna nisi. Fusce efficitur ante felis, at sagittis mauris pharetra ac. Vestibulum cursus dignissim turpis, nec sodales lacus euismod ac.', autor: 'Gabriela Romo', fecha: new Date(2018, 5, 13).toLocaleDateString(), reciente: false, podcast: false, guid: '98e45f888485452381c1524a52b807f3', tags: arreglotags.slice(131, 135) },
]

const categorias = [
    { description: "Movimientos Sociales", link: '/Categorias/Movimientos-Sociales/dummy', image: '/images/Art/BiograficosArt/movimientos-sociales.jpg', listadoVideos: MovimientosSoc },
    { description: "Movimientos Contraculturales", link: '/Categorias/Movimientos-Contraculturales/dummy', image: '/images/Art/BiograficosArt/movimientos-contraculturales.jpg', listadoVideos: MovimientosContra },
    { description: "Movimientos en Defensa del Territorio", link: '/Categorias/Movimientos-en-Defensa-del-Territorio/dummy', image: '/images/Art/BiograficosArt/defensa-territorio.jpg', listadoVideos: MovimientosDefensa },
    { description: "Movimientos Urbanos y Populares", link: '/Categorias/Memoria-Movimientos-Urbanos-y-Populares/dummy', image: '/images/Art/BiograficosArt/movimientos-urbanos.jpg', listadoVideos: MovimientosUrbanos },
    { description: "Arte Urbano", link: '/Categorias/Arte-Urbano/dummy', image: '/images/Art/BiograficosArt/arte-urbano.jpg', listadoVideos: MovimientosUrbanos },
    { description: "Pueblos Originarios", link: '/Categorias/Pueblos-Originarios-e-Indígenas/dummy', image: '/images/Art/BiograficosArt/pueblos-originarios.jpg', listadoVideos: PueblosOriginarios },
    { description: "Generación Transparente", link: '/Categorias/Generación-Transparente/dummy', image: '/images/Art/BiograficosArt/generacion-transparente.jpg', listadoVideos: GeneracionTransparente }
]
const configuracion = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
    },
}
const configuracionMultipart = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
    },
}
export const Autobiograficos = () => {
    utilidadMenuSuperior();
    const historia = useHistory();
    const { relato } = useParams();
    const [rutaDiferente, setRutaDiferente] = useState('');
    const [paginacion, setPaginacion] = useState({ paginaActual: 0, tamanio: 0 })
    const actualRelato = relato;
    const location = useLocation();
    const esPodcast = new URLSearchParams(location.search).get('podcast') !== "false";
    const [categories, setCategories] = useState(categorias);
    const [editing, setEditing] = useState({ podcast: esPodcast, editando: false });
    const [collapsed, setCollapsed] = useState(false);
    const [tags, setTags] = useState(arreglotags);
    const [biographies, setBiographies] = useState(null);
    const [solopodcasts, setSolopodcats] = useState('');
    const referenciaScroll = useRef();
    const [tagViewed, setTagViewed] = useState(false);
    const [valueSearchTag, setValueSearchTag] = useState('');
    const { styles } = useContext(ThemesContext);
    const [cuentaDeUsuario, setcuentaDeUsuario] = useState('');
    const [queryActual, setQueryActual] = useState(null);
    const [esFavorito, setEsFavorito] = useState({ guid: '', valor: true, cuenta: 0 });
    const [relatoUnico, setRelatoUnico] = useState({ podcast: false, relato: false });
    const [listadoRelatosVisitados, setListadoRelatosVisitados] = useState([])
    const handleScroll = (e) => {
        const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        //console.log('en scroll ', Math.round(e.target.scrollHeight - e.target.scrollTop), e.target.clientHeight);
        if (bottom) {
            //console.log("reached bottom", tags.length);
            let items = tags.concat(tags);
            setTags(items);
        }

    }

    const btnTipoAutobiograficoClick = (parametro) => {
        setSolopodcats(parametro);
        setHabilitarLoaderInitial(true);
        setBiographies([]);
        if (parametro === 'PODCASTS') {
            setRelatoUnico({ ...relatoUnico, podcast: true, relato: false });
            const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {

                let respuestacategories = response.data.results.map((el, ind) => {
                    let title = el.titulo.replace(/\s/g, '-');
                    let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                        return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                    }) : []
                    return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                });
                let videosimagenes = [];
                respuestacategories.map((cat, ind) => {
                    videosimagenes = videosimagenes.concat(cat.listadoVideos)
                });
                //console.log('estableciendo categorías ', respuestacategories)
                setCategories(respuestacategories);
                const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                    queryActual
                ).then(response => {
                    //console.log('respuesta desde server ', response);
                    let biografias = response.data.map((elemento, indice) => {
                        return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                    });

                    biografias = biografias.map((relato, index) => {

                        //console.log('encontrando la imagen ', videosimagenes, relato);
                        let imagen = videosimagenes.find(x => x.id == relato.id_video);
                        relato.image = imagen ? imagen.imagen : '';
                        //categorias[Math.floor(Math.random() * categorias.length)].image;
                        return relato;
                    })
                    setBiographies(biografias.filter(x => x.podcast == true));
                    // let nuevospodcasts = biographies.filter(x => x.podcast == true);
                    // console.log('estableciendo filtro relatos ', nuevospodcasts);
                    // setBiographies(nuevospodcasts);
                    setEditing({
                        ...editing,
                        podcast: true,
                    });
                    setHabilitarLoaderInitial(false);
                }).catch(e => {
                    //console.log('error en server', e.response.status);
                    setHabilitarLoaderInitial(false);
                });
            });
        }
        else if (parametro === 'RELATOS') {
            setRelatoUnico({ ...relatoUnico, podcast: false, relato: true });
            const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {

                let respuestacategories = response.data.results.map((el, ind) => {
                    let title = el.titulo.replace(/\s/g, '-');
                    let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                        return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                    }) : []
                    return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                });
                let videosimagenes = [];
                respuestacategories.map((cat, ind) => {
                    videosimagenes = videosimagenes.concat(cat.listadoVideos)
                });
                //console.log('estableciendo categorías ', respuestacategories)
                setCategories(respuestacategories);
                const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                    queryActual
                ).then(response => {
                    //console.log('respuesta desde server ', response);
                    let biografias = response.data.map((elemento, indice) => {
                        return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                    });

                    biografias = biografias.map((relato, index) => {

                        //console.log('encontrando la imagen ', videosimagenes, relato);
                        let imagen = videosimagenes.find(x => x.id == relato.id_video);
                        relato.image = imagen ? imagen.imagen : '';
                        //categorias[Math.floor(Math.random() * categorias.length)].image;
                        return relato;
                    })
                    setBiographies(biografias.filter(x => x.podcast == false));
                    // let nuevosrelatos = biographies;
                    // console.log('estableciendo filtro relatos ', nuevosrelatos);
                    //setBiographies(nuevosrelatos);
                    setEditing({
                        ...editing,
                        podcast: false,
                    });
                    setHabilitarLoaderInitial(false);
                }).catch(e => {
                    //console.log('error en server', e.response.status);
                    setHabilitarLoaderInitial(false);
                });
            });
        }
        //console.log('estado editando ', editing);
    }
    const setModeEdit = (parametro) => {
        setEditing(parametro);
    }
    const estableceModoEdicion = (parametro) => {
        setModeEdit({ ...editing, editando: parametro });
    }
    const setSearchTag = (valor) => {
        setValueSearchTag(valor);
    }
    const filterTagsSearch = () => {
        if (valueSearchTag !== '') {
            let arreglo = tags.filter(x => x.content.includes(valueSearchTag));
            //console.log('encontrados los tagos ', arreglo);
            setTags(arreglo);
        }
    }
    const viewMoreTags = () => {
        let items = tags.concat(tags);
        setTags(items);
    }

    useEffect(() => {
        //console.log("Location changed");
        utilidadMenuSuperior();
        if (location.search) {
            let parametros;
            parametros = new URLSearchParams(window.location.search);
            if (parametros.get("q") == "true" && parametros.get("cat") == "Relatos") {
                let consulta_actual = JSON.parse(localStorage.getItem("queryRelatos"));
                //console.log('consulta de parametros relatos ', consulta_actual);
                //localStorage.removeItem("queryRelatos");
                setQueryActual(consulta_actual)
                if (rutaDiferente == '') {
                    setHabilitarLoaderInitial(true);
                }

                const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {

                    let respuestacategories = response.data.results.map((el, ind) => {
                        let title = el.titulo.replace(/\s/g, '-');
                        let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                            return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                        }) : []
                        return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                    });
                    let videosimagenes = [];
                    respuestacategories.map((cat, ind) => {
                        videosimagenes = videosimagenes.concat(cat.listadoVideos)
                    });
                    //console.log('estableciendo categorías ', respuestacategories)
                    setCategories(respuestacategories);
                    const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                        consulta_actual
                    ).then(response => {
                        //console.log('respuesta desde server ', response);
                        let biografias = response.data.map((elemento, indice) => {
                            return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                        });

                        biografias = biografias.map((relato, index) => {

                            //console.log('encontrando la imagen ', videosimagenes, relato);
                            let imagen = videosimagenes.find(x => x.id == relato.id_video);
                            relato.image = imagen ? imagen.imagen : '';
                            //categorias[Math.floor(Math.random() * categorias.length)].image;
                            return relato;
                        })
                        relatoUnico.podcast == false && relatoUnico.relato == false ?
                            setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                    setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                        setHabilitarLoaderInitial(false);
                        setRutaDiferente(location.pathname);
                        const consultaProfile = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                            }
                        })
                            .then(response => {
                                //console.log('respuesta del userprofile en relatos', response);
                                if (cuentaDeUsuario == '') {
                                    setcuentaDeUsuario(response.data["email"])
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                if (cuentaDeUsuario !== '') {
                                    setcuentaDeUsuario('')
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                setHabilitarLoaderInitial(false);
                            });
                    }).catch(e => {
                        //console.log('error en server', e.response.status);
                        setHabilitarLoaderInitial(false);
                    });
                });
                let nuevostags = arreglotags.map((tag, indice) => {
                    if (tag.popular) {
                        tag.color = random_color();
                    }
                    else {
                        tag.color = '';
                    }
                    return tag;
                });
                setTags(nuevostags);
                setSolopodcats('');
            }
            else if (parametros.get("s") == "true" && parametros.get("cat") == "Relatos") {
                let consulta_actual = location.pathname.split("/")[2];
                //console.log('consulta de parametros relatos ', consulta_actual);
                let objetoSearchPagina = {
                    "identificador": consulta_actual
                };
                setQueryActual(objetoSearchPagina);
                if (rutaDiferente == '') {
                    setHabilitarLoaderInitial(true);
                }
                const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {

                    let respuestacategories = response.data.results.map((el, ind) => {
                        let title = el.titulo.replace(/\s/g, '-');
                        let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                            return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                        }) : []
                        return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                    });
                    let videosimagenes = [];
                    respuestacategories.map((cat, ind) => {
                        videosimagenes = videosimagenes.concat(cat.listadoVideos)
                    });
                    //console.log('estableciendo categorías ', respuestacategories)
                    setCategories(respuestacategories);
                    const requestSearchomments = axios.post(`${getBaseAdressApi()}api/singlerelato/`,
                        objetoSearchPagina
                    ).then(response => {
                        //console.log('respuesta desde server ', response);
                        let biografias = response.data.map((elemento, indice) => {
                            return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                        });

                        biografias = biografias.map((relato, index) => {

                            //console.log('encontrando la imagen ', videosimagenes, relato);
                            let imagen = videosimagenes.find(x => x.id == relato.id_video);
                            relato.image = imagen ? imagen.imagen : '';
                            //categorias[Math.floor(Math.random() * categorias.length)].image;
                            return relato;
                        })
                        relatoUnico.podcast == false && relatoUnico.relato == false ?
                            setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                    setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                        setHabilitarLoaderInitial(false);
                        setRutaDiferente(location.pathname);
                        const consultaProfile = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                            }
                        })
                            .then(response => {
                                //console.log('respuesta del userprofile en relatos', response);
                                if (cuentaDeUsuario == '') {
                                    setcuentaDeUsuario(response.data["email"])
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                if (cuentaDeUsuario !== '') {
                                    setcuentaDeUsuario('')
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                setHabilitarLoaderInitial(false);
                            });
                    }).catch(e => {
                        //console.log('error en server', e.response.status);
                        setHabilitarLoaderInitial(false);
                    });
                });
                let nuevostags = arreglotags.map((tag, indice) => {
                    if (tag.popular) {
                        tag.color = random_color();
                    }
                    else {
                        tag.color = '';
                    }
                    return tag;
                });
                setTags(nuevostags);
                setSolopodcats('');
            }
            else {

                let objetoSearchPagina = {
                    "query": "",
                    "categoria": "",
                    "frase": false,
                    "autor": "",
                    "puede": "",
                    "prefijo": "",
                    "video": "",
                    "pagina_inicial": paginacion.paginaActual
                };
                setQueryActual(objetoSearchPagina);
                if (rutaDiferente == '') {
                    setHabilitarLoaderInitial(true);
                }
                const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {


                    let respuestacategories = response.data.results.map((el, ind) => {
                        let title = el.titulo.replace(/\s/g, '-');
                        let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                            return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                        }) : []
                        return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                    });
                    let videosimagenes = [];
                    respuestacategories.map((cat, ind) => {
                        videosimagenes = videosimagenes.concat(cat.listadoVideos)
                    });
                    //console.log('encontrando la imagen primero', videosimagenes);
                    //setImagesVideos(videosimagenes);
                    //console.log('estableciendo categorías ', respuestacategories)
                    setCategories(respuestacategories);
                    const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                        objetoSearchPagina
                    ).then(response => {
                        //console.log('respuesta desde server ', response);
                        let biografias = response.data.map((elemento, indice) => {
                            return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                        });

                        biografias = biografias.map((relato, index) => {

                            //console.log('encontrando la imagen ', videosimagenes, relato);
                            let imagen = videosimagenes.find(x => x.id == relato.id_video);
                            relato.image = imagen ? imagen.imagen : '';
                            //categorias[Math.floor(Math.random() * categorias.length)].image;
                            return relato;
                        })
                        relatoUnico.podcast == false && relatoUnico.relato == false ?
                            setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                    setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                        setHabilitarLoaderInitial(false);
                        setRutaDiferente(location.pathname);
                        const consultaProfile = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                            }
                        })
                            .then(response => {
                                //console.log('respuesta del userprofile en relatos', response);
                                if (cuentaDeUsuario == '') {
                                    setcuentaDeUsuario(response.data["email"])
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                if (cuentaDeUsuario !== '') {
                                    setcuentaDeUsuario('')
                                }
                                setHabilitarLoaderInitial(false);
                            }).catch(err => {
                                setHabilitarLoaderInitial(false);
                            });
                    }).catch(err => {
                        //console.log('error en respuesta desde server ', err);
                        setHabilitarLoaderInitial(false);
                    });
                })
                let nuevostags = arreglotags.map((tag, indice) => {
                    if (tag.popular) {
                        tag.color = random_color();
                    }
                    else {
                        tag.color = '';
                    }
                    return tag;
                });
                setTags(nuevostags);
                setSolopodcats('');
            }
        }
        else {

            let objetoSearchPagina = {
                "query": "",
                "categoria": "",
                "frase": false,
                "autor": "",
                "puede": "",
                "prefijo": "",
                "video": "",
                "pagina_inicial": paginacion.paginaActual
            };
            setQueryActual(objetoSearchPagina);
            if (rutaDiferente == '') {
                setHabilitarLoaderInitial(true);
            }
            const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {


                let respuestacategories = response.data.results.map((el, ind) => {
                    let title = el.titulo.replace(/\s/g, '-');
                    let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                        return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                    }) : []
                    return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
                });
                let videosimagenes = [];
                respuestacategories.map((cat, ind) => {
                    videosimagenes = videosimagenes.concat(cat.listadoVideos)
                });
                //console.log('encontrando la imagen primero', videosimagenes);
                //setImagesVideos(videosimagenes);
                //console.log('estableciendo categorías ', respuestacategories)
                setCategories(respuestacategories);
                const requestSearchomments = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                    objetoSearchPagina
                ).then(response => {
                    //console.log('respuesta desde server ', response);
                    let biografias = response.data.map((elemento, indice) => {
                        return { document_id: elemento.document_id, id_video: elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice((indice + 1) * 10, (indice + 2) * 10) };
                    });

                    biografias = biografias.map((relato, index) => {

                        //console.log('encontrando la imagen ', videosimagenes, relato);
                        let imagen = videosimagenes.find(x => x.id == relato.id_video);
                        relato.image = imagen ? imagen.imagen : '';
                        //categorias[Math.floor(Math.random() * categorias.length)].image;
                        return relato;
                    })
                    relatoUnico.podcast == false && relatoUnico.relato == false ?
                        setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                            setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                    setHabilitarLoaderInitial(false);
                    setRutaDiferente(location.pathname);
                    const consultaProfile = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                        }
                    })
                        .then(response => {
                            //console.log('respuesta del userprofile en relatos', response);
                            if (cuentaDeUsuario == '') {
                                setcuentaDeUsuario(response.data["email"])
                            }
                            setHabilitarLoaderInitial(false);
                        }).catch(err => {
                            if (cuentaDeUsuario !== '') {
                                setcuentaDeUsuario('')
                            }
                            setHabilitarLoaderInitial(false);
                        }).catch(err => {
                            setHabilitarLoaderInitial(false);
                        });
                }).catch(err => {
                    //console.log('error en respuesta desde server ', err);
                    setHabilitarLoaderInitial(false);
                });
            })
            let nuevostags = arreglotags.map((tag, indice) => {
                if (tag.popular) {
                    tag.color = random_color();
                }
                else {
                    tag.color = '';
                }
                return tag;
            });
            setTags(nuevostags);
            setSolopodcats('');
        }
    }, [location, rutaDiferente, cuentaDeUsuario]);
    const changeFavorite = (valor) => {
        if (esFavorito.valor && valor) {
            const addfav = axios.put(`${getBaseAdressApi()}api/addfavoriterelato/`, {
                "document_id": esFavorito.guid
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                }
            }).then(response => {
                const requestmorefavs = axios.get(`${getBaseAdressApi()}api/detailfavoritesrelato/${esFavorito.guid}`).then(response => {
                    let cantidad = response.data[0].favoritos_por_relato.length;
                    //console.log('obteniendo cuenta de favoritos ', cantidad, response)
                    setEsFavorito({
                        ...esFavorito,
                        valor: !esFavorito.valor,
                        cuenta: cantidad
                    })
                })
            }).catch(err => {
                if (err.response.status == 404) {
                    setEsFavorito({
                        ...esFavorito,
                        valor: !esFavorito.valor,
                    })
                }
            });
        }
        else if (valor) {
            const addfav = axios.delete(`${getBaseAdressApi()}api/addfavoriterelato/`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                }, data: {
                    "document_id": esFavorito.guid
                }
            }).then(response => {
                const requestmorefavs = axios.get(`${getBaseAdressApi()}api/detailfavoritesrelato/${esFavorito.guid}`).then(response => {
                    let cantidad = response.data[0].favoritos_por_relato.length;
                    //console.log('obteniendo cuenta de favoritos ', cantidad, response)
                    setEsFavorito({
                        ...esFavorito,
                        valor: !esFavorito.valor,
                        cuenta: cantidad
                    })
                })
            }).catch(err => {
                if (err.response.status == 404) {
                    setEsFavorito({
                        ...esFavorito,
                        valor: !esFavorito.valor,
                    })
                }
            });
        }
    }
    const estableceAccionesRelato = (parametro) => {
        let documento = parametro.document_id;
        //console.log('el relato es ', documento, parametro);
        setEsFavorito({
            ...esFavorito,
            guid: documento,
            cuenta: 0,
            valor: cuentaDeUsuario ? true : false
        });
        if (listadoRelatosVisitados.find(e => e == documento) == undefined) {
            let masrelatosvisitados = listadoRelatosVisitados.concat(documento);
            setListadoRelatosVisitados(masrelatosvisitados);
            const post_addvisit = axios.post(`${getBaseAdressApi()}api/addvisitrelatoauth/`,
                { "document_id": documento },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                    }
                }).then(response => {

                }).catch(err => {
                    const post_addvisitanonima = axios.post(`${getBaseAdressApi()}api/addvisitrelato/`,
                        { "document_id": documento }).then(respuesta => {

                        }).catch(error => { });
                });
        }
        const requestmorefavs = axios.get(`${getBaseAdressApi()}api/detailfavoritesrelato/${documento}`).then(response => {
            let cantidad = response.data[0].favoritos_por_relato.length;
            //console.log('obteniendo cuenta de favoritos ', cantidad, response)
            setEsFavorito({
                ...esFavorito,
                valor: cuentaDeUsuario ? true : false,
                cuenta: cantidad,
                guid: response.data[0].document_id
            })
        })

    }
    const estableceTags = (parametro) => {
        if (parametro) {
            let arreglo = parametro.tags
            setTags(arreglo);
            setTagViewed(true);
        }
        else {
            setTags(arreglotags);
            setTagViewed(false);
        }
    }
    const filterAutobiografico = (parametro) => {
        let arreglo = biographies.filter(x => x.tags.includes(parametro));
        setBiographies(arreglo);
    }
    const resetAutobiograficos = () => {
        let objetoSearchPagina = {
            "query": "",
            "categoria": "",
            "frase": false,
            "autor": "",
            "puede": "",
            "prefijo": "",
            "video": "",
            "pagina_inicial": paginacion.paginaActual
        };
        setQueryActual(objetoSearchPagina);
        const requestCategoriesVideos = axios.get(`${getBaseAdressApi()}api/categorias/`).then(response => {

            let respuestacategories = response.data.results.map((el, ind) => {
                let title = el.titulo.replace(/\s/g, '-');
                let videos = el.videos_por_categoria !== undefined ? el.videos_por_categoria.map((vid, idx) => {
                    return { titulo: vid.titulo, id: vid.id, video: vid.contenedor_aws, imagen: vid.contenedor_img }
                }) : []
                return { description: el.titulo, link: '/Categorias/' + title + "/dummy", image: el.contenedor_img, listadoVideos: videos }
            });
            let videosimagenes = [];
            
            respuestacategories.map((cat, ind) => {
                videosimagenes = videosimagenes.concat(cat.listadoVideos);
            });
            //console.log('los videos son ',videosimagenes);
            const requestSearchRelatos = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                objetoSearchPagina
            ).then(response => {
                let biografias = response.data.map((elemento, indice) => {
                    return { document_id: elemento.document_id, id_video:elemento.id_video, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice(0, 30) };
                });
                biografias = biografias.map((relato, index) => {
                    let imagen = videosimagenes.find(x => x.id == relato.id_video);
                    relato.image = imagen ? imagen.imagen : '';
                    return relato;
                });
                setBiographies(biografias);
            });
        });
    }
    const [recordState, setRecordState] = useState("NONE");
    const [blobURL, setblobURL] = useState({ url: "", blob: null });

    const start = () => {
        //console.log(recordState);
        //console.log("start");
        setRecordState(
            RecordState.START
        )
    }

    const stop = () => {
        try {
            //console.log("stop")
            // GFB COMENTAR PARA DESPLIEGUES EN PRUEBAS (SIN DOMINIO)
            setRecordState(
                RecordState.STOP
            )
        }
        catch (ex) {
            console.log(ex);
        }
    }

    //audioData contains blob and blobUrl
    const onStop = (audioData) => {
        //console.log('audioData', audioData, audioData.blob.size + " bytes");
        setblobURL({ url: audioData.url, blob: audioData.blob });
    }
    const [activeEventKey, setActiveEventKey] = useState(0);
    const [activeVideo, setActiveVideo] = useState(null);
    const [sourceActiveVideo, setSourceActiveVideo] = useState(null)
    const [player, setPlayer] = useState(null);
    const clasecolapsed = collapsed ? ['autobiografico-main-list-category-collapsed', 'autobiografico-main-list-tags-full'] : ['autobiografico-main-list-category', 'autobiografico-main-list-tags'];
    const reloadVideo = (video) => {
        //console.log('recargando video ', player);
        setActiveVideo(video); setSourceActiveVideo(video.video); player && player.load()
    }
    const [relatoEditing, setRelatoEditing] = useState('');
    const [habilitarLoader, setHabilitarLoader] = useState(null);
    const [habilitarLoaderInitial, setHabilitarLoaderInitial] = useState(null);
    const [publicarAnonimo, setEsPublicarAnonimo] = useState({ intento: false, publicar: false });
    const postRelato = () => {

        if (relatoEditing.trim() != "") {
            let nuevoRelato = {
                "id_autor": "usuario_generico",
                "id_video": activeVideo.id,
                "relato": relatoEditing,
                "espodcast": false
            };
            const datos = new FormData();
            datos.append("id_autor", 0);
            datos.append("id_video", nuevoRelato.id_video);
            datos.append("relato", nuevoRelato.relato);
            datos.append("espodcast", false);
            setHabilitarLoader(true);
            const requestPutRelato = axios.put(`${getBaseAdressApi()}api/relatetextvideoauth/`,
                datos, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                },
            }).then(response => {
                if (response.status == 201) {
                    const requestSearchommentsAgain = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                        queryActual
                    ).then(response => {
                        let biografias = response.data.map((elemento, indice) => {
                            return { document_id: elemento.document_id, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice(0, 30) };
                        });
                        biografias = biografias.map((relato, index) => {
                            relato.image = categorias[Math.floor(Math.random() * categorias.length)].image;
                            return relato;
                        })
                        relatoUnico.podcast == false && relatoUnico.relato == false ?
                            setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                    setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                        setModeEdit({ podcast: editing.podcast, editando: false });
                        setHabilitarLoader(false)
                    });
                }
            }).catch(err => {
                if (!publicarAnonimo.publicar) {
                    setHabilitarLoader(false);
                    setEsPublicarAnonimo({
                        ...publicarAnonimo,
                        intento: true,
                        publicar: false
                    });
                    //console.log('error previsto en publicación ', err);
                }
                else {
                    setHabilitarLoader(true);
                    const requestPutRelatoAnonimo = axios.put(`${getBaseAdressApi()}api/relatevideo/`,
                        nuevoRelato).then(response => {
                            if (response.status == 201) {
                                const requestSearchommentsAgain = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                                    queryActual
                                ).then(response => {
                                    let biografias = response.data.map((elemento, indice) => {
                                        return { document_id: elemento.document_id, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice(0, 30) };
                                    });
                                    biografias = biografias.map((relato, index) => {
                                        relato.image = categorias[Math.floor(Math.random() * categorias.length)].image;
                                        return relato;
                                    })
                                    setEsPublicarAnonimo({
                                        ...publicarAnonimo,
                                        intento: false,
                                        publicar: false
                                    })
                                    relatoUnico.podcast == false && relatoUnico.relato == false ?
                                        setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                            setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                                setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                                    setModeEdit({ podcast: editing.podcast, editando: false });
                                    setHabilitarLoader(false)
                                });
                            }
                        }).catch(err => {
                            //console.log('envío de relato textual falló por segunda vez ', err);
                        });
                }
            })
        }
    }

    const postRelatoPodcast = () => {

        if (relatoEditing.trim() != "") {
            let nuevoRelato = {
                "id_autor": "usuario_generico",
                "id_video": activeVideo.id,
                "relato": relatoEditing,
                "espodcast": true
            };
            const datos = new FormData();
            datos.append("id_autor", nuevoRelato.id_autor);
            datos.append("id_video", nuevoRelato.id_video);
            datos.append("relato", nuevoRelato.relato);
            datos.append("espodcast", nuevoRelato.espodcast);
            datos.append("filefield", blobURL.blob)
            //console.log('enviando los siguientes datos del podcast ', datos.get('relato'), datos)
            setHabilitarLoader(true);
            const requestPutRelato = axios.put(`${getBaseAdressApi()}api/relatevideoauth/`,
                datos, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                },
            }).then(response => {
                if (response.status == 201) {
                    const requestSearchommentsAgain = axios.post(`${getBaseAdressApi()}api/searchrelato/`,
                        queryActual
                    ).then(response => {
                        let biografias = response.data.map((elemento, indice) => {
                            return { document_id: elemento.document_id, content: elemento.relato, autor: elemento.autor, fecha: new Date(elemento.ultima_fecha).toLocaleDateString(), reciente: true, podcast: elemento.espodcast, contenedor_aws: elemento.contenedor_aws, guid: '', tags: arreglotags.slice(0, 30) };
                        });
                        biografias = biografias.map((relato, index) => {
                            relato.image = categorias[Math.floor(Math.random() * categorias.length)].image;
                            return relato;
                        })
                        relatoUnico.podcast == false && relatoUnico.relato == false ?
                            setBiographies(biografias) : relatoUnico.podcast && relatoUnico.relato == false ?
                                setBiographies(biografias.filter(x => x.podcast == true)) : relatoUnico.relato && relatoUnico.podcast == false ?
                                    setBiographies(biografias.filter(x => x.podcast == false)) : setBiographies([]);
                        setModeEdit({ podcast: editing.podcast, editando: false });
                        setHabilitarLoader(false)
                    });
                }
            }).catch(err => {
                //console.log('error enviando el podcast ', err)
                setHabilitarLoader(false);
                setEsPublicarAnonimo({
                    ...publicarAnonimo,
                    intento: true,
                    publicar: false
                });
            });

        }
    }
    const navegarRelacionado = (idclip) => {
        setHabilitarLoaderInitial(true);
        const obtenerVideos = axios.get(`${getBaseAdressApi()}api/video/${idclip}`).then(response => {
            let titulovideo = response.data["titulo"];
            let categoria = response.data["id_categoria"];
            let identificador = response.data.id;
            const obtenerCategorias = axios.get(`${getBaseAdressApi()}api/categoria/${categoria}`).then(respuesta => {

                let id_categ = respuesta.data["id"];
                let vinculo = "/Reproduccion/" + titulovideo.replace(/\s/g, '-') + "|" + identificador + "|" + id_categ;
                //console.log('el vinculo en la navegación desde relato ', vinculo);
                setHabilitarLoaderInitial(false);
                historia.push(vinculo);

            }).catch(err => {
                setHabilitarLoaderInitial(false);
            })
        }).catch(err => {
            setHabilitarLoaderInitial(false);
        })
    }
    return (
        <div>
            <div style={{ backgroundColor: 'black', height: '100px' }}>
                <NavBar></NavBar>
            </div>

            <div className={styles.AutoBiograficoMain}>
                <div className='default-loader-center' style={habilitarLoader ? { display: 'block' } : { display: 'none' }}>
                    <img src={url_loader("Reload-transparent.gif", false)} />
                </div>
                <div className='autobiografico-main-category'>
                    <div className='autobiografico-menu-collapsible'>
                        <span onClick={(e) => setCollapsed(!collapsed)} title="Colapsar categorías">{
                            collapsed ? <FontAwesomeIcon icon={faAngleDown} />
                                : <FontAwesomeIcon icon={faAngleUp} />
                        }</span>
                    </div>
                    {!editing.editando ?
                        <>
                            <div className='autobiografico-main-menu-edit'>
                                <div className='autobiografico-main-menu-header'>
                                    <div className='autobiografico-main-menu'>
                                        {!editing.editando ?
                                            <div>
                                                <div className={`${styles.AutoBiograficoMainMenuEntry} active`} onClick={(e) => estableceModoEdicion(false)}>
                                                    <span className='content-header-main-menu-entry'>Ver y escuchar</span>
                                                    <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('RELATOS') }} title='Relatos autobiográficos'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                    <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('PODCASTS') }} title='Podcasts'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                </div>
                                                <div className={`${styles.AutoBiograficoMainMenuEntry} inactive`} onClick={(e) => estableceModoEdicion(true)}>
                                                    <span className='content-header-main-menu-entry'>Editar</span>
                                                    <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                    <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                </div>
                                            </div> :
                                            <div>
                                                <div className={`${styles.AutoBiograficoMainMenuEntry} inactive`} onClick={(e) => estableceModoEdicion(false)}>
                                                    <span className='content-header-main-menu-entry'>Ver y escuchar</span>
                                                    <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                    <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                </div>
                                                <div className={`${styles.AutoBiograficoMainMenuEntry} active`} onClick={(e) => estableceModoEdicion(true)}>
                                                    <span className='content-header-main-menu-entry'>Editar</span>
                                                    <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('RELATOS') }} title='Relatos autobiográficos'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                    <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('PODCASTS') }} title='Podcasts'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={clasecolapsed[0]} onMouseEnter={(e) => estableceTags(false)}>
                                {
                                    categories && categories.map((cat, index) => {
                                        return <div key={index} className="autobiografico-list-cat-entry">
                                            <Link className='white' to={cat.link}>{cat.description}</Link>
                                            <Link className='white cat-miniature' to={cat.link}>
                                                {/* <img src={cat.image} align='right' /> */}
                                            </Link>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={clasecolapsed[1]}>
                                <div className='autobiografico-main-list-tags-header'><h3>{tagViewed ? "Tags relacionados: " : "Todos los tags: "}</h3>
                                    <div className='form-input'><input type='text' onKeyUp={(e) => setSearchTag(e.target.value)}></input><span><FontAwesomeIcon icon={faSearch} onClick={(e) => filterTagsSearch()}></FontAwesomeIcon></span></div></div>
                                {
                                    tags && tags.map((tag, index) => {
                                        return tag.popular ?
                                            <button key={index} onClick={(e) => { filterAutobiografico(tag) }} className='tag-autobiografico-search' style={{ backgroundColor: tag.color }}>
                                                {tag.content}
                                            </button>
                                            : <button key={index} onClick={(e) => { filterAutobiografico(tag) }} className='tag-autobiografico-search' style={{ backgroundColor: 'lightgrey', color: 'black' }}>
                                                {tag.content}
                                            </button>
                                    })
                                }

                                <button className='tag-autobiografico-more' onClick={(e) => { viewMoreTags(e) }}>Ver más</button>
                            </div>
                        </>
                        : <>
                            <div className='autobiografico-main-editing'>
                                <div className='autobiografico-main-menu-edit'>
                                    <div className='autobiografico-main-menu-header'>
                                        <div className='autobiografico-main-menu'>
                                            {!editing.editando ?
                                                <div>
                                                    <div className={`${styles.AutoBiograficoMainMenuEntry} active`} onClick={(e) => setModeEdit({ podcast: editing.podcast, editando: false })}>
                                                        <span className='content-header-main-menu-entry'>Ver y escuchar</span>
                                                        <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('RELATOS') }} title='Relatos autobiográficos'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                        <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('PODCASTS') }} title='Podcasts'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                    </div>
                                                    <div className={`${styles.AutoBiograficoMainMenuEntry} inactive`} onClick={(e) => setModeEdit({ podcast: editing.podcast, editando: true })}>
                                                        <span className='content-header-main-menu-entry'>Editar</span>
                                                        <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                        <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <div className={`${styles.AutoBiograficoMainMenuEntry} inactive`} onClick={(e) => setModeEdit({ podcast: editing.podcast, editando: false })}>
                                                        <span className='content-header-main-menu-entry'>Ver y escuchar</span>
                                                        <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                        <button className='btn-autobiografico-menu-white'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                    </div>
                                                    <div className={`${styles.AutoBiograficoMainMenuEntry} active`} onClick={(e) => setModeEdit({ podcast: editing.podcast, editando: true })}>
                                                        <span className='content-header-main-menu-entry'>Editar</span>
                                                        <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('RELATOS') }} title='Relatos autobiográficos'><span><FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon></span>&nbsp;</button>
                                                        <button className='btn-autobiografico-menu-white' onClick={(e) => { btnTipoAutobiograficoClick('PODCASTS') }} title='Podcasts'><span><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></span>&nbsp;</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {solopodcasts === "PODCASTS" ?
                                    <>
                                        <h4 style={{ margin: '.5em 1em' }}>Escriba una descripción e inicie la grabación del podcast, relacionado al vídeo elegido en la siguiente columna {activeVideo && 'Relato acerca del clip ' + activeVideo.titulo}</h4>

                                        {publicarAnonimo.intento &&
                                            <div className='usuario-desautorizado'>
                                                <div className="contenido-usuario-desautorizado">
                                                    <p>Atención, no es posible publicar podcasts anónimos en el sitio, es necesario estar registrado en el sitio e iniciar sesión.</p>
                                                    <p><Link to="/Login">inicie sesión</Link> en el sitio.</p>
                                                </div>
                                            </div>
                                        }
                                        <div className='capture-relato'>
                                            <textarea rows="12" cols="60" onChange={(e) => setRelatoEditing(e.target.value)}>{relatoEditing}</textarea>
                                            {activeVideo && relatoEditing.trim() != "" && blobURL.url != "" && <button onClick={postRelatoPodcast}>Enviar</button>}
                                        </div>
                                        <div className='podcast-record'>
                                            <AudioReactRecorder state={recordState} onStop={onStop} canvasWidth={410} canvasHeight={150} />
                                            <div className='podcast-controls-record'>
                                                <ReactAudioPlayer src={blobURL.url} controls />
                                                <button title="Iniciar grabación" className='start-podcast-record' onClick={start}><FontAwesomeIcon icon={faMicrophone} /></button>
                                                <button title="Detener grabación" className='end-podcast-record' onClick={stop}><FontAwesomeIcon icon={faStop} /></button>
                                            </div>
                                        </div></>
                                    : <>
                                        <h4 style={{ margin: '.5em 1em' }}>Escriba una descripción de su relato, relacionado al vídeo elegido en la siguiente columna {activeVideo && 'Relato acerca del clip ' + activeVideo.titulo}</h4>
                                        {
                                            publicarAnonimo.intento &&
                                            <div className='usuario-desautorizado'>
                                                <div className="contenido-usuario-desautorizado">
                                                    <p>Atención, debido a que no ha iniciado sesión en el sitio, el comentario se publicará como anónimo.</p>
                                                    <p>De click en el botón "Aceptar" para continuar y vuelva a intentarlo por favor.</p><p>O bien, <Link to="/Login">inicie sesión</Link> en el sitio.</p>
                                                    <button type="button" onClick={(e) => { setEsPublicarAnonimo({ ...publicarAnonimo, intento: false, publicar: true }); }}>Aceptar</button>
                                                </div>
                                            </div>
                                        }
                                        <div className='capture-relato'>
                                            <textarea rows="34" cols="60" maxLength={8000} onChange={(e) => setRelatoEditing(e.target.value)}>{relatoEditing}</textarea>
                                            {activeVideo && <button onClick={postRelato}>Enviar</button>}
                                        </div></>
                                }

                            </div>
                        </>
                    }
                </div>
                <div className='autobiografico-main-list'>
                    {!editing.editando ?
                        <>
                            <div className='autobiografico-main-list-entries'>
                                <button className='autobiografico-main-list-entries-header' onClick={(e => { resetAutobiograficos() })}>
                                    Ver todos
                                </button>
                            </div>
                            <div className='default-loader-center-relatos' style={habilitarLoaderInitial ? { display: 'block' } : { display: 'none' }}>
                                <img src={url_loader("Reload-transparent.gif", false)} />
                                <pre className="legend-loading-relatos-miniatures">Cargando relatos y/o podcasts...</pre>
                            </div>
                        </> : null
                    }
                    {
                        !editing.editando ? biographies && biographies.map((relato, index) => {
                            //console.log('relato encontrado ', relato)
                            return <div className='autobiografico-entry' key={index} onMouseEnter={(e) => {
                                estableceTags(relato);
                                estableceAccionesRelato(relato);
                            }}>
                                <p>Creado el {relato.fecha}</p>
                                <div className='autobiografico-entry-header'>
                                    <div className='autobiografico-header-icon'>
                                        {relato.podcast ? <FontAwesomeIcon icon={faVolumeHigh} />
                                            : <FontAwesomeIcon icon={faBook} />}
                                    </div>
                                    <div className={localStorage.getItem('credencial') && cuentaDeUsuario !== '' ? 'acciones-relato' : 'acciones-relato-disabled'} onClick={(e) => {
                                        localStorage.getItem('credencial') && cuentaDeUsuario !== '' ?
                                            changeFavorite(true) : changeFavorite(false)
                                    }}>
                                        {esFavorito && esFavorito.valor && esFavorito.guid == relato.document_id ? <FontAwesomeIcon style={{ color: 'red' }} icon={faHeart} />
                                            : <FontAwesomeIcon style={{ color: 'darkgray' }} icon={faHeartBroken} />}
                                        <span>{esFavorito.valor ? 'Favoritos' : 'No es favorito'} <span className="cuenta-favoritos-small">{esFavorito && esFavorito.cuenta > 0 && esFavorito.guid == relato.document_id ? esFavorito.cuenta : 'sin favoritos'}</span></span>
                                    </div>
                                    <div className='autobiografico-header-autor'>
                                        {relato.autor}
                                    </div>
                                    <div className='autobiografico-header-related' style={{ cursor: 'pointer' }}>
                                        <span>Relacionado con: </span><img src={relato.image} onClick={(e) => { navegarRelacionado(relato.id_video) }} align='right' />
                                    </div>
                                </div>
                                {
                                    relato.podcast ?
                                        <ReactAudioPlayer src={relato.contenedor_aws}
                                            controls></ReactAudioPlayer> : null
                                }
                                <div className='autobiografico-entry-content'>
                                    {relato.content}
                                </div>

                            </div>
                        }) :
                            <>
                                {sourceActiveVideo && <Player
                                    ref={player => {
                                        setPlayer(player);
                                    }}>
                                    <source src={sourceActiveVideo}></source>
                                    <ControlBar></ControlBar>
                                    <LoadingSpinner></LoadingSpinner>
                                </Player>
                                }
                                <div className='listado-acordeon'>
                                    <h3>
                                        {activeVideo && activeVideo.titulo}
                                    </h3>
                                    <Accordion activeEventKey={activeEventKey} onToggle={setActiveEventKey}>
                                        {
                                            categories.map(({ description, listadoVideos }, i) => {
                                                //console.log('categorias en acordeon ', description, listadoVideos);
                                                return (<Card key={i}>
                                                    <Accordion.Toggle element={Card.Header} eventKey={i}>
                                                        {description}
                                                        {activeEventKey !== i && <span><FontAwesomeIcon icon={faAngleDown} /></span>}
                                                        {activeEventKey === i && <span><FontAwesomeIcon icon={faAngleUp} /></span>}
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={i} element={Card.Body}>

                                                        <ul className='accordion-list'>
                                                            {
                                                                listadoVideos.map((el, indicevideo) => {
                                                                    return <li key={indicevideo} onClick={(e) => reloadVideo(el)}>{el.titulo}</li>
                                                                })
                                                            }
                                                        </ul>

                                                    </Accordion.Collapse>
                                                </Card>)
                                            })
                                        }
                                    </Accordion>
                                </div>
                            </>
                    }
                </div>

            </div>
            <HomeFooter></HomeFooter>
        </div>
    )
}
