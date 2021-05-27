import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaption from './EditCaption';
import './EditCaption.css';

function EditCaptionModal({photo}) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, [showModal])

    return (
        <div className="edit-icon-container">
            <i className="fas fa-user-edit edit-icon" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal className='edit-caption-form' onClose={() => setShowModal(false)}>
                    <EditCaption photo={photo} setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}

export default EditCaptionModal;