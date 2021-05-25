import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

function LoggedInActions({ user }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        // <>
        // <button onClick={openMenu}>
        //     <i className="fas fa-user-circle" />
        // </button>
        // {showMenu && (
        //     <ul className="profile-dropdown">
        //         <li>{user.username}</li>
        //         <li>{user.email}</li>
        //         <li>
        //             <button onClick={logout}>Log Out</button>
        //         </li>
        //     </ul>
        // )}
        // </>
        <div className='logged-in-actions'>
            <NavLink to={`/users/${sessionUser.id}`}><button className='you-button'>Your Concrts</button></NavLink>
            <button className='logout-button' onClick={logout}>Log Out</button>
        </div>
    );
}

export default LoggedInActions;