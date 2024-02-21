import React from 'react'
import axios from 'axios';
//import Parallax from 'react-springy-parallax'
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
const urlvideointro = "/images/Web_InterNeta.mp4";
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
                <div className={styles.BodyHome} style={{display:'grid', gridTemplateColumns:'25% 25% 25% 20% 5%', minHeight:'100%', minWidth:'100%'}}>
                <div style={{ backgroundColor: 'black', height: '100px', gridRow:1, gridColumnStart:1, gridColumnEnd:5 }}>
                            <NavBar></NavBar>
                        </div>
                    {/* <div style={{display:'block', position:'fixed', top:0, left:0, zIndex:-9999, width:'100%', height:'100%'}}>
                    <div style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </div>
                    <div style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </div>
                    <div style={{ pointerEvents: 'none' }}>
                        <Canvas />
                    </div>
                    </div>
                        */}
                    
                    <div style={{ display:'block', gridRow:2, gridColumnStart:1, gridColumnEnd:5,marginTop:'20px' }}>

                        <Player autoPlay
                            ref={player => {
                                this.player = player;
                            }}
                            muted
                            fluid={true}
                            aspectRatio={'16:9'}
                            loop={true}>
                            <BigPlayButton position={"center"} style={{ display: 'none' }} />
                            <source src={urlvideointro}></source>
                            <ControlBar disableCompletely={false}></ControlBar>
                            <LoadingSpinner></LoadingSpinner>
                        </Player>

                    </div>
                    {/* <div  style={{ display: 'block' }}>
                        <>
                            <HomeCategories categoriasService={this.state.categoriasService}></HomeCategories>
                            <div className="loader-list-categories-home" style={this.state.habilitarLoaderCategories ? { display: 'block' } : { display: 'none' }}>
                                <img width="100" src={url_loader("Reload-transparent.gif", false)} />
                                <br></br>
                                <p style={{ color: 'white', fontSize: 'large' }}>Cargando...</p>
                            </div>
                        </>
                    </div> */}
                    <div style={{ display: 'blcok', gridRow:3, gridColumnStart:1, gridColumnEnd:5, marginBottom: '2em' }}>
                        <HomeTags categorias={this.state.categoriasService}></HomeTags>
                    </div>
                    <div style={{ display: 'block', gridRow:4, gridColumnStart:1, gridColumnEnd:5 }}>
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
                    </div>
                    <div style={{ display: 'block', gridRow:5, gridColumnStart:1, gridColumnEnd:5 }}>
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
                    </div>
                    <div style={{ display: 'block', gridRow:6, gridColumnStart:1, gridColumnEnd:5 }}>
                        {/* <HomeFooter></HomeFooter> */}
                    </div>
                </div>
            </div>
        )
    }
}
Home.contextType = ThemesContext;