import './App.css';
import {Home} from './features/Home';
import 'video-react/dist/video-react.css';
import IndexPage from './features/Categories/Index';
import { Contents } from "./features/Categories/BaseComponents";
import { Flipper } from "react-flip-toolkit";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";

const FlexContents = styled(Contents)`
  display: flex;
  justify-content: space-between;
`

const StyledLink = styled.a`
  text-decoration: underline;
`

// const history = createBrowserHistory()

// const cachedPush = history.push

// history.push = args => {
//   if (typeof args === "string") {
//     return cachedPush(args)
//   }
//   if (args && args.state && args.state.animate) {
//     args.state.animate().then(() => {
//       delete args.state.animate
//       cachedPush(args)
//     })
//   } else {
//     cachedPush(args)
//   }
// }

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
      <Route path='/' exact>
        <Home />
        </Route>
      { <Route path="/Categorias" exact
      render={({ location, search }) => {
        return (
          <Flipper
            flipKey={`${location.pathname}-${location.search}`}
            decisionData={{
              location,
              search
            }}
          >
            <IndexPage />
          </Flipper>
        )
      }}
    />}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
