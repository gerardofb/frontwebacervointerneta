import './App.css';
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
import ListadoVieosFavoritos from './features/Players/ListadoFavoritosVideos';
import { ThemeProvider } from './ThemeProvider';
import Eventos from './features/Events/Eventos';
import { useEffect } from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faUser,
faEnvelope, faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard , faCheck} from '@fortawesome/free-solid-svg-icons';
import SideBar from './features/Menu/Sidebar'

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
  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      let elementotop = document.querySelector('.navbar-principal');
      if(elementotop !== undefined){setTimeout(function(){elementotop.scrollIntoView({behavior:'smooth'}); console.log('dispare el evento popstate', elementotop);},100)}
      
    });
  },[]);
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
          <Route path="/Categorias/:set/:focusedVideo" children={VideoSetPage}>
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
                <ListadoVieosFavoritos></ListadoVieosFavoritos>
              </ThemeProvider>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
