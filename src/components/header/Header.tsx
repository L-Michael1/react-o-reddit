import React from 'react';
import './Header.css';
import reddit from '../../assets/reddit.png'

interface HeaderProps {
    subreddit: string;
}

const Header = ({ subreddit }: HeaderProps) => {
    return (
        <div className='header'>
            <a href='https://reddit.com' target='_blank' rel="noopener noreferrer"><img className='d-block mx-auto pt-3 pb-3' style={{ width: '100%', maxWidth: '100px', height: 'auto' }} src={reddit} alt='reddit'></img></a>
            <h1 className="d-flex justify-content-center">React-O-Reddit</h1>
            <h1 className="d-flex justify-content-center">{subreddit}</h1>
        </div>
    )
}

export default Header;