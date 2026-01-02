const LOAD_ASSETS = 'assets/loadAssets';
const ADD_ASSETS = 'assets/addAssets';
const EDIT_ASSETS = 'assets/editAssets';
const REMOVE_ASSETS = 'assets/removeAssets';

const initialState = { assets: null };

function assetsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ASSETS:
            return;
        case ADD_ASSETS:
            return;
        case EDIT_ASSETS:
            return;
        case REMOVE_ASSETS:
            return;
        default:
            return state;
    }
}

export default assetsReducer;