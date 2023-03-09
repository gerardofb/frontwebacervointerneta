import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';
async function getActualCategories() {
  let arregloCategorias = [];
  await axios.get(getBaseAdressApi() + 'api/categorias/').then(response => {
    console.log('respuesta previa de api', response)
    const respuestacategorias = response.data.results.map((el, i) => {
      return { title: el.titulo.replace(/\s/g,"-"), path: '/Categorias/' + el.titulo.replace(/\s/g,"-") + "/dummy", icon: 'video' }
    })
    console.log('respuesta de api ', response.data, respuestacategorias)
    arregloCategorias = respuestacategorias;
  }).catch(err => {
    console.log('error de api', err)
  });
  console.log('las categorias recuperadas son adentro ',arregloCategorias)
  return arregloCategorias;
}
export async function getMenuData(user = {}) {
  console.log('las categorias recuperadas son ',getActualCategories());
  const promesa = getActualCategories();
  await promesa.then(data=>{
    sideBarData[0].subNav[2].subNav= data;
    console.log('sidebar datos adentro ',sideBarData);
    
  })
  console.log('sidebar datos afuera',sideBarData);
  //sideBarData[0].subNav[2].subNav= 
  return sideBarData;
}
function randomBetween10_19() {
  let aleatorio = Math.floor(Math.random() * 19);
  if (aleatorio > 11 && aleatorio < 20) {
    return "" + aleatorio;
  }
  else return '11';
}
const sideBarData = [
  {
    title: "Menú",
    path: "#",
    iconClosed: "angle-down",
    iconOpened: "angle-up",
    icon: "book",
    subNav: [
      {
        title: "Inicio",
        path: "/",
        icon: "house",
      },
      {
        title: "Mi cuenta",
        path: "#",
        icon: "user-check",
        subNav: [
          {
            title: "Registro",
            path: '/Registro',
            icon: 'address-card'
          },
          {
            title: "Iniciar sesión",
            path: '/Login',
            icon: 'fa-right-from-bracket',
            sesion_no_iniciada: true
          },
          {
            title: "Cerrar sesión",
            path: '/CerrarSesion',
            icon: 'fa-up-right-and-down-left-from-center',
            sesion_no_iniciada: false
          },]
      },
      {
        title: "Categorias",
        path: "#",
        icon: "tape",
        subNav: [
          {
            title: "La Generación Transparente",
            path: '/Categorias/La-Generación-Transparente/dummy',
            icon: 'video'
          },
          {
            title: "Arte Público",
            path: '/Categorias/Arte-Público/dummy',
            icon: 'video'
          },
          {
            title: "Memoria y Movimiento Urbano Popular",
            path: '/Categorias/Memoria-y-Movimiento-Urbano-Popular/dummy',
            icon: 'video'
          },
          {
            title: "Movimientos Contraculturales",
            path: '/Categorias/Movimientos-Contraculturales/dummy',
            icon: 'video'
          },
          {
            title: "Movimientos en Defensa del Territorio",
            path: '/Categorias/Movimientos-en-Defensa-del-Territorio/dummy',
            icon: 'video'
          },
          {
            title: "Movimientos Sociales y Políticos",
            path: '/Categorias/Movimientos-Sociales-y-Políticos/dummy',
            icon: 'video'
          },
          {
            title: "Pueblos Indígenas y Originarios",
            path: '/Categorias/Pueblos-Originarios-e-Indígenas/dummy',
            icon: 'video'
          }
        ]
      },
      {
        title: "Reproducción",
        path: "#",
        icon: "forward",
        subNav: [
          {
            title: "Favoritos",
            path: '/ListadoReproduccion/Favoritos',
            icon: 'heart',
            sesion_no_iniciada: false
          },
          {
            title: "Más visitados",
            path: '/ListadoReproduccionVisitados/MasVisitados',
            icon: 'play'
          },
          {
            title: "Reproducción aleatoria",
            path: '/Reproduccion/Screenshot-',
            icon: 'shuffle'
          },
        ]
      },
      {
        title: "Salas de chat",
        path: "#",
        icon: "comment-dots",
        subNav: [
          {
            title: "Más visitadas",
            path: '#',
            icon: 'timeline'
          },
        ]
      },
      {
        title: "Podcasts",
        path: "#",
        icon: "volume-high",
        subNav: [
          {
            title: "Favoritos",
            path: '#',
            icon: 'heart',
            sesion_no_iniciada: false
          },
          {
            title: "Más visitados",
            path: '#',
            icon: 'radio'
          },
        ]
      },
      {
        title: "Eventos",
        path: "#",
        icon: "calendar-days",
        subNav: [
          {
            title: "Más visitados",
            path: '/Eventos/EventosMasVisitados/MasVisitados',
            icon: 'check'
          },
          {
            title: "Próximos",
            path: '/Eventos/ListadoProximosEventos/Proximos',
            icon: 'timeline'
          },
        ]
      },
      {
        title: "Colaboraciones",
        path: "#",
        icon: "clapperboard",
      },
      {
        title: "Contacto",
        path: "#",
        icon: "envelope",
      },
      {
        title: "Aviso de Privacidad",
        path: "#",
        icon: "circle-exclamation",
      },
    ]
  }
];