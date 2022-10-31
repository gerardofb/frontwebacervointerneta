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
            icon: 'heart'
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
            icon: 'heart'
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
            title: "Favoritos",
            path: '/Eventos/ListadoEventos/Favoritos',
            icon: 'heart'
          },
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