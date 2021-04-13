import React from 'react';
import Post from '../post/Post';

type PostType = {
    kind: string;
    data: {
        title: string;
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
                        <div>
                            <Post
                                title={post.data.title}
                            />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Posts;