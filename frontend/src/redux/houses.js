const LOAD_HOUSES = 'house/loadHouses';
const ADD_HOUSES = 'houses/addHouses';
const EDIT_HOUSES = 'houses/editHouses';
const REMOVE_HOUSES = 'houses/removeHouses';

const initialState = { houses: null };

function housesReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_HOUSES:
            return;
        case ADD_HOUSES:
            return;
        case EDIT_HOUSES:
            return;
        case REMOVE_HOUSES:
            return;
        default:
            return state;
    }
}

export default housesReducer;