import axios from 'axios';
import { getBaseAdressApi } from '../MainAPI';
async function getActualCategories() {
  let arregloCategorias = [];
  await axios.get(getBaseAdressApi() + 'api/categorias/').then(response => {
    //console.log('respuesta previa de api', response)
    const respuestacategorias = response.data.results.map((el, i) => {
      return { title: el.titulo.replace(/\s/g,"-"), path: '/Categorias/' + el.titulo.replace(/\s/g,"-") + "/dummy", icon: 'video' }
    })
    //console.log('respuesta de api ', response.data, respuestacategorias)
    arregloCategorias = respuestacategorias;
  }).catch(err => {
    //console.log('error de api', err)
  });
  //console.log('las categorias recuperadas son adentro ',arregloCategorias)
  return arregloCategorias;
}
export async function getMenuData(user = {}) {
  //console.log('las categorias recuperadas son ',getActualCategories());
  const promesa = getActualCategories();
  await promesa.then(data=>{
    sideBarData[0].subNav[3].subNav= data;
    //console.log('sidebar datos adentro ',sideBarData);
    
  })
  //console.log('sidebar datos afuera',sideBarData);
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
        title:"Quiénes somos",
        path:"/QuienesSomos",
        icon:"square-check"
      },
      {
        title: "Mi cuenta",
        path: "#",
        icon: "user-check",
        subNav: [
          {
            title: "Mi perfil",
              path: '/Perfil',
              icon: 'fa-users',
              sesion_no_iniciada: false 
          },
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
          }]
      },
      {
        title: "Categorias",
        path: "#",
        icon: "tape",
        subNav: [
          {
            title: "La Generación Transparente",
            path: '#',
            icon: 'video'
          },
          {
            title: "Arte Público",
            path: '#',
            icon: 'video'
          },
          {
            title: "Memoria y Movimiento Urbano Popular",
            path: '#',
            icon: 'video'
          },
          {
            title: "Movimientos Contraculturales",
            path: '#',
            icon: 'video'
          },
          {
            title: "Movimientos en Defensa del Territorio",
            path: '#',
            icon: 'video'
          },
          {
            title: "Movimientos Sociales y Políticos",
            path: '#',
            icon: 'video'
          },
          {
            title: "Pueblos Indígenas y Originarios",
            path: '#',
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
            path: '#',
            icon: 'heart',
            sesion_no_iniciada: false
          },
          {
            title: "Más visitados",
            path: '#',
            icon: 'play'
          },
          {
            title: "Reproducción aleatoria",
            path: '#',
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
        title: "Podcasts y Relatos",
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
            path: '#',
            icon: 'check'
          },
          {
            title: "Próximos",
            path: '#',
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
        path: "/Contacto",
        icon: "envelope",
      },
      {
        title: "Aviso de Privacidad",
        path: "/AvisoPivacidad",
        icon: "circle-exclamation",
      },
    ]
  }
];