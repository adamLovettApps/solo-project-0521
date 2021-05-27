import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteOneComment } from '../../store/comment';
import EditCommentModal from '../EditCommentModal';
import './Comment.css';

function Comment({comment}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    
    const currentUserPage = useSelector((state) => state.currentPage);
    const deleteComment = async => {
        dispatch(deleteOneComment(comment.id));
    }

    let content;

    let basePhotoUrl;
    if (comment.User) {
        basePhotoUrl = comment.User.profilePhotoUrl.split('/')[3];
    } else {
        basePhotoUrl = user.profilePhotoUrl.split('/')[3];
    }
    const profileImageRequest = JSON.stringify({
        bucket: "concrt",
        key: basePhotoUrl,
        edits: {
            roundCrop: true,
            resize: {
                height:40,
                fit: "cover"
            },
            
            
        }
    })
    const encodedProfile = btoa(profileImageRequest);
    const profileUrl = `https://d31oyr2ur6cysk.cloudfront.net/${encodedProfile}`;

    let username;

    if (comment.User) {
        username = comment.User.username;
    } else {
        username = user.username;
    }

    let userActions;

    if (user) {
        if (user.id === currentUserPage.currentUserPage.id) {
            if (comment.userId === user.id) {
                userActions = (<><EditCommentModal comment={comment}></EditCommentModal> <i className="fas fa-trash" onClick={deleteComment}></i></>);
            } else {
                userActions = (<i className="fas fa-trash" onClick={deleteComment}></i>);
            }
        } else if (user.id === comment.userId) {
            userActions = (<><EditCommentModal comment={comment}></EditCommentModal>  <i className="fas fa-trash" onClick={deleteComment}></i></>);
        }
    }

    if (user) {
        content = (
            <div>
            <div className='single-comment-container'>
                <div className="user-comment-information">
                    <span><img alt='User Who Commented' src={profileUrl}></img></span>
                    <span className="username-display">{username}</span>
                </div>
                <div className="user-comment-body">
                    <span>{comment.body}</span>
                </div>
                <div className="user-comment-actions">
                    {userActions}&nbsp;
                </div>
            </div>
            </div>
        )
    } else {
        content = (
            <div>
            <div className='single-comment-container'>
                <div className="user-comment-information">
                    <span><img alt='User Who Commented' src={profileUrl}></img></span>
                    <span className="username-display">{username}</span>
                </div>
                <div className="user-comment-body">
                    <span>{comment.body}</span>
                </div>
                <div className="user-comment-actions">
                    &nbsp;
                </div>
            </div>
            </div>
        )
    }
    
    return (
        <>
            {content}
        </>
    )

} 

export default Comment;