import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { updatePhotoCaption } from '../../store/photo';
import './EditCaption.css';

function EditCaption({setShowModal, photo}) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: photo.id,
            caption: caption
        }
        dispatch(updatePhotoCaption(data))
        setShowModal(false);
        // return dispatch(sessionActions.login({ credential, password })).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }
        // );
    };

    useEffect(() => {
        setCaption(photo.caption);
    }, [photo.caption])


    return (
            <div className='edit-caption-form-wrapper'>
                <span className='edit-caption-header'>Edit Your Caption</span>
                <form onSubmit={handleSubmit}>
                    <div className='login-modal-form'>
                    <div className='form-field-input'>
                        {/* <label className='edit-caption-label'>
                            Caption 
                        </label>
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> */}
                            <textarea
                                className='edit-caption-input'
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-field-button'>
                            <button className='edit-caption-submit-button' type="submit">Edit</button>
                        </div>
                    </div>
                </form>
            </div>

    );
}

export default EditCaption;