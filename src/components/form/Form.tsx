import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
interface FormProps {
    listing: string;
    handleSubmit: (e: any) => void;
    handleListing: (e: any) => void;
    handleSubreddit: (e: any) => void;
}

const Form = ({ handleSubmit, handleListing, handleSubreddit, listing }: FormProps) => {

    const [subreddit, setSubreddit] = useState('wallpapers')

    const onChangeHandler = (e: any) => {
        setSubreddit(e.target.value);
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        handleSubmit(subreddit);
    }

    const listings = ['best', 'hot', 'new', 'top', 'rising'];
    const subreddits = ['announcements', 'funny', 'gaming', 'aww', 'Music', 'pics', 'science', 'movies', 'news', 'EarthPorn', 'food'];

    return (
        <div className='container'>
            <div className='row justify-content-md-center m-4'>
                <form onSubmit={onSubmitHandler}>
                    <div className='form-row align-items-center'>
                        <div className='col-sm-13'>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Pop. Subreddits
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {subreddits.map((subreddit) => {
                                        return <Dropdown.Item onClick={() => handleSubreddit(subreddit)}>{subreddit}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='col-sm-13'>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {listing}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {listings.map((listing) => {
                                        return <Dropdown.Item onClick={() => handleListing(listing)}>{listing}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='col-sm-13'>
                            <div className='input-group'>
                                <div className="input-group-prepend">
                                    <div className="input-group-text">r/</div>
                                </div>
                                <input className='form-control' type='text' placeholder='subreddit' value={subreddit} onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className='col-sm-13'>
                            <div className="col-md-2">
                                <button className='btn btn-primary' type='submit'>Search</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Form;