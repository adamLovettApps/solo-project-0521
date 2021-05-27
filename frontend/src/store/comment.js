import { csrfFetch } from './csrf';

const GET_COMMENTS = "comments/getAllComments";
const DELETE_COMMENT = "comments/deleteComment";
const EDIT_COMMENT = "comments/editComment";
const ADD_COMMENT = "comments/editComment";

const getComments = comments => ({
    type: GET_COMMENTS,
    payload: comments
});

const deleteComment = comment => ({
    type: DELETE_COMMENT,
    payload: comment
});

// const editComment = commentInfo => ({
//     type: EDIT_COMMENT,
//     payload: commentInfo
// })

const addComment = comment => ({
    type: ADD_COMMENT,
    payload: comment
})

export const getAllPhotoComments = photoId => async (dispatch) => {

    const res = await csrfFetch(`/api/comments/${photoId}`, {
        method: "GET"
    });

    const data = await res.json();

    dispatch(getComments(data));
    
}

export const deleteOneComment = commentId => async (dispatch) => {
    await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    dispatch(deleteComment(commentId));
}

export const editOneComment = commentInfo => async (dispatch) => {
    const {id, photoId } = commentInfo;
    await csrfFetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify(commentInfo)
    });

    dispatch(getAllPhotoComments(photoId));
}

export const addOneComment = comment => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify(comment)
    });

    const data = await res.json();

    dispatch(addComment(data));
}


let initialState = { comments: [] };

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            const newCommentState = [action.payload, ...state.comments];
            return {...state, comments: newCommentState};
        case GET_COMMENTS: 
            return { ...state, comments: action.payload }
        case DELETE_COMMENT:
            const commentArray = [...state.comments];
            const newCommentArray = commentArray.filter((comment) => comment.id !== action.payload);
            return {...state, comments: newCommentArray};
        case EDIT_COMMENT:
            const id = action.payload.id;
            const body = action.payload.body;
            const editArray = [...state.comments];
            const newEditArray = editArray.filter((comment) => {
                if (comment.id === id) {
                    return {...comment, body:body}
                } else {
                    return comment;
                }
            })
            return {...state, comments: newEditArray};
    default:
        return { ...state }
    }
}

export default commentReducer;