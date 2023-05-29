import React, { useState, useRef, useEffect } from "react";
import NavBar from '../NavBar';
import axios from "axios";
import { getBaseAdressApi } from "../MainAPI";
import { useHistory } from "react-router-dom";
import { HomeFooter } from "../HomeFooter";
import { useParams } from "react-router-dom";
import DefaultCombo from "../Events/DefaultCombo";
import {
    faTrash, faList, faUser, faBars, faStar,
    faArrowDown, faArrowUp, faSearch, faPlay, faTag, faBook, faBullseye, faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`
const videosMin = [
    { Categoria: "Movimientos Sociales", Video: "Screenshot_5", Calificacion: 4.5, ListaReproduccion: {}, Comentario: [], Tags: ["rock"], Relato: "6006c5d85f7c417f8714496c418d58ec" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_6", Calificacion: 3.5, ListaReproduccion: { Usuario: "Gabriela Romo", Titulo: "Smoothy" }, Comentario: [], Tags: ["rock", "vida"], Relato: "a4d52f71f1ec429db2e8da542ec6f3d4" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_7", Calificacion: 4, ListaReproduccion: {}, Comentario: [], Tags: ["vibrante"], Relato: "ec5ce4499ca84760aa635745439859c6" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_9", Calificacion: 4, ListaReproduccion: { Usuario: "Aaron González", Titulo: "Kitty" }, Comentario: [], Tags: ["cinta", "pasaje"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_12", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: ["testimonio", "electrónica"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_53", Calificacion: 4.5, ListaReproduccion: {}, Comentario: [], Tags: ["viaje", "serie"], Relato: "98e45f888485452381c1524a52b807f3" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_55", Calificacion: 5, ListaReproduccion: { Usuario: "'Alexis Gutiérrez", Titulo: "Pesado" }, Comentario: [], Tags: ["firma", "graffiti"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_60", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_61", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_62", Calificacion: 4, ListaReproduccion: {}, Comentario: [], Tags: ["proyecto", "salud"], Relato: "9e0ff745446e4b528a7ba1fbf0857db9" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_64", Calificacion: 5, ListaReproduccion: {}, Comentario: [], Tags: ["colaboracón", "colección", "antropología"], Relato: "" },
    { Categoria: "Movimientos Contraculturales", Video: "Screenshot_4", Calificacion: 4, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_10", Calificacion: 4, ListaReproduccion: { Usuario: "Pedro Solis", Titulo: "Madagascar" }, Comentario: [], Tags: ["noche", "estudio"], Relato: "c97a8c0997d04c7d93ce31269d7441a4" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_16", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: ["cinta", "cassete"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_21", Calificacion: 4.5, ListaReproduccion: { Usuario: "Gerardo Flores", Titulo: "Viento" }, Comentario: [], Tags: ["gresca", "vigilantes"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_23", Calificacion: 3.4, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "ec5ce4499ca84760aa635745439859c6" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_24", Calificacion: 5, ListaReproduccion: { Usuario: "Gabriela Romo", Titulo: "Techno" }, Comentario: [], Tags: ["desobediencia", "visibilidad"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_25", Calificacion: 4.3, ListaReproduccion: {}, Comentario: [], Tags: ["radio", "pasaje"], Relato: "adcf2f17b6074d47ac3031d39c021e1b" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_37", Calificacion: 3, ListaReproduccion: { Usuario: "Francisco Parada", Titulo: "Cinéfilo" }, Comentario: [], Tags: ["nopal", "desobediencia"], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_38", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Movimientos Sociales", Video: "Screenshot_39", Calificacion: 2.5, ListaReproduccion: { Usuario: "Francisco Parada", Titulo: "Psicodelic" }, Comentario: [], Tags: [], Relato: "c97a8c0997d04c7d93ce31269d7441a4" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_1", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: ["transbordar", "historia"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_3", Calificacion: 4, ListaReproduccion: { Usuario: "Alexis Gutiérrez", Titulo: "Trompo" }, Comentario: [], Tags: ["latino", "lágrimas"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_8", Calificacion: 5, ListaReproduccion: {}, Comentario: [], Tags: ["tenis", "chilango"], Relato: "c24d4188410548f881e2f3b5ae447569" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_28", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: ["testimonio", "menjunje"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_29", Calificacion: 2, ListaReproduccion: { Usuario: "Pedro Solis", Titulo: "Skatos" }, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_30", Calificacion: 4.3, ListaReproduccion: {}, Comentario: [], Tags: ["punk", "vibrante"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_31", Calificacion: 3.4, ListaReproduccion: { Usuario: "Gabriela Romo", Titulo: "Miss Chilanga" }, Comentario: [], Tags: ["punk"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_42", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: ["nopal"], Relato: "98e45f888485452381c1524a52b807f3" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_48", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: ["drogas", "firma"], Relato: "" },
    { Categoria: "Movimientos Urbanos", Video: "Screenshot_49", Calificacion: 4.3, ListaReproduccion: {}, Comentario: [], Tags: ["marihuana"], Relato: "" },
    { Categoria: "Movimientos en Defensa del Territorio", Video: "Screenshot_2", Calificacion: 4, ListaReproduccion: { Usuario: "Gerardo Flores", Titulo: "Marcha" }, Comentario: [], Tags: ["vida", "testimonio"], Relato: "a4d52f71f1ec429db2e8da542ec6f3d4" },
    { Categoria: "Arte Urbano", Video: "Screenshot_26", Calificacion: 4, ListaReproduccion: {}, Comentario: [], Tags: ["comunidad", "colección"], Relato: "a4d52f71f1ec429db2e8da542ec6f3d4" },
    { Categoria: "Arte Urbano", Video: "Screenshot_27", Calificacion: 5, ListaReproduccion: { Usuario: "Gabriela Romo", Titulo: "Audaz" }, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Arte Urbano", Video: "Screenshot_32", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: ["noche", "mictlan"], Relato: "6006c5d85f7c417f8714496c418d58ec" },
    { Categoria: "Arte Urbano", Video: "Screenshot_35", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Arte Urbano", Video: "Screenshot_36", Calificacion: 4.3, ListaReproduccion: {}, Comentario: [], Tags: ["mictlan", "tenis"], Relato: "6006c5d85f7c417f8714496c418d58ec" },
    { Categoria: "Arte Urbano", Video: "Screenshot_50", Calificacion: 3.5, ListaReproduccion: { Usuario: "Pedro Solis", Titulo: "Rave" }, Comentario: [], Tags: ["rock", "mictlan"], Relato: "" },
    { Categoria: "Arte Urbano", Video: "Screenshot_51", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Arte Urbano", Video: "Screenshot_54", Calificacion: 3, ListaReproduccion: {}, Comentario: [], Tags: ["testimonio", "nopal", "tenis"], Relato: "" },
    { Categoria: "Generación Transparente", Video: "Screenshot_13", Calificacion: 5, ListaReproduccion: { Usuario: "Francisco Parada", Titulo: "Foxy" }, Comentario: [], Tags: ["rock"], Relato: "6006c5d85f7c417f8714496c418d58ec" },
    { Categoria: "Generación Transparente", Video: "Screenshot_14", Calificacion: 2, ListaReproduccion: {}, Comentario: [], Tags: [], Relato: "" },
    { Categoria: "Generación Transparente", Video: "Screenshot_15", Calificacion: 4.4, ListaReproduccion: { Usuario: "Alexis Gutiérrez", Titulo: "Lady and Lord" }, Comentario: [], Tags: ["latino"], Relato: "" }
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
const autobiograficos = [
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
const seleccionaTipoVideo = { MAS_VISITADOS: 2, FAVORITOS: 3 };
function getVideosListado(tipoEvento) {
    let salida = [];
    for (let i = 0; i < videosMin.length; i++) {
        if (i % tipoEvento == 0) {
            salida.push(videosMin[i])
        }
    }
    return salida;
}
const ordenBusquedaPredeterminado = {
    Titulo: 1,
    Categoria: 2,
    Calificacion: 3,
    Visitas: 4,
    Tags: 5,
}

const ListadoOrdenar = [
    {
        indice: 0, title: 'Seleccionar...'
    },
    {
        indice: 1, title: 'Título', icono: faList

    },
    {
        indice: 2, title: 'Categoría', icono: faBook
    },
    {
        indice: 3, title: "Calificación", icono: faStar
    },
    ,
    {
        indice: 4, title: "Visitas", icono: faUser
    },
    ,
    {
        indice: 5, title: "Tags", icono: faTag
    }
]
const ListadoOpcionesVideo = [
    {
        indice: 1, title: 'Explorar', icono: faBullseye

    },
    {
        indice: 2, title: 'Eliminar', icono: faTrash

    },
    ,
    {
        indice: 3, title: 'Encolar', icono: faHeadphones
    }
]
const ListadoOpcionesVideoVisitados = [
    {
        indice: 1, title: 'Explorar', icono: faBullseye

    },
    ,
    {
        indice: 3, title: 'Encolar', icono: faHeadphones
    }
]
const tipoBusquedaPagina = {
    TITULO: 1,
    CATEGORIA: 2,
    USUARIO: 3,
    VISITAS: 4,
    TAG: 5
}
const orderBy = (listado, ordenamiento, desc) => {
    let salida = listado.map((e,idx)=>{
        return e;
    });

    if (ordenamiento == ordenBusquedaPredeterminado.Titulo) {
        salida.sort((a, b) => a.Video.localeCompare(b.Video));
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Categoria) {
        salida.sort((a, b) => a.Categoria.localeCompare(b.Categoria));
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Calificacion) {
        salida.sort((a, b) => parseFloat(a.Calificacion) - parseFloat(b.Calificacion));
    }
    else if (ordenamiento == ordenBusquedaPredeterminado.Tags) {
        salida.sort((a, b) => a.Tags.length - b.Tags.length);
    }
    if (ordenamiento == ordenBusquedaPredeterminado.Visitas) {
        salida.sort((a, b) => (a.Visitas !== null ? a.Visitas : 0) - (b.Visitas !== null ? b.Visitas : 0));
    }
    salida = desc ? salida.reverse() : salida;
    //console.log('ordenando listado', ordenamiento, salida, ordenBusquedaPredeterminado);
    return salida;
}
function random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
const ListadoVideosMasVisitados = (props) => {
    const rutaTipoListado = useParams();
    const history = useHistory();
    const tipoListado = rutaTipoListado.tipo === "MasVisitados" ? seleccionaTipoVideo.MAS_VISITADOS : rutaTipoListado.tipo === "Favoritos" ?
        seleccionaTipoVideo.FAVORITOS : seleccionaTipoVideo.MAS_VISITADOS;
    const [listado, setListado] = useState([]);
    const [searchBy, setSearchBy] = useState([-1]);
    const [ordenarPor, setOrdenarPor] = useState({ orden: ordenBusquedaPredeterminado.Nombre, descendiente: false });
    const [ordenamientoDesc, setOrdenamientoDesc] = useState(false);
    const [cargaPaginada, setCargaPaginada] = useState(false);
    const [idFilaFavorito, setIdFilaFavorito] = useState({ vinculo: '', idvideo: 0 });
    const [videosCalificados,setVideosCalificados] = useState(null);
    useEffect(() => {
        if (listado.length == 0) {
            const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
                let categories = respuesta.data.results.map((cat, idx) => {
                    return { titulo: cat.titulo, id_cat: cat.id }
                });
                const peticioncalificaciones = axios.get(`${getBaseAdressApi()}api/listarcalificacionesvideos/`).then(respuesta=>{
                    setVideosCalificados(respuesta.data);
                    let calificaciones_vid = respuesta.data;
                    const peticionVisitados = axios.get(`${getBaseAdressApi()}api/vistasporvideo/`).then(response => {
                        let videosvisitados = response.data.map((vid, ind) => {
                            console.log('respuesta de videos visitados ',response.data);
                            let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                            let relatovideohightlight = vid.relatos_por_video && vid.relatos_por_video.length > 0 ? vid.relatos_por_video : "";
                            let calificaciondelvideo = calificaciones_vid.find(x=> x.id== vid.id) ? (calificaciones_vid.find(x=> x.id== vid.id).total_calificacion ? calificaciones_vid.find(x=> x.id== vid.id).total_calificacion.toFixed(1) :0) : 0
                            let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                                return tag.content
                            });
                            // console.log('los relatos del video son ', relatovideohightlight);
                            //console.log('indice de los tags ', sliceIndex, tagsselected);
                            return { Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: calificaciondelvideo, Visitas: vid.total_visitas, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                        });
                        setListado(videosvisitados)
                        setCargaPaginada(true);
                    });
                }).catch(err=>{
                    setCargaPaginada(true);
                })
                
            })
            
        }
    }, [listado])
    const estableceDescendienteAscendiente = (valor, orden) => {


        setOrdenamientoDesc(valor);
        setOrdenarPor({ orden: orden, descendiente: valor });
        //let salida = 
        setListado(orderBy(listado.slice(0), orden, valor));
        //setListado(salida);
        // console.log('descendiente ', valor, orden)

    }
    const estableceOrdenamiento = (orden) => {
        setVisibleOpciones(-1);
        setOrdenarPor({ orden: orden.indice, descendiente: ordenamientoDesc });
        //let salida = 
        setListado(orderBy(listado.slice(0), orden.indice, ordenamientoDesc));
        //setListado(salida);
    }
    const [opcionesSetVisible, setVisibleOpciones] = useState(-1);
    const [opcionVideoPor, setOpcionVideoPor] = useState(-1);
    const [textoSearch, setTextoSearch] = useState('');
    const estableceBusqueda = () => {
        setVisibleOpciones(-1);
        setOrdenamientoDesc(ordenamientoDesc);
        setOrdenarPor({ orden: ordenarPor, descendiente: ordenamientoDesc });
        let salida = orderBy(listado, ordenarPor.orden, ordenamientoDesc);

        if (textoSearch.trim() != '') {
            let salidaTitulo = [];
            let salidaCategoria = [];
            let salidaUsuario = [];
            let salidaListaRepro = [];
            let salidaTags = [];
            searchBy.map((busquedapor, indice) => {
                switch (busquedapor) {
                    case tipoBusquedaPagina.TITULO:
                        salidaTitulo = salidaTitulo.concat(salida.filter(x => x.Video.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                        break;
                    case tipoBusquedaPagina.CATEGORIA:
                        salidaCategoria = salidaCategoria.concat(salida.filter(x => x.Categoria.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                        break;
                    case tipoBusquedaPagina.USUARIO:
                        let salidaautores = [];
                        let autorRelato = salida.map((el, idx) => {
                            let exit = el.Relato && el.Relato.map((rel, ind) => {
                                return { autor: rel.id_autor.username, id_video: el.Id }
                            });
                            salidaautores = salidaautores.concat(exit);
                            return exit;
                        });
                        //console.log('autores filtrados del relato ', salidaautores);
                        let autorbuscado = salidaautores.find(x => x.autor.toLowerCase() == textoSearch.toLowerCase())
                        salidaUsuario = autorbuscado != undefined ?
                            salidaUsuario.concat(salida.filter(x => x.Relato != "" && x.Id == autorbuscado.id_video)) : [];
                        break;
                    // case tipoBusquedaPagina.LISTAREPRODUCCION:
                    //     salidaListaRepro = salidaListaRepro.concat(salida.filter(x => x.ListaReproduccion.Titulo != undefined &&
                    //         x.ListaReproduccion.Titulo.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1));
                    //     break;
                    case tipoBusquedaPagina.TAG:
                        let busqueda = salida.map((tag, i) => {
                            //console.log('en búsqueda de tags ', tag.Tags);
                        })
                        salidaTags = salidaTags.concat(salida.filter(x => x.Tags.length > 0 && x.Tags.find(a => a.toLowerCase().indexOf(textoSearch.toLowerCase()) != -1)));
                        break;
                }
                //console.log('buscando en todos los tipos ', salidaTitulo, salidaCategoria, salidaUsuario, salidaListaRepro, salidaTags);
            });

            salida = salidaTitulo.concat(salidaCategoria).concat(salidaUsuario).concat(salidaListaRepro).concat(salidaTags);
            setListado(salida);
            setCargaPaginada(true);
        }
        else {

            setCargaPaginada(false);
            const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
                let categories = respuesta.data.results.map((cat, idx) => {
                    return { titulo: cat.titulo, id_cat: cat.id }
                });
                const peticionVisitados = axios.get(`${getBaseAdressApi()}api/vistasporvideo/`).then(response => {
                    let videosvisitados = response.data.map((vid, ind) => {
                        //console.log('respuesta de videos visitados ',response.data);
                        let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                        let relatovideohightlight = vid.relatos_por_video && vid.relatos_por_video.length > 0 ? vid.relatos_por_video : "";
                        let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                            return tag.content
                        });
                        // console.log('los relatos del video son ', relatovideohightlight);
                        //console.log('indice de los tags ', sliceIndex, tagsselected);
                        return { Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: Math.ceil(Math.random() * 5), Visitas: vid.total_visitas, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                    });
                    setListado(videosvisitados)
                    setCargaPaginada(true);
                });
            })
        }

    }
    const estableceTipoBusqueda = (tipo, checado) => {
        let listado = searchBy;
        if (checado) {
            listado.push(tipo);
        }
        else {
            listado = listado.map((el, indice) => {
                return el !== tipo;
            });
        }
        listado.reduce(x => (a, b) => {
            return a != b;
        });
        setSearchBy(listado);
    }
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    const setActionRowVisitado = (elemento) => {

        //console.log('acción de combo ', opcionVideoPor, elemento)
        let accion = ListadoOpcionesVideo.find(x => x.indice == elemento.indice);
        if (accion != undefined) {
            switch (accion.title) {
                case 'Explorar':
                    //console.log('el vinculo a navegar es ', idFilaFavorito);
                    if (idFilaFavorito.vinculo != '') {
                        //console.log('el vinculo a navegar es navegando a vinculo')
                        history.push(idFilaFavorito.vinculo);
                    }
                    break;

                case 'Eliminar':
                    setCargaPaginada(false);
                    const deletefav = axios.delete(`${getBaseAdressApi()}api/addfavoritevideo/`, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                        }, data: {
                            "id_video": parseInt(idFilaFavorito.idvideo)
                        }
                    }).then(response => {

                        const peticionCategorias = axios.get(`${getBaseAdressApi()}api/categorias/`).then(respuesta => {
                            let categories = respuesta.data.results.map((cat, idx) => {
                                return { titulo: cat.titulo, id_cat: cat.id }
                            });
                            const peticionVisitados = axios.get(`${getBaseAdressApi()}api/vistasporvideo/`).then(response => {
                                let videosvisitados = response.data.map((vid, ind) => {
                                    //console.log('respuesta de videos visitados ',response.data);
                                    let sliceIndex = Math.floor(Math.random() * arreglotags.length);
                                    let relatovideohightlight = vid.relatos_por_video && vid.relatos_por_video.length > 0 ? vid.relatos_por_video : "";
                                    let tagsselected = arreglotags.slice(sliceIndex, sliceIndex + 2).map((tag, i) => {
                                        return tag.content
                                    });
                                    // console.log('los relatos del video son ', relatovideohightlight);
                                    //console.log('indice de los tags ', sliceIndex, tagsselected);
                                    return { Categoria: categories.find(x => x.id_cat == vid.id_categoria).titulo, Video: vid.titulo, Id_Categoria: categories.find(x => x.id_cat == vid.id_categoria).id_cat, Id: vid.id, Calificacion: Math.ceil(Math.random() * 5), Visitas: vid.total_visitas, Comentario: [], Tags: tagsselected, Relato: relatovideohightlight }
                                });
                                setListado(videosvisitados)
                                setCargaPaginada(true);
                            });
                        });
                    }).catch(err => {
                        //console.log('error eliminando el video visitado ', err);
                    });
            }
        }
    }
    //console.log('videos listados como visitados ',listado);
    return (
        <>
            <NavBar></NavBar>
            <div className="container-listado-videos">
                <div className="busqueda-videos-listado">
                    <div className="row-busqueda-videos-listado">
                        <label>Búsqueda: </label>
                        <input type="text" value={textoSearch} onChange={(e) => setTextoSearch(e.target.value)}></input><button type="button" onClick={(e) => { estableceBusqueda() }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Título:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.TITULO, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Categoria:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.CATEGORIA, e.target.checked)} type="checkbox"></input>
                    </div>
                    <div className="row-busqueda-videos-listado">
                        <label>Usuario:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.USUARIO, e.target.checked)} type="checkbox"></input>
                    </div>
                    {/* <div className="row-busqueda-videos-listado">
                        <label>:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.LISTAREPRODUCCION, e.target.checked)} type="checkbox"></input>
                    </div> */}
                    <div className="row-busqueda-videos-listado">
                        <label>Tag:</label><input onChange={(e) => estableceTipoBusqueda(tipoBusquedaPagina.TAG, e.target.checked)} type="checkbox"></input>
                    </div>
                </div>
                <div className="header-opciones-listado"><span>Ordenar por: </span>
                    <div className="container-default-combo">
                        <DefaultCombo
                            on={ordenarPor} onChange={estableceOrdenamiento} listado={ListadoOrdenar} />
                    </div>

                </div>
                <div className="listado-default-header-vid">
                    {

                        ListadoOrdenar.map((header, indice) => {
                            let claseHeaderCss = ordenarPor.orden === header.indice ? "item-listado-header-visible" : "item-listado-header-invisible";
                            return (
                                header.title != "Bandera" && header.title != "Publicador" && header.title != "Seleccionar..." ?
                                    <div key={indice}>{header.title} <span className={claseHeaderCss}
                                        onClick={(e) => { estableceDescendienteAscendiente(!ordenamientoDesc, ordenarPor.orden) }}>
                                        <FontAwesomeIcon icon={ordenamientoDesc ? faArrowUp : faArrowDown} /></span></div>
                                    : null)
                        })

                    }
                    <div>Opciones</div>
                </div>

                <div className="listado-default">
                    <div className='default-loader-full' style={cargaPaginada === false ? { display: 'block' } : { display: 'none' }}>  <img src={url_loader("Reload_generic.gif", false)} />
                        <pre className="legend-loading-relatos-miniatures">Cargando listado de videos más visitados...</pre>
                    </div>
                    {
                        listado.map((item, index) => {
                            let vinculo = "/Reproduccion/" + item.Video + "|" + item.Id + "|" + item.Id_Categoria;
                            let autores = item.Relato != '' ? item.Relato.map((rel, idx) => {
                                return rel.id_autor.username
                            }).filter(onlyUnique) : []
                            let claseCssBotonOpciones = opcionesSetVisible == index ? "container-default-combo listado-combo" : "container-default-combo combo-hidden"
                            
                            let autorRelato = item.Relato != "" ? autores.join(', ') : "";
                            //console.log('autores del relato de video ', item.Relato, autores);
                            return (
                                <div className="vid-listado" key={index}>
                                    <div>{item.Video}</div><div>{item.Categoria}</div><div>{item.Calificacion}</div>
                                    <div style={{ textAlign: 'center' }}>{item.Visitas}
                                    </div>

                                    <div className="contenedor-tags-listado"><div className="nowrap-tags-listado">{item.Tags.map((tag, i) => {
                                        return (

                                            <button className="tag-listado-vid" type="button" key={i}>{tag}</button>

                                        )
                                    })}</div></div>
                                    {/* <div>{autorRelato}</div> */}
                                    <div>
                                        <button title="opciones de la lista (doble click para ocultar)"
                                            onClick={(e) => {
                                                setVisibleOpciones(index); setIdFilaFavorito({
                                                    ...idFilaFavorito, vinculo: vinculo,
                                                    idvideo: item.Id
                                                })
                                            }} onDoubleClick={(e) => setVisibleOpciones(-1)}>
                                            <FontAwesomeIcon icon={faBars} /></button>
                                        <div className={claseCssBotonOpciones}>
                                            <DefaultCombo
                                                onChange={setActionRowVisitado}
                                                on={opcionVideoPor} listado={tipoListado !== seleccionaTipoVideo.MAS_VISITADOS ? ListadoOpcionesVideo : ListadoOpcionesVideoVisitados} />
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
export default ListadoVideosMasVisitados;
