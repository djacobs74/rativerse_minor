import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import selectedSectorReducer from './selectedSectorReducer';
import getPathReducer from './getPathReducer';

export default combineReducers({
	map: mapReducer,
	selectedSector: selectedSectorReducer,
	path: getPathReducer
});