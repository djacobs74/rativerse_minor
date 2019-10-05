import { combineReducers } from 'redux';

const createMapReducer = (starMap=null, action) => {
	if (action.type === 'MAP_CREATED') {
		return action.payload;
	}
	return starMap;
};


export default combineReducers({
	map: createMapReducer
});