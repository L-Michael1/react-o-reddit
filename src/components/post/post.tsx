import React from 'react';

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