import React from 'react';
import './Header.css';

interface HeaderProps {
    subreddit: string;
}

const Header = ({ subreddit }: HeaderProps) => {
    return (
        <div className='header'>
            <h1 className="d-flex justify-content-center">React-O-Reddit</h1>
            <h1 className="d-flex justify-content-center">{subreddit}</h1>
        </div>
    )
}

export default Header;