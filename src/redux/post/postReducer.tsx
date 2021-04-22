import {
    PostsFetchInitAction,
    PostsFetchSuccessAction,
    PostsFetchNextSuccessAction,
    PostsFetchPreviousSuccessAction,
    PostsFetchFailedAction
} from './postTypes';

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

const initialState = {
    data: [],
    page: 0,
    after: null,
    before: null,
    isLoading: false,
    isError: false,
}

const postsReducer = (state: PostsState = initialState, action: any) => {
    switch (action.type) {
        case PostsFetchInitAction:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case PostsFetchSuccessAction:
            return {
                ...state,
                page: 1,
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case PostsFetchNextSuccessAction:
            return {
                ...state,
                page: state.page + 1,
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case PostsFetchPreviousSuccessAction:
            return {
                ...state,
                page: state.page - 1,
                before: action.payload[0].before,
                after: action.payload[0].after,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case PostsFetchFailedAction:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}

export default postsReducer;