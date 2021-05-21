import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';
//import './LoginForm.css';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className = 'btn login-btn' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal className='login-form' onClose={() => setShowModal(false)}>
                <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;