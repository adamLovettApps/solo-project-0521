import React from 'react';
import "./LandingPage.css"

const LandingPageBanner = () => {

    
            const imageRequest = JSON.stringify({
                bucket: "concrt",
                key: '1621890923646.jpeg',
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

    return (
                
        <div className='landing-page-banner-wrapper'> 
        <span className='splash-text-start'>And the crowd went...</span>
        <div style={{backgroundImage:`url(${url})`}} className='landing-page-banner-header-photo'>
        <span className='splash-text-end'>WILD</span>
        </div>
        </div>
    )
}

export default LandingPageBanner;