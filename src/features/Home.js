import React from 'react'
import axios from 'axios';
import Parallax from 'react-springy-parallax'
import { BigPlayButton, ControlBar, LoadingSpinner, Player, PlayToggle } from 'video-react'
import { HomeCategories } from './HomeCategories';
import { HomeTags } from './HomeTags';
import { HomeFooter } from './HomeFooter';
import NavBar from './NavBar';
import { ThemesContext } from '../ThemeProvider'
import Canvas from './Canvas';
import { getBaseAdressApi } from './MainAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`
const urlpng = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Art/inverted/${name}.png${wrap ? ')' : ''}`
const url_loader = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}${wrap ? ')' : ''}`
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
const urlvideointro = "/images/Web_interneta.mp4";
/* Toggle Button to Unmute the Video */

// function toggleMute() {
//     var video = document.getElementsByTagName('video')[0];
//     console.log('el elemento de video es',video);
//     if (video.muted == false) {
//         video.muted = true;
//     } else {
//         video.muted = false;
//     }
// }

// /* Delay Function to Add SetTimeOut After Defined Interval */

// function delay(time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

// /* Show Video Function to Add Display Property to Show the Video on Click of Button which will fulfilled User Interaction Needs to Browser to Run the Video with Unmute State */

// function showVideo() {
//     var button = document.getElementById('button-allow-autoplay');
//     button.style.display = 'none';
//     delay(100).then(() => toggleMute());
// }
export class Home extends React.Component {
    state = {
        categoriasService: [],
        videosList: [],
        habilitarLoader: false,
        habilitarLoaderCategories: false,
        creditosvideo: { id: 0, sinopsis: '' }
    }
    handleScroll = () => {

        isInViewportMenu();
    }
    filterActiveCatVideos = (arreglo) => {
        const videosCatActivos = arreglo.map((vid, i) => {
            if (this.state.categoriasService.find(x => x.id == vid.id_categoria)) {
                return vid;
            }
        })
        //console.log('videos activos por categoría para listado inicial de todos los videos', videosCatActivos.filter(x => x !== undefined));
        return videosCatActivos.filter(x => x !== undefined);
    }
    estableceCreditosHover = (idvideo, bandera) => {
        if (bandera) {
            const requesttwo = axios.get(`${getBaseAdressApi()}api/creditosvideo/${idvideo}`).then(response => {

                this.setState({
                    ...this.state,
                    creditosvideo: { id: idvideo, sinopsis: response.data[0].sinopsis }
                });
                console.log('los creditos del video son ', response.data[0])

            });
        }
        else {
            this.setState({
                ...this.state,
                creditosvideo: { id: 0, sinopsis: '' }
            });
        }
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            habilitarLoader: true,
            habilitarLoaderCategories: true
        });

        axios.get(getBaseAdressApi() + 'api/categorias/').then(response => {
            //console.log('respuesta previa de api', response)
            const respuestacategorias = response.data.results.map((el, i) => {
                el.titulo = el.titulo.replace(/\s/g, '-');
                return el;
            })
            //console.log('respuesta de api ', response.data, respuestacategorias)
            this.setState({ categoriasService: respuestacategorias, habilitarLoaderCategories: false });
            axios.get(`${getBaseAdressApi()}api/videos/`).then(response => {
                this.setState({ videosList: response.data.results, habilitarLoader: false })
            }).catch(err => {
                //console.log('error en el api buscando la lista de videos', err)
                this.setState({
                    ...this.state,
                    habilitarLoader: false
                });
            });
        }).catch(err => {
            //console.log('error de api', err)
            this.setState({
                ...this.state,
                habilitarLoader: false
            });
        });
        // showVideo();
    }
    render() {
        const { styles } = this.context;
        //console.log('en home ', this.context)
        return (
            <div onScroll={this.handleScroll}>
                {/* <button type="button" onClick="showVideo()" id="button-allow-autoplay">Click Me</button> */}
                <Parallax className={styles.BodyHome}
                    ref={ref => this.parallax = ref}
                    pages={6}
                    scrolling={true}>
                    <Parallax.Layer offset={2} speed={0.3} className={styles.FirstLayerHome} />
                    <Parallax.Layer offset={4} speed={0.2} className={styles.SecondLayerHome} />
                    <Parallax.Layer offset={5} speed={1} className={styles.ThirdLayerHome} />

                    <Parallax.Layer
                        offset={0} speed={0} factor={4}
                        style={{ backgroundSize: 'cover' }}
                    >

                    </Parallax.Layer>

                    <Parallax.Layer offset={1.3} speed={0.8} style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </Parallax.Layer>
                    <Parallax.Layer offset={1.95} speed={0.5} style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </Parallax.Layer>
                    <Parallax.Layer offset={2.75} speed={0.5} style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </Parallax.Layer>
                    <Parallax.Layer offset={0} speed={0} style={{ display: 'block', backgroundColor: 'black' }}>
                        <div style={{ backgroundColor: 'black', height: '100px' }}>
                            <NavBar></NavBar>
                        </div>
                    </Parallax.Layer>
                    <Parallax.Layer offset={0.2} speed={0} style={{ display: 'flex', marginBottom: '50px' }}>

                        <Player autoPlay
                            ref={player => {
                                this.player = player;
                            }}
                            muted
                            fluid={false}
                            height={'100%'}
                            width={'100%'}
                            aspectRatio={'16:9'}
                            loop={true}>
                            <BigPlayButton position={"center"} style={{ display: 'none' }} />
                            <source src={urlvideointro}></source>
                            <ControlBar disableCompletely={false}></ControlBar>
                            <LoadingSpinner></LoadingSpinner>
                        </Player>

                    </Parallax.Layer>
                    <Parallax.Layer offset={1.4} speed={0} style={{ display: 'flex' }}>
                        <>
                            <HomeCategories categoriasService={this.state.categoriasService}></HomeCategories>
                            <div className="loader-list-categories-home" style={this.state.habilitarLoaderCategories ? { display: 'block' } : { display: 'none' }}>
                                <img width="100" src={url_loader("Reload-transparent.gif", false)} />
                                <br></br>
                                <p style={{ color: 'white', fontSize: 'large' }}>Cargando...</p>
                            </div>
                        </>
                    </Parallax.Layer>
                    <Parallax.Layer offset={2.75} speed={0} style={{ display: 'flex', marginBottom: '2em' }}>
                        <HomeTags></HomeTags>
                    </Parallax.Layer>
                    <Parallax.Layer offset={3.9} speed={0} style={{ display: 'block' }}>
                        <div className={styles.SecondLayerHome}>
                            <div className='contenedor-videos-home'>
                                <div className='titulo-listado-home'>
                                    <hr />
                                    <h2>Enlaces directos al acervo audiovisual ({this.state.videosList.length} videos):</h2>
                                </div>
                                <div className='list-videos-home'>
                                    <div className="loader-list-videos-home" style={this.state.habilitarLoader ? { display: 'block' } : { display: 'none' }}>
                                        <img width="100" src={url_loader("Reload-transparent.gif", false)} />
                                        <br></br>
                                        <p style={{ color: 'white', fontSize: 'large' }}>Cargando...</p>
                                    </div>
                                    {this.filterActiveCatVideos(this.state.videosList).map((video, index) => {
                                        let vinculo = "/Reproduccion/" + video.titulo + "|" + video.id + "|" + video.id_categoria;
                                        return <div key={index} className='item-list-videos-home'>
                                            <Link style={{ textDecoration: 'none', color: 'transparent' }} to={vinculo}>
                                                {this.state.creditosvideo.id != video.id ?
                                                    <img src={video.contenedor_img} alt={video.titulo} onMouseOver={(e) => this.estableceCreditosHover(video.id, true)} />
                                                    : <p className='sinopsis-corta-item-video' onMouseLeave={(e) => this.estableceCreditosHover(0, false)}>{this.state.creditosvideo.sinopsis}</p>
                                                }
                                            </Link>
                                            <div className='titles-item-list-videos-home'>
                                                <p>Trailer {(index + 1)}: {video.titulo}</p>
                                                <p><FontAwesomeIcon icon={faHeart} />&nbsp;{video.favoritos_por_video.length} favoritos</p>
                                                <p><FontAwesomeIcon icon={faComment} />&nbsp;{video.total_comentarios} comentarios</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </Parallax.Layer>
                    <Parallax.Layer offset={4.5} speed={0} style={{ display: 'flex' }}>
                        <div className={'quienes-somos-content-home ' + styles.SecondLayerHome}>
                            <div className='quienes-somos-body'>
                                <div className='quienes-somos-header'>
                                    <h3>¿Quiénes somos?</h3>
                                    <hr className='quienes-somos' />
                                </div>
                                <p>Con la producción audiovisual generada a lo largo de tres décadas por quienes integramos el colectivo de videastas <strong>InterNeta</strong> estructuramos el <strong>Acervo Audiovisual InterNeta. Memoria de las y los invisibles.</strong> Las piezas y registros que componen éste acervo es resultado de coproducciones y talleres de capacitación en comunidades tanto urbanas como indígenas y originarias así como con movimientos contraculturales, bajo una metodología que hemos llamado “video proceso” o “inter-invención”.    En caso de formalizar con usted la aceptación de la información y accesibilidad ofrecida por el Acervo InterNeta se le comunica que:
                                </p>
                                <p>El acervo esta conformado por 226 documentos audiovisuales con una duración de entre tres y ochenta minutos, los cuales fueron producidos y coproducidos con los grupos y comunidades asentadas en la metrópoli de la ciudad de México y municipios colindantes del Estado de México, Puebla y Querétaro, así como en los estados de Baja California Norte, Colima, Nuevo León, Oaxaca y Veracruz. Los géneros de video utilizados son el testimonio y documental, docudrama y ficción, videoarte y videoclip, y algunos ejercicios de hibridación de géneros e intervención sobre el espacio urbano.</p>
                                <p>Entre los grupos urbanos con los cuales hemos interactuado para estos productos están: los colectivos punks, grupos de música urbana, agrupaciones de arte urbano, crews de grafiteros, grupos cannábicos, organizaciones sociales y culturales de colonias populares, pueblos originarios y unidades habitaciones de la ciudad, así como organizaciones de indígenas migrantes, productores artesanales, organizaciones comunitarias en defensa del territorio, movimientos alternativos de música y danza contemporánea, entre otros.</p>
                                <p>El Acervo Audiovisual InterNeta tiene el propósito de generar un espacio de accesibilidad tanto online como offline, capaz de retroalimentar, devolver y activar dialógicamente las creaciones –en este caso de saberes, creaciones, memorias, “haceres”, prácticas- producidas por y con las comunidades y colectivos involucrados.</p>
                                <p>El sitio permite acceder a trailers de algunas producciones representativas del Acervo Audiovisual InterNeta, clasificadas en siete categorías; Arte Urbano, Memoria y Movimiento Urbano Popular, Generación Transparente, Movimientos Contraculturales, Movimientos Políticos y Sociales, y Pueblos Indígenas y Originarios. </p>
                                <p>Sí estas interesado en conocer la obra completa del video de tu interés, así como para acceder a la base de datos completa deberás comunicarte directamente con nosotros a través de nuestros correos y redes sociales. Bienvenidxs</p>
                            </div>
                        </div>
                    </Parallax.Layer>
                    <Parallax.Layer offset={5.25} speed={0} style={{ display: 'flex' }}>
                        <HomeFooter></HomeFooter>
                    </Parallax.Layer>
                </Parallax>
            </div>
        )
    }
}
Home.contextType = ThemesContext;