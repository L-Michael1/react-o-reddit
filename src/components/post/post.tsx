import React from 'react';

interface PostProps {
    title: string;
}

const Post = ({ title }: PostProps) => {
    return (
        <div>
            {title}
        </div>
    )
}

export default Post;