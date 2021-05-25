import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaption from './EditCaption';
import './LoginForm.css';

function EditCaptionModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, [showModal])

    return (
        <>
            <button className = 'btn login-btn' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal setShowModal={setShowModal} className='login-form' onClose={() => setShowModal(false)}>
                <EditCaption />
                </Modal>
            )}
        </>
    );
}

export default EditCaptionModal;