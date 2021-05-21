import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <LoginFormModal />
            <SignupFormModal />
            {/* <NavLink to="/signup"><button className = 'btn signup-btn'>Sign Up</button></NavLink> */}
        </>
        );
    }

    return (
        <div className ='navigation-bar-wrapper'>
            <div className='navigation-bar'>
                <div></div>
                <NavLink exact to="/"><img src='/images/logo.png' className='concrt-logo' alt='Concrt logo'/></NavLink>
                <div>{isLoaded && sessionLinks}</div>
            </div>
        </div>
    );
}

export default Navigation;