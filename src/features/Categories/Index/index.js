import React, { Component } from "react"
import axios from "axios"
import { withRouter, Route } from 'react-router-dom'
import qs from "qs"
import Parallax from 'react-springy-parallax'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTh,
  faDollarSign,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons"
import {
  CardGrid,
  Controls,
  Toggle,
  NoResults
} from "./Components"
import Card from "./Card"
import { Contents } from "../BaseComponents"
import {videos} from "../videosCategorized"
import { HomeFooter } from "../../HomeFooter"
import NavBar from "../../NavBar"
import VideoSetPage from '../VideoSetPage'
import { ThemesContext } from "../../../ThemeProvider"
import { getBaseAdressApi } from "../../MainAPI"
const defaultState = {
  filter: "",
  display: "grid",
  sort: "ascending"
}


const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`
const urlpng = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Art/inverted/${name}.png${wrap ? ')' : ''}`
const urljpg = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.jpg${wrap ? ')' : ''}`

function populate_videos(arreglo){
  let videosService ={}
  arreglo = arreglo.filter(x=> x.length > 0);
  arreglo.forEach(([title, container, pic]) => {
    console.log('afuera en función de poblamiento de videos ',pic,arreglo)
    const picsArray = pic.reduce((acc, key) => {
      console.log('en función de poblamiento de videos ',key,container,title)
      const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
      const elvideo = key.contenedor_img ? key.contenedor_img.split('/') : [] 
      
      return acc.concat({
        id: `${title.replace(' ','-')}`,
        name,
        Video: elvideo[elvideo.length-1],
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
  state = {videosService : [
  ]}
  componentDidMount() {
   const requestone= axios.get(getBaseAdressApi()+'api/categorias/');

   //const requestwo = axios.get('http://localhost:8000/api/videos/');
    
    axios.all([requestone]).then(axios.spread((...response) => {
      console.log('respuesta de categorías ',response[0])
      let primeracat = response[0].data[0] !== undefined ? [response[0].data[0].titulo, response[0].data[0].contenedor_img, response[0].data[0].videos_por_categoria] : [];
      let segundacat = response[0].data[1] !== undefined ?[response[0].data[1].titulo, response[0].data[1].contenedor_img, response[0].data[1].videos_por_categoria]: [];
      let terceracat = response[0].data[2] !== undefined ?[response[0].data[2].titulo, response[0].data[2].contenedor_img, response[0].data[2].videos_por_categoria]: [];
      let cuartacat = response[0].data[3] !== undefined ?[response[0].data[3].titulo,  response[0].data[3].contenedor_img, response[0].data[3].videos_por_categoria]: [];
      let quintacat = response[0].data[4] !== undefined ? [response[0].data[4].titulo, response[0].data[4].contenedor_img, response[0].data[4].videos_por_categoria]: [];
      let sextacat = response[0].data[5] !== undefined ?[response[0].data[5].titulo, response[0].data[5].contenedor_img, response[0].data[5].videos_por_categoria] :[]
      let salida = populate_videos([primeracat,segundacat,terceracat,cuartacat,quintacat,sextacat]);
      this.setState({videosService :salida})
      
    }));
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
    console.log('videos antiguos ',videos);
    console.log('videos recuperados en listado Categorizado' ,this.state.videosService)
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
      <Parallax
        className={styles.MainBodyCategory}
        ref={ref => this.parallax = ref}
        pages={2}
        scrolling={true}>
        <div style={{ backgroundColor: "black", paddingBottom: '7%' }}>
          <Parallax.Layer offset={0} speed={0}>
            <div style={{ backgroundColor: 'transparent', display: 'block', height: '100px' }}>
              <NavBar></NavBar>
            </div>
          </Parallax.Layer>
          <Parallax.Layer

            offset={0.1} speed={1} factor={4}
            style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }}
          ></Parallax.Layer>
          <Parallax.Layer offset={0.15} speed={1} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} className={styles.FirstLayerCategory} />
          <Parallax.Layer offset={0.5} speed={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} className={styles.SecondLayerCategory}>
          </Parallax.Layer>
          <Parallax.Layer offset={0.8} speed={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} className={styles.ThirdLayerCategory}>
            <img alt='fondo' src={urlpng('white_art_tatoo_gecko')} style={{ display: 'block', width: '20%', marginLeft: '55%', opacity: '60%' }} />
          </Parallax.Layer>
          <Parallax.Layer offset={0.9} speed={2} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} className={styles.FourthLayerCategory} />
          <Parallax.Layer offset={0.9} speed={1} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} className={styles.FifthLayerCategory}>
            <img alt='fondo' src={urlpng('white_art_tatoo_feather')} style={{ display: 'block', width: '50%', marginLeft: '65%', marginTop: '50%', opacity: '60%' }} />
          </Parallax.Layer>
          <Parallax.Layer offset={0.15} speed={0}>
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
                    if (set === focusedSet) return <li key={set} />
                    return (
                      <Card
                        key={set}
                        setKey={set}
                        videos={this.state.videosService[set]}
                        videoCount={this.state.videosService[set].length}
                        navigate={this.navigate}
                      />
                    )
                  })}
                </CardGrid>
              )}
            </Contents>
          </Parallax.Layer>
        </div>
        <Parallax.Layer offset={1.2} speed={0} style={{ display: 'flex' }}>
          <HomeFooter></HomeFooter>
        </Parallax.Layer>

      </Parallax>
    )
  }
}
IndexPage.contextType = ThemesContext;
export default withRouter(IndexPage)