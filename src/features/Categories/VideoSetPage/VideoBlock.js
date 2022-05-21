import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"
import anime from "animejs"
import VideoBaseStyles from "../VideoBaseStyles"

const StyledParagraph = styled.p`
display:none`
const StyledLink = styled(Link)`
  color: black;
  width:${props => (props.isFocused ? "100%" : "100%")};
  display: block;
  margin:2rem;
  text-decoration:none;
  height: ${props => (props.isFocused ? "100%" : "100%")};
  background: ${props => (props.isFocused ? "white" : "transparent")};
  ${StyledParagraph}{
    display: ${props => (props.isFocused ? "flex" : "none")};
    text-align:left;
    font-size:small;
    padding:10px;
    color:black;
    width:100%;
    text-decoration:none;
    background: ${props => (props.isFocused ? "white" : "transparent")};
  }
`


const VideoGridItem = styled.li`
  grid-column: ${props => (props.isFocused ? "span 2" : "")};
  grid-row: ${props => (props.isFocused ? "span 2" : "")};
  padding: ${props => (props.isFocused ? "0" : "2rem")};
  padding-top: 0;
  margin-left:-5%;
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


class VideoBlock extends PureComponent {
    state = { sampleVideo: true }
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
        const { Video, isFocused, id, name, set } = this.props
        const extraProps = {}
        if (!this.state.sampleVideo) extraProps["data-icon-nonsample"] = true
        return (
            <VideoGridItem key={id} isFocused={isFocused} {...extraProps}>
                {isFocused && (
                    <Flipped flipId={`${set}-detail-title`}>
                        <AnimatedVideoTitle>
                            <b>Video:</b>
                            &nbsp;
                            {name}
                        </AnimatedVideoTitle>
                    </Flipped>
                )}
                <StyledLink
                    to={`/Categorias/${set}/${ name}`}
                    isFocused={isFocused}
                >
                    <Flipped flipId={id} onAppear={this.onAppear}>
                        <div style={{ postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={url(Video)} style={{ width: '200px', height:'160px' }}></img>
                            <img src={urlplay('PLAY_OVER')} style={{width:'50px', transform:'translateX(-250%)'}} />
                        </div>
                    </Flipped>
                    <StyledParagraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut felis lorem, dapibus sed sapien eget, placerat fermentum nisl. Fusce at erat justo. Duis facilisis aliquam sodales. Integer tristique arcu et enim congue dictum. Duis volutpat quam lorem, sit amet lobortis sapien posuere nec. Duis non vulputate mi, ut dignissim nibh. Sed scelerisque efficitur nunc, nec sagittis mauris ultrices non. Nam molestie facilisis tempus. Pellentesque ac aliquet magna. Vestibulum sed dapibus orci. Sed suscipit ipsum at sapien volutpat egestas.
                    </StyledParagraph>
                </StyledLink>
            </VideoGridItem>
        )
    }
}

export default VideoBlock