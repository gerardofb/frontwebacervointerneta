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
import NavBar from '../../NavBar'
import { HomeFooter } from "../../HomeFooter"
import { ThemesContext } from "../../../ThemeProvider"
import { useParams, useLocation } from "react-router-dom"
import CanvasVideoSet from "../../CanvasVideoSet"
import { videos } from "../videosCategorized"
import { getBaseAdressApi } from "../../MainAPI"

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
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`

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
const ruta_aws = "https://deploy-videos-acervo-interneta-prod.s3.amazonaws.com/"
function isInViewportMenu() {
    const menusuperior = document.querySelector('.container-menu-main')
    const barranav = document.querySelector('.navbar-principal');
    const rect = barranav.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    // console.log('datos de video encabezado', rect.top, rect.left, rect.bottom, rect.right)
    // console.log('limite datos de video encabezado ', Math.round(scrollTop - rect.top))
    if (Math.round(scrollTop - rect.top) <= 0) {
        menusuperior.style.display = 'block'

    }
    else {
        menusuperior.style.display = 'none'
    }

}
const VideoSetPage = (
    props) => {
    const { set, focusedVideo } = useParams();

    //console.log('el primer estado del video enfocado es ');
    //console.log('el titulo del bloque de videos es ', set);
    //console.log(focusedVideo)
    const location = useLocation();
    const [videosPopulated, setVideosPopulated] = useState(null);
    const [categoriaSet, setCategoriaSet] = useState({})
    const [consultandominiaturas, setConsultandoMiniautras] = useState(false);
    useEffect(() => {
        isInViewportMenu();
        if (videosPopulated == null) {
            populate_videos_set();
        }
    }, [videosPopulated]);
    const populate_videos_set = () => {
        setConsultandoMiniautras(true);
        const requestone = axios.get(getBaseAdressApi() + 'api/categorias/');

        const requestwo = axios.get(getBaseAdressApi() + 'api/videos/');

        const promise = axios.all([requestone]).then(axios.spread((...response) => {
            //console.log('categorias ', response[0].data)
            let arreglocats = [];
            response[0].data.results.map((el, i) => {
                if (el !== undefined) {
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
            let salida = arrange_videos(arreglocats);
            // let primeracat = [response[0].data.results[0].titulo, response[0].data.results[0].contenedor_img, response[0].data.results[0].videos_por_categoria];
            // let segundacat = [response[0].data.results[1].titulo, response[0].data.results[1].contenedor_img, response[0].data.results[1].videos_por_categoria]
            // let terceracat = [response[0].data.results[2].titulo, response[0].data.results[2].contenedor_img, response[0].data.results[2].videos_por_categoria]
            // let cuartacat = [response[0].data.results[3].titulo, response[0].data.results[3].contenedor_img, response[0].data.results[3].videos_por_categoria]
            // let quintacat = [response[0].data.results[4].titulo, response[0].data.results[4].contenedor_img, response[0].data.results[4].videos_por_categoria]
            // //let sextacat = [response[0].data[5].titulo, response[0].data[5].contenedor_img, response[1].data.filter(x => x.id_categoria == 7)]
            // ////console.log('listados de respuesta videos categorizados',primeracat,segundacat,terceracat,cuartacat,quintacat,sextacat)
            // let salida = arrange_videos([primeracat, segundacat, terceracat, cuartacat, quintacat]);
            //console.log('los videos enumerados son ', salida)
            //console.log(salida);
            setVideosPopulated(salida);
            response[0].data.results.map((el, indice) => {
                //console.log('iterando en categorias de respuesta ', el)
                el.titulo = el.titulo.replace(/\s/g, '-')
                if (el.titulo == set) {
                    setCategoriaSet(el)
                }
            });
            setConsultandoMiniautras(false);
        }));
        return;
    }
    function arrange_videos(arreglo) {
        //console.log('antes de foreach para llave ', arreglo)
        let videosService = {}
        arreglo.forEach(([title, container, pic]) => {
            //console.log('foreach para llave ', title, container, pic)
            const picsArray = pic.filter(a => a.activo).reduce((acc, key) => {
                //console.log('la llave es ', key);
                const name = container//key.replace(/^\.\/|\.png$/g, "").replace(/_/g, "-")
                const elvideo = key.contenedor_img ? key.contenedor_img.split('/') : []

                return acc.concat({
                    id: `${title.replace(/\s/g, '-')}`,
                    name,
                    Video: elvideo[elvideo.length - 1],
                    llave: key.id,
                    titulovideo: key.titulo,
                    categoriavideo: key.id_categoria
                })
            }, [])
            // randomize the icons to show on the index page
            const highlightedVideos = picsArray
                .map(a => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                .slice(0, 1)
            ////console.log('en función de poblamiento de videos ',highlightedVideos)
            videosService[title.replace(/\s/g, '-')] = picsArray.map(
                obj =>
                    highlightedVideos.includes(obj) ? { ...obj, highlighted: true } : obj
            )
        })
        return videosService;
    }
    {
        //console.log('el estado de los videos en esta categoría es', set, videosPopulated, focusedVideo, categoriaSet)
    }
    return (

        <div>
            <div style={{ backgroundColor: 'black', height: '100px' }}>
                <NavBar></NavBar>
            </div>
            <div className='default-loader-full-generic' style={consultandominiaturas === true ? { display: 'block' } : { display: 'none' }}>  <img src={url_loader("Reload-transparent.gif", false)} width="100px" />
                <p className="legend-loading-video-miniatures">Cargando miniaturas...</p>
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
                                    {videosPopulated && videosPopulated[set] != undefined && videosPopulated[set].map(({ name, Video, id, llave, titulovideo, categoriavideo }) => {
                                        //console.log('iterando en videos ');
                                        //console.log(focusedVideo)
                                        //console.log('en iteracion de llave ', set, videosPopulated[set], titulovideo)
                                        return (
                                            <VideoBlock
                                                Video={ruta_aws + Video}
                                                isFocused={Video === focusedVideo}
                                                id={id}
                                                name={Video}
                                                set={set}
                                                key={id + Video}
                                                identificador={llave}
                                                titulo={titulovideo}
                                                id_categoria={categoriavideo}
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
