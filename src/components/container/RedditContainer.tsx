import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios'
import { v4 as uuid_v4 } from "uuid";

// Components
import Header from '../header/Header'
import Posts from '../posts/Posts';

// Types/Interfaces
type Resolution = {
    height: number;
    url: string;
    width: number;
}

type Resolutions = Array<Resolution>

type Image = {
    id: string;
    resolutions: Resolutions;
    source: {
        height: number;
        url: string;
        width: number;
    }
}

type Images = Array<Image>

type PostType = {
    id: string;
    kind: string;
    data: {
        title: string;
        preview: {
            enabled?: boolean;
            images: Images
        }
    };
}

type PostsType = Array<PostType>;

type PostsState = {
    data: PostsType;
    isLoading: boolean;
    isError: boolean;
};

interface PostsFetchInitAction {
    type: 'POSTS_FETCH_INIT';
}

interface PostsFetchSuccessAction {
    type: 'POSTS_FETCH_SUCCESS';
    payload: PostsType;
}

interface PostsFetchFailedAction {
    type: 'POSTS_FETCH_FAILED';
}

type PostsActions =
    | PostsFetchInitAction
    | PostsFetchSuccessAction
    | PostsFetchFailedAction;

const postsReducer = (state: PostsState, action: PostsActions) => {
    switch (action.type) {
        case 'POSTS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'POSTS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isErorr: false,
                data: action.payload,
            }
        case 'POSTS_FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                isErorr: true,
            }
        default:
            return state;
    }
}

const RedditContainer = () => {

    const [posts, dispatchPosts] = useReducer(
        postsReducer,
        { data: [], isLoading: false, isError: false }
    );

    const [subreddit, setSubreddit] = useState('wallpapers/hot.json');

    const [url, setUrl] = useState(`https://www.reddit.com/r/${subreddit}`)

    // On mount and on url change, fetch data
    const handleFetchPosts = useCallback(async () => {
        dispatchPosts({
            type: 'POSTS_FETCH_INIT'
        })
        try {
            const result = await axios.get(url);
            const posts = result.data.data.children;

            posts.forEach((post: PostType) => {
                post.id = uuid_v4();
            })

            console.log(posts)
            dispatchPosts({
                type: 'POSTS_FETCH_SUCCESS',
                payload: posts
            });

        } catch (err) {
            console.error(err);
            dispatchPosts({
                type: 'POSTS_FETCH_FAILED',
            })
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
            {posts.isLoading ? <p>Loading...</p> : <Posts posts={posts.data} />}
        </div>
    )
}

export default RedditContainer;