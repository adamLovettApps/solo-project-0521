import React from 'react';
import './Footer.css';

function Footer () {

    return (
        <>
            <div className='developed-by'>Developed By</div>
            <div className='developer-name'>Adam Lovett</div>
            <div className='contact-link-container'>
                <a className='contact-link' href='https://github.com/adamLovettApps'>Github</a> |
                <a className='contact-link' href='https://www.linkedin.com'>LinkedIn</a> |
                <a className='contact-link' href='mailto:adamlovett@alumni.usc.edu'>Email</a>
            </div>
        </>
    )
}

export default Footer;