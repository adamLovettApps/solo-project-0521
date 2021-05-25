import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfilePhoto from './EditProfilePhoto';


function EditProfilePhotoModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i className="fas fa-camera edit-profile-photo" onClick={() => setShowModal(true)}></i>
            
            {showModal && (
                <Modal className='photo-upload' onClose={() => setShowModal(false)}>
                    <EditProfilePhoto setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default EditProfilePhotoModal;