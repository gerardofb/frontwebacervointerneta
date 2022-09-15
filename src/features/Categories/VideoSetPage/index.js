import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import anime from "animejs"
import videos from '../videosCategorized'
import { Contents } from "../BaseComponents"
import VideoBlock from "./VideoBlock"
import StaticNavBar from '../StaticNavbar';
import { HomeFooter } from "../../HomeFooter"
import { ThemesContext } from "../../../ThemeProvider"
import CanvasVideoSet from "../../CanvasVideoSet"

const VideoSetGrid = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, 10.5rem);
  grid-auto-rows: 4.5rem;
  grid-auto-flow: dense;
  grid-gap:5rem;
`

const InverseContainer = styled.div`
`

const Background = styled.div`
  position: relative;
  min-height: 165vh;
  background-position:bottom right;
  background-repeat:no-repeat;
  z-index: 1;
`

const SetContents = styled(Contents)`
  margin-top: 6rem;
  min-height: 80vh;
`

const SetDescription = styled.div`
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  margin-bottom: 3rem;
`

const StyledLink = styled(Link)`
  color: black;
  &:hover {
    text-decoration: underline;
  }
`

const onComplete = el => {
    // prevent scroll weirdness
    el.firstElementChild.style.backgroundColor = '#fff'
    anime({
        targets: [...el.querySelectorAll("[data-fade-in]")],
        opacity: [0, 1],
        translateY: [15, 0],
        delay: (el, i) => i * 70 + 200,
        easing: "easeOutSine",
        duration: 250
    })
}

const onStart = el => {
    ;[...el.querySelectorAll("[data-fade-in]")].forEach(
        el => (el.style.opacity = "0")
    )
}

const onExit = el => {
    return anime({
        targets: [
            ...el.querySelectorAll("[data-fade-in]"),
            ...el.querySelectorAll("[data-icon-nonsample]")
        ],
        opacity: 0,
        easing: "easeOutSine",
        duration: 350,
        delay: anime.stagger(20)
    }).finished
}

function VideoSetPage({
    match: { params: { set, focusedVideo } = {} },
    location
}) {
    return (
        <div>
            <div style={{ zIndex:'1', height:'100px', display:'block' }}>
                <StaticNavBar style={{marginRight:'40%'}}></StaticNavBar>
            </div>
            <Flipped
                flipId={set}
                componentId="setPage"
                onComplete={onComplete}
                onStart={onStart}
            >
                <Background className="video-set-white">
                    <Flipped inverseFlipId={set}>
                        <InverseContainer>
                            <SetContents>
                                <SetDescription className="header-video-block-black">
                                    <div data-fade-in>
                                        <StyledLink
                                            to={{
                                                pathname: "/Categorias",
                                                search: location.search,
                                                //   state: {
                                                //     animate: () => onExit(elementRef.current)
                                                //   }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} /> Atrás
                                        </StyledLink>
                                    </div>
                                    <h1 data-fade-in>
                                        {set[0].toUpperCase() + set.slice(1)}
                                        &nbsp; Videos
                                    </h1>
                                    <p data-fade-in>click para ver video</p>
                                </SetDescription>
                                <VideoSetGrid>
                                    {videos[set] != undefined && videos[set].map(({ name, Video, id }) => {
                                        console.log('iterando en videos ', focusedVideo)
                                        return (
                                            <VideoBlock
                                                Video={Video}
                                                isFocused={name === focusedVideo}
                                                id={id}
                                                name={name}
                                                set={set}
                                                key={id}
                                            />
                                        )
                                    })}
                                </VideoSetGrid>
                            </SetContents>
                        </InverseContainer>
                    </Flipped>
                    <div style={{marginTop:'10em'}}>
                   <CanvasVideoSet>
                    
                   </CanvasVideoSet>
                   <div className="resume-video-set">
                   <h2>Arte Público</h2>
<p>Número de documentos audiovisuales: 26</p>
<p>Esta colección se integra con audiovisuales que captan tanto prácticas populares como de arte urbano, así como disciplinas artísticas escenificadas en el espacio público. Entre ellas se encuentra el arte escénico colectivo del Grupo Barro Rojo(BRAE); los reportajes sobre dos primeras bienales del Cartel en México centradas en el cartel popular;  documentales sobre arte migrante mexicano en la ciudad de San Francisco, California y piezas performances de artistas multimedia, muralismo urbano y prácticas de grafiti en las ciudades de Monterrey, Estado de México y Ciudad de México. Se trata de documentales registrados en la década del noventa e inicio del nuevo siglo. 
A éstos se suman documentales realizados en este siglo sobre las prácticas “creactivas” comunitarias y barriales para la recuperación del espacio público en colonias populares de la Ciudad de México. Y en últimas fechas se encuentran reflexiones compartidas de artistas, colectivos, gestores de arte y cultura comunitaria durante el encierro pandémico (COVID-19) en el año de 2020.</p>

                    </div>
                    </div>
                </Background>
            </Flipped>
            <HomeFooter style={{position:'absolute',bottom:'0'}}></HomeFooter>
        </div>
    )
}

export default VideoSetPage
