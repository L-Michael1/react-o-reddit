import React from 'react';
import github from '../../assets/github.png'

const Footer = () => {
    return (
        <div className='mb-3'>
            <a href='https://github.com/L-Michael1/react-o-reddit' target='_blank'>
                <img className='rounded d-block mx-auto mb-2' src={github} width='5%' height='100%' />
            </a>
            <div className='d-flex justify-content-center'>
                <p>Peep the source!</p>
            </div>
        </div>
    )
}

export default Footer;