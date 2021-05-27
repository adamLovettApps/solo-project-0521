import { csrfFetch } from './csrf';

const ADD_PHOTO = "photo/addPhoto";
// const ADD_ALL = "photos/addAll";
const REMOVE_ALL = "photos/removeAll";
const REMOVE_PHOTO = "photos/removePhoto";
const UPDATE_CAPTION = "photos/updateCaption";


const addPhoto = photo => ({
    type: ADD_PHOTO,
    payload: photo
});

// const addAll = photos => ({
//     type: ADD_ALL,
//     payload: photos
// });

const removeAll = () => ({
    type: REMOVE_ALL,
});

const removePhoto = (id) => ({
    type: REMOVE_PHOTO,
    payload: id
})

const updateCaption = (photoInfo) => ({
    type: UPDATE_CAPTION,
    payload: photoInfo
})

export const updatePhotoCaption = photoInfo => async (dispatch) => {

    const {id} = photoInfo;
    await csrfFetch(`/api/photos/updateCaption/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(photoInfo)
    });

    dispatch(updateCaption(photoInfo));
}

export const removeCurrentPhoto = (id) => async (dispatch) => {
    await csrfFetch(`/api/photos/${id}`, {
        method: "DELETE"
    });

    dispatch(removePhoto(id));
}

export const addAllPhotos = (id) => async (dispatch) => {
    
    const res = await csrfFetch(`/api/photos/${id}`, {
        method: "GET"
    });

    const data = await res.json();
    dispatch(removeAll());
    data.forEach((photo) => dispatch(addPhoto(photo)));
    // dispatch(addAll(data));
}

export const addAllPhotosGlobal = (id) => async (dispatch) => {
    
    const res = await csrfFetch(`/api/photos/`, {
        method: "GET"
    });

    const data = await res.json();
    dispatch(removeAll());
    data.forEach((photo) => dispatch(addPhoto(photo)));
    // dispatch(addAll(data));
}

export const addNewPhoto = photo => async (dispatch) => {
    const {image, user, caption} = photo;

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (caption) formData.append("caption", caption)

    const res = await csrfFetch(`/api/photos/${user.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await res.json();
    dispatch(addPhoto(data.newPhoto));
}


let initialState = {photos: [], currentPhotos: []};

const photoReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_PHOTO:
            return { ...state, photos: [action.payload, ...state.photos], currentPhotos: [action.payload, ...state.photos]};
        case REMOVE_ALL:
            return { ...state, photos: [], currentPhotos: []};
        case REMOVE_PHOTO:
            const photoArray = [...state.photos];
            const newPhotoArray = photoArray.filter((photo) => photo.id !== action.payload);
            return {...state, photos: newPhotoArray}
        case UPDATE_CAPTION:
            const newArray = [...state.photos];
            const id = action.payload.id;
            const newCaption = action.payload.caption;
            newArray.forEach((photo) => {
                if (photo.id === id) {
                    photo.caption = newCaption;
                }
            })
            return {...state, photos: newArray};
        default:
            return state;
    }
};

export default photoReducer;