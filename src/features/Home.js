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

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`
const urlpng = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Art/inverted/${name}.png${wrap ? ')' : ''}`

export class Home extends React.Component {
    state = {
        categoriasService:[]
    }
    
    componentDidMount(){
        axios.get(getBaseAdressApi()+'api/categorias/').then(response=>{
            const respuestacategorias = response.data.map((el,i)=>{
                el.titulo = el.titulo.replace(/\s/g,'-');
                return el;
            })
            console.log('respuesta de api ',response.data, respuestacategorias)
            this.setState({categoriasService:respuestacategorias})
            
        });
    }
    render() {
        const { styles } = this.context;
        console.log('en home ', this.context)
        return (
            <div>

                <Parallax className={styles.BodyHome}
                    ref={ref => this.parallax = ref}
                    pages={4}
                    scrolling={true}>
                    <Parallax.Layer offset={2} speed={1} className={styles.FirstLayerHome} />
                    <Parallax.Layer offset={3} speed={1} className={styles.SecondLayerHome} />
                    <Parallax.Layer offset={4} speed={1} className={styles.ThirdLayerHome} />

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
                            muted>
                            <BigPlayButton position={"center"} style={{ display: 'none' }} />
                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"></source>
                            <ControlBar disableCompletely={false}></ControlBar>
                            <LoadingSpinner></LoadingSpinner>
                        </Player>
                    </Parallax.Layer>
                    <Parallax.Layer offset={1.4} speed={0} style={{ display: 'flex' }}>
                        <HomeCategories categoriasService={this.state.categoriasService}></HomeCategories>
                    </Parallax.Layer>
                    <Parallax.Layer offset={2.5} speed={0} style={{ display: 'flex', marginBottom: '2em' }}>
                        <HomeTags></HomeTags>
                    </Parallax.Layer>
                    <Parallax.Layer offset={3.3} speed={0} style={{ display: 'flex' }}>
                        <HomeFooter></HomeFooter>
                    </Parallax.Layer>
                </Parallax>
            </div>
        )
    }
}
Home.contextType = ThemesContext;