import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className = 'btn login-btn' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal className='login-form' onClose={() => setShowModal(false)}>
                <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;