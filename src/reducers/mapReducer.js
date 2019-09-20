import { combineReducers } from 'redux';

const createMapReducer = (map=null, action) => {
	if (action.type === 'MAP_CREATED') {
		return action.payload;
	}
	return map;
};


export default combineReducers({
	map: createMapReducer
});