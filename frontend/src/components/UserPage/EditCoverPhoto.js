import { useState } from "react";
import { updateCoverPhoto } from "../../store/currentPage"
import { useDispatch, useSelector } from "react-redux";
import './EditCoverPhoto.css';

const EditCoverPhoto = ({setShowModal}) => {
    const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [caption, setCaption] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        dispatch(updateCoverPhoto({ image, user }))
        setImage(null);
        setShowModal(false);
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const fileSelected = document.querySelectorAll('.display-cover-file-selected')[0];
            fileSelected.style.display = 'block';
        }
    };

    return (
        <div>
        {errors.length > 0 &&
            errors.map((error) => <div key={error}>{error}</div>)}
        
        <div className='add-photo-form-wrapper'>
        <span className='add-photo-header'>Change Your Cover Photo</span>
        <form
            onSubmit={handleSubmit}
        >
            <div className='form-field-input '>
                <label>Select Image</label>
                <input className='photo-file-input' type="file" onChange={updateFile} />
            </div>
            <span style={{display: 'none'}} className='display-cover-file-selected'>Photo Chosen</span>
            <div className='form-field-button'>
            <button type="submit" className='form-field-button' disabled={image === null ? true: false}>Add Photo</button>
            </div>

        </form>
        </div>
        </div>
    );
};

export default EditCoverPhoto;