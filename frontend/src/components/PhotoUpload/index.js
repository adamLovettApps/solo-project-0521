import { useState } from "react";
import { addNewPhoto } from "../../store/photo"
import { useDispatch, useSelector } from "react-redux";
import './PhotoUpload.css'

const PhotoUpload = ({setShowModal}) => {
    const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
    // const [errors, setErrors] = useState([]);
    const [caption, setCaption] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        // let newErrors = [];
        dispatch(addNewPhoto({  image, user, caption }))
        setImage(null);
        setShowModal(false);

    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const fileSelected = document.querySelectorAll('.display-file-selected')[0];
            fileSelected.style.display = 'block';
        }
    };

    return (
        <div>
        {/* {errors.length > 0 &&
            errors.map((error) => <div key={error}>{error}</div>)} */}
        
        <div className='add-photo-form-wrapper'>
        <span className='add-photo-header'>Add a Photo</span>
        <form
            onSubmit={handleSubmit}
        >
            <div className='form-field-input '>
                <label>Select Image</label>
                <input className='photo-file-input' type="file" onChange={updateFile} />
            </div>
            <div className='form-field-input'>
                <label>Caption</label>
                <textarea value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
            </div>
            <span style={{display: 'none'}} className='display-file-selected'>Photo Chosen</span>
            <div className='form-field-button'>
            <button type="submit" className='form-field-button' disabled={image === null ? true: false}>Add Photo</button>
            </div>

        </form>
        </div>
        </div>
    );
};

export default PhotoUpload;