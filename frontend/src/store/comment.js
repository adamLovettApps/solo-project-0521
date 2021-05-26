import { csrfFetch } from './csrf';

const GET_COMMENTS = "comments/getAllComments";

const getComments = comments => ({
    type: GET_COMMENTS,
    payload: comments
})

export const getAllPhotoComments = photoId => async (dispatch) => {

    const res = await csrfFetch(`/api/comments/${photoId}`, {
        method: "GET"
    });

    const data = await res.json();

    console.log(data);
    dispatch(getComments(data));
    
}

let initialState = { comments: [] };

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS: 
            return { ...state, comments: action.payload }
    default:
        return { ...state }
    }
}

export default commentReducer;