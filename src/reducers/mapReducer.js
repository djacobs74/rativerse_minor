// import { combineReducers } from 'redux';

// const createMapReducer = (starMap=[], action) => {
// 	if (action.type === 'MAP_CREATED') {
// 		return action.payload;
// 	}
// 	return starMap;
// };


// export default combineReducers({
// 	map: createMapReducer
// });

export default (state = [], action) => {
	switch (action.type) {
		case 'MAP_CREATED':
			return action.payload;
		default:
			return state;
	}

};