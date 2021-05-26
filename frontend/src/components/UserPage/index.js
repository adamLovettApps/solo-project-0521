import React from 'react';
import { useEffect, useState } from "react";
import  PhotoUpload  from '../PhotoUpload';
import PhotoGallery from '../PhotoGallery';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { addAllPhotos } from '../../store/photo';
import { getCurrentUserPage } from '../../store/currentPage';
import UserPageBanner from './UserPageBanner';

function UserPage() {

    const photos = useSelector((state) => state.photos);
    const user = useSelector((state) => state.session.user);
    const currentUserPage = useSelector((state) => state.currentPage);
    
    const photoArray = photos.photos;
    const { id } = useParams();
    const dispatch = useDispatch();
    const userDispatch = useDispatch();

    useEffect(() => {
        dispatch(addAllPhotos(id));
    
    }, [dispatch, id]);

    useEffect(() => {
        userDispatch(getCurrentUserPage(id));
    }, [userDispatch, id])

    let content = null;


    if (photoArray.length) {
        content = ( <PhotoGallery user={user} id={id} photos={photos}></PhotoGallery> );
    } 
    return (
        <div>
            <UserPageBanner loggedUser={user}></UserPageBanner>
            {/* <PhotoGallery photos={photos}></PhotoGallery> */}
            <div className="photo-content-display">{content}</div>
        </div>
    )
}

export default UserPage;