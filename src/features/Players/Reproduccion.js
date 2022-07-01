import React, { useEffect, useRef, useState } from 'react'
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
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
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
        url:"Screenshot_1",
        height: 200,
    },
    {
        name: 'Saint Petersburg',
        description: '#f5f7fa → #c3cfe2',
        css: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        image: 'url("/images/Classification/Cat_2.png")',
        url:"Screenshot_3",
        height: 400,
    },
    {
        name: 'Deep Blue',
        description: '#e0c3fc → #8ec5fc',
        css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        image: 'url("/images/Classification/Cat_3.png")',
        url:"Screenshot_8",
        height: 400,
    },
    {
        name: 'Ripe Malinka',
        description: '#f093fb → #f5576c',
        css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'url("/images/Classification/Cat_4.png")',
        url:"Screenshot_28",
        height: 400,
    },
    {
        name: 'Perfect White',
        description: '#fdfbfb → #ebedee',
        css: 'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
        image: 'url("/images/Classification/Cat_5.png")',
        url:"Screenshot_29",
        height: 400,
    },
    {
        name: 'Near Moon',
        description: '#5ee7df → #b490ca',
        css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        image: 'url("/images/Classification/Cat_6.png")',
        url:"Screenshot_30",
        height: 400,
    },
    {
        name: 'Wild Apple',
        description: '#d299c2 → #fef9d7',
        css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        image: 'url("/images/Classification/Cat_7.png")',
        url:"Screenshot_31",
        height: 200,
    },
    {
        name: 'Ladoga Bottom',
        description: '#ebc0fd → #d9ded8',
        css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
        image: 'url("/images/Classification/Cat_8.png")',
        url:"Screenshot_42",
        height: 400,
    },
    {
        name: 'Sunny Morning',
        description: '#f6d365 → #fda085',
        css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        image: 'url("/images/Classification/Cat_9.png")',
        url:"Screenshot_48",
        height: 200,
    },
    {
        name: 'Lemon Gate',
        description: '#96fbc4 → #f9f586',
        css: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
        image: 'url("/images/Classification/Cat_10.png")',
        url:"Screenshot_49",
        height: 400,
    },
    {
        name: 'Salt Mountain',
        description: ' #FFFEFF → #D7FFFE',
        css: 'linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)',
        image: 'url("/images/Classification/Cat_11.png")',
        url:"Screenshot_67",
        height: 200,
    },
    {
        name: 'New York',
        description: ' #fff1eb → #ace0f9',
        css: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
        image: 'url("/images/Classification/Cat_12.png")',
        url:"Screenshot_68",
        height: 400,
    },
    {
        name: 'Soft Grass',
        description: ' #c1dfc4 → #deecdd',
        css: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        image: 'url("/images/Classification/Cat_13.png")',
        url:"Screenshot_69",
        height: 400,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_14.png")',
        url:"Screenshot_70",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_15.png")',
        url:"Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_16.png")',
        url:"Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_17.png")',
        url:"Screenshot_71",
        height: 200,
    },
    {
        name: 'Japan Blush',
        description: ' #ddd6f3 → #faaca8',
        css: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)',
        image: 'url("/images/Classification/Cat_18.png")',
        url:"Screenshot_71",
        height: 200,
    },
]

export const AutoComments = () => {
    const urlplay = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/Stills/Categories/${name}.png${wrap ? ')' : ''}`;
    const { video } = useParams();
    const titulo = video;
    const [elems, setItems] = useState(items);
    const bottomRef = useRef()
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    const [open, set] = useState(false)
    const categoriestitle = open? "" : "Ver otros videos en esta categoría:";
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
    const {...opacidad} = useSpring({
        ref:imgApi,
        config:config.stiff,
        from:{opacity:'100%'},
        to:{
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
        console.log(Math.round(scrollTop) + innerHeight, offsetHeight);
        if (bottomOfWindow && items.length < 500) {
            let item = items[Math.floor(Math.random() * items.length)];
            items = items.concat(item);
            setItems(items)
            console.log('estableciendo ' + elems.length + " " + items.length);
        }
    }

    return (


        <div className='player-individual' onScroll={handleScroll}>
            <div style={{ backgroundColor: 'black', height: '100px' }}>
                <NavBar></NavBar>
                <SearchBar style={{ width: '60%' }}></SearchBar>
            </div>
            <h2>
                Reproduciendo: {titulo}
            </h2>
            <div className='player-container'>
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
                <div className='category-player'>
                    {!open?
                <h3 style={{color:"lightgray", position:'relative', borderBottom:'1px solid black'}}>{categoriestitle}</h3>
                :null}
                    <div className="category-wrapper">
                        <animated.div
                            style={{ ...rest, width: size, height: size }}
                            className="category-container"
                            onClick={() => set(open => !open)}>
                            {transition((style, item) => (
                                <animated.div
                                    className="category-item"
                                    style={{ ...style, background: item.css, backgroundImage: item.image, backgroundPosition: 'center center', backgroundSize: '200px' }}
                                ><Vinculo to={'/Reproduccion/'+item.url}/></animated.div>
                            ))}
                            <p>
                                <span style={{ color: 'red', display: 'inline-block', margin: 'auto' }}>{open ? "" : <animated.img src="/images/Stills/Categories/PLAY_OVER.png" 
                                style={{...opacidad, width:'5em', position:'absolute', top:'30%', left:'25%'}} />}</span>
                            </p>
                        </animated.div>
                    </div>
                </div>
                <div className="scroll-list" ref={bottomRef} >
                    {elems &&
                        elems.map((item, index) => (
                            <div key={index}>
                                <h4>{item.titulo}</h4>
                                <p>{`${index + 1}. ${item.content}`}</p>
                            </div>
                        ))}
                    <div className="list-bottom"></div>
                </div>
            </div>
        </div>
    )
}