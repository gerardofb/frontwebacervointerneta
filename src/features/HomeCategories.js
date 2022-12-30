import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    const [categorias,setCategorias]=useState(props.categoriasService)
    console.log('longitud de categorias ', props.categoriasService.length);
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
    return (<div>
        <div style={{ marginTop: '5px',backgroundColor:'white', width:'100%', backgroundImage:"url('/images/categorias.svg')", backgroundRepeat:'no-repeat', backgroundPosition:'top center', minHeight:'60px', backgroundSize:'70%' }}>
            <div style={{ backgroundColor: 'transparent', paddingTop:'70px' }}><Link to='Categorias' style={{ textDecoration: 'none', color: 'black' }}>Explorar...</Link></div>
            <svg height="30" width="1280">
                <line x1="50" y1="30" x2="1280" y2="30" strokeDashoffset={x.to(x => (1 - x) * 156)} style={{ stroke: 'rgb(128,128,128)', strokeWidth: '2' }} />
            </svg>
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
                    return (
                        <div className='category-images-green' key={index} style={{ float: 'left', margin: '25px', padding: '25px', display: 'block' }}>
                            <div className='inner-hover-categoria'><span>{el.titulo.replace(/[-]/g,' ')}</span></div>
                            <img src={el.contenedor_img} style={{ width: '450px', height: '337px' }}></img>
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