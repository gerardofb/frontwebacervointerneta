import './App.css';
import axios from 'axios';
import { Home } from './features/Home';
import 'video-react/dist/video-react.css';
import IndexPage from './features/Categories/Index';
import { Contents } from "./features/Categories/BaseComponents";
import { Flipper } from "react-flip-toolkit";
import { Route, Link, BrowserRouter, Switch, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import VideoSetPage from './features/Categories/VideoSetPage';
import { AutoComments } from './features/Players/Reproduccion';
import { Autobiograficos } from './features/Biography/Autobiograficos';
import ListadoEventos from './features/Events/ListadoEventos';
import ListadoEventosProximos from './features/Events/ListadoEventosProximos';
import EventosMasVisitados from './features/Events/EventosMasVisitados';
import ListadoVideosFavoritos from './features/Players/ListadoFavoritosVideos';
import ListadoVideosMasVisitados from './features/Players/ListadoVideosMasVisitados';
import ListadoRelatosFavoritos from './features/Biography/ListadoFavoritosRelatos';
import ListadoMasVisitadosRelatos from './features/Biography/ListadoMasVisitadosRelatos';
import ValidarRegistro from './features/Account/ValidarRegistro';
import { BusquedaEstandar } from './features/BusquedaEstandar';
import { ThemeProvider } from './ThemeProvider';
import Eventos from './features/Events/Eventos';
import Register from './features/Account/Register';
import Login from './features/Account/Login';
import Pagina_404 from './features/Pagina_404';
import Logout from './features/Account/Logout';
import FormaContacto from './features/FormaContacto';
import AvisoPrivacidad from './features/AvisoPrivacidadj';
import Perfil from './features/Account/Perfil';
import QuienesSomos from './features/QuienesSomos';
import { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faUser,
  faEnvelope, faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard,
  faAddressCard, faCheck, faRightFromBracket, faUpRightAndDownLeftFromCenter, faUsers, faSquareCheck
} from '@fortawesome/free-solid-svg-icons';
import SideBar from './features/Menu/Sidebar'
import { useState } from 'react';
import { getBaseAdressApi } from './features/MainAPI'
import ReactGA from "react-ga4";
import HelmetMetaData from './features/HelmetMetaData';
import { isMobile } from 'react-device-detect';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


library.add(faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faEnvelope,
  faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard, faCheck,
  faRightFromBracket, faUpRightAndDownLeftFromCenter, faAddressCard, faUsers, faSquareCheck);
const FlexContents = styled(Contents)`
  display: flex;
  justify-content: space-between;
`

const StyledLink = styled.a`
  text-decoration: underline;
`

const history = createBrowserHistory()

const cachedPush = history.push

history.push = args => {
  if (typeof args === "string") {
    return cachedPush(args)
  }
  if (args && args.state && args.state.animate) {
    args.state.animate().then(() => {
      delete args.state.animate
      cachedPush(args)
    })
  } else {
    cachedPush(args)
  }
}
const BANDERA_MOVILES = { bandera: true, redireccion: "https://api.acervo-audiovisual-interneta.org" };
// falso = mayor que tableta, verdadero = menor o igual que tableta;
function App() {
  const location = window.location;
  // SE VERIFICA REDIRECCIÒN A SITIO MÒVIL, EN CASO DE SER MENOR O IGUAL A TABLETA EL RESTO DEL CÓDIGO NO CORRERÁ
  if (isMobile === BANDERA_MOVILES.bandera &&
    window.matchMedia("(any-pointer:coarse)").matches === BANDERA_MOVILES.bandera
    && window.matchMedia("only screen and (max-width: 480px)").matches === BANDERA_MOVILES.bandera) {
    window.location = BANDERA_MOVILES.redireccion
  }
  const [videosPopulated, setVideosPopulated] = useState(null);
  const [categoriasService, setCategoriasService] = useState([]);
  ReactGA.initialize("G-QHDVTJ0KW9");
  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      let elementotop = document.querySelector('.navbar-principal');
      if (elementotop !== undefined) {
        setTimeout(function () {
          elementotop.scrollIntoView({ behavior: 'smooth' }); //console.log('dispare el evento popstate', elementotop);
        }, 100)
      }

    });
    populate_videos_set();
  }, [videosPopulated]);
  const populate_videos_set = () => {
    if (videosPopulated == null) {
      const requestone = axios.get(getBaseAdressApi() + 'api/categorias/');
      const promise = axios.all([requestone]).then(axios.spread((...response) => {
        let arreglocats = [];
        response[0].data.results.map((el, i) => {
          if (el !== undefined) {
            arreglocats.push([response[0].data.results[i].titulo, response[0].data.results[i].contenedor_img, response[0].data.results[i].videos_por_categoria])
          }
          else arreglocats.push([]);
          return null;
        })
        let salida = arrange_videos(arreglocats);

        setVideosPopulated(salida);

      }));
    }
    return;
  }
  function arrange_videos(arreglo) {
    arreglo = arreglo.filter(x => x.length > 0);
    //console.log('para iterar en app ',arreglo);
    let videosService = {}
    arreglo.forEach(([title, container, pic]) => {
      //console.log('foreach para llave en app ',pic, arreglo)
      const picsArray = pic.reduce((acc, key) => {
        const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
        return acc.concat({
          id: `${title.replace(/\s/g, '-')}`,
          name,
          Video: name,
          titulovideo: pic.titulo
        })
      }, [])
      // randomize the icons to show on the index page
      const highlightedVideos = picsArray
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .slice(0, 1)
      //console.log('en función de poblamiento de videos ',highlightedVideos)
      videosService[title.replace(/\s/g, '-')] = picsArray.map(
        obj =>
          highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
      )
    })
    return videosService;
  }
  //console.log('los videos categorizados en app ',videosPopulated);
  return (
    <>
      <HelmetMetaData
        image="https://api.acervo-audiovisual-interneta.org/static/img/logo_nuevo_negro.png"
        title="Acervo Audiovisual Interneta | Memoria de las y los invisibles |"
        description='Clip introductorio del acervo. Durante tres décadas, el colectivo de videastas estructuramos el Acervo Audiovisual InterNeta. Genera un espacio online y offline, para retroalimentar las creaciones producidas, en comunidades urbanas, indígenas, y movimientos contraculturales.'
        keywords={[
          "Arte Urbano",
          "Generación Trasparente",
          "Memoria y Movimiento Urbano Popular",
          "Movimientos Sociales y Políticos",
          "Movimientos Contraculturales",
          "Pueblos Originarios e Indígenas",
          "Movimientos en Defensa del Territorio"
        ]}></HelmetMetaData>
      <BrowserRouter>
        <div className="App">
          <div className='container-menu-main'>
            <SideBar></SideBar>
          </div>
          <Switch>
            <Route path='/' exact>
              <ThemeProvider>
                <Home />
              </ThemeProvider>
            </Route>
            {<Route path="/Categorias" exact
              render={({ location, search }) => {
                return (
                  <ThemeProvider>
                    <Flipper
                      flipKey={`${location.pathname}-${location.search}`}
                      decisionData={{
                        location,
                        search
                      }}
                    >
                      <IndexPage />
                    </Flipper>
                  </ThemeProvider>
                )
              }}
            />}
            <Route path="/Categorias/:set/:focusedVideo">
              <ThemeProvider>
                <VideoSetPage videos={videosPopulated}></VideoSetPage>
              </ThemeProvider>
            </Route>
            <Route path="/Reproduccion/:video/" exact>
              <ThemeProvider>
                <AutoComments></AutoComments>
              </ThemeProvider>
            </Route>
            <Route path='/Autobiograficos/:relato' exact>
              <ThemeProvider>
                <Autobiograficos></Autobiograficos>
              </ThemeProvider>
            </Route>
            <Route path="/Eventos/:evento" exact>
              <ThemeProvider>
                <Eventos></Eventos>
              </ThemeProvider>
            </Route>
            <Route path="/Eventos/ListadoEventos/:tipo" exact>
              <ThemeProvider>
                <ListadoEventos></ListadoEventos>
              </ThemeProvider>
            </Route>
            <Route path="/Eventos/ListadoProximosEventos/:tipo" exact>
              <ThemeProvider>
                <ListadoEventosProximos></ListadoEventosProximos>
              </ThemeProvider>
            </Route>
            <Route path="/Eventos/EventosMasVisitados/:tipo" exact>
              <ThemeProvider>
                <EventosMasVisitados></EventosMasVisitados>
              </ThemeProvider>
            </Route>
            <Route path="/ListadoReproduccion/:tipo" exact>
              <ThemeProvider>
                <ListadoVideosFavoritos></ListadoVideosFavoritos>
              </ThemeProvider>
            </Route>
            <Route path="/ListadoReproduccionVisitados/:tipo" exact>
              <ThemeProvider>
                <ListadoVideosMasVisitados></ListadoVideosMasVisitados>
              </ThemeProvider>
            </Route>
            <Route path="/ListadoRelatosFavoritos/:tipo" exact>
              <ThemeProvider>
                <ListadoRelatosFavoritos></ListadoRelatosFavoritos>
              </ThemeProvider>
            </Route>
            <Route path="/ListadoRelatosMasVisitados/:tipo" exact>
              <ThemeProvider>
                <ListadoMasVisitadosRelatos></ListadoMasVisitadosRelatos>
              </ThemeProvider>
            </Route>
            <Route path="/BusquedaEstandar">
              <ThemeProvider>
                <BusquedaEstandar></BusquedaEstandar>
              </ThemeProvider>
            </Route>
            <Route path="/Registro" exact>
              <ThemeProvider>
                <Register></Register>
              </ThemeProvider>
            </Route>
            <Route path="/Login" exact>
              <ThemeProvider>
                <Login></Login>
              </ThemeProvider>
            </Route>
            <Route path="/CerrarSesion">
              <ThemeProvider>
                <Logout></Logout>
              </ThemeProvider>
            </Route>
            <Route path="/Contacto">
              <ThemeProvider>
                <FormaContacto></FormaContacto>
              </ThemeProvider>
            </Route>
            <Route path="/VerificaRegistro">
              <ThemeProvider>
                <ValidarRegistro></ValidarRegistro>
              </ThemeProvider>
            </Route>
            <Route path="/AvisoPivacidad">
              <ThemeProvider>
                <AvisoPrivacidad></AvisoPrivacidad>
              </ThemeProvider>
            </Route>
            <Route path="/Perfil">
              <ThemeProvider>
                <Perfil></Perfil>
              </ThemeProvider>
            </Route>
            <Route path="/QuienesSomos">
              <ThemeProvider>
                <QuienesSomos></QuienesSomos>
              </ThemeProvider>
            </Route>
            <Route path="/sitemap.xml" exact>
              <Redirect to="/"></Redirect>
            </Route>
            <Route path="*">
              <ThemeProvider>
                <Pagina_404></Pagina_404>
              </ThemeProvider>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
