import React, { useState } from 'react';

interface FormProps {
    handleSubmit: (e: any) => void
}

const Form = ({ handleSubmit }: FormProps) => {

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