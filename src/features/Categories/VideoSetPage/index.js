import React, { useRef, useState, useEffect } from "react"
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
import HelmetMetaData from "../../HelmetMetaData"

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
    console.log('el titulo del bloque de videos es ', set);
    //console.log(focusedVideo)
    const location = useLocation();
    const ref_cassette = useRef();
    const [videosPopulated, setVideosPopulated] = useState(null);
    const [categoriaSet, setCategoriaSet] = useState({})
    const [descripcionSeparada, setDescripcionSeparada] = useState(null);
    const [consultandominiaturas, setConsultandoMiniautras] = useState(false);
    const [metaTags, setMetaTags] = useState({
        description: "",
        keywords: [],
        title: ""
    });
    const estableceMeta = (cat) => {
        switch (cat) {
            case "Arte-Público":
                setMetaTags({
                    description: "Documentales sobre danza callejera, muralismo, movimiento del graffiti, gráfica de los movimientos sociales.",
                    keywords: [
                        "danza", "muralismo", "graffiti", "gráfica", "movimientos"
                    ],
                    title: "Acervo AudioVisual Interneta Memoria de las y los Invisibles | " + set.replace(/-/g, " ")
                });
                break;
            case "La-Generación-Transparente":
                setMetaTags({
                    description: "Documentales, testimonios, videoficciones y piezas de videoarte de autores y autoras que pertenecen a la llamada Generación transparente, creada entre 1985 y 1994.",
                    keywords: [
                        "video arte", "video experimental", "generación transparente"
                    ],
                    title: "Acervo AudioVisual Interneta Memoria de las y los Invisibles | " + set.replace(/-/g, " ")
                });
                break;
        }
    }
    const animateCassete = (evt)=>{
        const svg = evt.target;
        console.log('el cassete',svg.children);
    }
    useEffect(() => {
        estableceMeta(set);
        isInViewportMenu();
        if (videosPopulated == null) {
            populate_videos_set();
        }
    }, [videosPopulated, descripcionSeparada]);
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
                el.titulo = el.titulo.replace(/\s/g, '-')
                if (el.titulo == set) {
                    setCategoriaSet(el);

                    setDescripcionSeparada(el.descripcion.split('\r\n'));

                }
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
    return (

        <div>
            <HelmetMetaData
                description={metaTags.description} keywords={metaTags.keywords} title={metaTags.title}></HelmetMetaData>
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
                    <svg ref={ref_cassette} onMouseEnter={(evt)=>{animateCassete(evt)}} width="1125" height="2436" version="1.1" viewBox="0 0 1125 2436" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <radialGradient id="radialGradient1278" cx="263.26" cy="656.16" r="150.08" gradientTransform="matrix(.98086 .19471 -.32339 1.6291 217.23 -438.98)" gradientUnits="userSpaceOnUse">
   <stop stop-color="#4c4c4c" stop-opacity="0" offset="0"/>
   <stop stop-color="#4c4c4c" offset="1"/>
  </radialGradient>
  <radialGradient id="radialGradient1286" cx="752.14" cy="607.72" r="149.52" gradientTransform="matrix(.81689 .31628 -.56034 1.4472 478.25 -509.69)" gradientUnits="userSpaceOnUse">
   <stop stop-color="#999" offset="0"/>
   <stop stop-color="#999" stop-opacity="0" offset="1"/>
  </radialGradient>
  <meshgradient id="meshgradient1529" x="465.47495" y="398.15625" gradientUnits="userSpaceOnUse">
   <meshrow>
    <meshpatch>
     <stop stop-color="#fff" path="c 136.881,0  273.762,0  410.642,0"/>
     <stop stop-color="#1a1a1a" path="c -99.0123,124.528  -88.0154,277.57  0,474.676"/>
     <stop stop-color="#fff" path="c -136.881,0  -273.762,0  -410.642,0"/>
     <stop stop-color="#1a1a1a" path="c 105.865,-68.7986  93.3151,-356.628  -5.68434e-14,-474.676"/>
    </meshpatch>
   </meshrow>
  </meshgradient>
 </defs>
 <g stroke-linecap="round">
  <rect transform="matrix(1 0 -.30015 .95389 0 0)" x="362.17" y="190.51" width="831.05" height="677.61" ry="104.12" stroke-width="9.2057"/>
  <rect transform="matrix(1 0 -.30158 .95344 0 0)" x="281.93" y="323.37" width="838.11" height="680.12" ry="104.51" stroke-width="9.2619"/>
  <path d="m329.6 211.53-149.58 145.99 255.37-8.3425z" stroke-width="10.56"/>
  <path d="m812.29 739.95-2.0237 175.63 139.22-156.7z" stroke-width="8.6422"/>
 </g>
 <g fill="#808080">
  <ellipse cx="298.24" cy="508.89" rx="6.2568" ry="8.3425"/>
  <circle cx="218.99" cy="502.63" r="10.428"/>
  <g stroke-linecap="round">
   <path d="m230.8 836.51c5.573-0.18407 11.218-0.64607 16.918-1.3847l130.79-449.68c-5.2706-0.73947-10.646-1.2023-16.112-1.3872-106.52-9e-5 -223.58 82.618-259.91 207.56-36.339 124.94 21.8 244.89 128.32 244.89z" fill="url(#radialGradient1278)" stroke="#3f3f3f" stroke-width="11.636"/>
   <g stroke="#000">
    <path d="m251.62 713.77a87.617 124.5 36.021 0 0 8.459-0.6924l65.393-224.84a87.617 124.5 36.021 0 0-8.0559-0.6936 87.617 124.5 36.021 0 0-129.33 113.11 87.617 124.5 36.021 0 0 63.539 113.11z" fill="#f9f9f9" stroke-width="5.8178"/>
    <path d="m271.84 642.78c1.4145-0.0362 2.8442-0.12694 4.2852-0.27203l28.436-88.314c-1.3475-0.14524-2.7188-0.23613-4.11-0.27245-27.075 2e-5 -47.608 12.296-55.509 36.833-4.538 29.602 2.5664 45.695 26.898 52.025z" fill="#f9f9f9" stroke-width="2.5996"/>
    <path d="m279.84 624.12a23.721 33.658 53.59 0 0 2.5344-0.16918l19.593-54.928a23.721 33.658 53.59 0 0-2.4137-0.16938 23.721 33.658 53.59 0 0-38.751 27.633 23.721 33.658 53.59 0 0 19.037 27.633z" fill="#808080" stroke-width="1.574"/>
   </g>
  </g>
  <g fill="#ccc">
   <ellipse cx="260.7" cy="483.86" rx="14.599" ry="16.685"/>
   <ellipse cx="204.39" cy="540.17" rx="12.514" ry="18.771"/>
   <circle cx="282.5" cy="525.58" r="12.514"/>
   <ellipse cx="189.79" cy="700.77" rx="14.599" ry="16.685"/>
  </g>
  <circle cx="229.42" cy="583.97" r="12.514"/>
 </g>
 <g stroke-linecap="round">
  <path d="m757.79 381.49c-5.573 0.18408-11.218 0.64607-16.918 1.3847l-130.79 449.68c5.2706 0.73946 10.646 1.2023 16.112 1.3872 106.52 1.2e-4 245.98-76.396 282.31-201.34 36.339-124.94-44.201-251.12-150.72-251.12z" fill="url(#radialGradient1286)" stroke="#fbfbfb" stroke-width="2"/>
  <path d="m745.3 491.72a87.617 124.5 36.021 0 0-8.459 0.6924l-65.393 224.84a87.617 124.5 36.021 0 0 8.0559 0.6936 87.617 124.5 36.021 0 0 129.33-113.11 87.617 124.5 36.021 0 0-63.539-113.11z" fill="#f9f9f9" stroke="#000" stroke-width="5.8178"/>
  <rect transform="matrix(1 0 -.27927 .96021 0 0)" x="465.47" y="398.16" width="410.64" height="474.68" fill="url(#meshgradient1529)" stroke="#000" stroke-width="2.041"/>
  <g stroke="#3f3f3f" stroke-width="10.56">
   <ellipse cx="216.9" cy="506.8" rx="16.685" ry="10.428" fill="#666"/>
   <circle cx="155.36" cy="625.68" r="8.3425" fill="#666"/>
   <ellipse cx="209.33" cy="648.88" rx="2.0856" ry="4.1712" fill="#333"/>
  </g>
 </g>
 <g stroke="#000" stroke-linecap="round">
  <path d="m724.14 563.07a41.368 59.493 52.54 0 0-4.5045 0.61554l-28.211 96.847a41.368 59.493 52.54 0 0 4.3308-0.0186 41.368 59.493 52.54 0 0 65.785-52.427 41.368 59.493 52.54 0 0-37.4-45.017z" fill="#f9f9f9" stroke-width="2.7634"/>
  <path d="m717.04 583.88a24.589 39.09 60.701 0 0-3.0563 0.52549l-17.487 56.535a24.589 39.09 60.701 0 0 2.9486-0.1771 24.589 39.09 60.701 0 0 43.862-32.545 24.589 39.09 60.701 0 0-26.267-24.339z" fill="#808080" stroke-width="1.727"/>
  <path d="m712.81 593.33a12.52 18.519 29.081 0 0-1.1763 0.1058l-9.093 34.37a12.52 18.519 29.081 0 0 1.1202 0.106 12.52 18.519 29.081 0 0 17.984-17.291 12.52 18.519 29.081 0 0-8.8351-17.291z" fill="#1a1a1a" stroke-width=".8482"/>
 </g>
 <g stroke-linecap="round">
  <path d="m788.89 391.76-2.4289 8.9953 15.845 13.959 3.9551-7.6506zm-2.4289 8.9953 0.59065-8.6949-10.989 12.956-33.891 125.51 5.7885 7.0107-6.6093 12.787-3.4097-4.1302-5.2085 32.747c11.299-0.91241 17.682 0.60103 28.758-5.3097l-17.539-15.452zm22.122 19.49-5.7033 11.036-3.784 14.014 14.941 13.163 0.0743 2.7202 13.306-24.34zm-9.4874 25.05-6.1108 4.1278 0.82207-0.58792 0.03-0.75202-20.429 58.1-15.789 58.475 7.4704 6.5814zm-34.007 125.94-0.12794 0.4739c0.13169-0.0792 0.26335-0.15873 0.39495-0.23863zm65.467-131.64-23.931 46.303-18.378 68.064c8.0812-7.713 15.692-16.749 22.685-26.935l22.842-84.597zm-30.34 127.12c-6.081 4.8612-12.345 8.968-18.728 12.279l-1.4592 5.4043-3.4326-3.0241c-16.567 7.445-34.757 24.35-50.961 20.719l-7.3717 16.976 54.784 48.264z" fill="#ececec" stroke-width="9.5657"/>
  <rect transform="matrix(1 0 -.25711 .96638 0 0)" x="490.66" y="497.92" width="331.17" height="263.3" ry="78.989" fill="#ececec" stroke-width="12.459"/>
  <path d="m770.33 380.81-423.12-3.7334s-150.58 22.4-217.78 139.38" fill="none" stroke="#fbfbfb" stroke-width="2"/>
  <path d="m212.8 327.3s38.579-39.823 77.157-39.823c27.407 0 634.68 8.7113 634.68 8.7113s73.424-6.2224 73.424 32.356c0 32.38-90.846 314.85-90.846 314.85" fill="none" stroke="#fbfbfb" stroke-width="2"/>
 </g>
</svg>


                        <div className="resume-video-set">
                            <h2>{set.replace('-', ' ')}</h2>
                            <ul style={{ listStyle: "disc" }}>
                                {descripcionSeparada && descripcionSeparada.map((cat, i) => {
                                    if (cat.trim() != "") {
                                        let llave = "resume-video-set-" + i;
                                        return <li key={llave}>{cat}</li>
                                    }
                                })
                                }</ul>

                        </div>
                    </div>
                </Background>
            </Flipped>
            <HomeFooter style={{ position: 'absolute', bottom: '0' }}></HomeFooter>
        </div>
    )
}

export default VideoSetPage
