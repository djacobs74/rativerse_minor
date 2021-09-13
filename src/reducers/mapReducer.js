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

let initialState = {gameMap: [], combatMap: []};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GAME_MAP_CREATED':
			return {
				...state,
				gameMap: action.payload
			}
		case 'COMBAT_MAP_CREATED':
			return {
				...state,
				combatMap: action.payload
			}
		// case 'MAP_UPDATED':
		// 	return {
		// 		...state,
		// 		gameMap: action.payload
		// 	}
		default:
			return state;
	}

};


