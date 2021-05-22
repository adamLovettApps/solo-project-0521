import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoggedInActions from './LoggedInActions';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <LoggedInActions user={sessionUser} />
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
                <div className='navigation-box navigation-box-left'></div>
                <NavLink exact to="/">
                    <div className='navigation-box'>
                        <img src='/images/logo.png' className='concrt-logo' alt='Concrt logo'/>
                    </div>
                </NavLink>
                <div className='navigation-box navigation-box-right'>{isLoaded && sessionLinks}</div>
            </div>
        </div>
    );
}

export default Navigation;