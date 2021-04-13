import React from 'react';

interface HeaderProps {
    subreddit: string;
}

const Header = ({ subreddit }: HeaderProps) => {
    return (
        <div>
            <h1 className="d-flex justify-content-center">React-O-Reddit</h1>
            <h1 className="d-flex justify-content-center">{subreddit}</h1>
        </div>
    )
}

export default Header;