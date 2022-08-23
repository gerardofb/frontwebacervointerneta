import React, { createContext } from 'react';
import { ThemeContext } from 'styled-components';
const estilos = {
    basic: {
        BodyHome:'bodyHome-basic',
        FirstLayerHome: 'first-layer-home-basic',
        SecondLayerHome: 'second-layer-home-basic',
        ThirdLayerHome: 'third-layer-home-basic',
        NavbarPrincipal: 'navbar-principal-basic  navbar-principal',
        ControlTematicoBtn:'header-control-temas-basic',
        SearchBarMain: 'search-bar-main-basic',
        SearchBarBtn:'search-bar-main-icon-basic',
        FirstLayerCategory:'first-layer-category-basic',
        SecondLayerCategory:'second-layer-category-basic',
        ThirdLayerCategory:'third-layer-category-basic',
        FourthLayerCategory:'fourth-layer-category-basic',
        FifthLayerCategory:'fifth-layer-category-basic',
        MainBodyCategory:'main-body-categories-basic',
        CategoryCard:'category-cards-basic',
        OpcionesAutobiograficosReprod:'options-autobiograficos-reproduccion-basic',
        AutoBiograficoMain:'autobiografico-main-basic',
        AutoBiograficoMainMenuEntry:'autobiografico-main-menu-entry-basic'
    },
    aesthetic: {
        BodyHome:'bodyHome-aesthetic',
        FirstLayerHome: 'first-layer-home-aesthetic',
        SecondLayerHome: 'second-layer-home-aesthetic',
        ThirdLayerHome: 'third-layer-home-aesthetic',
        NavbarPrincipal: 'navbar-principal-aesthetic  navbar-principal',
        ControlTematicoBtn:'header-control-temas-aesthetic',
        SearchBarMain: 'search-bar-main-aesthetic',
        SearchBarBtn:'search-bar-main-icon-aesthetic',
        FirstLayerCategory:'first-layer-category-aesthetic',
        SecondLayerCategory:'second-layer-category-aesthetic',
        ThirdLayerCategory:'third-layer-category-aesthetic',
        FourthLayerCategory:'fourth-layer-category-aesthetic',
        FifthLayerCategory:'fifth-layer-category-aesthetic',
        MainBodyCategory:'main-body-categories-aesthetic',
        CategoryCard:'category-cards-aesthetic',
        OpcionesAutobiograficosReprod:'options-autobiograficos-reproduccion-aesthetic',
        AutoBiograficoMain:'autobiografico-main-aesthetic',
        AutoBiograficoMainMenuEntry:'autobiografico-main-menu-entry-aesthetic'
    },
    basicDark: {
        BodyHome:'bodyHome-basic',
        FirstLayerHome: 'first-layer-home-basic',
        SecondLayerHome: 'second-layer-home-basic',
        ThirdLayerHome: 'third-layer-home-basic',
        NavbarPrincipal: 'navbar-principal-basic-dark  navbar-principal',
        ControlTematicoBtn:'header-control-temas-basic-dark',
        SearchBarMain: 'search-bar-main-basic-dark',
        SearchBarBtn:'search-bar-main-icon-basic-dark',
        FirstLayerCategory:'first-layer-category-basic',
        SecondLayerCategory:'second-layer-category-basic',
        ThirdLayerCategory:'third-layer-category-basic',
        FourthLayerCategory:'fourth-layer-category-basic',
        FifthLayerCategory:'fifth-layer-category-basic',
        MainBodyCategory:'main-body-categories-basic',
        CategoryCard:'category-cards-basic',
        OpcionesAutobiograficosReprod:'options-autobiograficos-reproduccion-basic',
        AutoBiograficoMain:'autobiografico-main-basic',
        AutoBiograficoMainMenuEntry:'autobiografico-main-menu-entry-basic'
    },
    aestheticDark: {
        BodyHome:'bodyHome-aesthetic',
        FirstLayerHome: 'first-layer-home-aesthetic',
        SecondLayerHome: 'second-layer-home-aesthetic',
        ThirdLayerHome: 'third-layer-home-aesthetic',
        NavbarPrincipal: 'navbar-principal-aesthetic-dark  navbar-principal',
        ControlTematicoBtn:'header-control-temas-aesthetic-dark',
        SearchBarMain: 'search-bar-main-aesthetic-dark',
        SearchBarBtn:'search-bar-main-icon-aesthetic-dark',
        FirstLayerCategory:'first-layer-category-aesthetic',
        SecondLayerCategory:'second-layer-category-aesthetic',
        ThirdLayerCategory:'third-layer-category-aesthetic',
        FourthLayerCategory:'fourth-layer-category-aesthetic',
        FifthLayerCategory:'fifth-layer-category-aesthetic',
        MainBodyCategory:'main-body-categories-aesthetic',
        CategoryCard:'category-cards-aesthetic',
        OpcionesAutobiograficosReprod:'options-autobiograficos-reproduccion-aesthetic',
        AutoBiograficoMain:'autobiografico-main-aesthetic',
        AutoBiograficoMainMenuEntry:'autobiografico-main-menu-entry-aesthetic'
    },
}
export const ThemesContext = createContext({
    styles: 
        {
            FirstLayerHome: '',
            SecondLayerHome: '',
            ThirdLayerHome: '',
            NavbarPrincipal: '',
            SearchBarMain: 'search-bar-main-basic',
        },
    updateTheme : ()=>{}
})

export class ThemeProvider extends React.Component {
    updateTheme = themeName => {
        this.setState({styles:estilos[themeName]});
    }
    state = {
        styles: estilos.basic,
        updateTheme: this.updateTheme
    }
    render(){
        return <ThemesContext.Provider value={this.state}>
            {
                this.props.children
            }
        </ThemesContext.Provider>
    }
}

export const ThemeConsumer = ThemeContext.Consumer;