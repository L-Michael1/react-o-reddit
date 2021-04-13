import React, { useState, useEffect, useCallback } from 'react';
import { uuid } from 'uuidv4';
import axios from 'axios'

// Components
import Header from '../header/Header'

const RedditContainer = () => {

    const [posts, setPosts] = useState([]);

    const [url, setUrl] = useState('https://www.reddit.com/r/wallpapers/hot.json')

    const handleFetchPosts = useCallback(async () => {
        try {
            const result = await axios.get(url);
            console.log(result.data.data.children)
            setPosts(result.data.children);
        } catch (err) {
            console.error(err);
        }
    }, [url]);

    useEffect(() => {
        handleFetchPosts();
    }, [handleFetchPosts])

    const handleUrlChange = (url: string) => {
        setUrl(url);
    }

    return (
        <div>
            <Header />
        </div>
    )
}

export default RedditContainer;