import React from 'react';
import Post from '../post/Post';

type PostType = {
    id: string;
    kind: any;
    data: {
        title: string;
        preview: any;
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