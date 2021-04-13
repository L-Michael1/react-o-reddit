import { AnyMxRecord } from 'node:dns';
import React from 'react';
import logo from '../../assets/reddit-logo2.png';
import './Post.css'
import nsfw from '../../assets/18plus.png';

interface PostType {
    id: string;
    kind: any;
    data: {
        title: string;
        author: string;
        url: string;
        permalink: string;
        preview: any;
        over_18: any;
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
        <div className='d-flex align-items-end col-lg-4 p-3'>
            <div className='card'>
                <div className='card-img-top'>
                    <a href={post.data.url} target="_blank" rel="noopener noreferrer">
                        {(post.data.over_18) ?
                            <img src={nsfw} width="100%" alt='nsfw' /> :
                            <img src={image} className="card-img-top" width="100%" alt={post.data.title} />}
                    </a>
                </div>
                <div className='card-body'>
                    <a className='card-link' href={`https://reddit.com${post.data.permalink}`}>{title}</a>
                    <p className='card-text'>{post.data.author}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;