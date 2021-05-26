import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Comment.css';

function Comment({comment}) {
    console.log("COMMENT", comment);
    const user = useSelector((state) => state.session.user);
    
    const currentUserPage = useSelector((state) => state.currentPage);


    console.log("user", user)
    console.log("currentUserPage", currentUserPage);

    let content;

    const basePhotoUrl = comment.User.profilePhotoUrl.split('/')[3];
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


    let userActions;

    if (user) {
        if (user.id === currentUserPage.currentUserPage.id) {
            if (comment.userId === user.id) {
                userActions = (<><i className="fas fa-pen"></i> <i className="fas fa-trash"></i></>);
            } else {
                userActions = (<i className="fas fa-trash"></i>);
            }
        } else if (user.id === comment.userId) {
            userActions = (<><i className="fas fa-pen"></i> <i className="fas fa-trash"></i></>);
        }
    }

    if (user) {
        content = (
            <div>
            <div className='single-comment-container'>
                <div className="user-comment-information">
                    <span><img alt='User Who Commented' src={profileUrl}></img></span>
                    <span className="username-display">{comment.User.username}</span>
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
                    <span className="username-display">{comment.User.username}</span>
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