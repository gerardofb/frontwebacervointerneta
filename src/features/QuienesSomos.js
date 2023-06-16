import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { HomeFooter } from './HomeFooter';
function isInViewportMenu() {
    const menusuperior = document.querySelector('.container-menu-main')
    const barranav = document.querySelector('.navbar-principal');
    const rect = barranav.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    // console.log('datos de video encabezado', rect.top, rect.left, rect.bottom, rect.right)
    // console.log('limite datos de video encabezado ', Math.round(scrollTop - rect.top))
    if (Math.round(scrollTop - rect.top) <= 0) {
        menusuperior.style.display = 'block'

    }
    else {
        menusuperior.style.display = 'none'
    }

}
const QuienesSomos = (props) => {
    useEffect(() => {
        isInViewportMenu();

    });
    return (
        <div>
            <NavBar></NavBar>
            <div className='quienes-somos-content'>
                <div className='quienes-somos-body'>
                    <div className='quienes-somos-header'>
                        <h3>¿Quiénes somos?</h3>
                        <hr className='quienes-somos' />
                    </div>
                    <p>Con la producción audiovisual generada a lo largo de tres décadas por quienes integramos el colectivo de videastas <strong>InterNeta</strong> estructuramos el <strong>Acervo Audiovisual InterNeta. Memoria de las y los invisibles.</strong> Las piezas y registros que componen éste acervo es resultado de coproducciones y talleres de capacitación en comunidades tanto urbanas como indígenas y originarias así como con movimientos contraculturales, bajo una metodología que hemos llamado “video proceso” o “inter-invención”.    En caso de formalizar con usted la aceptación de la información y accesibilidad ofrecida por el Acervo InterNeta se le comunica que:
                    </p>
                    <p>El acervo esta conformado por 226 documentos audiovisuales con una duración de entre tres y ochenta minutos, los cuales fueron producidos y coproducidos con los grupos y comunidades asentadas en la metrópoli de la ciudad de México y municipios colindantes del Estado de México, Puebla y Querétaro, así como en los estados de Baja California Norte, Colima, Nuevo León, Oaxaca y Veracruz. Los géneros de video utilizados son el testimonio y documental, docudrama y ficción, videoarte y videoclip, y algunos ejercicios de hibridación de géneros e intervención sobre el espacio urbano.</p>
                    <p>Entre los grupos urbanos con los cuales hemos interactuado para estos productos están: los colectivos punks, grupos de música urbana, agrupaciones de arte urbano, crews de grafiteros, grupos cannábicos, organizaciones sociales y culturales de colonias populares, pueblos originarios y unidades habitaciones de la ciudad, así como organizaciones de indígenas migrantes, productores artesanales, organizaciones comunitarias en defensa del territorio, movimientos alternativos de música y danza contemporánea, entre otros.</p>
                    <p>El Acervo Audiovisual InterNeta tiene el propósito de generar un espacio de accesibilidad tanto online como offline, capaz de retroalimentar, devolver y activar dialógicamente las creaciones –en este caso de saberes, creaciones, memorias, “haceres”, prácticas- producidas por y con las comunidades y colectivos involucrados.</p>
                    <p>El sitio permite acceder a trailers de algunas producciones representativas del Acervo Audiovisual InterNeta, clasificadas en siete categorías; Arte Urbano, Memoria y Movimiento Urbano Popular, Generación Transparente, Movimientos Contraculturales, Movimientos Políticos y Sociales, y Pueblos Indígenas y Originarios. </p>
                    <p>Sí estas interesado en conocer la obra completa del video de tu interés, así como para acceder a la base de datos completa deberás comunicarte directamente con nosotros a través de nuestros correos y redes sociales. Bienvenidxs</p>
                </div>
            </div>
            <HomeFooter></HomeFooter>
        </div>
    )
}
export default QuienesSomos;