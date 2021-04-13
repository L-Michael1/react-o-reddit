import React from 'react';
import logo from '../../assets/reddit-logo2.png';

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

    // Default image if no images found
    let image = logo;

    if (post.data.preview && post.data.preview.images) {
        // Get highest resolution image
        image = post.data.preview.images[0].resolutions[post.data.preview.images[0].resolutions.length - 1].url;

        // Replace keywords &amp to & - makes image a readable src
        image = image.replace(/&amp;/g, '&');
    }

    return (
        <div className='d-flex justify-content-between col-lg-4'>
            <div className='card'>
                <img src={image} width='100%' alt={post.data.title} />
                <div className='card-body'>
                    <h5>{title}</h5>
                </div>
            </div>
        </div>
    )
}

export default Post;