import React, { useEffect, useRef, useState } from 'react'
import { BigPlayButton, ControlBar, LoadingSpinner, Player, PlayToggle } from 'video-react'
import { useParams } from 'react-router-dom'
import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
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

export const AutoComments = () => {
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
                <div className='categories-player'></div>
            </div>
        </div>


    )
}