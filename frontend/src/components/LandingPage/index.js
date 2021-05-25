import React from 'react';
import { useEffect, useState } from "react";
import  PhotoUpload  from '../PhotoUpload';
import LandingPhotoGallery from '../LandingPhotoGallery';
import { useDispatch, useSelector } from "react-redux";
import { addAllPhotosGlobal } from '../../store/photo';
import LandingPageBanner from './LangingPageBanner';

function LandingPage() {

    const photos = useSelector((state) => state.photos);
    const user = useSelector((state) => state.session.user)
    
    const photoArray = photos.photos;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addAllPhotosGlobal());
    
    }, [dispatch]);

    let content = null;


    if (photoArray.length) {
        content = ( <LandingPhotoGallery user={user} photos={photos}></LandingPhotoGallery> );
    } 
    return (
        <div>
            <LandingPageBanner></LandingPageBanner>
            <div className="photo-content-display">{content}</div>
        </div>
    )
}

export default LandingPage;