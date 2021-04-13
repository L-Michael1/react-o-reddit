import React from 'react';
import Post from '../post/Post';

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

interface PostsProps {
    posts: PostsType;
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <div>
            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post.id}>
                            <Post
                                post={post}
                                title={post.data.title}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Posts;