import React from 'react'
import { HomeFooter } from './HomeFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export class Home extends React.Component {
    state = {
        categoriasService: [],
        videosList: [],
        habilitarLoader: false,
        habilitarLoaderCategories: false,
        creditosvideo: { id: 0, sinopsis: '' }
    }  
    componentDidMount() {
        this.setState({
            ...this.state,
            habilitarLoader: true,
            habilitarLoaderCategories: true
        });
    }
    render() {
        
        //console.log('en home ', this.context)
        return (
            <div className='baja-home'>
                
                    <div className='header-baja-home'>
                        
                    </div>
                    <div className='content-baja-home'>
                    <div className='text-baja-home'><p>Por motivos de mantenimiento y rediseño del proyecto del sitio web del Acervo, este sitio no estará disponible hasta nuevo aviso.</p>
                    </div>
                    </div>
                    <div className='footer-baja-home'>
                        <HomeFooter></HomeFooter>
                        </div>
            </div>
        )
    }
}
