import React from 'react';

interface PostType {
    id: string;
    kind: any;
    data: {
        title: string;
        preview: any;
    };
}

interface PostProps {
    post: PostType
    title: string;
}

const Post = ({ post, title }: PostProps) => {
    let previewImage = post.data.preview ? post.data.preview.images[0].resolutions[3].url : "http://dummyimage.com";
    previewImage = previewImage.replace(/&amp;/g, "&");
    return (
        <div>
            {title}
        </div>
    )
}

export default Post;