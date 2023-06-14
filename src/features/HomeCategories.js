import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BigPlayButton, Player, ControlBar, PlayToggle } from 'video-react'
import CanvasTitleCategorie from './CanvasTitleCategorie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
function getTamanioDivCategoria(claseCss, bandera) {
    let caja = document.querySelector(claseCss);
    let elemento = document.getElementsByClassName(claseCss.replace('.', ''))[0];
    //console.log('la caja a computar es ', caja, elemento);
    let margenes = getComputedStyle(elemento);

    let salida = caja.offsetWidth;
    let izquierdo = margenes.marginLeft.replace('px', '');
    let derecho = margenes.marginRight.replace('px', '');
    //console.log('el tamaño computado es ', salida, izquierdo, derecho);
    let retorno = parseFloat(izquierdo) + parseFloat(derecho) + salida;
    // let valor = salida.split('px');
    // let retorno = 0;
    // for(let i = 0; i < valor.length-1; i++){
    //     retorno +=parseFloat(valor[i]);
    // }
    if (bandera) retorno = retorno * (-1);
    return retorno;
}
const HomeCategories = (props) => {
    const [flip, setFlip] = useState(false);
    const [fliptext, setFlipText] = useState(false);
    const [distance, setDistance] = useState(0);
    const [distancetext, setDistanceText] = useState(0);
    const [categorias, setCategorias] = useState(props.categoriasService);
    const [canvasCategoriasVisible, setCanvasCategoriasVisible] = useState(false);
    //console.log('longitud de categorias ', props.categoriasService.length);
    useEffect(() => {
        setTimeout(function () { setCanvasCategoriasVisible(true); }, 10000);
    }, [canvasCategoriasVisible])
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
        if (distancia > 0) {
            if (distance > -(distancia * props.categoriasService.length - 1)) {
                setFlip(false);
                setDistance(distance - distancia);
            }
            else {
                setFlip(true);
                setDistance(0);
            }
        }
        else {
            console.log('distancias inversas', -distance, -(distancia * props.categoriasService.length - 1))
            if (-distance > 0 && -distance < -(distancia * props.categoriasService.length - 1)) {
                setFlip(false);
                setDistance(distance - distancia);
            }
            else {
                setFlip(true);
                setDistance(0);
            }
        }
    }
    const forwardText = (distancia) => {
        if (distancia > 0) {
            if (distancetext > -(distancia * props.categoriasService.length - 1)) {
                setFlipText(false);
                setDistanceText(distancetext - distancia);
            }
            else {
                setFlipText(true);
                setDistanceText(0);
            }
        }
        else {
            console.log('distancias inversas texto', -distancetext, -(distancia * props.categoriasService.length - 1))
            if (-distancetext > 0 && -distancetext < -(distancia * props.categoriasService.length - 1)) {
                setFlipText(false);
                setDistanceText(distancetext - distancia);
            }
            else {
                setFlipText(true);
                setDistanceText(0);
            }
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
        {canvasCategoriasVisible &&
            <>
                <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "xx-large", cursor:'pointer', position: 'absolute', top: '50%', left: '1.5%', color: 'white' }}
                    onClick={(e => { forward(getTamanioDivCategoria('.primer-categoria-imagen-secuencia', true)); forwardText(getTamanioDivCategoria('.primer-categoria-secuencia', true)) })}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "xx-large", cursor:'pointer', position: 'absolute', top: '50%', right: '1.5%', color: 'white' }}
                    onClick={(e => { forward(getTamanioDivCategoria('.primer-categoria-imagen-secuencia')); forwardText(getTamanioDivCategoria('.primer-categoria-secuencia')) })}></FontAwesomeIcon>
            </>
        }
        <div style={{ marginTop: '-15px', backgroundColor: 'white', width: '100%' }}>
            <Link to='Categorias' style={{ textDecoration: 'none', color: 'black' }}>
                <div style={canvasCategoriasVisible ? { display: 'block' } : { display: 'none' }}><CanvasTitleCategorie></CanvasTitleCategorie>
                </div>
            </Link>
        </div>
        <div

            style={{ width: '90%', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}>

            <animated.div style={{
                width: '1500%',
                height: '100%',
                position: 'relative',
                ...styles
            }}>
                {props.categoriasService.map(function (el, index) {
                    //console.log('en categorías revisión fallo',el);
                    let clase_css_categoria = index == 0 ? 'category-images-green primer-categoria-imagen-secuencia' : 'category-images-green';
                    let vinculo = "/Categorias/" + el.titulo + "/dummy";
                    return (
                        <Link to={vinculo} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className={clase_css_categoria} key={index} style={{ float: 'left', padding: '10px', display: 'block' }}>
                                <div className='inner-hover-categoria'><span>{el.titulo.replace(/[-]/g, ' ')}</span></div>
                                <video width={450} height={337} autoPlay loop type="video/mp4" muted>
                                    <source src={el.contenedor_img}></source>
                                </video>
                            </div>
                        </Link>
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
                        let clase_css_categoria = index == 0 ? 'primer-categoria-secuencia' : '';
                        return (
                            <div key={index} style={{ float: 'left', padding: '25px', display: 'block', maxHeight: '250px', width: '700px', textAlign: 'left', color: 'white', overflowY: 'auto' }} className={headercolors[index % headercolors.length] + " categoria-home" + ' ' + clase_css_categoria}>
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