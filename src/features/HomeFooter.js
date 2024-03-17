import React, { useState } from 'react'
const HomeFooter = (props) => {
    return (
        <div className='footer-site footer-site-black' style={{ WebkitBorderTopRightRadius: '20px', width: '100%', margin: 'auto', borderTopLeftRadius: '20px', paddingBottom: '2em', opacity: '100%' }}>
            <div className='empty-container'></div>
            <div className='logos-sociales-footer'>
                <div className="spline-logos-sociales-footer-1"></div>
                <a href="https://www.facebook.com/internetamx/" target="_blank">Facebook&nbsp;<img src="/images/SocialNetwork/facebook_logo.png" alt="Búscanos en facebook" /></a>
                <a href="https://www.instagram.com/internetamx/" target="_blank">Instagram&nbsp;<img src="/images/SocialNetwork/instagram_gradient.png" alt="Búscanos en instagram" /></a>
                <div className="spline-logos-sociales-footer-2"></div>
            </div>
            <div className='logos-patrocinadores-footer'>
                <div className='logo-sec-cultura'>

                </div>
                <div className='logo-imcine'>

                </div>
                <div className='logo-focine'>

                </div>

            </div>
        </div>
    )
}
export { HomeFooter }