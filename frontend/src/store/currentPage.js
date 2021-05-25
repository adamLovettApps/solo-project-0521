import { csrfFetch } from './csrf';
import { addAllPhotosGlobal } from './photo';

const GET_USER = "currentPage/getUser";
const UPDATE_PROFILE_PHOTO = "currentPage/updateUserProfilePhoto"
const UPDATE_COVER_PHOTO = "currentPage/updateUserCoverPhoto"

const getUser = data => ({
    type: GET_USER,
    payload: data
})

const updateUserProfilePhoto = data => ({
    type: UPDATE_PROFILE_PHOTO,
    payload: data
})

const updateUserCoverPhoto = data => ({
    type: UPDATE_COVER_PHOTO,
    payload: data
})

export const updateProfilePhoto = photo => async dispatch => {
    const {image, user} = photo;
    const formData = new FormData();
    if (image) formData.append("image", image);
    const res = await csrfFetch(`/api/users/updateProfilePhoto/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await res.json();
    dispatch(updateUserProfilePhoto(data));
}

export const updateCoverPhoto = photo => async dispatch => {
    const {image, user} = photo;
    const formData = new FormData();
    if (image) formData.append("image", image);
    const res = await csrfFetch(`/api/users/updateCoverPhoto/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const data = await res.json();
    dispatch(updateUserCoverPhoto(data));
}

export const getCurrentUserPage = id => async (dispatch) => {

    const res = await csrfFetch(`/api/users/${id}`, {
        method: "GET"
    });

    const data = await res.json();
    dispatch(getUser(data));
}

const initialState = {};

const currentPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: 
            return {...state, currentUserPage: action.payload};
        case UPDATE_PROFILE_PHOTO:
            return {...state, currentUserPage: { ...state.currentUserPage,
                profilePhotoUrl: action.payload.profilePhotoUrl
            }}
        case UPDATE_COVER_PHOTO:
            return {...state, currentUserPage: { ...state.currentUserPage,
                coverPhotoUrl: action.payload.coverPhotoUrl
            }}
        default: 
            return state;
    }
}

export default currentPageReducer;