// import { combineReducers } from 'redux';

// const selectedSectorReducer = (selectedSector=[], action) => {
// 	debugger;
// 	if (action.type === 'SECTOR_SELECTED') {
// 		debugger;
// 		selectedSector = action.payload;
// 	}
// 	return selectedSector;
// };


// export default combineReducers({
// 	selectedSector: selectedSectorReducer
// });



const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SECTOR_SELECTED':
			return action.payload;
		default:
			return state;
	}
}