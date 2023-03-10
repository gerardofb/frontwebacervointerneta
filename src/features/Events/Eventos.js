import React, { useState, useEffect, useRef, createRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import NavBar from '../NavBar';
import { HomeFooter } from "../HomeFooter";
import { Spring, useSpring, animated, config } from "react-spring";
import { Link, useHistory } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { faCalendarDays, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatedComponent } from "react-spring";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import { getBaseAdressApi } from "../MainAPI";
const yearsacervo = [
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
    2036,
    2037,
    2038,
    2039,
    2040,
    2041,
    2042,
    2043,
    2044,
    2045,
    2046,
    2047,
    2048,
    2049,
    2050
]
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
        index: 37, selected: false, title: "Festival ejemplo siete", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 11, 21, 13, 0), duracion: 60, imagen: "/images/Eventos/06_03.png"
    },
    {
        index: 38, selected: false, title: "Festival ejemplo ocho", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 14, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/06_04.jpg"
    },
    {
        index: 39, selected: false, title: "Festival ejemplo nueve", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 16, 14, 0, 0), duracion: 60, imagen: "/images/Eventos/06_05.png"
    },
    {
        index: 40, selected: false, title: "Festival ejemplo diez", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 19, 12, 0, 0), duracion: 60, imagen: "/images/Eventos/06_06.png"
    },
    {
        index: 41, selected: false, title: "Festival ejemplo nueve", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 28, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/06_01.jpg"
    },
    {
        index: 42, selected: false, title: "Festival ejemplo diez", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 5, 30, 23, 0, 0), duracion: 90, imagen: "/images/Eventos/06_02.jpg"
    },
    // JULIO
    {
        index: 43, selected: false, title: "Concierto ejemplo trece", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 10, 20, 13, 0), duracion: 60, imagen: "/images/Eventos/07_01.png"
    },
    {
        index: 44, selected: false, title: "Concierto ejemplo catorce", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 12, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/07_02.png"
    },
    {
        index: 45, selected: false, title: "Concierto ejemplo quince", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 17, 11, 0, 0), duracion: 60, imagen: "/images/Eventos/07_03.png"
    },
    {
        index: 46, selected: false, title: "Concierto ejemplo dieciseis", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 13, 10, 0, 0), duracion: 120, imagen: "/images/Eventos/07_04.png"
    },
    {
        index: 47, selected: false, title: "Concierto ejemplo diecisiete", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 25, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/07_05.jpg"
    },
    {
        index: 48, selected: false, title: "Concierto ejemplo dieciocho", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 6, 29, 21, 0, 0), duracion: 90, imagen: "/images/Eventos/07_06.jpg"
    },
    // AGOSTO
    {
        index: 49, selected: false, title: "Rodeo ejemplo siete", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 7, 10, 22, 13, 0), duracion: 60, imagen: "/images/Eventos/08_01.png"
    },
    {
        index: 50, selected: false, title: "Rodeo ejemplo ocho", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 7, 12, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/08_02.png"
    },
    {
        index: 51, selected: false, title: "Rodeo ejemplo nueve", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 7, 8, 21, 0, 0), duracion: 120, imagen: "/images/Eventos/08_02.jpg"
    },
    {
        index: 52, selected: false, title: "Rodeo ejemplo diez", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 7, 23, 20, 0, 0), duracion: 60, imagen: "/images/Eventos/08_04.png"
    },
    {
        index: 53, selected: false, title: "Rodeo ejemplo once", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 7, 15, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/08_05.png"
    },
    {
        index: 54, selected: false, title: "Rodeo ejemplo doce", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 1, 19, 23, 0, 0), duracion: 90, imagen: "/images/Eventos/08_06.png"
    },

    // SEPTIEMBRE

    {
        index: 1, selected: false, title: "Conferencia ejemplo dos", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 8, 27, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/cultura_urbana.jpg"
    },
    {
        index: 2, selected: false, title: "Conferencia ejemplo tres", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 8, 2, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/mov_contraculturales.jpg"
    },
    {
        index: 36, selected: false, title: "Conferencia ejemplo uno", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 8, 14, 22, 0, 0), duracion: 60, imagen: "/images/Eventos/arte_urbano.jpg"
    },

    // OCTUBRE
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
    },
    // NOVIEMBRE
    {
        index: 55, selected: false, title: "Feria ejemplo siete", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 10, 11, 21, 13, 0), duracion: 60, imagen: "/images/Eventos/11_01.png"
    },
    {
        index: 56, selected: false, title: "Feria ejemplo ocho", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 10, 14, 23, 0, 0), duracion: 60, imagen: "/images/Eventos/11_02.jpg"
    },
    {
        index: 57, selected: false, title: "Feria ejemplo nueve", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 10, 16, 14, 0, 0), duracion: 60, imagen: "/images/Eventos/11_03.png"
    },
    // DICIEMBRE
    {
        index: 58, selected: false, title: "Feria ejemplo diez", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 11, 19, 12, 0, 0), duracion: 60, imagen: "/images/Eventos/12_01.jpg"
    },
    {
        index: 59, selected: false, title: "Feria ejemplo once", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 11, 28, 20, 0, 0), duracion: 120, imagen: "/images/Eventos/12_02.png"
    },
    {
        index: 60, selected: false, title: "Feria ejemplo doce", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at augue at elit mattis gravida. Suspendisse luctus gravida mauris ac eleifend. Aliquam pulvinar ante sed urna tristique semper. Nulla eu purus a massa pulvinar ultricies in id velit. Sed pretium hendrerit justo, at semper risus bibendum eu. Mauris cursus eget tellus a euismod. Donec rutrum iaculis odio et aliquam. Donec quis placerat purus. Vivamus tincidunt quam et sem condimentum viverra. Nunc ultricies mi ornare varius sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc finibus libero vel velit gravida, consectetur lacinia tortor finibus. Sed vehicula faucibus elementum. Pellentesque auctor quam et bibendum facilisis. Vivamus tincidunt sapien in metus feugiat pharetra. Maecenas ex enim, gravida a egestas a, mattis id lacus. Fusce convallis dictum rutrum. Fusce et aliquet enim. Fusce lobortis ligula eget mauris posuere, eget tempus metus finibus. Fusce euismod nibh vel ex vehicula imperdiet. Nulla dapibus metus sed mauris laoreet, nec faucibus dolor mattis. Sed luctus nisl eu facilisis vestibulum. Integer a leo sit amet dolor varius volutpat.",
        fecha: new Date(2022, 11, 30, 23, 0, 0), duracion: 90, imagen: "/images/Eventos/02_03.jpg"
    },
]
function getEventosAcervoTemp() {
    let salida = [];
    for (let i = 0; i < eventosMin.length; i++) {
        if (i % 3 == 0) {
            salida.push(eventosMin[i])
        }
    }
    return salida;
}
function compareFechaAcervoMin(search, eventosacervo) {
    let eventoBuscado = eventosacervo.find(x => x.fecha.getFullYear() == search.getFullYear() && x.fecha.getMonth() == search.getMonth()
        && x.fecha.getDate() == search.getDate());
    return eventoBuscado;
}
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
function fillInDaysMonth(mesinicial, anioinicial) {
    const aniodefecto = new Date(anioinicial, 0, 1).getFullYear();
    const numerodias = getDaysInMonth(aniodefecto, 0);
    const diainicial = new Date(aniodefecto, mesinicial, 1).getDay();
    const diafinal = new Date(aniodefecto, (mesinicial + 1), 0).getDate();
    let salida = [];
    let intermedio = [];
    for (let i = 0; i < diainicial; i++) {
        intermedio.push('');
    }
    for (let i = 1; i <= diafinal; i++) {
        salida.push(i);
    }
    let result = intermedio.concat(salida);
    return result;
}
function devuelveNombreDiaMes(fecha) {
    return new Intl.DateTimeFormat('es-MX', { weekday: 'short' }).format(fecha);
}
function returnHoursDurationEvent(fecha, duracion) {
    let hora = fecha.getHours() + (duracion / 60);
    let minutes = 0;
    if (hora.toString().indexOf('.') !== -1) {
        minutes = 30;
        hora = parseInt(hora.toString())
    }
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hora, minutes, 0);
}
function returnClaseDurationEvent(fecha, duracion) {
    let horainicial = fecha.getHours();
    let hora = fecha.getHours() + (duracion / 60);
    let minutos_inciales = fecha.getMinutes();
    let minutes = 0;
    if (hora.toString().indexOf('.') !== -1) {
        minutes = 30;
        hora = parseInt(hora.toString())
    }
    return ['start-' + ((minutos_inciales == 0) ? horainicial : horainicial + "_5") + "-detail", 'end-' + ((minutes == 0) ? hora : hora + "_5") + "-detail"];
}
function estableceTituloCalendario(mesinicial, anioinicial) {
    let salida = anioinicial.toString();
    switch (mesinicial) {
        case 0:
            salida = "Enero " + salida;
            break;
        case 1:
            salida = "Febrero " + salida;
            break;
        case 2:
            salida = "Marzo " + salida;
            break;
        case 3:
            salida = "Abril " + salida;
            break;
        case 4:
            salida = "Mayo " + salida;
            break;
        case 5:
            salida = "Junio " + salida;
            break;
        case 6:
            salida = "Julio " + salida;
            break;
        case 7:
            salida = "Agosto " + salida;
            break;
        case 8:
            salida = "Septiembre " + salida;
            break;
        case 9:
            salida = "Octubre " + salida;
            break;
        case 10:
            salida = "Noviembre " + salida;
            break;
        case 11:
            salida = "Diciembre " + salida;
            break;
    }
    return salida;
}
let modelCalendarAcervo = {
    "Enero": [],
    "Febrero": [],
    "Marzo": [],
    "Abril": [],
    "Mayo": [],
    "Junio": [],
    "Julio": [],
    "Agosto": [],
    "Septiembre": [],
    "Octubre": [],
    "Noviembre": [],
    "Diciembre": [],
}
var mesesAcervoChosen = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var diasAcervoChosen = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const anioactualacervo = 2034//new Date().getFullYear();
const urlpng = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.png${wrap ? ')' : ''}`
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`

