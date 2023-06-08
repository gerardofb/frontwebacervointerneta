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
const urlvideointro = "/images/VideoIntroInterNeta.mp4";
export class Home extends React.Component {
    state = {
        categoriasService: [],
        videosList: [],
        habilitarLoader: false,
        habilitarLoaderCategories: false,
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

    }
    render() {
        const { styles } = this.context;
        //console.log('en home ', this.context)
        return (
            <div onScroll={this.handleScroll}>

                <Parallax className={styles.BodyHome}
                    ref={ref => this.parallax = ref}
                    pages={5}
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
                            muted
                            ref={player => {
                                this.player = player;
                            }}
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
                                            <Link style={{ textDecoration: 'none', color: 'transparent' }} to={vinculo}><img src={video.contenedor_img} alt={video.titulo} /></Link>
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
                    <Parallax.Layer offset={4.25} speed={0} style={{ display: 'flex' }}>
                        <HomeFooter></HomeFooter>
                    </Parallax.Layer>
                </Parallax>
            </div>
        )
    }
}
Home.contextType = ThemesContext;