import React, { useRef } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import anime from "animejs"
import videos from '../videosCategorized'
import { Contents } from "../BaseComponents"
import VideoBlock from "./VideoBlock"
import SearchBar from '../../SearchBar';
import NavBar from '../../NavBar';
import { HomeFooter } from "../../HomeFooter"

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
  background-image:url('/images/Art/art_tatoo_dragon.png');
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
            <div className="navbar-principal-black" style={{ zIndex:'1', height:'100px', display:'block' }}>
                <NavBar style={{marginRight:'40%'}}></NavBar>
                <SearchBar style={{ width: '60%' }}></SearchBar>
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
                </Background>
            </Flipped>
            <HomeFooter style={{position:'absolute',bottom:'0'}}></HomeFooter>
        </div>
    )
}

export default VideoSetPage
