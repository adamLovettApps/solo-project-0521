import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentPhoto } from '../../store/photo';
import EditCaptionModal from '../EditCaptionModal';
import './PhotoShow.css';

function PhotoShow({photo, setShowModal}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentUserPage = useSelector((state) => state.currentPage.currentUserPage)
    const photos = useSelector((state) => state.photos)
    const baseURL = photo.url.split('/')[3];
    const clickHandler = () => {
        dispatch(removeCurrentPhoto(photo.id))
        setShowModal(false);
    }
    const imageRequest = JSON.stringify({
        bucket: "concrt",
        key: baseURL,
        edits: {
            
            resize: {
                width: 600,
                fit: "cover"
            }
        }
    })

    const encoded = btoa(imageRequest);
    const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;

    let caption;

    if (photo.caption) {
        caption = (<><div className='caption-container'>{photo.caption}<div className='edit-caption-content'><EditCaptionModal photo={photo}></EditCaptionModal></div></div></>)
    }


    if (sessionUser.id === currentUserPage.id){
        return (
            <div className='photo-show-modal'>
            <div className='photo-div'
                onMouseOver={() => 
                    document.getElementById('delete-icon-container').classList.remove('delete-icon-container-hidden')
                }
                onMouseLeave={() => 
                    document.getElementById('delete-icon-container').classList.add('delete-icon-container-hidden')
                }
            >
                <img alt="Concert" src={url}
                    onMouseOver={() => 
                    document.getElementById('delete-icon-container').classList.remove('delete-icon-container-hidden')
                }
                onMouseLeave={() => 
                    document.getElementById('delete-icon-container').classList.add('delete-icon-container-hidden')
                }
                ></img>
            </div>
            <div id='delete-icon-container' className='delete-icon-container-hidden'>
                <i className="fas fa-times-circle delete-image-icon" 
                    onMouseOver={() => 
                        document.getElementById('delete-icon-container').classList.remove('delete-icon-container-hidden')
                    } 
                    onClick={clickHandler}
                >
                </i>
            </div>
                {caption}
            </div>
        );
    } else {
        return (
            <div className='photo-show-modal'>
            <div className='photo-div'><img alt="Concert" src={url}></img></div>
            {caption}
            </div>
        );
    }
}

export default PhotoShow;