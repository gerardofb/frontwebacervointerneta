import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"
import anime from "animejs"
import { BaseGridList } from "../BaseComponents"
import { CardGrid } from "./Components"
import VideoBaseStyles from "../VideoBaseStyles"
import { ThemesContext } from "../../../ThemeProvider"
import axios from 'axios';
import { getBaseAdressApi } from "../../MainAPI"
// using CSS inheritance here to allow the use of PureComponents
// for better performance
const IndexGrid = styled(BaseGridList)`
  width: 100%;
  grid-auto-rows: 5rem;
  ${CardGrid + '[display="grid"]'} & {
    grid-template-columns: 2 repeat(2, 5rem);
    grid-gap: 0rem;
    margin-bottom: 1.5rem;
    video{
      
    }
  }
  ${CardGrid + '[display="list"]'} & {
    grid-template-columns: repeat(2, 10rem);
    grid-gap: 3rem;
    & video{
      display:none;
    }
  }
`

const IndexListItem = styled.li`
  display: flex;
  justify-content: center;
  margin-bottom:1rem;
`

const Card = styled.li`
  height: 100%;
  transition: box-shadow 0.5s;
  overflow: hidden;
  position: relative;
  will-change: transform;
`
const Description = styled.div`
  min-width: 280px;
  text-align: center;
  min-height:115px;
  text-decoration: none !important;
  > *:last-child {
    margin-bottom: 0 !important;
  }
`
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  will-change: transform;
  ${CardGrid + '[display="grid"]'} & {
    flex-direction: column;
    padding: 1.5rem;
    .category-explore-desc-white{
      padding-top:3.5em;
    }
  }
  ${CardGrid + '[display="list"]'} & {
    flex-direction: row;
    padding: 1rem;
  }
`



const ListFlex = styled.div`
  ${CardGrid + '[display="grid"]'} & {
    display: block;
  }
  ${CardGrid + '[display="list"]'} & {
    display: flex;
    > div:first-of-type {
      margin-right: 1rem;
    }
  }
  justify-content: flex-end;
  > * {
    margin-bottom: 0.5rem;
  }
  
`

const CardHeader = styled.h3`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0.5rem;
`

const VideoCount = styled.span`
  display: inline-block;
  font-weight: bold;
`

const Likes = styled.span`
  display: inline-block;
`

class IconSetCard extends PureComponent {
  static propTypes = {
    setKey: PropTypes.string,
    highlightedVideos: PropTypes.array,
    videoCount: PropTypes.number
  }
  // state = {
  //   categoriasService: []
  // }
  // componentDidMount() {
  //   axios.get(getBaseAdressApi() + 'api/categorias/').then(response => {
  //     console.log('respuesta previa de api en card', response)
  //     const respuestacategorias = response.data.results.map((el, i) => {
  //       //el.titulo = el.titulo.replace(/\s/g, '-');
  //       return el;
  //     })
  //     console.log('respuesta de api en card', response.data, respuestacategorias)
  //     this.setState({ ...this.state, categoriasService: respuestacategorias })
      
  //     //this.setState({ ...this.state, titulo_imagen: titulo_img })
  //     //console.log('propiedades de card ', this.props.setKey, respuestacategorias,titulo_img, this.props.videoCount)
  //   }).catch(err => {
  //     console.log('error de api en card', err)
  //   });
  // }
  onStart = (el, { previous: prevLocation, current: currentLocation }) => {
    if (
      prevLocation.location.pathname.match(this.props.setKey) &&
      currentLocation.location.pathname === "/Categorias"
    ) {
      ;[...el.querySelectorAll("[data-fade-in]")].forEach(
        el => (el.style.opacity = "0")
      )
      el.style.zIndex = "5"
    }
  }

  onComplete = (el, { previous: prevLocation, current: currentLocation }) => {
    if (
      currentLocation.location.pathname === "/Categorias" &&
      prevLocation.location.pathname.match(this.props.setKey)
    ) {
      anime({
        targets: el.querySelectorAll("[data-fade-in]"),
        opacity: [0, 1],
        translateY: [15, 0],
        delay: (el, i) => i * 70 + 300,
        easing: "easeOutSine",
        duration: 350
      })
      el.style.zIndex = ""
    }
  }

  onDelayedAppear = (el, index) => {
    anime({
      targets: el,
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: "easeOutSine",
      delay: index * 40,
      duration: 400
    })
  }

  onExit = (el, index, removeElement) => {
    anime({
      targets: el,
      opacity: 0,
      scale: 0.9,
      easing: "easeOutSine",
      duration: 400,
      delay: index * 40,
      complete: removeElement
    })
  }

  navigate = () => {
    this.props.navigate(this.props.setKey)
  }

  shouldFlip = (prev, current) => {
    const sort1 =
      current.location.search.match(/sort=([^&]+)/) &&
      current.location.search.match(/sort=([^&]+)/)[1]
    const sort2 =
      prev.location.search.match(/sort=([^&]+)/) &&
      prev.location.search.match(/sort=([^&]+)/)[1]
    return sort1 === sort2
  }
  
  
  render() {
    const { setKey, videos, videoCount } = this.props;
    const { styles } = this.context;

    return (
      <Flipped
        flipId={setKey}
        stagger
        onStartImmediate={this.onStart}
        onComplete={this.onComplete}
        onDelayedAppear={this.onDelayedAppear}
        onExit={this.onExit}
        shouldInvert={this.shouldFlip}
      >
        <Card className={styles.CategoryCard} onClick={this.navigate}>
          <Flipped inverseFlipId={setKey}>
            <CardContent>
              <IndexGrid>
                {videoCount > 0 ? videos
                  .filter(obj => obj.highlighted)
                  .map(({ Video, name, id }) => {
                    return (
                      <IndexListItem key={id}>
                        <Flipped flipId={id} shouldFlip={this.shouldFlip}>
                          <video style={{ marginRight: '1em' }} width={340} height={254} autoPlay loop type="video/mp4" muted>
                            <source src={name}></source>
                          </video>
                        </Flipped>
                      </IndexListItem>
                    )
                  }) : 
                  <IndexListItem key={setKey}>
                  <Flipped flipId={setKey} shouldFlip={this.shouldFlip}>
                    <video style={{ marginRight: '1em' }} width={340} height={254} autoPlay loop type="video/mp4" muted>
                      <source src={this.props.imagenAlterna}></source>
                    </video>
                  </Flipped>
                </IndexListItem>
                }
              </IndexGrid>
              <Description ref={el => (this.description = el)} className="category-explore-desc-white">
                <Flipped
                  flipId={`${setKey}-title`}
                  translate
                  shouldFlip={this.shouldFlip}
                >
                  <CardHeader data-fade-in>
                    {setKey[0].toUpperCase() + setKey.slice(1)}
                  </CardHeader>
                </Flipped>
                {/* <ListFlex>
                    <div>
                      <Flipped
                        flipId={`${setKey}-count`}
                        translate
                        shouldFlip={this.shouldFlip}
                      >
                        <VideoCount data-fade-in>{VideoCount} videos</VideoCount>
                      </Flipped>
                    </div>
                    <div>
                      <Flipped
                        flipId={`${setKey}-likes`}
                        translate
                        shouldFlip={this.shouldFlip}
                      >
                        <Likes data-fade-in>{VideoCount / 2} likes</Likes>
                      </Flipped>
                    </div>
                  </ListFlex> */}
              </Description>
            </CardContent>
          </Flipped>
        </Card>
      </Flipped>
    )
  }
}
IconSetCard.contextType = ThemesContext;
export default IconSetCard