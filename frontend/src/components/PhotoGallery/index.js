import React from 'react';
import './PhotoGallery.css'
const PhotoGallery = ({photos, user, id}) => {

    const photoArray = photos.photos;
    if (user && user.id !== +id){
        return (
            <div className='photoContainerWrapper'>
            <div className='photoContainer'>
            
                {photoArray.map((photo) =>{
                    const baseURL = photo.url.split('/')[3];
                    const imageRequest = JSON.stringify({
                        bucket: "concrt",
                        key: baseURL,
                        edits: {
                            
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
    } else {
            return (
            <div className='photoContainerWrapper'>
            <div className='photoContainer'>
            
                {photoArray.map((photo) =>{
                    const baseURL = photo.url.split('/')[3];
                    const imageRequest = JSON.stringify({
                        bucket: "concrt",
                        key: baseURL,
                        edits: {
                            
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
                        <>  
                    
                            <span key={photo.id} className="photoSpan"><img className='user-gallery-image' alt='unknown' key={photo.id} src={url}></img></span>
                        
                        
                        </>
                        )
        
                    })}
            
                </div>
            </div>
        )
    }
}

export default PhotoGallery;