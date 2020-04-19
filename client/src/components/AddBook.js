import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

const AddBook = (props) => {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, selectAuthor] = useState("");

    const displayAuthors = () => {
        const { data } = props;
        if (data.loading) {
            return <option>Loading Authors...</option>
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(name, genre, author)
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={author} onChange={e => selectAuthor(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
};

export default graphql(getAuthorsQuery)(AddBook);