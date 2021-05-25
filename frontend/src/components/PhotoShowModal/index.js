import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PhotoShow from './PhotoShow';
import './PhotoShow.css'

function PhotoShowModal({photo}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className = 'btn photo-show-btn' onClick={() => setShowModal(true)}></button>
            {showModal && (
                <Modal className='photo-show-modal' onClose={() => setShowModal(false)}>
                    <PhotoShow setShowModal={setShowModal} className='photo-show' photo={photo} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default PhotoShowModal;