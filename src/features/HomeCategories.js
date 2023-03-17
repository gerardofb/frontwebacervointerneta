import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BigPlayButton, Player, ControlBar, PlayToggle } from 'video-react'
import CanvasTitleCategorie from './CanvasTitleCategorie';
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Stills/${name}.png${wrap ? ')' : ''}`;
const imagenes = ['Categoria_uno', 'Categoria_dos', 'Categoria_tres', 'Categoria_cuatro', 'Categoria_cinco', 'Categoria_seis', 'Categoria_siete'];
const headerscategories = ['Pueblos indígenas y originarios cultura', 'Pueblos indígenas y originarios cultura y producción',
    'Pueblos indígenas y originarios derechos humanos', 'Pueblos indígenas y originarios fiestas patronales',
    'Pueblos indígenas y originarios memoria colectiva',
    'Pueblos indígenas y originarios proyectos ambientales',]
const headercolors = [
    'first-category-darkgreen',
    'second-category-brown',
    'third-category-blue',
    'fourth-category-purple',
    'fifth-category-lightbrown',
    'sixth-category-lightgreen'
]

const HomeCategories = (props) => {
    const [flip, setFlip] = useState(false);
    const [fliptext, setFlipText] = useState(false);
    const [distance, setDistance] = useState(0);
    const [distancetext, setDistanceText] = useState(0);
    const [categorias,setCategorias]=useState(props.categoriasService);
    const[canvasCategoriasVisible,setCanvasCategoriasVisible] = useState(false);
    //console.log('longitud de categorias ', props.categoriasService.length);
    useEffect(()=>{
        setTimeout(function(){setCanvasCategoriasVisible(true);}, 10000);
    },[canvasCategoriasVisible])
    const styles = useSpring({
        from: { x: 0 },
        to: { x: distance },
        reverse: flip
    })
    const stylesText = useSpring({
        from: { x: 0 },
        to: { x: distancetext },
        reverse: flip
    })
    const forward = (distancia) => {
        if (distance > -(distancia * props.categoriasService.length-1)) {
            setFlip(false);
            setDistance(distance - distancia);
        }
        else {
            setFlip(true);
            setDistance(0);
        }
    }
    const forwardText = (distancia) => {
        if (distancetext > -(distancia * props.categoriasService.length-1)) {
            setFlipText(false);
            setDistanceText(distancetext - distancia);
        }
        else {
            setFlipText(true);
            setDistanceText(0);
        }
    }

    const [flipsvg, setflipsvg] = useState(false)
    const { x } = useSpring({
        reset: true,
        reverse: flipsvg,
        from: { x: 0 },
        x: 1,
        delay: 200,
        onRest: () => setflipsvg(!flipsvg),
    });
    // const [player1, setPlayer1] = useState(null);
    // const [player2, setPlayer2] = useState(null);
    // const [player3, setPlayer3] = useState(null);
    // const [player4, setPlayer4] = useState(null);
    // const [player5, setPlayer5] = useState(null);
    // const [player6, setPlayer6] = useState(null);
    // const [player7, setPlayer7] = useState(null);
    // useEffect(()=>{
    //     player1 && player1.play();
    //     player2 && player2.play();
    //     player3 && player3.play();
    // },[player1,player2,player3])
    return (<div>
        <div style={{ marginTop: '-15px',backgroundColor:'white', width:'100%'}}>
        <Link to='Categorias' style={{ textDecoration: 'none', color: 'black' }}>
            <div style={canvasCategoriasVisible?{display:'block'}:{display:'none'}}><CanvasTitleCategorie></CanvasTitleCategorie>
            </div>
            </Link>
        </div>
        <div
            onClick={(e => { forward(550); forwardText(1060) })}
            style={{ width: '90%', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}><animated.div style={{
                width: '500%',
                height: '100%',
                position: 'relative',
                ...styles
            }}>
                {props.categoriasService.map(function (el, index) {
                    //console.log('en categorías revisión fallo',el);
                    return (
                        <div className='category-images-green' key={index} style={{ float: 'left', margin: '25px', padding: '10px', display: 'block' }}>
                            <div className='inner-hover-categoria'><span>{el.titulo.replace(/[-]/g,' ')}</span></div>
                            <video width={450} height={337} autoPlay loop type="video/mp4" muted>
                                <source src={el.contenedor_img}></source>
                            </video>
                        </div>
                    )
                })}
                <div style={{ clear: 'both' }}></div>
            </animated.div>
        </div>
        <div
            style={{ width: '90%', overflow: 'hidden', marginLeft: 'auto', display: 'grid', gridTemplateRows: '5fr', marginRight: 'auto' }}>
            <animated.div style={{
                width: '700%',
                height: '100%',
                position: 'relative',
                ...stylesText
            }}>
                {
                    props.categoriasService.map(function (el, index) {
                        
                        return (
                            <div key={index} style={{ float: 'left', margin: '25px', padding: '25px', display: 'block', maxHeight:'250px', width: '960px', textAlign: 'left', color: 'white', overflowY:'auto'}} className={headercolors[index]+" categoria-home"}>
                                <h1>{el.titulo}</h1>
                                <p>{el.descripcion}
                                </p>

                            </div>
                        )
                    })
                }
                <div style={{ clear: 'both' }}></div>
            </animated.div>
        </div>
    </div>)
}
export { HomeCategories }