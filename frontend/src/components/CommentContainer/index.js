import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotoComments } from "../../store/comment";
import Comment from '../Comment';
import './CommentContainer.css';

function CommentContainer({photo}) {
    const user = useSelector((state) => state.session.user);
    
    const { comments } = useSelector((state) => state.comments);

    const dispatch = useDispatch();

    console.log(comments);
    useEffect(() => {
        dispatch(getAllPhotoComments(photo.id));
    }, [])

    
        return (
            <div className='comment-container'>
                {comments.map((comment) => 
                    <Comment key={comment.id} comment={comment}></Comment>
                )}
            </div>
        )
    } 

export default CommentContainer;