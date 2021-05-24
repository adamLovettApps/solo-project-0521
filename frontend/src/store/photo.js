import { csrfFetch } from './csrf';

const ADD_PHOTO = "photo/addPhoto";
const ADD_ALL = "photos/addAll";
const REMOVE_ALL = "photos/removeAll";

const addPhoto = photo => ({
    type: ADD_PHOTO,
    payload: photo
});

const addAll = photos => ({
    type: ADD_ALL,
    payload: photos
});

const removeAll = () => ({
    type: REMOVE_ALL,
});

export const addAllPhotos = (id) => async (dispatch) => {
    
    const res = await csrfFetch(`/api/photos/${id}`, {
        method: "GET"
    });

    const data = await res.json();
    dispatch(removeAll());
    data.forEach((photo) => dispatch(addPhoto(photo)));
    // dispatch(addAll(data));
}

export const addNewPhoto = photo => async (dispatch) => {
    const {image, user} = photo;

    const formData = new FormData();
    if (image) formData.append("image", image);

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
        default:
            return state;
    }
};

export default photoReducer;