import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, [showModal])

    return (
        <>
            <button className = 'btn login-btn' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal setShowModal={setShowModal} className='login-form' onClose={() => setShowModal(false)}>
                <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;