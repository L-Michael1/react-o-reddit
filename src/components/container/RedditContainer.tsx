import React, { useState, useEffect } from 'react';
import './RedditContainer.css';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchNextPosts, fetchPrevPosts } from '../../redux/index'
import { RootState } from '../../redux/store'

// Components
import Header from '../header/Header'
import Posts from '../posts/Posts';
import Form from '../form/Form';
import Footer from '../footer/Footer';
import errorReddit from '../../assets/errorReddit.png';
import emptyReddit from '../../assets/emptyReddit.jpg';


const useStyles = makeStyles({
    loading: {
        display: 'flex',
        margin: 'auto',
        padding: '20px 20px'
    }
});

const RedditContainer = () => {

    const posts = useSelector((state: RootState) => state.posts)
    const dispatch = useDispatch();
    const styles = useStyles();

    // 'best', 'hot', 'new', 'top', 'controversial', 'rising'
    const [listing, setListing] = useState('best');

    // Any subreddit
    const [subreddit, setSubreddit] = useState(`wallpapers`);

    // Endpoint to fetch data in combination with user's chosen subreddit + listing type
    const API_ENDPOINT = `https://www.reddit.com/r/${subreddit}/${listing}.json`

    useEffect(() => {
        dispatch(fetchPosts(API_ENDPOINT));
    }, [dispatch, API_ENDPOINT])

    const handleListingChange = (listing: string) => {
        setListing(listing);
    }

    const handleSubredditChange = (sub: string) => {
        setSubreddit(sub);
    }

    const handleSubmit = (sub: string) => {
        setSubreddit(sub);
    }

    const handleNextPage = () => {
        dispatch(fetchNextPosts(API_ENDPOINT, posts));
    }

    const handlePrevPage = () => {
        dispatch(fetchPrevPosts(API_ENDPOINT, posts));
    }

    let subredditHeader = `r/${subreddit.split('/')[0]}`;

    return (
        <div className="container">
            <Header subreddit={subredditHeader} />
            <Form listing={listing} handleSubmit={handleSubmit} handleListing={handleListingChange} handleSubreddit={handleSubredditChange} />
            {
                posts.isLoading ?
                    <CircularProgress size={100} className={styles.loading} /> : posts.isError ?
                        <img className='rounded d-block mx-auto ' src={errorReddit} alt='error' /> :
                        posts.data.length === 0 ? <img className='rounded d-block mx-auto ' src={emptyReddit} alt='empty' /> :
                            <Posts posts={posts.data} />
            }
            <div className='d-flex justify-content-center'>

                {posts.page !== 1 ?
                    <div className='mr-2'>
                        <button className='btn-lg btn-primary' onClick={handlePrevPage}>Prev</button>
                    </div> : null}

                <div>
                    <button className='btn-lg btn-primary' onClick={handleNextPage}>Next</button>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <p>{posts.page}</p>
            </div>
            <Footer />
        </div >
    )
}

export default RedditContainer;