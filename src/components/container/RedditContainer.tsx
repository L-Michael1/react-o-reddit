import React, { useState, useEffect, useCallback } from 'react';
import { uuid } from 'uuidv4';
import axios from 'axios'

// Components
import Header from '../header/Header'
import Posts from '../posts/Posts';

// Types/Interfaces

type PostType = {
    kind: string;
    data: {
        title: string;
    };
}

type PostsType = Array<PostType>;


const RedditContainer = () => {

    const [posts, setPosts] = useState<PostsType>([]);

    const [subreddit, setSubreddit] = useState('wallpapers/hot.json');

    const [url, setUrl] = useState(`https://www.reddit.com/r/${subreddit}`)

    const handleFetchPosts = useCallback(async () => {
        try {
            const result = await axios.get(url);
            console.log(result.data.data.children)
            setPosts(result.data.data.children);
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

    const handleSearchChange = (subreddit: string) => {
        setSubreddit(subreddit);
    }

    return (
        <div>
            <Header />
            <Posts posts={posts} />
        </div>
    )
}

export default RedditContainer;