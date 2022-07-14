import React, { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faArrowRight,
    faMicrophone,
    faAlignCenter,
    faVolumeHigh,
    faBook,
    faPlus,
    faSearch
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
import { HomeFooter } from '../HomeFooter';

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

    console.log('datos de video clip ', rect.top, rect.left, rect.bottom, rect.right)

    return rect.bottom > 0;
    // return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
}
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
    { description: "Movimientos Sociales", link:'/Categorias/Movimientos-Sociales/dummy', image:'/images/Art/BiograficosArt/movimientos-sociales.jpg' },
    { description: "Movimientos Contraculturales", link:'/Categorias/Movimientos-Contraculturales/dummy',image:'/images/Art/BiograficosArt/movimientos-contraculturales.jpg' },
    { description: "Movimientos en Defensa del Territorio", link:'/Movimientos-en-Defensa-del-Territorio/dummy',image:'/images/Art/BiograficosArt/defensa-territorio.jpg' },
    { description: "Movimientos Urbanos y Populares", link:'/Categorias/Memoria-Movimientos-Urbanos-y-Populares/dummy',image:'/images/Art/BiograficosArt/movimientos-urbanos.jpg' },
    { description: "Arte Urbano", link:'/Categorias/Arte-Urbano/dummy',image:'/images/Art/BiograficosArt/arte-urbano.jpg' },
    { description: "Pueblos Originarios", link:'Categorias/Pueblos-Originarios-e-Indígenas/dummy',image:'/images/Art/BiograficosArt/pueblos-originarios.jpg' },
    { description: "Generación Transparente", link:'/Categorias/Generación-Transparente/dummy',image:'/images/Art/BiograficosArt/generacion-transparente.jpg' }
]

export const Autobiograficos = () => {
    const { relato } = useParams();
    const actualRelato = relato;
    const location = useLocation();
    const esPodcast = new URLSearchParams(location.search).get('podcast');
    const [categories, setCategories] = useState(categorias);
    const [editing, setEditing] = useState({ podcast: esPodcast, editando: false });
    const [tags, setTags] = useState(arreglotags);
    const [biographies, setBiographies] = useState(autobiograficos);
    const referenciaScroll = useRef();
    const [tagViewed, setTagViewed] = useState(false);
    const [valueSearchTag, setValueSearchTag] = useState('');
    const handleScroll = (e) => {
        const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        console.log('en scroll ', Math.round(e.target.scrollHeight - e.target.scrollTop), e.target.clientHeight);
        if (bottom) {
            console.log("reached bottom", tags.length);
            let items = tags.concat(tags);
            setTags(items);
        }

    }
    const setSearchTag = (valor)=>{
        setValueSearchTag(valor);
    }
    const filterTagsSearch=()=>{
        if(valueSearchTag !== ''){
            let arreglo = tags.filter(x=> x.content.includes(valueSearchTag));
            console.log('encontrados los tagos ',arreglo);
            setTags(arreglo);
        }
    }
    const viewMoreTags = () => {
        let items = tags.concat(tags);
        setTags(items);
    }
    useEffect(() => {
        console.log("Location changed");
        let item = biographies.filter(x => x.guid == actualRelato);
        let rest = biographies.filter(x => x.guid != actualRelato);
        let biografias = item.concat(rest);
        biografias = biografias.map((relato, index)=>{
            relato.image = categorias[Math.floor(Math.random() * categorias.length)].image;
            return relato;
        })
        setBiographies(biografias);
        let nuevostags = arreglotags.map((tag,indice)=>{
            if(tag.popular){
                tag.color = random_color();
            }
            else{
                tag.color= '';
            }
            return tag;
        });
        setTags(tags);
    }, [location]);
    const estableceTags = (parametro) => {
        if (parametro) {
            let arreglo = autobiograficos.filter(x => x.guid == parametro);
            let tagsvalidos = arreglo[0].tags;
            setTags(tagsvalidos);
            setTagViewed(true);
        }
        else {
            setTags(arreglotags);
            setTagViewed(false);
        }
    }
    const filterAutobiografico = (parametro) => {
        let arreglo = autobiograficos.filter(x => x.tags.includes(parametro));
        setBiographies(arreglo);
    }
    const resetAutobiograficos = ()=>{
        let item = autobiograficos.filter(x => x.guid == actualRelato);
        let rest = autobiograficos.filter(x => x.guid != actualRelato);
        let biografias = item.concat(rest);
        setBiographies(biografias);
    }

    return (
        <div>
            <div style={{ backgroundColor: 'black', height: '100px' }}>
                <NavBar></NavBar>
                <SearchBar style={{ width: '60%' }}></SearchBar>
            </div>

            <div className='autobiografico-main-green'>
                <div className='autobiografico-main-category'>
                    {!editing.editando ?
                        <>
                            <div className='autobiografico-main-menu-edit'>
                                <div className='autobiografico-main-menu-header'>
                                    {editing ?
                                        <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                        : <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                                    }</div>
                            </div>
                            <div className='autobiografico-main-list-category' onMouseEnter={(e) => estableceTags(false)}>
                                {
                                    categories && categories.map((cat, index) => {
                                        return <div key={index} className="autobiografico-list-cat-entry">
                                            <Link className='white'  to={cat.link}>{cat.description}</Link>
                                            <Link className='white'  to={cat.link}><img src={cat.image} align='right' /></Link>
                                        </div>
                                    })
                                }
                            </div>
                            <div className='autobiografico-main-list-tags'>
                                <div className='autobiografico-main-list-tags-header'><h3>{tagViewed ? "Tags relacionados: " : "Todos los tags: "}</h3>
                                <div className='form-input'><input type='text' onKeyUp={(e)=>setSearchTag(e.target.value)}></input><span><FontAwesomeIcon icon={faSearch} onClick={(e)=>filterTagsSearch()}></FontAwesomeIcon></span></div></div>
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

                            </div>
                        </>
                    }
                </div>
                <div className='autobiografico-main-list'>
                    <div className='autobiografico-main-menu-entries'>
                        <button className='autobiografico-main-menu-entries-header' onClick={(e=>{resetAutobiograficos()})}>
                            Ver todos
                        </button>
                    </div>
                    {
                        biographies && biographies.map((relato, index) => {
                            return <div className='autobiografico-entry' key={index} onMouseEnter={(e) => estableceTags(relato.guid)}>
                                <p>Creado el {relato.fecha}</p>
                                <div className='autobiografico-entry-header'>
                                    <div className='autobiografico-header-icon'>
                                        {relato.podcast ? <FontAwesomeIcon icon={faVolumeHigh} />
                                            : <FontAwesomeIcon icon={faBook} />}
                                    </div>
                                    <div className='autobiografico-header-autor'>
                                        {relato.autor}
                                    </div>
                                    <div className='autobiografico-header-related'>
                                        Relacionado con: <img src={relato.image} align='right' />
                                    </div>
                                </div>
                                <div className='autobiografico-entry-content'>
                                    {relato.content}
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
            <HomeFooter></HomeFooter>
        </div>
    )
}
