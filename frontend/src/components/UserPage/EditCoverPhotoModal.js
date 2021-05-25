import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCoverPhoto from './EditCoverPhoto';


function EditCoverPhotoModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i className="fas fa-camera edit-cover-photo" onClick={() => setShowModal(true)}></i>
            
            {showModal && (
                <Modal className='photo-upload' onClose={() => setShowModal(false)}>
                    <EditCoverPhoto setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default EditCoverPhotoModal;