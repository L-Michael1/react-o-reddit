import React from 'react';
import Post from '../post/Post';

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

interface PostsProps {
    posts: PostsType;
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <div className="row">
            {posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        post={post}
                        title={post.data.title}
                    />
                )
            })}
        </div>
    )
}

export default Posts;