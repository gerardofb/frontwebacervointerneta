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
const AvisoPrivacidad = (props) => {
    useEffect(() => {
        isInViewportMenu();
        
    });
    return (
        <div>
            <NavBar></NavBar>
            <div className='aviso-privacidad'>
                <h3>AVISO DE PRIVACIDAD</h3>
                <p>Con referencia a los datos personales solicitados por el Acervo Audiovisual InterNeta, lo hacemos con la finalidad de estar en contacto con usted, cumplir con su objeto social, para
                    enviarle información sobre la página web de nuestra iniciativa cultural, darle accesibilidad a nuestras producciones e información complementaria sobre éstas. Así como informarle y comunicarle sobre nuestros eventos y convocatorias e iniciativas amigas.
                    En caso de formalizar con usted la aceptación de la información y accesibilidad ofrecida por el Acervo InterNeta se le comunica que:
                </p>
                <ul>
                    <li>Los datos serán tratados de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento. Usted tiene derecho al acceso, actualización, rectificación y/o supresión de los Datos Personales de los cuales sea titular en nuestra base de datos.</li>
                    <li>La confidencialidad de los datos está garantizada y los mismos están protegidos por medidas de seguridad administrativas, técnicas y físicas para evitar su daño, pérdida, alteración, destrucción, uso, acceso o divulgación indebida.</li>
                    <li>Únicamente las personas autorizadas tendrán acceso a sus datos. </li>
                    <li>Cuando ingresa su dirección de correo electrónico en nuestro sitio web para iniciar sesión no podremos compartir su información. Asimismo tiene derecho a retirar su consentimiento u optar por no recibir el procesamiento de sus datos personales en cualquier momento.</li>
                    <li>El presente Aviso de Privacidad puede cambiar o actualizarse periódicamente; en apego a la legislación vigente.</li>
                    <li>Usted podrá ejercer los derechos de acceso, rectificación, cancelación y oposición al tratamiento de sus datos, o bien, la petición de limitación de uso y divulgación de sus datos, presentando su solicitud a través del correo electrónico de interneta; el cual es <a href='mailto:internetamx@gmail.com'>internetamx@gmail.com</a></li>
                </ul>
            </div>
            <HomeFooter></HomeFooter>
        </div>
    )
}
export default AvisoPrivacidad;