const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser';

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return;
        case REMOVE_USER:
            return;
        case EDIT_USER:
            return;
        default:
            return state;
    }
}

export default sessionReducer;