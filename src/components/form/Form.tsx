import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
interface FormProps {
    listing: string;
    handleSubmit: (e: any) => void;
    handleListing: (e: any) => void;
}

const Form = ({ handleSubmit, handleListing, listing }: FormProps) => {

    const [subreddit, setSubreddit] = useState('wallpapers')

    const onChangeHandler = (e: any) => {
        setSubreddit(e.target.value);
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        handleSubmit(subreddit);
    }

    return (
        <div className='container'>
            <div className='row justify-content-md-center m-4'>
                <form onSubmit={onSubmitHandler}>
                    <div className='form-row align-items-center'>
                        <div className='col-md-13'>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {listing}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleListing('best')}>best</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleListing('hot')}>hot</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleListing('new')}>new</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleListing('top')}>top</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleListing('rising')}>rising</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='col-md-13'>
                            <div className='input-group'>
                                <div className="input-group-prepend">
                                    <div className="input-group-text">r/</div>
                                </div>
                                <input className='form-control' type='text' placeholder='subreddit' value={subreddit} onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className='btn btn-primary' type='submit'>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Form;