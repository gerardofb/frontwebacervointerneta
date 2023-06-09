import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
const DefaultRoutes = ()=>{
return(
        <Switch>
          <Route path='/' exact>
            <ThemeProvider>
              <Home />
            </ThemeProvider>
          </Route>
          <Route path="/Categorias" exact />
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
          <Route path="*">
          <ThemeProvider>
            <Pagina_404></Pagina_404>
            </ThemeProvider>
          </Route>
        </Switch>
)

}