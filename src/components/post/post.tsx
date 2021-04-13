import React from 'react';

interface PostProps {
    title: string;
}

const Post = ({ title }: PostProps) => {
    return (
        <div>
            <li>
                {title}
            </li>
        </div>
    )
}

export default Post;