const Eventos = () => {
    const { evento } = useParams();
    const location = useLocation();
    const refFechaIni = useRef();
    const refFechaFin = useRef();
    const backlink = new URLSearchParams(location.search);
    const regresar = backlink.get('previous');
    const patrocinado = backlink.get('acervo');
    const eventoacervo = patrocinado === "true";
    const anioinicial = new Date().getFullYear();
    const [eventosMonth, setEventosMonth] = useState({ cuentaMes: 0, listadoEventosMes: [] });
    const [daysInitial, setDaysInitial] = useState({ mesactual: 1, numerodias: fillInDaysMonth(0, anioinicial), titulo: estableceTituloCalendario(0, anioinicial) });
    const [clasesCalendario, setClasesCalendario] = useState({ titulocalendario: 'Enero 2022' });
    const [reset, setReset] = useState(false);
    const [hoverMoreEvent, setHoverMoreEvent] = useState(false);
    const [diaevento, setDiaEvento] = useState(0);
    const [detalleEvento, setDetalleEvento] = useState(-1);
    const [clasesemana, setClaseSemana] = useState({ indice: '', clasecss: ' activa' });
    const [eventoPatrocinado, setEventoPatrocinado] = useState(eventoacervo);
    const [anioseventos, setAniosEventos] = useState(anioactualacervo);
    const [eventosTemporalesAcervo, setEventosTemporalesAcervo] = useState(getEventosAcervoTemp())
    const [banderaacervo, setBanderaAcervo] = useState(false);
    const [timeCodeTitle, setTimeCodeTitle] = useState(false);
    const history = useHistory();
    const [valueFini, setValueFini] = useState(new Date())
    const [valueFfin, setValueFfin] = useState(new Date())
    const [monthSelectedPublish, setMonthSelectedPublish] = useState({ mes: 0, titulo: '', publish: false, dateInitial: null, dateFinal: null });
    const [fechasMaximasMinimas, setFechasMaximasMinimas] = useState([]);
    const [valoresEventUserForm, setValoresEventUserForm] = useState({ enviando: false, tituloEvento: '', descripcionEvento: '' })
    const [erroresEventUserForm, setErroresEventUserForm] = useState({ mensaje: '' });
    const [cuentaUsuario, setCuentaUsuario] = useState('');
    const [valor, setValor] = useState(null);
    const refArchivoEventoUser = useRef();
    const goToTop = () => {
        try {
            referencia.current ? referencia.current.scrollIntoView({ behavior: 'smooth' }) : referencia.current = createRef();
        }
        catch (ex) {

        }
    }
    const centerYear = () => {
        if (eventoacervo) {
            const elementoanio = document.querySelector('.second-active-year-change');
            elementoanio && elementoanio.scrollIntoView({ behavior: 'smooth' })
            //window.scrollTo({behavior:'smooth', left:elementoanio.offsetLeft+100})
            fillCalendarAcervo(anioseventos);
        }
    }
    useEffect(() => {
        const post_validate = axios.get(`${getBaseAdressApi()}api/userprofile/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
            }
        }).then(response => {
            console.log('respuesta del userprofile ', response);
            setCuentaUsuario(response.data["email"])
        }).catch(err => {
            setCuentaUsuario('')
        });
        console.log("Location changed");
        // const get_eventosmonth = axios.get(`${getBaseAdressApi()}api/eventosuser/1?limit=15&offset=0`).then(response => {
        //     let eventosfirst = response.data.results.map((el, idx) => {
        //         return {
        //             index: el.id, selected: false, title: el.titulo, descripcion: el.descripcion,
        //             fecha: new Date(el.fechainicio), duracion: el.duracion, imagen: el.contenedor_img
        //         }
        //     });
        //     console.log('la respuesta del servicio de eventos por mes es ', response.data, eventosfirst);
        //     setEventosMonth({
        //         ...eventosMonth,
        //         cuentaMes: response.data.count,
        //         listadoEventosMes: eventosfirst
        //     });
        //     let eventoselected = eventosMonth.listadoEventosMes.find(x => x.index == evento)
        //     if (eventoselected) {
        //         setValor(eventoselected)
        //     }
        //     else if (eventosMonth.listadoEventosMes.length > 0) {
        //         setValor(eventosMonth.listadoEventosMes[0]);
        //     }
        // }).catch(err => {

        // })
        goToTop();
        centerYear();

    }, [location]);

    const establecePublicacion = (valor) => {
        setMonthSelectedPublish({
            ...monthSelectedPublish,
            publish: valor,
        });
    }
    const sendEventUserForm = () => {
        let ff = valueFfin;
        let fi = valueFini;
        let diff = ff - fi;
        if (diff < 0) {
            console.log('la fecha de fin es menor a la fecha de inicio');
            setErroresEventUserForm({
                ...erroresEventUserForm,
                mensaje: 'La fecha de finalización no puede ser menor a la fecha de inicio del evento'
            })
            return false;
        }
        else {
            let minutes = Math.ceil(diff / 1000 / 60);
            console.log('la duración de la fecha es ', minutes);
            if (valoresEventUserForm.tituloEvento.trim() == '' || valoresEventUserForm.descripcionEvento.trim() == '') {
                setErroresEventUserForm({
                    ...erroresEventUserForm,
                    mensaje: 'Los campos título y descripción del evento son obligatorios'
                })
                return false;
            }
            const datos = new FormData();
            datos.append("titulo", valoresEventUserForm.tituloEvento);
            datos.append("descripcion", valoresEventUserForm.descripcionEvento);
            datos.append("fechainicio", valueFini.toISOString());
            datos.append("fechafin", valueFfin.toISOString());
            datos.append("duracion", minutes);
            if (refArchivoEventoUser.current.files.length > 0) {
                datos.append("filefield", refArchivoEventoUser.current.files[0]);
            }
            console.log('fechas convertidas en envío de evento ', valueFfin.toISOString(), valueFini.toISOString())
            setValoresEventUserForm({
                ...valoresEventUserForm,
                enviando: true
            });
            const requestPutRelato = axios.put(`${getBaseAdressApi()}api/addeventousuario/`,
                datos, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("credencial")}`,
                },
            }).then(response => {
                setErroresEventUserForm({
                    ...erroresEventUserForm,
                    mensaje: ''
                });
                
                const get_eventosmonth = axios.get(`${getBaseAdressApi()}api/eventosuser/${(monthSelectedPublish.mes)+1}?limit=15&offset=0`).then(response => {
                    let eventosfirst = response.data.results.map((el, idx) => {
                        return {
                            index: el.id, selected: false, title: el.titulo, descripcion: el.descripcion,
                            fecha: new Date(el.fechainicio), duracion: el.duracion, imagen: el.contenedor_img
                        }
                    });
                    console.log('la respuesta del servicio de eventos por mes es ', response.data, eventosfirst);
                    setEventosMonth({
                        ...eventosMonth,
                        cuentaMes: response.data.count,
                        listadoEventosMes: eventosfirst
                    });
                    let eventoselected = eventosMonth.listadoEventosMes.find(x => x.index == evento)
                    if (eventoselected) {
                        setValor(eventoselected)
                    }
                    else if (eventosMonth.listadoEventosMes.length > 0) {
                        setValor(eventosMonth.listadoEventosMes[0]);
                    }
                    setValoresEventUserForm({
                        ...valoresEventUserForm,
                        enviando: false
                    });
                    setMonthSelectedPublish({
                        ...monthSelectedPublish,
                        publish:false,
                    });
                }).catch(err => {
                    setValoresEventUserForm({
                        ...valoresEventUserForm,
                        enviando: false
                    });
                })                
            }).catch(err => {
                console.log('error en el envío del evento ', err);
                if (err.response.status == 404 && err.response.data.detail == undefined) {
                    setErroresEventUserForm({
                        ...erroresEventUserForm,
                        mensaje: 'Existe un evento publicado en la fecha y horario elegido, no es posible publicar el evento'
                    })
                }
                setValoresEventUserForm({
                    ...valoresEventUserForm,
                    enviando: false
                });
                
            })
        }
        console.log('los valores del formulario son ', valoresEventUserForm);
    }
    const onBlurFechaIni = () => {
        refFechaIni.current && setValueFini(refFechaIni.current.props.value);
        console.log('la fecha inicial en blur del evento es ', valueFini, valueFfin, refFechaIni.current);
    }
    const onBlurFechaFin = () => {
        refFechaFin.current && setValueFfin(refFechaFin.current.props.value);
        console.log('la fecha final en blur del evento es ', valueFfin, valueFini);
    }
    const onChangeFechaIni = (value) => {
        if (value && value.getMinutes() > 0 && value.getMinutes() <= 30) {
            value.setMinutes(30);
        }
        else if (value && value.getMinutes() > 30 && value.getMinutes() <= 59) {
            value.setHours(value.getHours() + 1);
        }
        value && value.setSeconds(0);
        setValueFini(value);
        console.log('la fecha inicial del evento es ', valueFini, valueFfin);
    }
    const onChangeFechaFin = (value) => {
        if (value && value.getMinutes() > 0 && value.getMinutes() <= 30) {
            value.setMinutes(30);
        }
        else if (value && value.getMinutes() > 30 && value.getMinutes() <= 59) {
            value.setHours(value.getHours() + 1);
        }
        value && value.setSeconds(0);
        setValueFfin(value);
        console.log('la fecha final del evento es ', valueFfin, valueFini);
    }
    const styles = useSpring({
        from: { width: '0', opacity: .3 },
        to: { width: '100%', opacity: 1 },
        delay: 200,
        reset: reset,
        config: config.slow
    });

    const enfocaSemana = (clasecss) => {
        let elemento = document.querySelector(clasecss);
        elemento.scrollIntoView({ behavior: 'smooth' });
        setClaseSemana({
            indice: clasecss.replace('.', ''),
            activa: ' activa'
        });
    }
    const devuelveClaseSemana = (clasecss) => {
        if (clasecss === clasesemana.indice) {
            return "week" + clasesemana.activa;
        }
        return "week";
    }


    const [eventdetail, setEventDetail] = useState(eventosMonth.listadoEventosMes.find(x => x.fecha.getMonth() == detalleEvento));

    const handleEnter = (indice) => {
        setEventosMonth({
            ...eventosMonth,
            listadoEventosMes:[]
        })
        const get_eventosmonth = axios.get(`${getBaseAdressApi()}api/eventosuser/${(indice + 1)}?limit=15&offset=0`).then(response => {
            let eventosfirst = response.data.results.map((el, idx) => {
                return {
                    index: el.id, selected: false, title: el.titulo, descripcion: el.descripcion,
                    fecha: new Date(el.fechainicio), duracion: el.duracion, imagen: el.contenedor_img
                }
            });
            console.log('la respuesta del servicio de eventos por mes es ', response.data, eventosfirst);
            setEventosMonth({
                ...eventosMonth,
                cuentaMes: response.data.count,
                listadoEventosMes: eventosfirst
            });
            let eventoselected = eventosMonth.listadoEventosMes.find(x => x.index == evento)
            if (eventoselected) {
                setValor(eventoselected)
            }
            else if (eventosMonth.listadoEventosMes.length > 0) {
                setValor(eventosMonth.listadoEventosMes[0]);
            }
        }).catch(err => {

        })
        let clases = [
            { titulocalendario: 'Enero 2022' },
            { titulocalendario: 'Febrero 2022' }
        ]
        let laclase = clases[indice] != undefined ? clases[indice] : { titulocalendario: 'Enero 2022' };
        setClasesCalendario(laclase);
        let numerodefecto = fillInDaysMonth(indice, anioinicial);
        setDaysInitial({ numerodias: numerodefecto, titulo: estableceTituloCalendario(indice, anioinicial) });
        setDiaEvento(0);
        setMonthSelectedPublish({
            ...monthSelectedPublish,
            titulo: estableceTituloCalendario(indice, anioinicial),
            mes: indice
        });
        setValueFfin(null);
        setValueFini(null);
        setValoresEventUserForm({
            ...valoresEventUserForm,
            tituloEvento: '',
            descripcionEvento: '',
            enviando: false
        })
        //estableceFechasMaxMin();
    }

    const estableceDiaEvento = (dia) => {
        setReset(false);
        setDiaEvento(dia);

    }
    const referencia = useRef();
    const referenciaEventAcervo = useRef();
    const diasdetalle = detalleEvento == -1 ? 0 : fillInDaysMonth(detalleEvento, anioinicial);
    const primerasemana = diasdetalle != 0 ? diasdetalle.slice(1, 8) : null;
    const segundasemana = diasdetalle != 0 ? diasdetalle.slice(8, 15) : null;
    const tercerasemana = diasdetalle != 0 ? diasdetalle.slice(15, 22) : null;
    const cuartasemana = diasdetalle != 0 ? diasdetalle.slice(22, 29) : null;
    let quintasemana = diasdetalle != 0 ? diasdetalle.slice(29, 37) : null;
    if (quintasemana && quintasemana.length < 7) {
        for (let i = quintasemana.length; i <= 7; i++) {
            quintasemana.push('');
        }
    }
    const eventosdetallados = detalleEvento != -1 ? eventosMonth.listadoEventosMes.filter(x => x.fecha.getMonth() == detalleEvento) : [];
    const [flip, setFlip] = useState(false);
    const [distance, setDistance] = useState(0);
    const stylesacervo = useSpring({
        from: { x: 0 },
        to: { x: distance },
        reverse: flip
    })

    const [eventoseditor, setEventosEditor] = useState(false);
    const [calendarioAcervoEne, setCalendarioAcervoEne] = useState([]);
    const [calendarioAcervoFeb, setCalendarioAcervoFeb] = useState([]);
    const [calendarioAcervoMar, setCalendarioAcervoMar] = useState([]);
    const [calendarioAcervoAbr, setCalendarioAcervoAbr] = useState([]);
    const [calendarioAcervoMay, setCalendarioAcervoMay] = useState([]);
    const [calendarioAcervoJun, setCalendarioAcervoJun] = useState([]);
    const [calendarioAcervoJul, setCalendarioAcervoJul] = useState([]);
    const [calendarioAcervoAgo, setCalendarioAcervoAgo] = useState([]);
    const [calendarioAcervoSep, setCalendarioAcervoSep] = useState([]);
    const [calendarioAcervoOct, setCalendarioAcervoOct] = useState([]);
    const [calendarioAcervoNov, setCalendarioAcervoNov] = useState([]);
    const [calendarioAcervoDic, setCalendarioAcervoDic] = useState([]);

    const fillCalendarAcervo = (year) => {
        var i;
        for (i = 0; i < 12; i++) {
            renderMonth(i + 1, year);
        }

    }

    function renderMonth(month, year) {
        var first_day = new Date(year + "-" + month),
            last_day = new Date(year + "-" + month);
        last_day.setYear(year);
        last_day.setMonth(month);
        last_day.setDate(0);

        var i, l = last_day.getDate() + 1, d;
        let daysmonth = [];
        let cuentafinessem = 0;
        for (i = 1; i < l; i++) {
            d = new Date(year, month - 1, i);

            daysmonth.push({ day: d.getDay(), fecha: d, numerodia: i });
        }
        switch (month) {
            case 1:

                setCalendarioAcervoEne(daysmonth);

                break;
            case 2:

                setCalendarioAcervoFeb(daysmonth);
                break;
            case 3:
                setCalendarioAcervoMar(daysmonth);
                break;
            case 4:
                setCalendarioAcervoAbr(daysmonth);
                break;
            case 5:
                setCalendarioAcervoMay(daysmonth);
                break;
            case 6:
                setCalendarioAcervoJun(daysmonth);
                break;
            case 7:
                setCalendarioAcervoJul(daysmonth);
                break;
            case 8:
                setCalendarioAcervoAgo(daysmonth);
                break;
            case 9:
                setCalendarioAcervoSep(daysmonth);
                break;
            case 10:
                setCalendarioAcervoOct(daysmonth);
                break;
            case 11:
                setCalendarioAcervoNov(daysmonth);
                break;
            case 12:
                setCalendarioAcervoDic(daysmonth);
                break;
        }

    }
    const estableceAnioAcervo = (anio) => {
        setAniosEventos(anio);
        fillCalendarAcervo(anio);
    }
    const [eventoAcervoChosen, setEventoAcervoChosen] = useState(null);
    const [tickAcervoChosen, setTickAcervoChosen] = useState(null);
    const [tick, setTick] = useState(null);
    const estableceAcervoChosen = (evento) => {
        setEventoAcervoChosen(evento);
        let actual = new Date();
        let faltante = new Date(evento.fecha - actual);
        let oneDay = 24 * 60 * 60 * 1000;
        let oneHour = 60 * 60 * 1000;
        let oneMinute = 60 * 1000;

        let hours = Math.ceil(faltante.getTime() / oneHour);
        let horafaltante = (hours < 10 ? "0" : "") + hours;
        let dias = Math.ceil(faltante.getTime() / oneDay);
        let diasfaltante = (dias < 10 ? "0" : "") + dias;
        let minutes = Math.ceil(faltante.getTime() / oneMinute);
        let minutosfaltante = (minutes < 10 ? "0" : "") + minutes;
        if (actual < evento.fecha) {
            clearInterval(tick)
            setTickAcervoChosen({ dias: diasfaltante, hora: horafaltante, minutos: minutosfaltante });
            let lapso = setInterval(function () {
                setTickAcervoChosen({ dias: diasfaltante, hora: horafaltante, minutos: minutosfaltante });
            }, 1000);
            setTick(lapso);
        } else {
            clearInterval(tick)
            setTickAcervoChosen({ dias: '0', hora: '00', minutos: '00' });
            let lapso = setInterval(function () {
                setTickAcervoChosen({ dias: '0', hora: '00', minutos: '00' });
            }, 1000);
            setTick(lapso);
        }
        console.log('el faltante es ', dias, hours, minutes, evento.fecha)
        goToBottom();
    }
    const goToBottom = () => {
        try {
            console.log('yendo a evento abajo');
            referenciaEventAcervo.current ? referenciaEventAcervo.current.scrollIntoView({ behavior: 'smooth' }) : referenciaEventAcervo.current = createRef();
        }
        catch (ex) {

        }
    }

    console.log('el título del mes a publicar es ', monthSelectedPublish.titulo);
    return (
        detalleEvento == -1 && !eventoacervo ?
            <div>
                <Parallax pages={14} className="eventos-main-container">
                    <ParallaxLayer offset={0} speed={0}>
                        <div style={{ backgroundColor: 'black', height: '100px' }}>
                            <NavBar></NavBar>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={0.16} speed={1}>
                        <div ref={referencia} className="main-content-this-event">
                            {
                                <>
                                    <Link title="Regresar a reproducción" to={`/Reproduccion/${regresar}`} className="vinculo-atras-generico"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                                    <div className="main-eventos-link-acervo-eventos-editor">
                                        <Link title="Ver eventos del editor de la página" onMouseEnter={(e) => setEventosEditor(true)}
                                            onMouseLeave={(e) => setEventosEditor(false)}
                                            to={"/Eventos/" + evento + "?previous=" + regresar + "&acervo=true"}>Quizás prefiera... <span>{
                                                eventoseditor ?
                                                    "ver los eventos del editor del sitio." : null}</span></Link>
                                    </div>
                                    <h1>
                                        {valor && valor.title + " (" + valor.fecha.getFullYear() + "/" +
                                            (valor.fecha.getMonth() + 1) + "/" + valor.fecha.getDate() + " a las " + valor.fecha.getHours() + "  horas)"
                                        }
                                    </h1>
                                    <img src={valor && valor.imagen} />
                                    <p>
                                        {valor && valor.descripcion}
                                    </p>
                                </>

                            }

                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer sticky={{ start: 1, end: 12 }} style={{ maxWidth: '30%', zIndex: 1 }}>
                        <div className="calendario-eventos-principal active">
                            <header>
                                <p>{daysInitial.titulo}</p>
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
                                {cuentaUsuario && <button className="button-publish-event-user" onClick={(e) => establecePublicacion(true)}>Publicar</button>}
                                {
                                    daysInitial.numerodias.map((dia, indice) => {
                                        let clasedia = diaevento === dia ? "day active" : "day";
                                        return (<div className={clasedia} key={indice}>
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
                    {meses && meses.length > 0 ? meses.map((mes, index) => {
                        //let eventosmes = eventosMonth.filter(x => x.fecha.getMonth() == index);
                        let inicial = new Date(anioinicial, index, 1);
                        let final = new Date(anioinicial, index, new Date(anioinicial, index, 0).getDate());
                        return <ParallaxLayer onMouseEnter={(e) => { setReset(true); handleEnter(index); }} onMouseLeave={(e) => setReset(false)}
                            offset={index + 1} key={index} speed={1}>
                            <div className='default-loader-full-eventos' style={valoresEventUserForm.enviando === true ? { display: 'block' } : { display: 'none' }}>  <img src={url_loader("Reload-transparent.gif", false)} />
                            </div>
                            <div className={"mes-evento-main " + cssMeses[index]} id={"mes_event_" + (index + 1)}>

                                <h1 onMouseEnter=
                                    {(e) => setHoverMoreEvent(true)} onMouseLeave={(e) => setHoverMoreEvent(false)}>
                                    {!hoverMoreEvent ? null
                                        : <span onClick={(e) => setDetalleEvento(index)} className="icon-ver-detail-event">ver más...&nbsp;</span>}
                                    <FontAwesomeIcon className="icon-ver-detail-event" icon={!hoverMoreEvent ? faArrowRight : faCalendarDays} />{mes}</h1>

                                <div className="listado-min-eventos">
                                    {!monthSelectedPublish.publish || monthSelectedPublish.mes != index ?
                                        eventosMonth.listadoEventosMes.map((event, idx) => {
                                            let idLink = '/Eventos/' + event.index + "?previous=" + regresar;
                                            return (
                                                <Link to={idLink} style={{ textDecoration: 'none', color: 'gray' }} key={idx}>
                                                    <div className="miniatura-evento" onMouseEnter={(e) => { estableceDiaEvento(parseInt(event.fecha.getDate())) }}>
                                                        {event.imagen !== "" ? <animated.img style={{ ...styles }} src={event.imagen} alt={event.title} /> : null}
                                                        <br />
                                                        <p>{event.title}&nbsp;<br /><strong>({event.fecha.getFullYear() + "/" +
                                                            (event.fecha.getMonth() + 1) + "/" + event.fecha.getDate() + " a las " + event.fecha.getHours() + "  horas"})</strong></p>
                                                    </div>
                                                </Link>

                                            )
                                        })

                                        : monthSelectedPublish.publish && monthSelectedPublish.mes == index ? <>
                                            <div className="full-title-send-evento-user">
                                                <h2>Publicar evento para el mes de {monthSelectedPublish.titulo}:</h2></div>
                                            <div className="errores-form-send-evento-user"
                                                style={erroresEventUserForm.mensaje == '' ? { display: 'none' } : { display: 'block' }}>
                                                {erroresEventUserForm.mensaje}
                                            </div>
                                            <div className="fechas-user-event">
                                                <div onBlur={onBlurFechaIni}><label>Fecha y hora de inicio:</label><DateTimePicker
                                                    minDetail="year"
                                                    ocale="es-ES"
                                                    ref={refFechaIni}
                                                    minDate={inicial}
                                                    maxDate={final}
                                                    format="y-MM-dd HH:mm"
                                                    onChange={onChangeFechaIni} value={valueFini}></DateTimePicker></div>
                                                <div onBlur={onBlurFechaFin}>
                                                    <label>Fecha y hora de finalización:</label><DateTimePicker
                                                        minDetail="year"
                                                        locale="es-ES"
                                                        ref={refFechaFin}
                                                        minDate={inicial}
                                                        maxDate={final}
                                                        format="y-MM-dd HH:mm"
                                                        onChange={onChangeFechaFin} value={valueFfin}></DateTimePicker></div>
                                            </div>
                                            <div className="form-send-evento-user">
                                                <div><label>Título del evento:</label><input type="text" value={valoresEventUserForm.tituloEvento}
                                                    onChange={(e) => setValoresEventUserForm({
                                                        ...valoresEventUserForm,
                                                        tituloEvento: e.target.value
                                                    })}></input></div>
                                                <div><label>Descripción del evento:</label><textarea rows="20" cols="60"
                                                    value={valoresEventUserForm.descripcionEvento} onChange={(e) => setValoresEventUserForm({
                                                        ...valoresEventUserForm,
                                                        descripcionEvento: e.target.value
                                                    })}></textarea></div>
                                                <div><label>Agregar una imagen (opcional):</label><input ref={refArchivoEventoUser} type="file"></input></div>
                                                <div></div>
                                                <div className="buttons-form-send-evento-user">
                                                    <button className="button-publish-event-user" onClick={sendEventUserForm}>Publicar</button>
                                                    <button className="button-publish-event-user cancel" onClick={(e) => establecePublicacion(false)}>Cancelar</button>
                                                </div>
                                            </div>
                                        </> :
                                            null
                                    }
                                </div>
                            </div>
                        </ParallaxLayer>
                    }) : null}
                    <ParallaxLayer offset={13} speed={1}>
                        <div style={{ marginTop: '61vh' }}>
                            <HomeFooter></HomeFooter>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
            : !eventoacervo ?
                <div>
                    <div className="eventos-main-container">
                        <div style={{ backgroundColor: 'black', height: '100px' }}>
                            <NavBar></NavBar>
                        </div>
                        <div ref={referencia} className="main-content-this-event">
                            {
                                <>
                                    <h1>
                                        {valor && (valor.title + " (" + valor.fecha.getFullYear() + "/" +
                                            (valor.fecha.getMonth() + 1) + "/" + valor.fecha.getDate() + " a las " + valor.fecha.getHours() + "  horas)")
                                        }
                                    </h1>
                                    <img src={valor && valor.imagen} />
                                    <p>
                                        {valor && valor.descripcion}
                                    </p>
                                </>
                            }
                        </div>
                        <div><h1 onMouseEnter={(e) => setHoverMoreEvent(true)} onMouseLeave={(e) => setHoverMoreEvent(false)}>
                            {hoverMoreEvent ? <span onClick={(e) => { setDetalleEvento(-1); setClaseSemana({ indice: '', clasecss: ' activa' }) }} style={{ fontSize: '20px', cursor: 'pointer' }}>regresar...&nbsp;</span>
                                : null}
                            <FontAwesomeIcon style={{ fontSize: '30px' }} icon={!hoverMoreEvent ? faArrowLeft : null} />{estableceTituloCalendario(detalleEvento, anioinicial)}</h1></div>
                        <div className="switch-week">
                            <div className={devuelveClaseSemana('primera-semana')} onClick={(e) => { enfocaSemana('.primera-semana') }}>
                                1a. semana
                            </div>
                            <div className={devuelveClaseSemana('segunda-semana')} onClick={(e) => { enfocaSemana('.segunda-semana') }}>
                                2a. semana
                            </div>
                            <div className={devuelveClaseSemana('tercera-semana')} onClick={(e) => { enfocaSemana('.tercera-semana') }}>
                                3a. semana
                            </div>
                            <div className={devuelveClaseSemana('cuarta-semana')} onClick={(e) => { enfocaSemana('.cuarta-semana') }}>
                                4a. semana
                            </div>
                            <div className={devuelveClaseSemana('quinta-semana')} onClick={(e) => { enfocaSemana('.quinta-semana') }}>
                                5a. semana
                            </div>
                        </div>
                        <div className="calendar-detail">
                            <div className="timeline-detail">
                                <div className="spacer-detail"></div>
                                <div className="spacer-detail"></div>
                                <div className="spacer-detail"></div>
                                <div className="spacer-detail"></div>
                                <div className="time-marker-detail">9 AM</div>
                                <div className="time-marker-detail">9:30 AM</div>
                                <div className="time-marker-detail">10 AM</div>
                                <div className="time-marker-detail">10:30 AM</div>
                                <div className="time-marker-detail">11 AM</div>
                                <div className="time-marker-detail">11:30 AM</div>
                                <div className="time-marker-detail">12 PM</div>
                                <div className="time-marker-detail">12:30 PM</div>
                                <div className="time-marker-detail">1 PM</div>
                                <div className="time-marker-detail">1:30 PM</div>
                                <div className="time-marker-detail">2 PM</div>
                                <div className="time-marker-detail">2:30 PM</div>
                                <div className="time-marker-detail">3 PM</div>
                                <div className="time-marker-detail">3:30 PM</div>
                                <div className="time-marker-detail">4 PM</div>
                                <div className="time-marker-detail">4:30 PM</div>
                                <div className="time-marker-detail">5 PM</div>
                                <div className="time-marker-detail">5:30 PM</div>
                                <div className="time-marker-detail">6 PM</div>
                                <div className="time-marker-detail">6:30 PM</div>
                                <div className="time-marker-detail">7 PM</div>
                                <div className="time-marker-detail">7:30 PM</div>
                                <div className="time-marker-detail">8 PM</div>
                                <div className="time-marker-detail">8:30 PM</div>
                                <div className="time-marker-detail">9 PM</div>
                                <div className="time-marker-detail">9:30 PM</div>
                                <div className="time-marker-detail">10 PM</div>
                                <div className="time-marker-detail">10:30 PM</div>
                                <div className="time-marker-detail">11 PM</div>
                                <div className="time-marker-detail">11:30 PM</div>
                                <div className="time-marker-detail">12:00 PM</div>
                                <div className="time-marker-detail">12:30 PM</div>
                            </div>

                            <div className="container-days-detail">

                                <div className="days-detail primera-semana">
                                    {primerasemana.map((detallediaevento, i) => {

                                        let eventodetalle = eventosdetallados.find(x => x.fecha.getDate() == detallediaevento)
                                        let horafinal = eventodetalle != undefined ? returnHoursDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : null;
                                        let clasesCssEvento =
                                            eventodetalle != undefined ? returnClaseDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : ["", ""];
                                        let rutadetalle = '/Eventos/' + (eventodetalle && eventodetalle.index) + "?previous=" + regresar;
                                        return (<div className={"day-detail" + (eventodetalle ? " with_event" : "")} key={'primera-semana' + i}>
                                            <div className="date-detail">
                                                <p className="date-num-detail">{detallediaevento}</p>
                                                <p className="date-day-detail">{detallediaevento !== '' ? devuelveNombreDiaMes(new Date(anioinicial, detalleEvento, detallediaevento)) : detallediaevento}</p>
                                            </div>
                                            {eventodetalle ?
                                                <div className="events-detail">
                                                    {detallediaevento != '' ?
                                                        <div onClick={(e) => { history.push(rutadetalle) }} className={clasesCssEvento[0] + ' ' + clasesCssEvento[1] + " writing-detail"}>
                                                            <p className="title-detail">{eventodetalle && eventodetalle.title}</p>
                                                            <p className="time-detail">{eventodetalle && eventodetalle.fecha.getHours() + ":" +
                                                                (eventodetalle.fecha.getMinutes().toString().length < 2 ? '0' + eventodetalle.fecha.getMinutes() : eventodetalle.fecha.getMinutes())} -
                                                                {horafinal && horafinal.getHours() + ":" + (horafinal.getMinutes().toString().length < 2 ?
                                                                    '0' + horafinal.getMinutes() : horafinal.getMinutes())}
                                                            </p>
                                                        </div> : null
                                                    }
                                                </div>
                                                : <div className="events-detail"></div>
                                            }
                                        </div>
                                        )

                                    })
                                    }
                                </div>
                                <div className="days-detail segunda-semana">
                                    {segundasemana.map((detallediaevento, i) => {
                                        let eventodetalle = eventosdetallados.find(x => x.fecha.getDate() == detallediaevento)
                                        let horafinal = eventodetalle != undefined ? returnHoursDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : null;
                                        let clasesCssEvento =
                                            eventodetalle != undefined ? returnClaseDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : ["", ""];
                                        let rutadetalle = '/Eventos/' + (eventodetalle && eventodetalle.index) + "?previous=" + regresar;
                                        return (<div className={"day-detail" + (eventodetalle ? " with_event" : "")} key={'segunda-semana' + i}>
                                            <div className="date-detail">
                                                <p className="date-num-detail">{detallediaevento}</p>
                                                <p className="date-day-detail">{detallediaevento !== '' ? devuelveNombreDiaMes(new Date(anioinicial, detalleEvento, detallediaevento)) : detallediaevento}</p>
                                            </div>
                                            {eventodetalle ?
                                                <div className="events-detail">
                                                    {detallediaevento != '' ?
                                                        <div onClick={(e) => { history.push(rutadetalle) }} className={clasesCssEvento[0] + ' ' + clasesCssEvento[1] + " writing-detail"}>
                                                            <p className="title-detail">{eventodetalle && eventodetalle.title}</p>
                                                            <p className="time-detail">{eventodetalle && eventodetalle.fecha.getHours() + ":" +
                                                                (eventodetalle.fecha.getMinutes().toString().length < 2 ? '0' + eventodetalle.fecha.getMinutes() : eventodetalle.fecha.getMinutes())} -
                                                                {horafinal && horafinal.getHours() + ":" + (horafinal.getMinutes().toString().length < 2 ?
                                                                    '0' + horafinal.getMinutes() : horafinal.getMinutes())}
                                                            </p>
                                                        </div> : null
                                                    }
                                                </div>
                                                : <div className="events-detail"></div>
                                            }
                                        </div>)


                                    })

                                    }
                                </div>
                                <div className="days-detail tercera-semana">
                                    {tercerasemana.map((detallediaevento, i) => {
                                        let eventodetalle = eventosdetallados.find(x => x.fecha.getDate() == detallediaevento)
                                        let horafinal = eventodetalle != undefined ? returnHoursDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : null;
                                        let clasesCssEvento =
                                            eventodetalle != undefined ? returnClaseDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : ["", ""];
                                        let rutadetalle = '/Eventos/' + (eventodetalle && eventodetalle.index) + "?previous=" + regresar;
                                        return (<div className={"day-detail" + (eventodetalle ? " with_event" : "")} key={'tercera-semana' + i}>
                                            <div className="date-detail">
                                                <p className="date-num-detail">{detallediaevento}</p>
                                                <p className="date-day-detail">{detallediaevento !== '' ? devuelveNombreDiaMes(new Date(anioinicial, detalleEvento, detallediaevento)) : detallediaevento}</p>
                                            </div>
                                            {eventodetalle ?
                                                <div className="events-detail">
                                                    {detallediaevento != '' ?
                                                        <div onClick={(e) => { history.push(rutadetalle) }} className={clasesCssEvento[0] + ' ' + clasesCssEvento[1] + " writing-detail"}>
                                                            <p className="title-detail">{eventodetalle && eventodetalle.title}</p>
                                                            <p className="time-detail">{eventodetalle && eventodetalle.fecha.getHours() + ":" +
                                                                (eventodetalle.fecha.getMinutes().toString().length < 2 ? '0' + eventodetalle.fecha.getMinutes() : eventodetalle.fecha.getMinutes())} -
                                                                {horafinal && horafinal.getHours() + ":" + (horafinal.getMinutes().toString().length < 2 ?
                                                                    '0' + horafinal.getMinutes() : horafinal.getMinutes())}
                                                            </p>
                                                        </div> : null
                                                    }
                                                </div>
                                                : <div className="events-detail"></div>
                                            }
                                        </div>)


                                    })

                                    }
                                </div>
                                <div className="days-detail cuarta-semana">
                                    {cuartasemana.map((detallediaevento, i) => {
                                        let eventodetalle = eventosdetallados.find(x => x.fecha.getDate() == detallediaevento)
                                        let horafinal = eventodetalle != undefined ? returnHoursDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : null;
                                        let clasesCssEvento =
                                            eventodetalle != undefined ? returnClaseDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : ["", ""];
                                        let rutadetalle = '/Eventos/' + (eventodetalle && eventodetalle.index) + "?previous=" + regresar;
                                        return (<div className={"day-detail" + (eventodetalle ? " with_event" : "")} key={'cuarta-semana' + i}>
                                            <div className="date-detail">
                                                <p className="date-num-detail">{detallediaevento}</p>
                                                <p className="date-day-detail">{detallediaevento !== '' ? devuelveNombreDiaMes(new Date(anioinicial, detalleEvento, detallediaevento)) : detallediaevento}</p>
                                            </div>
                                            {eventodetalle ?
                                                <div className="events-detail">
                                                    {detallediaevento != '' ?
                                                        <div onClick={(e) => { history.push(rutadetalle) }} className={clasesCssEvento[0] + ' ' + clasesCssEvento[1] + " writing-detail"}>
                                                            <p className="title-detail">{eventodetalle && eventodetalle.title}</p>
                                                            <p className="time-detail">{eventodetalle && eventodetalle.fecha.getHours() + ":" +
                                                                (eventodetalle.fecha.getMinutes().toString().length < 2 ? '0' + eventodetalle.fecha.getMinutes() : eventodetalle.fecha.getMinutes())} -
                                                                {horafinal && horafinal.getHours() + ":" + (horafinal.getMinutes().toString().length < 2 ?
                                                                    '0' + horafinal.getMinutes() : horafinal.getMinutes())}
                                                            </p>
                                                        </div> : null
                                                    }
                                                </div>
                                                : <div className="events-detail"></div>
                                            }
                                        </div>)


                                    })

                                    }
                                </div>
                                <div className="days-detail quinta-semana">
                                    {quintasemana.map((detallediaevento, i) => {
                                        let eventodetalle = eventosdetallados.find(x => x.fecha.getDate() == detallediaevento)
                                        let horafinal = eventodetalle != undefined ? returnHoursDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : null;
                                        let clasesCssEvento =
                                            eventodetalle != undefined ? returnClaseDurationEvent(eventodetalle.fecha, eventodetalle.duracion) : ["", ""];
                                        let rutadetalle = '/Eventos/' + (eventodetalle && eventodetalle.index) + "?previous=" + regresar;
                                        return (<div className={"day-detail" + (eventodetalle ? " with_event" : "")} key={'quinta-semana' + i}>
                                            <div className="date-detail">
                                                <p className="date-num-detail">{detallediaevento}</p>
                                                <p className="date-day-detail">{detallediaevento !== '' ? devuelveNombreDiaMes(new Date(anioinicial, detalleEvento, detallediaevento)) : detallediaevento}</p>
                                            </div>
                                            {eventodetalle ?
                                                <div className="events-detail">
                                                    {detallediaevento != '' ?
                                                        <div onClick={(e) => { history.push(rutadetalle) }} className={clasesCssEvento[0] + ' ' + clasesCssEvento[1] + " writing-detail"}>
                                                            <p className="title-detail">{eventodetalle && eventodetalle.title}</p>
                                                            <p className="time-detail">{eventodetalle && eventodetalle.fecha.getHours() + ":" +
                                                                (eventodetalle.fecha.getMinutes().toString().length < 2 ? '0' + eventodetalle.fecha.getMinutes() : eventodetalle.fecha.getMinutes())} -
                                                                {horafinal && horafinal.getHours() + ":" + (horafinal.getMinutes().toString().length < 2 ?
                                                                    '0' + horafinal.getMinutes() : horafinal.getMinutes())}
                                                            </p>
                                                        </div> : null
                                                    }
                                                </div>
                                                : <div className="events-detail"></div>
                                            }
                                        </div>)


                                    })

                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <HomeFooter></HomeFooter>
                </div> :
                (<div>
                    <div className="eventos-main-container">
                        <div style={{ backgroundColor: 'black', height: '100px' }}>
                            <NavBar></NavBar>
                        </div>
                        <div className="year-event-acervo-container">
                            <div
                                style={{ marginLeft: 'auto', marginRight: 'auto' }} className="year-container">
                                <animated.div
                                    style={{
                                        width: '280%',
                                        height: '100%',
                                        position: 'relative',
                                        ...stylesacervo
                                    }}>

                                    {
                                        yearsacervo.map((anio, indice) => {
                                            let claseanioacervo = anio == anioseventos ? "year-change active-year-change" : anio == (anioseventos + 1) ? "year-change second-active-year-change" : "year-change";

                                            return (
                                                <div key={indice}
                                                    onClick={(e) => estableceAnioAcervo(anio)}
                                                    className={claseanioacervo} style={{ float: 'left', margin: '25px', padding: '25px', display: 'block', cursor: 'pointer' }}>
                                                    {anio}
                                                </div>
                                            )
                                        })
                                    }
                                </animated.div>
                            </div>
                        </div>
                        <div className="main-content-this-event">
                            <Link title="Regresar a eventos de los usuarios" to={"/Eventos/" + evento + "?previous=" + regresar} className="vinculo-atras-generico"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        </div>
                        <div className="year" data-year={anioseventos}>
                            <ul className="1" data-month="Enero">{
                                calendarioAcervoEne && calendarioAcervoEne.map((dia, indice) => {
                                    let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                    return eventoChosen !== undefined ?
                                        <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Enero_" + indice}></li>
                                        : <li data-day={dia.day} data-date={dia.numerodia} key={"Enero_" + indice}></li>
                                })
                            }</ul>
                            <ul className="2" data-month="Febrero">
                                {
                                    calendarioAcervoFeb && calendarioAcervoFeb.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Febrero_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Febrero_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="3" data-month="Marzo">
                                {
                                    calendarioAcervoMar && calendarioAcervoMar.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Marzo_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Marzo_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="4" data-month="Abril">
                                {
                                    calendarioAcervoAbr && calendarioAcervoAbr.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Abril_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Abril_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="5" data-month="Mayo">
                                {
                                    calendarioAcervoMay && calendarioAcervoMay.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Mayo_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Mayo_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="6" data-month="Junio">
                                {
                                    calendarioAcervoJun && calendarioAcervoJun.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Junio_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Junio_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="7" data-month="Julio">
                                {
                                    calendarioAcervoJul && calendarioAcervoJul.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Julio_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Julio_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="8" data-month="Agosto">{
                                calendarioAcervoAgo && calendarioAcervoAgo.map((dia, indice) => {
                                    let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                    return eventoChosen !== undefined ?
                                        <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Agosto_" + indice}></li>
                                        : <li data-day={dia.day} data-date={dia.numerodia} key={"Agosto_" + indice}></li>
                                })
                            }</ul>
                            <ul className="9" data-month="Septiembre">
                                {
                                    calendarioAcervoSep && calendarioAcervoSep.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Septiembre_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Septiembre_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="10" data-month="Octubre">
                                {
                                    calendarioAcervoOct && calendarioAcervoOct.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Octubre_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Octubre_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="11" data-month="Noviembre">
                                {
                                    calendarioAcervoNov && calendarioAcervoNov.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Noviembre_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Noviembre_" + indice}></li>
                                    })
                                }</ul>
                            <ul className="12" data-month="Diciembre">
                                {
                                    calendarioAcervoDic && calendarioAcervoDic.map((dia, indice) => {
                                        let eventoChosen = compareFechaAcervoMin(dia.fecha, eventosTemporalesAcervo)

                                        return eventoChosen !== undefined ?
                                            <li className="evento-temporal-acervo-search" onClick={(e) => estableceAcervoChosen(eventoChosen)} data-day={dia.day} data-date={dia.numerodia} key={"Diciembre_" + indice}></li>
                                            : <li data-day={dia.day} data-date={dia.numerodia} key={"Diciembre_" + indice}></li>
                                    })
                                }</ul>
                        </div>
                        <div style={{ minHeight: '3em', width: '100%' }}></div>

                        <div className="evento-editor-chosen">

                            {eventoAcervoChosen && tickAcervoChosen &&
                                <><div className="signboard outer" onMouseDown={(e) => setTimeCodeTitle(!timeCodeTitle)} onMouseUp={(e) => setTimeCodeTitle(false)}>
                                    <div className="signboard front inner anim04c">
                                        <ul>
                                            <li className="year-acervo-chosen anim04c">
                                                <span>{eventoAcervoChosen.fecha.getFullYear()}</span>
                                            </li>
                                        </ul>
                                        <ul className="calendarMain anim04c">
                                            <li className="month anim04c">
                                                <span>{mesesAcervoChosen[eventoAcervoChosen.fecha.getMonth()]}</span>
                                            </li>
                                            <li className="date anim04c">
                                                <span>{eventoAcervoChosen.fecha.getDate()}</span>
                                            </li>
                                            <li className="day anim04c">
                                                <span>{diasAcervoChosen[eventoAcervoChosen.fecha.getDay()]}</span>
                                            </li>
                                        </ul>
                                        <li className="clock minute anim04c">
                                            <span>{tickAcervoChosen.hora}</span>
                                        </li>
                                        <li className="calendarNormal date2 anim04c">
                                            <span>horas</span>
                                        </li>
                                    </div>
                                    <div className="signboard left-signboard inner anim04c">
                                        <li className="clock hour anim04c">
                                            <span>{tickAcervoChosen.dias}</span>
                                        </li>
                                        <li className="calendarNormal day2 anim04c">
                                            <span>dias</span>
                                        </li>
                                    </div>
                                    <div className="signboard right-signboard inner anim04c">
                                        <li className="clock second anim04c">
                                            <span>{tickAcervoChosen.minutos}</span>
                                        </li>
                                        <li className="calendarNormal month2 anim04c">
                                            <span>minutos</span>
                                        </li>
                                    </div>
                                </div>
                                </>
                            }
                            {timeCodeTitle ? <div className="timecode-eventoacervo" style={{ backgroundImage: urlpng('clapperboard_timecode', true) }}><span>Faltan (horas, minutos o segundos) para el evento (Time Code)</span></div> : null}
                            <div className="evento-acervo-desc-chosen" ref={referenciaEventAcervo}>
                                <h1>
                                    {eventoAcervoChosen && eventoAcervoChosen.title + " (" + eventoAcervoChosen.fecha.getFullYear() + "/" + (eventoAcervoChosen.fecha.getMonth() + 1) + "/" + eventoAcervoChosen.fecha.getDate() + " a las " + eventoAcervoChosen.fecha.getHours() + "  horas)"}
                                </h1>
                                <img src={eventoAcervoChosen && eventoAcervoChosen.imagen} />
                                <p>
                                    {eventoAcervoChosen && eventoAcervoChosen.descripcion}
                                </p>
                            </div>
                        </div>

                    </div>
                    <HomeFooter></HomeFooter>
                </div>)
    )
}

export default Eventos;