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
        <>
        <div className='landing-page-banner-wrapper'> 
        
        <div style={{backgroundImage:`url(${url})`}} className='landing-page-banner-header-photo'></div>
        </div>
        <div className="splash-text">
            <div className='splash-text-start'>And the crowd went...</div>
            <div className='splash-text-end'>WILD</div>
        
        </div>
        </>
    )
}

export default LandingPageBanner;