import { useState } from "react";
import { addNewPhoto } from "../../store/photo"
import { useDispatch, useSelector } from "react-redux";

const PhotoUpload = (setShowModal) => {
    const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        dispatch(addNewPhoto({  image, user }))
        .then(() => {
            setImage(null);
            setShowModal(false);
        })
        .catch(async (res) => {
            // const data = await res.json();
            // if (data && data.errors) {
            // newErrors = data.errors;
            // setErrors(newErrors);
            // }
        });

    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    return (
        <div>
        {errors.length > 0 &&
            errors.map((error) => <div key={error}>{error}</div>)}
        <form
            style={{ display: "flex", flexFlow: "column" }}
            onSubmit={handleSubmit}
        >
            <label>
            <input type="file" onChange={updateFile} />
            </label>
            <button type="submit">Add Photo</button>
        </form>

        </div>
    );
};

export default PhotoUpload;