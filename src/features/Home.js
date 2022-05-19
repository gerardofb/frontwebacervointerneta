import React from 'react'
import Parallax from 'react-springy-parallax'
import { BigPlayButton, ControlBar, LoadingSpinner, Player, PlayToggle } from 'video-react'
import { HomeCategories } from './HomeCategories'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`

export class Home extends React.Component{
    render(){
        return(
            <Parallax className="bodyHome"
            ref={ref=> this.parallax = ref}
            pages={4}
            scrolling={true}>
                <Parallax.Layer offset={2} speed={1} style={{backgroundColor:'#7291d8'}} />
                <Parallax.Layer offset={3} speed={1} style={{backgroundColor:'#1f3871'}} />
                <Parallax.Layer offset={5} speed={1} style={{backgroundColor:'#eaeff9'}} />

                <Parallax.Layer
                    offset={0} speed={0} factor={4}
                    style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }}
                />

                <Parallax.Layer offset={1.3} speed={0.8} style={{pointerEvents:'none'}}>
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'20%', marginLeft:'55%', opacity:'40%'}} />
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'10%', marginLeft:'25%', opacity:'40%'}} />
                </Parallax.Layer>
                <Parallax.Layer offset={1.95} speed={0.5} style={{pointerEvents:'none'}}>
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'20%', marginLeft:'55%', opacity:'40%'}} />
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'30%', marginLeft:'25%', opacity:'40%'}} />
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'10%', marginLeft:'85%', opacity:'40%'}} />
                </Parallax.Layer>
                <Parallax.Layer offset={2.75} speed={0.5} style={{pointerEvents:'none'}}>
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'20%', marginLeft:'55%', opacity:'40%'}} />
                    <img alt='fondo' src={url('cloud')} style={{display:'block', width:'20%', marginLeft:'25%', opacity:'40%'}} />
                </Parallax.Layer>

                <Parallax.Layer offset={0} speed={0} style={{display:'flex'}}>
                <Player autoPlay
                ref={player => {
                    this.player = player;
                  }}
                muted>
                    <BigPlayButton position={"center"} style={{display:'none'}}/>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"></source>
            <ControlBar disableCompletely={false}></ControlBar>
            <LoadingSpinner></LoadingSpinner>
      </Player>
                </Parallax.Layer>
                  <Parallax.Layer offset={1} speed={0} style={{display:'flex'}}>
                      <HomeCategories></HomeCategories>
                  </Parallax.Layer>
            </Parallax>
        )
    }
}