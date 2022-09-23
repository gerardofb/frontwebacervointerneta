export function getMenuData(user = {}) {
  return sideBarData;
}
function randomBetween10_19(){
  let aleatorio = Math.floor(Math.random()*19);
  if(aleatorio > 11 && aleatorio < 20){
  return ""+aleatorio;
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
        title: "Categorias",
        path: "#",
        icon: "tape",
        subNav: [
          {
            title: "Generación Transparente",
            path: '/Categorias/Generación-Transparente/dummy',
            icon: 'video'
          },
          {
            title: "Arte público",
            path: '/Categorias/Arte-Urbano/dummy',
            icon: 'video'
          },
          {
            title: "Memoria Urbana Popular",
            path: '/Categorias/Memoria-Movimientos-Urbanos-y-Populares/dummy',
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
            path: '/Categorias/Movimientos-Sociales/dummy',
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
            path: '#',
            icon: 'heart'
          },
          {
            title: "Más visitados",
            path: '#',
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
            icon: 'heart'
          },
          {
            title: "Más visitados",
            path: '/Autobiograficos/9e0ff745446e4b528a7ba1fbf0857db9?mostvisited=true',
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
            title: "Favoritos",
            path: '/Eventos/ListadoEventos/Proximos',
            icon: 'heart'
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
        title: "Mi cuenta",
        path: "#",
        icon: "user-check",
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