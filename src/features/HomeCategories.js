import React, { useState } from 'react'
import { useSpring,animated } from 'react-spring'
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/Stills/${name}.png${wrap ? ')' : ''}`;
const imagenes = ['Categoria_uno','Categoria_dos','Categoria_tres','Categoria_cuatro','Categoria_cinco','Categoria_seis','Categoria_siete'];
const headerscategories = ['Pueblos indígenas y originarios cultura','Pueblos indígenas y originarios cultura y producción',
'Pueblos indígenas y originarios derechos humanos','Pueblos indígenas y originarios fiestas patronales',
'Pueblos indígenas y originarios memoria colectiva',
'Pueblos indígenas y originarios proyectos ambientales',]
const headercolors = [
    '#205a17',
    '#540000',
    '#00005e',
    '#4d3668',
    '#68341c',
    '#528c00'
]

const HomeCategories = (props)=>{
    const [flip,setFlip] = useState(false);
    const [fliptext,setFlipText] = useState(false);
    const [distance,setDistance] = useState(0);
    const [distancetext,setDistanceText] = useState(0);
    const styles = useSpring({
        from:{x:0},
        to:{x:distance},
        reverse:flip
    })
    const stylesText = useSpring({
        from:{x:0},
        to:{x:distancetext},
        reverse:flip
    })
    const forward = (distancia)=>{
        if(distance > -(distancia*5)){
        setFlip(false);
        setDistance(distance-distancia);
        }
        else {
        setFlip(true);
        setDistance(0);
        }
    }
    const forwardText = (distancia)=>{
        if(distancetext > -(distancia * 5)){
        setFlipText(false);
        setDistanceText(distancetext-distancia);
        }
        else{
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
        <div style={{marginTop:'5px'}}>
        <h1 style={{color:'white'}}>Categorías</h1>
        <animated.svg height="30" width="1280">
      <line x1="50" y1="30" x2="1280" y2="30" strokeDashoffset={x.to(x => (1 - x) * 156)} style={{stroke:'rgb(128,128,128)', strokeWidth:'2'}} />
    </animated.svg>
    </div>
        <div
        onClick={(e=>{forward(550); forwardText(1060)})}
        style={{width:'90%', overflow:'hidden', marginLeft:'auto', marginRight:'auto', marginTop:'15px'}}><animated.div style={{
        width:'500%',
        height:'100%',
        position:'relative',
        ...styles}}>
        {imagenes.map(function(el,index){
            return (
                <div key={index} style={{float:'left',margin:'25px', padding:'25px', display:'block', backgroundColor:'#abffd2'}}>
                    <img src={url(el)} style={{width:'450px', height:'337px'}}></img>
                </div>
            )
        })}
        <div style={{clear:'both'}}></div>
    </animated.div>
    </div>
    <div
    style={{width:'90%', overflow:'hidden', marginLeft:'auto', display:'grid', gridTemplateRows:'5fr', marginRight:'auto'}}>
        <animated.div style={{
            width:'700%',
            height:'100%',
            position:'relative',
            ...stylesText
        }}>
            {
                headerscategories.map(function(el,index){
                    return (
                        <div  key={index} style={{float:'left',margin:'25px', padding:'25px', display:'block', width:'960px', textAlign:'left', color:'white', backgroundColor:headercolors[index]}}>
                            <h1>{el}</h1>
                            <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut felis lorem, dapibus sed sapien eget, placerat fermentum nisl. Fusce at erat justo. Duis facilisis aliquam sodales. Integer tristique arcu et enim congue dictum. Duis volutpat quam lorem, sit amet lobortis sapien posuere nec. Duis non vulputate mi, ut dignissim nibh. Sed scelerisque efficitur nunc, nec sagittis mauris ultrices non. Nam molestie facilisis tempus. Pellentesque ac aliquet magna. Vestibulum sed dapibus orci. Sed suscipit ipsum at sapien volutpat egestas.

Nam quis fringilla nisl. Nunc accumsan in dolor id pellentesque. Cras interdum felis vel venenatis maximus. Phasellus quis ante eget felis lobortis faucibus. Ut urna neque, suscipit vitae tempus a, lobortis ut urna. Suspendisse id nulla quis lectus euismod commodo sed blandit diam. Quisque vitae posuere sem. Donec ante turpis, tempus at nisi ac, hendrerit finibus nibh.</p>
                            </div>
                    )
                })
            }
            <div style={{clear:'both'}}></div>
        </animated.div>
    </div>
    </div>)
}
export {HomeCategories}