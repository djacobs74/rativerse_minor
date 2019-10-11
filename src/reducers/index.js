import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import selectedSectorReducer from './selectedSectorReducer';

export default combineReducers({
	map: mapReducer,
	selectedSector: selectedSectorReducer
});