import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddComment from './AddComment';
import './AddComment.css';

function AddCommentModal({photoId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className = 'btn add-comment-btn' onClick={() => setShowModal(true)}>Make Some Noise <i class="fas fa-podcast"></i></button>
            {showModal && (
                <Modal className='add-comment-form' onClose={() => setShowModal(false)}>
                    <AddComment photoId={photoId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default AddCommentModal;