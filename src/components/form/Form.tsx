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
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type='text' value={subreddit} onChange={onChangeHandler} />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}


export default Form;