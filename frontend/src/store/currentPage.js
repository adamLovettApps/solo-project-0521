import { csrfFetch } from './csrf';

const GET_USER = "currentPage/getUser";

const getUser = data => ({
    type: GET_USER,
    payload: data
})

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
            return {...state, currentUserPage: action.payload}
        default: 
            return state;
    }
}

export default currentPageReducer;