import React, { PureComponent } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"
import anime from "animejs"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getBaseAdressApi } from "../../MainAPI"
const StyledTools = styled.div`
display:flex;
alignItems:right;
justifyItems:center;
font-size:small;
width:100%;
margin:0;
`
const StyledParagraph = styled.p`
display:none`
const StyledLink = styled(Link)`
  width:${props => (props.isFocused ? "100%" : "100%")};
  display: block;
  text-decoration:none;
  height: ${props => (props.isFocused ? "100%" : "100%")};
  background-color: ${props => (props.isFocused ? "white" : "transparent")};
  ${StyledParagraph}{
    display: ${props => (props.isFocused ? "flex" : "none")};
    text-align:left;
    font-size:small;
    padding:10px;
    width:100%;
    text-decoration:none;
    background-color: ${props => (props.isFocused ? "white" : "transparent")};
  }
  ${StyledTools}{
    display:${props => (props.isFocused ? "inline-block" : "none")};
  }
`


const VideoGridItem = styled.li`
  grid-column: ${props => (props.isFocused ? "span 2" : "")};
  grid-row: ${props => (props.isFocused ? "span 2" : "")};
  padding: ${props => (props.isFocused ? "0" : "2rem")};
  padding-top: 0;
  margin-left:-5%;
  position:relative;
  z-index:${props => (props.isFocused ? "99999" : "100")};
  img {
    will-change: transform;
    
  }
`

const AnimatedVideoTitle = styled.h3`
  margin-top: 4rem;
  margin-bottom: 2rem;
  animation-delay: 0.25s;
  font-size: 1.01rem;
  font-weight: normal;
`
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}${name}${wrap ? ')' : ''}`;
const urlplay = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/Stills/Categories/${name}.png${wrap ? ')' : ''}`;
const urlsvg = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.svg${wrap ? ')' : ''}`;
const generateRandom = (n) => {
  let random = Math.random() * n;
  return Math.floor(random);
}

class VideoBlock extends PureComponent {
  state = { sampleVideo: true, creditos: {}, datosvideo:{}, calificacionvideo:0 }
  componentDidMount() {

    const requestone = axios.get(`${getBaseAdressApi()}api/creditosvideo/${this.props.identificador}`).then(response => {
      this.setState({
        ...this.state,
        creditos: response.data[0]
      })
    });
    const requesttwo = axios.get(`${getBaseAdressApi()}api/video/${this.props.identificador}`).then(response => {
      //console.log('datos del video en bloque de videos ',response.data)
      this.setState({
        ...this.state,
        datosvideo: response.data
      })
    });
    const requestres = axios.get(`${getBaseAdressApi()}api/calificacionbyvideo/${this.props.identificador}`).then(response=>{
      //console.log('datos del video en calificación, en bloque de videos ',response.data)
      this.setState({
        ...this.state,
        calificacionvideo:response.data[0].total_calificacion !== null ? response.data[0].total_calificacion.toFixed(1): 0
      })
    })
  }
  navigate = set => {
    this.props.history.push({
      pathname: `/Reproduccion`,
    })
  }
  onAppear = (el, i) => {
    anime({
      targets: el,
      delay: 250 + i * 30,
      opacity: [0, 1],
      scale: [0.25, 2],
      duration: 250,
      easing: "easeOutSine"
    })
  }

  render() {
    //console.log('los creditos son ',this.state.creditos)
    //console.log('el id del video y su categoria son ',this.props.identificador,this.props.id_categoria)
    const { Video, isFocused, id, name, set } = this.props
    // console.log('en tarjeta de los videos');
    // console.log(this.props)
    const extraProps = {}
    if (!this.state.sampleVideo) extraProps["data-icon-nonsample"] = true
    const TituloVideo = this.props.titulo
    return (
      <div className="item-video-block-hovered">
      <VideoGridItem key={id} isFocused={isFocused} {...extraProps}>
        {isFocused && (
          <Flipped flipId={`${set}-detail-title`}>
            <AnimatedVideoTitle>
              <b>Video:</b>
              &nbsp;
              {this.props.titulo}
            </AnimatedVideoTitle>
          </Flipped>
        )}
        <StyledLink className="video-block-linkfwd-black"
          to={`/Categorias/${set}/${name}`}
          isFocused={isFocused}
        >
          <Flipped flipId={id} onAppear={this.onAppear}>
            <div style={{ postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={url(Video)} style={{ width: '200px', height: '160px' }}></img>
              <img src={urlplay('PLAY_OVER')} style={{ width: '50px', transform: 'translateX(-250%)' }} />
            </div>
          </Flipped>
          <StyledParagraph className="video-block-paragraph-white">
            {this.state.creditos && this.state.creditos.sinopsis}
            &nbsp;<span className="tooltip-video-block-link">click...</span><Link to={"/Reproduccion/"+TituloVideo+"|"+this.props.identificador+"|"+this.props.id_categoria}><FontAwesomeIcon style={{ fontSize: 'large' }} icon={faArrowRight} /></Link>
          </StyledParagraph>
          <StyledTools className="video-block-tool-white">
            <span style={{ color: 'black' }}>{this.state.calificacionvideo} calificación <img src={urlsvg("thumbs-up-solid")} style={{ width: '6%', color: 'white' }} /></span>
            <span style={{ color: 'black' }}>{this.state.datosvideo.favoritos_por_video && this.state.datosvideo.favoritos_por_video.length
            } favoritos <img src={urlsvg("heart-solid")} style={{ width: '6%', color: 'white' }} /></span>
            <span style={{ color: 'black' }}>{this.state.datosvideo && this.state.datosvideo.total_comentarios
            } comentarios <img src={urlsvg("comments-solid")} style={{ width: '6%', color: 'white' }} /></span>
          </StyledTools>
        </StyledLink>
      </VideoGridItem>
      </div>
    )
  }
}

export default VideoBlock