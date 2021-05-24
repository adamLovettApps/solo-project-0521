import React from 'react';
import './PhotoGallery.css'
const PhotoGallery = ({photos}) => {

    const photoArray = photos.photos;
    return (
        <div className='photoContainerWrapper'>
        <div className='photoContainer'>
        
            {photoArray.map((photo) =>{
                const baseURL = photo.url.split('/')[3];
                const imageRequest = JSON.stringify({
                    bucket: "concrt",
                    key: baseURL,
                    edits: {
                        smartCrop: true,
                        resize: {
                            width: 200,
                            height:200,
                            fit: "cover"
                        }
                    }
                })

                const encoded = btoa(imageRequest);
                const url = `https://d31oyr2ur6cysk.cloudfront.net/${encoded}`;

                    return(
                        
                    <span key={photo.id} className="photoSpan"><img className='gallery-image' alt='unknown' key={photo.id} src={url}></img></span>
                        
                    )
    
                })}
        
            </div>
        </div>
    )
}

export default PhotoGallery;