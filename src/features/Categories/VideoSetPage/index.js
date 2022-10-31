import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Flipped } from "react-flip-toolkit"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import anime from "animejs"
import { Contents } from "../BaseComponents"
import VideoBlock from "./VideoBlock"
import StaticNavBar from '../StaticNavbar';
import { HomeFooter } from "../../HomeFooter"
import { ThemesContext } from "../../../ThemeProvider"
import { useParams, useLocation } from "react-router-dom"
import CanvasVideoSet from "../../CanvasVideoSet"
import { videos } from "../videosCategorized"

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
const ruta_aws = "https://deploy-videos-acervo-interneta.s3.amazonaws.com/"
const VideoSetPage = (
    props) => {
    const { set, focusedVideo } = useParams();
    //console.log('el primer estado del video enfocado es ');
    console.log('el titulo del bloque de videos es ',set);
    //console.log(focusedVideo)
    const location = useLocation();
    const [videosPopulated, setVideosPopulated] = useState(null);
    const [categoriaSet, setCategoriaSet] = useState({})
    useEffect(() => {
        populate_videos_set();
    }, []);
    const populate_videos_set = () => {
        const requestone = axios.get('http://localhost:8000/api/categorias/');

        const requestwo = axios.get('http://localhost:8000/api/videos/');

        const promise = axios.all([requestone, requestwo]).then(axios.spread((...response) => {
            //console.log('categorias ',response[0].data)
            let primeracat = [response[0].data[0].titulo, response[0].data[0].contenedor_img, response[1].data.filter(x => x.id_categoria == 1)];
            let segundacat = [response[0].data[1].titulo, response[0].data[1].contenedor_img, response[1].data.filter(x => x.id_categoria == 2)]
            let terceracat = [response[0].data[2].titulo, response[0].data[2].contenedor_img, response[1].data.filter(x => x.id_categoria == 4)]
            let cuartacat = [response[0].data[3].titulo, response[0].data[3].contenedor_img, response[1].data.filter(x => x.id_categoria == 5)]
            let quintacat = [response[0].data[4].titulo, response[0].data[4].contenedor_img, response[1].data.filter(x => x.id_categoria == 6)]
            let sextacat = [response[0].data[5].titulo, response[0].data[5].contenedor_img, response[1].data.filter(x => x.id_categoria == 7)]
            ////console.log('listados de respuesta videos categorizados',primeracat,segundacat,terceracat,cuartacat,quintacat,sextacat)
            let salida = arrange_videos([primeracat, segundacat, terceracat, cuartacat, quintacat, sextacat]);
            ////console.log(salida);
            setVideosPopulated(salida);
            response[0].data.map((el,indice)=>{
                console.log('iterando en categorias de respuesta ',el)
                if(el.titulo == set){
                setCategoriaSet(el)
        }
            });
            
        }));
        return;
    }
    function arrange_videos(arreglo) {
        let videosService = {}
        arreglo.forEach(([title, container, pic]) => {
            const picsArray = pic.reduce((acc, key) => {
                const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
                const elvideo = key.contenedor_img.split('/')
                console.log('la llave es ',key);
                return acc.concat({
                    id: `${title.replace(' ', '-')}`,
                    name,
                    Video: elvideo[elvideo.length - 1],
                    llave:key.id,
                    titulovideo:key.titulo,
                    categoriavideo:key.id_categoria
                })
            }, [])
            // randomize the icons to show on the index page
            const highlightedVideos = picsArray
                .map(a => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                .slice(0, 1)
            ////console.log('en función de poblamiento de videos ',highlightedVideos)
            videosService[title] = picsArray.map(
                obj =>
                    highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
            )
        })
        return videosService;
    }
    { ////console.log('el estado de los videos en esta categoría es', videosPopulated, focusedVideo, categoriaSet)
     }
    return (

        <div>
            <div style={{ zIndex: '1', height: '100px', display: 'block' }}>
                <StaticNavBar style={{ marginRight: '40%' }}></StaticNavBar>
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
                                    {videosPopulated && videosPopulated[set] != undefined && videosPopulated[set].map(({ name, Video, id,llave,titulovideo, categoriavideo }) => {
                                        //console.log('iterando en videos ');
                                        //console.log(focusedVideo)
                                        console.log('en iteracion de llave ',videosPopulated[set])
                                        return (
                                            <VideoBlock
                                                Video={ruta_aws + Video}
                                                isFocused={Video === focusedVideo}
                                                id={id}
                                                name={Video}
                                                set={set}
                                                key={id}
                                                identificador={llave}
                                                titulo={titulovideo}
                                                id_categoria_video={categoriavideo}
                                            />
                                        )
                                    })}
                                </VideoSetGrid>
                            </SetContents>
                        </InverseContainer>
                    </Flipped>
                    <div style={{ marginTop: '10em' }}>
                        <CanvasVideoSet>

                        </CanvasVideoSet>
                        <div className="resume-video-set">
                            <h2>{set.replace('-', ' ')}</h2>
                            <p>Número de documentos audiovisuales: 26</p>
                            <p>{
                                categoriaSet && categoriaSet.descripcion
                            }</p>

                        </div>
                    </div>
                </Background>
            </Flipped>
            <HomeFooter style={{ position: 'absolute', bottom: '0' }}></HomeFooter>
        </div>
    )
}

export default VideoSetPage
