import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';
import './EditComment.css';

function EditCommentModal({comment}) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, [showModal])

    return (
        <>
            <i className="fas fa-pen" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal className='edit-comment-form' onClose={() => setShowModal(false)}>
                    <EditComment comment={comment} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;