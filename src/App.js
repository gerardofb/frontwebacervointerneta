import './App.css';
import { Home } from './features/Home';
import { BrowserRouter, Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Pagina_404 from './features/Pagina_404';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faUser,
  faEnvelope, faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard,
  faAddressCard, faCheck, faRightFromBracket, faUpRightAndDownLeftFromCenter, faUsers, faSquareCheck
} from '@fortawesome/free-solid-svg-icons';
import ReactGA from "react-ga4";


library.add(faBook, faHouse, faTape, faForward, faCommentDots, faVolumeHigh, faCalendarDays, faUserCheck, faEnvelope,
  faCircleExclamation, faHeart, faRadio, faTimeline, faPlay, faShuffle, faFilm, faVideo, faClapperboard, faCheck,
  faRightFromBracket, faUpRightAndDownLeftFromCenter, faAddressCard, faUsers, faSquareCheck);
function App() {
  const location = window.location;
  ReactGA.initialize("G-QHDVTJ0KW9");
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path="*">
                <Pagina_404></Pagina_404>
            </Route>
          </Switch>
          </div>
        </BrowserRouter>

    </>
  );
}

export default App;
