import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneComment } from '../../store/comment';
import './AddComment.css';

function AddComment({setShowModal, photoId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const commentData = {
            userId: sessionUser.id,
            photoId: photoId,
            body: comment
        }
        dispatch(addOneComment(commentData));
        setShowModal(false);
        
    };


    return (
        <div className='add-comment-form-wrapper'>
        <span className='add-comment-header'>Make Some Noise</span>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='add-comment-modal-form'>
            <div className='form-field-input'>
            
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>

            <div className='form-field-button'>
            <button className='signup-submit-button' type="submit">Roar</button>
            </div>
            </div>
        </form>
        </div>
    );
}

export default AddComment;