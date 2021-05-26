import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotoComments } from "../../store/comment";
import Comment from '../Comment';
import AddCommentModal from '../AddCommentModal';

import './CommentContainer.css';

function CommentContainer({photo}) {
    const user = useSelector((state) => state.session.user);
    
    const { comments } = useSelector((state) => state.comments);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPhotoComments(photo.id));
    }, [dispatch, photo.id])

    let content;

    if (user) {
        content = (<AddCommentModal photoId={photo.id}></AddCommentModal>)
    }
    
        return (
            <div className='comment-container'>
                {content}
                {comments.map((comment) => 
                    <Comment key={comment.id} comment={comment}></Comment>
                )}
            </div>
        )
    } 

export default CommentContainer;