import React, { useState, useEffect, useRef, createRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import NavBar from '../NavBar';
import { Spring, useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
const cssMeses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const eventosMin = [
    //ENERO
    {
        index: 6, selected: false, title: "Festival ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 11, 22, 0, 0), duracion: 60, imagen: ""
    },
    {
        index: 7, selected: false, title: "Festival ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 13, 13, 0, 0), duracion: 60, imagen: "/images/Eventos/01_02.jpg"
    },
    {
        index: 8, selected: false, title: "Festival ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 11, 13, 0, 0), duracion: 120, imagen: "/images/Eventos/01_03.jpg"
    },
    {
        index: 9, selected: false, title: "Conferencia ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 10, 11, 0, 0), duracion: 60, imagen: "/images/Eventos/01_04.png"
    },
    {
        index: 10, selected: false, title: "Festival ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 9, 13, 0, 0), duracion: 60, imagen: "/images/Eventos/01_05.png"
    },
    {
        index: 11, selected: false, title: "Festival ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 0, 19, 18, 0, 0), duracion: 90, imagen: "/images/Eventos/01_06.jpg"
    },
    // FEBRERO
    {
        index: 12, selected: false, title: "Rodeo ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 10, 22, 13, 0), duracion: 60, imagen: "/images/Eventos/02_01.png"
    },
    {
        index: 13, selected: false, title: "Rodeo ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 12, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/02_02.png"
    },
    {
        index: 14, selected: false, title: "Rodeo ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 8, 21, 0, 0), duracion: 120, imagen: "/images/Eventos/02_03.jpg"
    },
    {
        index: 15, selected: false, title: "Rodeo ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 23, 20, 0, 0), duracion: 60, imagen: "/images/Eventos/02_04.png"
    },
    {
        index: 16, selected: false, title: "Rodeo ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 15, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/02_05.jpg"
    },
    {
        index: 17, selected: false, title: "Rodeo ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 19, 23, 0, 0), duracion: 90, imagen: "/images/Eventos/02_06.png"
    },
    // MARZO
    {
        index: 18, selected: false, title: "Concierto ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 10, 21, 13, 0), duracion: 60, imagen: "/images/Eventos/03_01.png"
    },
    {
        index: 19, selected: false, title: "Concierto ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 12, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/03_02.png"
    },
    {
        index: 20, selected: false, title: "Concierto ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 8, 21, 0, 0), duracion: 60, imagen: "/images/Eventos/03_03.png"
    },
    {
        index: 21, selected: false, title: "Concierto ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 23, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/03_04.png"
    },
    {
        index: 22, selected: false, title: "Concierto ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 15, 12, 0, 0), duracion: 60, imagen: "/images/Eventos/03_05.png"
    },
    {
        index: 23, selected: false, title: "Concierto ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 2, 19, 13, 0, 0), duracion: 90, imagen: "/images/Eventos/03_06.png"
    },
    // ABRIL
    {
        index: 24, selected: false, title: "Concierto ejemplo siete", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 10, 20, 13, 0), duracion: 60, imagen: "/images/Eventos/04_01.jpg"
    },
    {
        index: 25, selected: false, title: "Concierto ejemplo ocho", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 12, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/04_02.png"
    },
    {
        index: 26, selected: false, title: "Concierto ejemplo nueve", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 17, 11, 0, 0), duracion: 60, imagen: "/images/Eventos/04_03.png"
    },
    {
        index: 27, selected: false, title: "Concierto ejemplo diez", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 13, 10, 0, 0), duracion: 120, imagen: "/images/Eventos/04_04.png"
    },
    {
        index: 28, selected: false, title: "Concierto ejemplo once", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 25, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/04_05.png"
    },
    {
        index: 29, selected: false, title: "Concierto ejemplo doce", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 3, 29, 21, 0, 0), duracion: 90, imagen: "/images/Eventos/04_06.png"
    },
    // MAYO
    {
        index: 30, selected: false, title: "Feria ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 11, 21, 13, 0), duracion: 60, imagen: "/images/Eventos/05_01.png"
    },
    {
        index: 31, selected: false, title: "Feria ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 14, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/05_02.jpg"
    },
    {
        index: 32, selected: false, title: "Feria ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 16, 14, 0, 0), duracion: 60, imagen: "/images/Eventos/05_03.png"
    },
    {
        index: 33, selected: false, title: "Feria ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 19, 12, 0, 0), duracion: 60, imagen: "/images/Eventos/05_04.png"
    },
    {
        index: 34, selected: false, title: "Feria ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 28, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/05_05.jpg"
    },
    {
        index: 35, selected: false, title: "Feria ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 4, 30, 23, 0, 0), duracion: 90, imagen: "/images/Eventos/05_06.jpg"
    },
    // JUNIO

    {
        index: 1, selected: false, title: "Conferencia ejemplo dos", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 8, 27, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/cultura_urbana.jpg"
    },
    {
        index: 2, selected: false, title: "Conferencia ejemplo tres", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 8, 2, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/mov_contraculturales.jpg"
    },
    {
        index: 3, selected: false, title: "Conferencia ejemplo cuatro", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 9, 13, 14, 0, 0), duracion: 60, imagen: "/images/Eventos/mov_defensa_territorio.jpg"
    },
    {
        index: 4, selected: false, title: "Conferencia ejemplo cinco", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 9, 12, 14, 0, 0), duracion: 120, imagen: "/images/Eventos/pueblos_originarios.jpg"
    },
    {
        index: 5, selected: false, title: "Conferencia ejemplo seis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 9, 19, 18, 0, 0), duracion: 90, imagen: "/images/Eventos/mov_sociales.jpg"
    }
]
const Eventos = () => {
    const { evento } = useParams();
    const location = useLocation();
    const [reset, setReset] = useState(false);
    const [hoverMoreEvent, setHoverMoreEvent] = useState(false);
    const styles = useSpring({
        from: { width: '0', opacity: 0 },
        to: { width: '100%', opacity: 1 },
        delay: 500,
        reset: reset
    })
    const goToTop = () => {
        referencia.current ? referencia.current.scrollIntoView({ behavior: 'smooth' }) : referencia.current = createRef();
    }
    useEffect(() => {
        console.log("Location changed");
        goToTop();
    }, [location]);
    const valor = eventosMin.find(x => x.index == evento);

    const referencia = useRef();
    return (
        <div>
            <Parallax pages={13} className="eventos-main-container">
                <ParallaxLayer offset={0} speed={0}>
                    <div style={{ backgroundColor: 'black', height: '100px' }}>
                        <NavBar></NavBar>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0.16} speed={1}>
                    <div ref={referencia} className="main-content-this-event">
                        {<>
                            <h1>
                                {valor && valor.title + " (" + valor.fecha.getFullYear() + "/" +
                                    (valor.fecha.getMonth() + 1) + "/" + valor.fecha.getDate() + " a las " + valor.fecha.getHours() + "  horas)"
                                }
                            </h1>
                            <img src={valor.imagen} />
                            <p>
                                {valor && valor.descripcion}
                            </p>
                        </>
                        }
                    </div>
                </ParallaxLayer>
                <ParallaxLayer sticky={{ start: 1, end: 12 }} style={{ maxWidth: '30%', zIndex: 1 }}>
                    <div className="calendario-eventos-principal">
                        <header>
                            <p>Enero 2022</p>
                        </header>
                        <div className="eventos-main-calendar">

                            {
                                dayOfWeek.map((el, index) => {
                                    return (<div className="title-calendar" key={index}><div className="content-title-calendar">
                                        {el}</div></div>)
                                })
                            }

                        </div>
                        <div className="eventos-main-calendar-content">
                            {
                                days.map((dia, indice) => {

                                    return (<div className="day" key={indice}>
                                        <div className="date">
                                            <span className="day">
                                                {dia}
                                            </span>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </ParallaxLayer>
                {
                    meses && meses.length > 0 ? meses.map((mes, index) => {
                        let eventosmes = eventosMin.filter(x => x.fecha.getMonth() == index);
                        eventosmes.map((el,ids)=>{
                            console.log('evento del mes '+mes+" "+el.fecha.getMonth()+" indice "+el.index)
                        })
                        return <ParallaxLayer onMouseEnter={(e) => setReset(true)} onMouseLeave={(e) => setReset(false)}
                            offset={index + 1} key={index} speed={1}>
                            <div className={"mes-evento-main " + cssMeses[index]}>

                                <h1 onMouseEnter=
                                    {(e) => setHoverMoreEvent(true)} onMouseLeave={(e) => setHoverMoreEvent(false)}>
                                    {!hoverMoreEvent? null
                                    : <span style={{fontSize:'50px', cursor:'pointer'}}>ver más...&nbsp;</span>}
                                    <FontAwesomeIcon style={{fontSize:'50px'}} icon={!hoverMoreEvent ? faArrowRight : faCalendar} />{mes}</h1>

                                <div className="listado-min-eventos">
                                    {
                                        eventosmes.map((event, idx) => {
                                            let idLink = '/Eventos/' + event.index;
                                            return (
                                                <Link to={idLink} style={{ textDecoration: 'none', color: 'gray' }} key={idx}>
                                                    <div className="miniatura-evento">
                                                        {event.imagen !== "" ? <animated.img style={{ ...styles }} src={event.imagen} alt={event.title} /> : null}
                                                        <br />
                                                        <p>{event.title}&nbsp;<strong>({event.fecha.getFullYear() + "/" +
                                                            (event.fecha.getMonth() + 1) + "/" + event.fecha.getDate() + " a las " + event.fecha.getHours() + "  horas"})</strong></p>
                                                    </div>
                                                </Link>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </ParallaxLayer>
                    }) : null
                }
            </Parallax>
        </div>
    );
}

export default Eventos;