import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { editOneComment } from '../../store/comment';
import './EditComment.css';

function EditComment({comment, setShowModal}) {
    const dispatch = useDispatch();
    const [commentValue, SetCommentValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: comment.id,
            body: commentValue,
            photoId: comment.photoId
        }
        dispatch(editOneComment(data))
        setShowModal(false);

    };

    useEffect(() => {
        SetCommentValue(comment.body);
    }, [comment.body])


    return (
            <div className='edit-comment-form-wrapper'>
                <span className='edit-comment-header'>Edit Your Comment</span>
                <form onSubmit={handleSubmit}>
                    <div className='edit-comment-modal-form'>
                    <div className='form-field-input'>
                            <textarea
                                className='edit-caption-input'
                                value={commentValue}
                                onChange={(e) => SetCommentValue(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-field-button'>
                            <button className='edit-comment-submit-button' type="submit">Edit</button>
                        </div>
                    </div>
                </form>
            </div>

    );
}

export default EditComment;