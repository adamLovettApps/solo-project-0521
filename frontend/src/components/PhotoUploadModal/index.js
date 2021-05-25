import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PhotoUpload from '../PhotoUpload';
import './PhotoUpload.css';

function PhotoUploadModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className = 'btn photo-upload-btn' onClick={() => setShowModal(true)}>Add a Photo</button>
            {showModal && (
                <Modal className='photo-upload' onClose={() => setShowModal(false)}>
                    <PhotoUpload setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default PhotoUploadModal;