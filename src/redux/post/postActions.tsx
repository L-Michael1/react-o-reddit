import {
    PostsFetchInitAction,
    PostsFetchSuccessAction,
    PostsFetchNextSuccessAction,
    PostsFetchPreviousSuccessAction,
    PostsFetchFailedAction
} from './postTypes';

import axios from 'axios'
import { v4 as uuid_v4 } from "uuid";

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

export const postsFetchInit = () => {
    return {
        type: PostsFetchInitAction
    }
}

export const postsFetchSuccess = (posts: PostsType) => {
    return {
        type: PostsFetchSuccessAction,
        payload: posts,
    }
}

export const postsFetchNextSuccess = (posts: PostsType) => {
    return {
        type: PostsFetchNextSuccessAction,
        payload: posts,
    }
}

export const postsFetchPreviousSuccess = (posts: PostsType) => {
    return {
        type: PostsFetchPreviousSuccessAction,
        payload: posts,
    }
}

export const postsFetchFailed = () => {
    return {
        type: PostsFetchFailedAction,
    }
}

export const fetchPosts = (endpoint: string) => {
    return async (dispatch: any) => {
        dispatch(postsFetchInit());
        try {
            const result = await axios.get(endpoint);
            const posts = result.data.data.children;
            posts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })
            dispatch(postsFetchSuccess(posts));
        } catch (err) {
            console.error(err);
            dispatch(postsFetchFailed())
        }
    }
}

export const fetchNextPosts = (endpoint: string, posts: PostsState) => {
    return async (dispatch: any) => {
        dispatch(postsFetchInit());
        try {
            const result = await axios.get(`${endpoint}?&after=${posts.after}`);
            const newPosts = result.data.data.children;
            newPosts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })
            dispatch(postsFetchNextSuccess(newPosts));
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
            dispatch(postsFetchFailed())
        }
    }
}

export const fetchPrevPosts = (endpoint: string, posts: PostsState) => {
    return async (dispatch: any) => {
        dispatch(postsFetchInit());
        try {
            const result = await axios.get(`${endpoint}?&before=${posts.before}`);
            const newPosts = result.data.data.children;
            newPosts.forEach((post: PostType) => {
                post.id = uuid_v4();
                post.after = result.data.data.after;
                post.before = result.data.data.before;
            })
            dispatch(postsFetchPreviousSuccess(newPosts));
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
            dispatch(postsFetchFailed())
        }
    }
}