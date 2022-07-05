import React, { useEffect, useRef, useState, useCallback } from 'react'
import { BigPlayButton, ControlBar, LoadingSpinner, Player, PlayToggle } from 'video-react'
import { useParams } from 'react-router-dom'
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
} from '@react-spring/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faComment,
    faFaceSmile,
    faArrowRight,
    faMicrophoneLines,
    faClone,
    faReply,
    faBan
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
import ContextMenu from '../ContextMenu';

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
        active &&
        `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const Vinculo = styled(Link)`
display:block;
width:100%;
height:100%`;

let items = [
    { titulo: "Gerardo Flores Barrie", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet suscipit mi. Integer lacinia nisl sit amet sapien porta, nec posuere ante dictum. Aliquam erat volutpat. Pellentesque sem purus, laoreet at quam eget, ullamcorper efficitur mi. Integer pretium fringilla placerat. Suspendisse bibendum, neque quis vestibulum interdum, tortor metus scelerisque." },
    { titulo: "Zosim Silva Gómez", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan, orci vitae efficitur placerat, quam odio tempor arcu, non commodo elit velit quis augue. Morbi luctus pellentesque diam id ultrices. Proin massa augue, fermentum eget nibh nec, semper fringilla ipsum. Duis ut ipsum erat. Etiam sollicitudin pulvinar augue, et dapibus erat interdum non. Aenean et lacus dignissim, faucibus justo eu, maximus ex. Quisque eu justo eget nisl eleifend mollis sit amet eget arcu. Quisque tincidunt, nibh ut lobortis sollicitudin, metus orci eleifend metus, ac viverra quam mi ut elit. Quisque aliquet tincidunt nisi. Nullam viverra purus at odio dictum viverra. Quisque eleifend magna eget turpis hendrerit, eget molestie dolor tincidunt. Phasellus at nisi massa. In sollicitudin blandit rhoncus. Duis mattis dictum mi, eget consequat nibh. Morbi vulputate, purus molestie sodales gravida, nisi odio efficitur sem, vitae ornare lacus est eget massa. Sed ornare massa lectus, non tincidunt purus rhoncus vel. Aenean cursus erat at tristique faucibus." },
    { titulo: "Atanasios Gatzios", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { titulo: "Gabriela Rueda", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut accumsan mauris. Integer pellentesque euismod maximus. Phasellus eget est vulputate." },
    { titulo: "Eric del Valle", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus, dui quis porttitor gravida, nulla sem consequat nibh, eget fermentum ex orci ornare sem. Curabitur viverra vehicula elit, a pretium mi pretium a. Curabitur sed accumsan enim. Donec ultricies odio non congue cursus. Phasellus finibus lorem quis bibendum scelerisque." },
    { titulo: "Alejandro Mercado", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet suscipit mi. Integer lacinia nisl sit amet sapien porta, nec posuere ante dictum. Aliquam erat volutpat. Pellentesque sem purus, laoreet at quam eget, ullamcorper efficitur mi. Integer pretium fringilla placerat. Suspendisse bibendum, neque quis vestibulum interdum, tortor metus scelerisque." },
    { titulo: "Tatiana Alvarez", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan, orci vitae efficitur placerat, quam odio tempor arcu, non commodo elit velit quis augue. Morbi luctus pellentesque diam id ultrices. Proin massa augue, fermentum eget nibh nec, semper fringilla ipsum. Duis ut ipsum erat. Etiam sollicitudin pulvinar augue, et dapibus erat interdum non. Aenean et lacus dignissim, faucibus justo eu, maximus ex. Quisque eu justo eget nisl eleifend mollis sit amet eget arcu. Quisque tincidunt, nibh ut lobortis sollicitudin, metus orci eleifend metus, ac viverra quam mi ut elit. Quisque aliquet tincidunt nisi. Nullam viverra purus at odio dictum viverra. Quisque eleifend magna eget turpis hendrerit, eget molestie dolor tincidunt. Phasellus at nisi massa. In sollicitudin blandit rhoncus. Duis mattis dictum mi, eget consequat nibh. Morbi vulputate, purus molestie sodales gravida, nisi odio efficitur sem, vitae ornare lacus est eget massa. Sed ornare massa lectus, non tincidunt purus rhoncus vel. Aenean cursus erat at tristique faucibus." },
    { titulo: "Cynthia Aguilar", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { titulo: "Patricia Aguilar", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut accumsan mauris. Integer pellentesque euismod maximus. Phasellus eget est vulputate." },
    { titulo: "Ernesto Flores", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus, dui quis porttitor gravida, nulla sem consequat nibh, eget fermentum ex orci ornare sem. Curabitur viverra vehicula elit, a pretium mi pretium a. Curabitur sed accumsan enim. Donec ultricies odio non congue cursus. Phasellus finibus lorem quis bibendum scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." }
]
let catdata = [
    {
        name: 'Rare Wind',
        description: '#a8edea → #fed6e3',
        css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        image: 'url("/images/Classification/Cat_1.png")',
        url: "Screenshot_1",
        height: 200,
    },
    {
        name: 'Saint Petersburg',
        description: '#f5f7fa → #c3cfe2',
        css: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        image: 'url("/images/Classification/Cat_2.png")',
        url: "Screenshot_3",
        height: 400,
    },
    {
        name: 'Deep Blue',
        description: '#e0c3fc → #8ec5fc',
        css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        image: 'url("/images/Classification/Cat_3.png")',
        url: "Screenshot_8",
        height: 400,
    },
    {
        name: 'Ripe Malinka',
        description: '#f093fb → #f5576c',
        css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'url("/images/Classification/Cat_4.png")',
        url: "Screenshot_28",
        height: 400,
    },
    {
        name: 'Perfect White',
        description: '#fdfbfb → #ebedee',
        css: 'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
        image: 'url("/images/Classification/Cat_5.png")',
        url: "Screenshot_29",
        height: 400,
    },
    {
        name: 'Near Moon',
        description: '#5ee7df → #b490ca',
        css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        image: 'url("/images/Classification/Cat_6.png")',
        url: "Screenshot_30",
        height: 400,
    },
    {
        name: 'Wild Apple',
        description: '#d299c2 → #fef9d7',
        css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        image: 'url("/images/Classification/Cat_7.png")',
        url: "Screenshot_31",
        height: 200,
    },
    {
        name: 'Ladoga Bottom',
        description: '#ebc0fd → #d9ded8',
        css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
        image: 'url("/images/Classification/Cat_8.png")',
        url: "Screenshot_42",
        height: 400,
    },
    {
        name: 'Sunny Morning',
        description: '#f6d365 → #fda085',
        css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        image: 'url("/images/Classification/Cat_9.png")',
        url: "Screenshot_48",
        height: 200,
    },
    {
        name: 'Lemon Gate',
        description: '#96fbc4 → #f9f586',
        css: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
        image: 'url("/images/Classification/Cat_10.png")',
        url: "Screenshot_49",
        height: 400,
    },
    {
        name: 'Salt Mountain',
        description: ' #FFFEFF → #D7FFFE',
        css: 'linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)',
        image: 'url("/images/Classification/Cat_11.png")',
        url: "Screenshot_67",
        height: 200,
    },
    {
        name: 'New York',
        description: ' #fff1eb → #ace0f9',
        css: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
        image: 'url("/images/Classification/Cat_12.png")',
        url: "Screenshot_68",
        height: 400,
    },
    {
        name: 'Soft Grass',
        description: ' #c1dfc4 → #deecdd',
        css: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        image: 'url("/images/Classification/Cat_13.png")',
        url: "Screenshot_69",
        height: 400,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_14.png")',
        url: "Screenshot_70",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_15.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_16.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_17.png")',
        url: "Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_18.png")',
        url: "Screenshot_71",
        height: 200,
    },
]

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    console.log('datos de video clip ', rect.top, rect.left, rect.bottom, rect.right)
    return rect.bottom > 0;
    // return (
    //     rect.top >= 0 &&
    //     rect.left >= 0 &&
    //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
}
const mensajes = [
    { autor: "Gerardo Flores", fecha: "02/06/2022 2:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum." },
    { autor: "Gabriela Romo", fecha: "02/06/2022 2:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { autor: "Ibeth Santamaría", fecha: "03/06/2022 2:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur." },
    { autor: "Gerardo Flores", fecha: "03/06/2022 3:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis neque risus." },
    { autor: "Camila Alcantar", fecha: "04/06/2022 2:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit tempor dui, eget maximus felis sodales sit amet." },
    { autor: "Pedro Solis", fecha: "04/06/2022 3:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis pretium orci, vel." },
    { autor: "Marcelo Fernandez", fecha: "06/06/2022 5:27PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis maximus elit, in vulputate turpis lacinia quis. Curabitur ut lectus elit. Mauris porttitor sed purus." },
    { autor: "Marcelo Fernandez", fecha: "07/06/2022 5:28PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum scelerisque porttitor. Morbi suscipit risus elit, a finibus metus porta et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per." },
    { autor: "Gabriela Romo", fecha: "07/06/2022 5:37PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor quam. Aliquam sit amet sodales erat, auctor fermentum nisl. Integer imperdiet ullamcorper maximus. Pellentesque sed convallis justo. Pellentesque tincidunt massa ut ligula condimentum pharetra at nec sem. Donec vehicula ultrices volutpat. Pellentesque fringilla arcu nisi. Vivamus vel diam ex. Donec molestie rhoncus augue, et consectetur nisl imperdiet at. In rutrum consequat sapien, quis rutrum mi rutrum eget. Maecenas feugiat diam ac felis maximus interdum. Quisque sodales dolor at diam euismod, eget mattis lacus porttitor. Morbi id tellus consequat, interdum neque quis, volutpat quam. Integer bibendum leo dignissim, varius turpis eu, placerat nunc. Integer nec rutrum ligula. Vivamus a cursus nisl. Fusce consectetur ipsum magna, non scelerisque augue posuere at." },
    { autor: "Gerardo Flores", fecha: "08/06/2022 5:47PM", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus dolor dui, at feugiat tortor efficitur sit amet. Quisque id commodo arcu. Vestibulum et nisi id urna iaculis faucibus vitae sit amet quam. Ut in lacinia tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc porttitor odio nec massa eleifend mattis. Sed rhoncus cursus lectus a elementum. Aenean consectetur aliquam tellus, ac commodo dolor semper id. Ut congue mollis dui, at fringilla justo tempus nec. Proin et nunc id lorem pulvinar mollis. Duis eu eros at arcu luctus dapibus. Proin nec ante quis nulla accumsan varius. Aliquam quis neque at odio malesuada ultricies pharetra eget lacus. Mauris a porta neque. Pellentesque quis justo ultricies, venenatis ante in, tincidunt arcu." }
]





export const AutoComments = () => {

    const { video } = useParams();
    const titulo = video;
    const location = useLocation();
    const tabuladores = ["Comentarios", "Autobiográficos/Podcasts", "Eventos"];
    const [alturaPlayer, setAlturaPlayer] = useState(true);
    const [alturaPlayerMax, setAlturaPlayerMax] = useState(false);
    const CustomMenu = () => (
        <div className="menu-personalizado">
            <div><FontAwesomeIcon icon={faClone}></FontAwesomeIcon>&nbsp;Copiar</div>
            <div><FontAwesomeIcon icon={faReply}></FontAwesomeIcon>&nbsp;Responder</div>
            <div><FontAwesomeIcon icon={faBan}></FontAwesomeIcon>&nbsp;Quitar</div>
        </div>
    );
    useEffect(() => {
        console.log("Location changed");
        items = shuffleArray(items);
    }, [location]);
    const [elems, setItems] = useState(items);
    const bottomRef = useRef()
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    const [open, set] = useState(false)
    const categoriestitle = open ? "" : "Ver otros videos en esta categoría:";
    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '20%', backgroundColor: 'black' },
        to: {
            size: open ? '100%' : '20%',
            backgroundColor: open ? 'white' : 'black',
        },
    })
    const transApi = useSpringRef()
    const transition = useTransition(open ? catdata : [], {
        ref: transApi,
        trail: 400 / catdata.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })
    const imgApi = useSpringRef()
    const { ...opacidad } = useSpring({
        ref: imgApi,
        config: config.stiff,
        from: { opacity: '100%' },
        to: {
            opacity: open ? '0%' : '100%'
        }
    })

    useChain(open ? [springApi, transApi, imgApi] : [transApi, springApi, imgApi], [
        0,
        open ? 0.1 : 0.6,
    ])
    const handleScroll = (event) => {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
        if (bottomOfWindow && items.length < 500) {
            let item = items[Math.floor(Math.random() * items.length)];
            items = items.concat(item);
            setItems(items)
        }
        setHeightChat();

    }
    const [active, setActive] = useState(tabuladores[0]);
    const estableceTab = (parameter) => {

        if (parameter == active) {

            return { display: "block" }
        }
        return { display: "none" };
    }
    const [msjesChat, setMsjesChat] = useState({ chat: mensajes, show: false });
    const [texting, setTexting] = useState({ mensaje: '', write: false });
    const writeTextMessage = (message) => {
        if (message.length > 0) {
            setTexting({ mensaje: message, write: true });
        }
        else {
            setTexting({ mensaje: message, write: false })
        }
    }
    const setHeightChat = (param) => {
        const elementoVideo = document.querySelector('.player-container');
        const enfocado = isInViewport(elementoVideo);

        if (param && !enfocado) {
            setAlturaPlayerMax(!alturaPlayerMax);
            setAlturaPlayer(true);

        }
        else if (param && enfocado) {
            setAlturaPlayerMax(false);
            setAlturaPlayer(true);
        }
        else if (enfocado) {
            setAlturaPlayerMax(false);
            setAlturaPlayer(false);
        }
        else if (!enfocado) {
            setAlturaPlayer(true);
        }
    }
    const referencia = useRef();
    const [menuContextual, setMenuContextual] = useState({foucused:false,show:false});
    const handleContextMenu = (enfocado,bandera) => {
        setMenuContextual({focused:enfocado, show:bandera});
    }
    return (

        <div className='player-individual' onScroll={handleScroll}>
            {
                menuContextual.show ?
                    <ContextMenu menu={CustomMenu()} referencia={referencia} style={{ position: 'absolute', zIndex: '9999' }}></ContextMenu>
                    : null
            }
            <div style={{ backgroundColor: 'black', height: '100px' }} onContextMenu={(e) => handleContextMenu(false,false)}>
                <NavBar></NavBar>
                <SearchBar style={{ width: '60%' }}></SearchBar>
            </div>
            <h2 onContextMenu={(e) => handleContextMenu(false,false)}>
                Reproduciendo: {titulo}
            </h2>
            <div className='player-container' onContextMenu={(e) => handleContextMenu(false,false)}>
                <Player
                    ref={player => {
                        player = player;
                    }}>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"></source>
                    <ControlBar></ControlBar>
                    <LoadingSpinner></LoadingSpinner>
                </Player>
            </div>


            <div className='content-player'>
                <div className="break" onContextMenu={(e) => handleContextMenu(false,false)}>
                    {!open ?
                        <h3 style={{ color: "lightgray", position: 'relative', borderBottom: '1px solid black' }}>{categoriestitle}</h3>
                        : null}
                </div>
                <div className='tabuladores-repro' onContextMenu={(e) => handleContextMenu(false,false)}>
                    <ButtonGroup>
                        {
                            tabuladores.map(type => (
                                <Tab
                                    key={type}
                                    active={active === type}
                                    onClick={() => { setActive(type); }}
                                >
                                    {type}
                                </Tab>
                            ))
                        }
                    </ButtonGroup>
                </div>
                <div className='category-player' onContextMenu={(e) => handleContextMenu(false,false)}>

                    <div className="category-wrapper">
                        <animated.div
                            style={{ ...rest, width: size, height: size }}
                            className="category-container"
                            onClick={() => set(open => !open)}>
                            {transition((style, item) => (
                                <animated.div
                                    className="category-item"
                                    style={{ ...style, background: item.css, backgroundImage: item.image, backgroundPosition: 'center center', backgroundSize: '200px' }}
                                ><Vinculo to={'/Reproduccion/' + item.url} /></animated.div>
                            ))}
                            <p>
                                <span style={{ color: 'red', display: 'inline-block', margin: 'auto' }}>{open ? "" : <animated.img src="/images/Stills/Categories/PLAY_OVER.png"
                                    style={{ ...opacidad, width: '5em', position: 'absolute', top: '30%', left: '25%' }} />}</span>
                            </p>
                        </animated.div>
                    </div>
                </div>
                <div className="scroll-list" onContextMenu={(e) => handleContextMenu(false,false)} ref={bottomRef} style={estableceTab(tabuladores[0])}>
                    {elems &&
                        elems.map((item, index) => (
                            <div key={index}>
                                <h4>{item.titulo}</h4>
                                <p>{`${index + 1}. ${item.content}`}</p>
                            </div>
                        ))}
                    <div className="list-bottom"></div>
                </div>
                <div className='scroll-list' onContextMenu={(e) => handleContextMenu(false,false)} style={estableceTab(tabuladores[1])}>Podcasts</div>
                <div className='scroll-list' onContextMenu={(e) => handleContextMenu(false,false)} style={estableceTab(tabuladores[2])}>Eventos</div>
                <div className={alturaPlayer && alturaPlayerMax ? "chat" : alturaPlayer && !alturaPlayerMax ? "chat-min" : "chat-hidden"}>
                    <div className='top-chat' onClick={(e) => { setHeightChat(true); handleContextMenu(false,false); }} onContextMenu={(e) => handleContextMenu(false,false)}>
                        <p><FontAwesomeIcon icon={faComment}></FontAwesomeIcon>&nbsp; Chat de Interneta
                        </p>
                        {alturaPlayer && alturaPlayerMax ?
                            <span>
                                <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon></span>
                            : alturaPlayer ? <span><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></span>
                                : null
                        }
                    </div>
                    <div className='content-chat'>
                        {alturaPlayer && alturaPlayerMax ? msjesChat.chat.map(function (msj, index) {
                            return (
                                <div className='origen-mensaje-chat' ref={referencia} key={(index + "-" + msj.autor)}
                                    onContextMenu={(e) => handleContextMenu(true,true)} onMouseEnter={(e) => handleContextMenu(true,true)}>
                                    <span style={{ gridColumn: "1" }}>{msj.autor} &nbsp; {msj.fecha}</span>
                                    <span style={{ gridColumn: "2" }} title="Reaccionar"><FontAwesomeIcon icon={faFaceSmile}></FontAwesomeIcon></span>
                                    <div className='mensaje-chat-other'>
                                        {msj.mensaje}
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className='chat-input' onContextMenu={(e) => handleContextMenu(false,false)}>
                        <input type="text" onKeyUp={(e) => { writeTextMessage(e.target.value) }} onBlur={(e) => { writeTextMessage(e.target.value) }}></input>
                        <div className='chat-input-actions'>
                            <button>{texting.write ?
                                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon> :
                                <FontAwesomeIcon icon={faMicrophoneLines}></FontAwesomeIcon>
                            }</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}