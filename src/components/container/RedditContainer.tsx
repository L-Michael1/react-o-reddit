import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { v4 as uuid_v4 } from "uuid";
import axios from 'axios';
import './RedditContainer.css';

// Components
import Header from '../header/Header'
import Posts from '../posts/Posts';
import Form from '../form/Form';
import Footer from '../footer/Footer';
import errorReddit from '../../assets/errorReddit.png';
import loading from '../../assets/loading.png';
import emptyReddit from '../../assets/emptyReddit.jpg';
import { stat } from 'node:fs';

// Types/Interfaces
type PostType = {
    id: string;
    kind: any;
    after: any;
    before: any;
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
    page: number;
    before: any;
    after: any;
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

interface PostsFetchNextSuccessAction {
    type: 'POSTS_FETCH_NEXT_SUCCESS';
    payload: PostsType;
}

interface PostsFetchPreviousSuccessAction {
    type: 'POSTS_FETCH_PREVIOUS_SUCCESS';
    payload: PostsType;
}

interface PostsFetchFailedAction {
    type: 'POSTS_FETCH_FAILED';
}

type PostsActions =
    | PostsFetchInitAction
    | PostsFetchSuccessAction
    | PostsFetchFailedAction
    | PostsFetchPreviousSuccessAction
    | PostsFetchNextSuccessAction;

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
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'POSTS_FETCH_NEXT_SUCCESS':
            return {
                ...state,
                page: state.page + 1,
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'POSTS_FETCH_PREVIOUS_SUCCESS':
            return {
                ...state,
                page: state.page - 1,
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'POSTS_FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}

const RedditContainer = () => {

    const [posts, dispatchPosts] = useReducer(
        postsReducer,
        {
            data: [],
            page: 0,
            after: null,
            before: null,
            isLoading: false,
            isError: false,
        }
    );

    // 'best', 'hot', 'new', 'top', 'controversial', 'rising'
    const [listing, setListing] = useState('best');

    // Any subreddit
    const [subreddit, setSubreddit] = useState(`wallpapers`);

    useEffect(() => {
        posts.page = 1;
    }, [listing, subreddit]);

    // Endpoint to fetch data in combination with user's chosen subreddit + listing type
    const API_ENDPOINT = `https://www.reddit.com/r/${subreddit}/${listing}.json`

    // On mount and on subreddit change, fetch data
    const handleFetchPosts = useCallback(async () => {
        dispatchPosts({
            type: 'POSTS_FETCH_INIT'
        })
        try {
            const result = await axios.get(API_ENDPOINT);
            const posts = result.data.data.children;
            posts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })

            dispatchPosts({
                type: 'POSTS_FETCH_SUCCESS',
                payload: posts,
            });

        } catch (err) {
            console.error(err);
            dispatchPosts({
                type: 'POSTS_FETCH_FAILED',
            })
        }
    }, [API_ENDPOINT]);

    useEffect(() => {
        handleFetchPosts();
    }, [handleFetchPosts])

    const handleListingChange = (listing: string) => {
        setListing(listing);
    }

    const handleSubmit = (sub: string) => {
        setSubreddit(sub);
    }
    // https://www.reddit.com/r/${subreddit}/${listing}.json
    // https://www.reddit.com/r/wallpapers/best.json

    const handleNextPage = async () => {
        dispatchPosts({
            type: 'POSTS_FETCH_INIT'
        })
        try {
            const result = await axios.get(`${API_ENDPOINT}?&after=${posts.after}`);
            const newPosts = result.data.data.children;

            newPosts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })

            dispatchPosts({
                type: 'POSTS_FETCH_NEXT_SUCCESS',
                payload: newPosts
            })
            window.scrollTo(0, 0);

        } catch (err) {
            console.error(err);
        }
    }

    const handlePrevPage = async () => {
        dispatchPosts({
            type: 'POSTS_FETCH_INIT'
        })
        try {
            const result = await axios.get(`${API_ENDPOINT}?&before=${posts.before}`);
            const newPosts = result.data.data.children;

            newPosts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })

            dispatchPosts({
                type: 'POSTS_FETCH_PREVIOUS_SUCCESS',
                payload: newPosts
            })
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
        }
    }

    let subredditHeader = `r/${subreddit.split('/')[0]}`;

    return (
        <div className="container">
            <Header subreddit={subredditHeader} />
            <hr />
            <Form listing={listing} handleSubmit={handleSubmit} handleListing={handleListingChange} />
            {
                posts.isLoading ?
                    <img className='rounded d-block mx-auto ' height='50%' src={loading} alt='loading' /> : posts.isError ?
                        <img className='rounded d-block mx-auto ' src={errorReddit} alt='error' /> :
                        posts.data.length === 0 ? <img className='rounded d-block mx-auto ' src={emptyReddit} alt='empty' /> :
                            <Posts posts={posts.data} />
            }
            <div className='d-flex justify-content-center'>

                {posts.page !== 1 ?
                    <div className='mr-2'>
                        <button className='btn-lg btn-primary' onClick={handlePrevPage}>Prev</button>
                    </div> : null}

                <div>
                    <button className='btn-lg btn-primary' onClick={handleNextPage}>Next</button>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <p>{posts.page}</p>
            </div>
            <Footer />
        </div >
    )
}

export default RedditContainer;