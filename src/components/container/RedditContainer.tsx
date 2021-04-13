import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { v4 as uuid_v4 } from "uuid";
import axios from 'axios'
import './RedditContainer.css'

// Components
import Header from '../header/Header'
import Posts from '../posts/Posts';
import Form from '../form/Form'

// Types/Interfaces
type PostType = {
    id: string;
    kind: any;
    data: {
        title: string;
        author: string;
        url: string;
        permalink: string;
        preview: any;
        over_18: any;
        score: number;
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

    // 'best', 'hot', 'new', 'top', 'controversial', 'rising'
    const [listing, setListing] = useState('best');

    // Any subreddit
    const [subreddit, setSubreddit] = useState(`wallpapers`);

    // Endpoint to fetch data in combination with user's chosen subreddit + listing type
    const API_ENDPOINT = `https://www.reddit.com/r/${subreddit}/${listing}.json`

    // On mount and on url change, fetch data
    const handleFetchPosts = useCallback(async () => {
        dispatchPosts({
            type: 'POSTS_FETCH_INIT'
        })
        try {
            const result = await axios.get(API_ENDPOINT);
            const posts = result.data.data.children;

            posts.forEach((post: PostType) => {
                post.id = uuid_v4();
            })

            // console.log(posts)
            console.log(result.data)
            dispatchPosts({
                type: 'POSTS_FETCH_SUCCESS',
                payload: posts
            });

        } catch (err) {
            console.log('why');
            console.error(err);
            dispatchPosts({
                type: 'POSTS_FETCH_FAILED',
            })
        }
    }, [subreddit]);

    useEffect(() => {
        handleFetchPosts();
    }, [handleFetchPosts])

    const handleSubmit = (sub: string) => {
        setSubreddit(sub);
    }

    let subredditHeader = `r/${subreddit.split('/')[0]}`;

    return (
        <div className="container">
            <Header subreddit={subredditHeader} />
            <hr />
            <Form handleSubmit={handleSubmit} />
            { posts.isLoading ? <p>Loading...</p> : <Posts posts={posts.data} />}
        </div >
    )
}

export default RedditContainer;