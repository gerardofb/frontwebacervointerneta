import React, { Component } from "react"
import axios from "axios"
import { withRouter, Link } from 'react-router-dom'
import qs from "qs"
import Parallax from 'react-springy-parallax'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTh,
  faDollarSign,
  faSortAmountDown,
  faSortAmountUp,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons"
import {
  CardGrid,
  Controls,
  Toggle,
  NoResults
} from "./Components"
import Card from "./Card"
import { Contents } from "../BaseComponents"
import { videos } from "../videosCategorized"
import { HomeFooter } from "../../HomeFooter"
import NavBar from "../../NavBar"
import VideoSetPage from '../VideoSetPage'
import { ThemesContext } from "../../../ThemeProvider"
import { getBaseAdressApi } from "../../MainAPI"
import {utilidadMenuSuperior} from "../../utilidadMenuSuperior"
const defaultState = {
  filter: "",
  display: "grid",
  sort: "ascending"
}

const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`
const urlpng = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Art/inverted/${name}.png${wrap ? ')' : ''}`
const urljpg = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.jpg${wrap ? ')' : ''}`

function populate_videos(arreglo) {
  let videosService = {}
  arreglo = arreglo.filter(x => x.length > 0);
  arreglo.forEach(([title, container, pic]) => {
    //console.log('afuera en función de poblamiento de videos ', pic, arreglo)
    const picsArray = pic.reduce((acc, key) => {
      //console.log('en función de poblamiento de videos ', key, container, title)
      const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
      const elvideo = key.contenedor_img ? key.contenedor_img.split('/') : []

      return acc.concat({
        id: `${title.replace(' ', '-')}`,
        name,
        Video: elvideo[elvideo.length - 1],
      })
    }, [])
    // randomize the icons to show on the index page
    const highlightedVideos = picsArray
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
      .slice(0, 1)

    videosService[title] = picsArray.map(
      obj =>
        highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
    )
  })
  return videosService;
}

class IndexPage extends Component {
  sortByVideoCount = (videoKeys, sort) => {
    if (sort === "ascending") {
      return [...videoKeys].sort((a, b) => {
        if (this.state.videosService[a].length < this.state.videosService[b].length) return -1
        else if (this.state.videosService[b].length < this.state.videosService[a].length) return 1
        else return 0
      })
    } else {
      return [...videoKeys].sort((a, b) => {
        if (this.state.videosService[a].length > this.state.videosService[b].length) return -1
        else if (this.state.videosService[b].length > this.state.videosService[a].length) return 1
        else return 0
      })
    }
  }
  static propTypes = {}
  state = {
    videosService: [
    ],
    categoriasService: [],
    consultandominiaturas:false
  }
  componentDidMount() {
    utilidadMenuSuperior();
    const requestone = axios.get(getBaseAdressApi() + 'api/categorias/');
    this.setState({...this.state,consultandominiaturas:true});
    //const requestwo = axios.get('http://localhost:8000/api/videos/');

    axios.all([requestone]).then(axios.spread((...response) => {
      //console.log('respuesta de categorías ', response[0])
      let arreglocats = [];
      response[0].data.results.map((el,i)=>{
         if(el!== undefined){
          arreglocats.push([response[0].data.results[i].titulo, response[0].data.results[i].contenedor_img, response[0].data.results[i].videos_por_categoria])
         }
         else arreglocats.push([]);
         return null;
      })
      // let primeracat = response[0].data.results[0] !== undefined ? [response[0].data.results[0].titulo, response[0].data.results[0].contenedor_img, response[0].data.results[0].videos_por_categoria] : [];
      // let segundacat = response[0].data.results[1] !== undefined ? [response[0].data.results[1].titulo, response[0].data.results[1].contenedor_img, response[0].data.results[1].videos_por_categoria] : [];
      // let terceracat = response[0].data.results[2] !== undefined ? [response[0].data.results[2].titulo, response[0].data.results[2].contenedor_img, response[0].data.results[2].videos_por_categoria] : [];
      // let cuartacat = response[0].data.results[3] !== undefined ? [response[0].data.results[3].titulo, response[0].data.results[3].contenedor_img, response[0].data.results[3].videos_por_categoria] : [];
      // let quintacat = response[0].data.results[4] !== undefined ? [response[0].data.results[4].titulo, response[0].data.results[4].contenedor_img, response[0].data.results[4].videos_por_categoria] : [];
      //let sextacat = response[0].data.results[5] !== undefined ? [response[0].data.results[5].titulo, response[0].data.results[5].contenedor_img, response[0].data.results[5].videos_por_categoria] : []
      let salida = populate_videos(arreglocats);
      this.setState({ ...this.state, videosService: salida })
      this.setState({ ...this.state, categoriasService: response[0].data.results })
      this.setState({...this.state,consultandominiaturas:false});
    }));
  }
  getTitulo = (valor) => {
    let titulo_img = this.state.categoriasService.find(a => a.titulo == valor) !== undefined
      ? this.state.categoriasService.find(a => a.titulo == valor).contenedor_img : "";
    return titulo_img;
  }

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  navigate = set => {
    this.props.history.push({
      pathname: `/Categorias/${set.replace(/\s/g, "-")}/dummy`,
      search: this.props.location.search
    })
  }

  render() {
    //console.log('videos antiguos ', videos);
    //console.log('videos recuperados en listado Categorizado', this.state.videosService)
    const { styles } = this.context;
    const focusedSet = this.props.location.pathname.split(/\//g)[1]

    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }

    const visibleVideoSets = this.sortByVideoCount(
      Object.keys(this.state.videosService),
      queryParamState.sort
    ).filter(set =>
      queryParamState.filter
        ? set.match(new RegExp("^" + queryParamState.filter))
        : true
    )

    return (

      <div className={styles.MainBodyCategory}>
        <div style={{ backgroundColor: "black" }}>

          <div style={{ backgroundColor: 'transparent', display: 'block', height: '100px' }}>
            <NavBar></NavBar>
          </div>
        </div>
        <div className="legend-full-categories" style={this.state.consultandominiaturas === true ? { display: 'block' } : { display: 'none' }}>
          <hr />
          <h4>Los videos reproducidos en nuestro sitio, en cada una de las categorías, son Trailers (avances), <br /> si desea puede&nbsp;<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp;<Link to="/Contacto">ponerse en contacto</Link>&nbsp;<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp; y, previa justificación y acuerdo, le haremos llegar los que elija, en su edición completa y de alta calidad.</h4>
          <hr />
        </div>
        <div className='default-loader-full-categories' style={this.state.consultandominiaturas === true ? { display: 'block' } : { display: 'none' }}>  <img src={url_loader("Reload-transparent.gif", false)}  width="100px" />
        <p className="legend-loading-categories-miniatures">Cargando clasificación de videos...</p>
          </div>
        <div className="contents-index-categories">
          <Contents>
            <Controls>
              <div>
                <Toggle
                  active={queryParamState.sort === "ascending"}
                  onClick={() => this.updateQueryParam({ sort: "ascending" })}
                >
                  <FontAwesomeIcon icon={faDollarSign} />
                  <FontAwesomeIcon icon={faSortAmountUp} />
                </Toggle>
                <Toggle
                  active={queryParamState.sort === "descending"}
                  onClick={() => this.updateQueryParam({ sort: "descending" })}
                >
                  <FontAwesomeIcon icon={faDollarSign} />
                  <FontAwesomeIcon icon={faSortAmountDown} />
                </Toggle>
              </div>
              <div>
                <Toggle
                  active={queryParamState.display === "list"}
                  onClick={() => this.updateQueryParam({ display: "list" })}
                >
                  <FontAwesomeIcon icon={faList} />
                </Toggle>
                <Toggle
                  active={queryParamState.display === "grid"}
                  onClick={() => this.updateQueryParam({ display: "grid" })}
                >
                  <FontAwesomeIcon icon={faTh} />
                </Toggle>
              </div>
            </Controls>
            {visibleVideoSets.length === 0 ? (
              <NoResults>Sin resultados todavía</NoResults>
            ) : (
              <CardGrid
                display={queryParamState.display}
                ref={el => (this.cardGrid = el)}
              >
                {visibleVideoSets.map(set => {
                  let imagen_alterna = this.state.videosService[set].length <= 0 ?
                    this.getTitulo(set) : ''
                  if (set === focusedSet) return <li key={set} />
                  return (
                    <Card
                      key={set}
                      setKey={set}
                      videos={this.state.videosService[set]}
                      videoCount={this.state.videosService[set].length}
                      navigate={this.navigate}
                      imagenAlterna={imagen_alterna}
                    />
                  )
                })}
              </CardGrid>
            )}
          </Contents>
        </div>
        
          <HomeFooter></HomeFooter>
        

      </div>
    )
  }
}
IndexPage.contextType = ThemesContext;
export default withRouter(IndexPage)