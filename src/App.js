import './App.css';
import axios from 'axios';
import { Home } from './features/Home';
import 'video-react/dist/video-react.css';
import IndexPage from './features/Categories/Index';
import { Contents } from "./features/Categories/BaseComponents";
import { Flipper } from "react-flip-toolkit";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
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
import { ThemeProvider } from './ThemeProvider';
import Eventos from './features/Events/Eventos';
import { useEffect } from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faUser,
faEnvelope, faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard , faCheck} from '@fortawesome/free-solid-svg-icons';
import SideBar from './features/Menu/Sidebar'
import { useState } from 'react';
import {getBaseAdressApi} from './features/MainAPI'

library.add(faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faEnvelope,
  faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard, faCheck);
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

function App() {
  const [videosPopulated,setVideosPopulated] = useState(null);
  const[categoriasService,setCategoriasService] = useState([])
  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      let elementotop = document.querySelector('.navbar-principal');
      if(elementotop !== undefined){setTimeout(function(){elementotop.scrollIntoView({behavior:'smooth'}); console.log('dispare el evento popstate', elementotop);},100)}
      
    });
    populate_videos_set();
},[]);
const populate_videos_set = () => {
  const requestone= axios.get(getBaseAdressApi()+'api/categorias/');
  
  // const requestwo = axios.get('http://localhost:8000/api/videos/');
   
  const promise = axios.all([requestone]).then(axios.spread((...response) => {
     //console.log(response[0].data)
     let primeracat = [response[0].data[0].titulo, response[0].data[0].contenedor_img, response[0].data[0].videos_por_categoria];
     let segundacat = [response[0].data[1].titulo, response[0].data[1].contenedor_img,response[0].data[1].videos_por_categoria]
     let terceracat = [response[0].data[2].titulo, response[0].data[2].contenedor_img,response[0].data[2].videos_por_categoria]
     let cuartacat = [response[0].data[3].titulo,  response[0].data[3].contenedor_img,response[0].data[3].videos_por_categoria]
     let quintacat = [response[0].data[4].titulo, response[0].data[4].contenedor_img,response[0].data[4].videos_por_categoria]
     //let sextacat = [response[0].data[5].titulo, response[0].data[5].contenedor_img,response[1].data.filter(x=> x.id_categoria == 7)]
     //console.log('listados de respuesta videos categorizados',primeracat,segundacat,terceracat,cuartacat,quintacat,sextacat)
     let salida = arrange_videos([primeracat,segundacat,terceracat,cuartacat,quintacat]);
     //console.log(salida);
     setVideosPopulated(salida);
   }));
  return;
  }
  function arrange_videos(arreglo) {
    let videosService = {}
    arreglo.forEach(([title, container, pic]) => {
      console.log('foreach para llave en app ',pic)
      const picsArray = pic.reduce((acc, key) => {
        const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
        return acc.concat({
          id: `${title.replace(/\s/g, '-')}`,
          name,
          Video: name,
          titulovideo:pic.titulo
        })
      }, [])
      // randomize the icons to show on the index page
      const highlightedVideos = picsArray
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .slice(0, 1)
      //console.log('en función de poblamiento de videos ',highlightedVideos)
      videosService[title] = picsArray.map(
        obj =>
          highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
      )
    })
    return videosService;
  }
  return (
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
            <VideoSetPage videos={videosPopulated}></VideoSetPage>
          </Route>
          <Route path="/Reproduccion/:video" exact>
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
