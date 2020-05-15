import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className = 'ma3 nt0'>
            <Tilt className="Tilt shadow-2 br2 pa3" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3 "> <img style = {{paddingTop: '5px'}} alt = "logo" src = {brain} /></div>
            </Tilt>
        </div>
    )
}

export default Logo;
