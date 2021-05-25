import React from 'react';
import { useEffect, useState } from "react";
import  PhotoUpload  from '../PhotoUpload';
import PhotoGallery from '../PhotoGallery';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { addAllPhotos } from '../../store/photo';
import currentPageReducer, { getCurrentUserPage } from '../../store/currentPage';
import PhotoUploadModal from '../PhotoUploadModal';
import './UserBanner.css'


const UserPageBanner = (loggedUser) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentUserPage = useSelector((state) => state.currentPage)
    
    useEffect(() => {
        dispatch(getCurrentUserPage(id));
    }, [dispatch, id])
    if (currentUserPage.currentUserPage && loggedUser.loggedUser) {
        if (loggedUser.loggedUser.id === +id) {
            const baseURL = currentUserPage.currentUserPage.coverPhotoUrl.split('/')[3];
                const imageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseURL,
                    edits: {
                        smartCrop: true,
                        resize: {
                            width: 1400,
                            height:300,
                            fit: "cover"
                        },
                        
                    }
                })
            const encoded = btoa(imageRequest);
            const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;


            const baseProfileURL = currentUserPage.currentUserPage.profilePhotoUrl.split('/')[3];
                const profileImageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseProfileURL,
                    edits: {
                        smartCrop: true,
                        roundCrop: true,
                        resize: {
                            height:80,
                            fit: "cover"
                        },
                        
                        
                    }
                })
            const encodedProfile = btoa(profileImageRequest);
            const profileUrl = `https://d31oyr2ur6cysk.cloudfront.net/${encodedProfile}`;


            return (
                
                <div className='user-banner-wrapper'>
                <div style={{backgroundImage:`url(${url})`}} className='user-banner-header-photo'>
                    <span className="profilePhoto"><img alt="Profile" src={profileUrl}></img> </span>
                    <span className="profileName">{currentUserPage.currentUserPage.username}'s Concrts</span>
                    <PhotoUploadModal></PhotoUploadModal>
                </div>
                </div>
            )
        
        }else {

        const baseURL = currentUserPage.currentUserPage.coverPhotoUrl.split('/')[3];
                const imageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseURL,
                    edits: {
                        smartCrop: true,
                        resize: {
                            width: 1400,
                            height:300,
                            fit: "cover"
                        }
                    }
                })
            const encoded = btoa(imageRequest);
            const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;


            const baseProfileURL = currentUserPage.currentUserPage.profilePhotoUrl.split('/')[3];
                const profileImageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseProfileURL,
                    edits: {
                        smartCrop: true,
                        roundCrop: true,
                        resize: {
                            height:80,
                            fit: "cover"
                        }
                    }
                })
            const encodedProfile = btoa(profileImageRequest);
            const profileUrl = `https://d31oyr2ur6cysk.cloudfront.net/${encodedProfile}`;


            return (
                
                <div className='user-banner-wrapper'>
                <div style={{backgroundImage:`url(${url})`}} className='user-banner-header-photo'>
                    <span className="profilePhoto"><img alt="Profile" src={profileUrl}></img> </span>
                    <span className="profileName">{currentUserPage.currentUserPage.username}'s Concrts</span>
                </div>
                </div>
            )
    }
    }else if (currentUserPage.currentUserPage){
        const baseURL = currentUserPage.currentUserPage.coverPhotoUrl.split('/')[3];
                const imageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseURL,
                    edits: {
                        smartCrop: true,
                        resize: {
                            width: 1400,
                            height:300,
                            fit: "cover"
                        }
                    }
                })
            const encoded = btoa(imageRequest);
            const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;


            const baseProfileURL = currentUserPage.currentUserPage.profilePhotoUrl.split('/')[3];
                const profileImageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseProfileURL,
                    edits: {
                        smartCrop: true,
                        roundCrop: true,
                        resize: {
                            height:80,
                            fit: "cover"
                        }
                    }
                })
            const encodedProfile = btoa(profileImageRequest);
            const profileUrl = `https://d31oyr2ur6cysk.cloudfront.net/${encodedProfile}`;


            return (
                
                <div className='user-banner-wrapper'>
                <div style={{backgroundImage:`url(${url})`}} className='user-banner-header-photo'>
                    <span className="profilePhoto"><img alt="Profile" src={profileUrl}></img> </span>
                    <span className="profileName">{currentUserPage.currentUserPage.username}'s Concrts</span>
                </div>
                </div>
            )
    }else {
        return (
            <div className='user-banner-header-photo'>

                
            </div>
        )
    }
}





export default UserPageBanner;