import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import selectedSectorReducer from './selectedSectorReducer';
import getPathReducer from './getPathReducer';
import getStartingPositionReducer from './getStartingPositionReducer';
import moveShipReducer from './moveShipReducer';
import npcShipGeneratorReducer from './npcShipGeneratorReducer';

export default combineReducers({
	map: mapReducer,
	selectedSector: selectedSectorReducer,
	path: getPathReducer,
	startingPosition: getStartingPositionReducer,
	currentPosition: moveShipReducer,
	npcShips: npcShipGeneratorReducer
});