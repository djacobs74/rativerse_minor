import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import selectedSectorReducer from './selectedSectorReducer';
import getPathReducer from './getPathReducer';
import getStartingPositionReducer from './getStartingPositionReducer';
import moveShipReducer from './moveShipReducer';
import npcShipGeneratorReducer from './npcShipGeneratorReducer';
import selectedShipReducer from './selectedShipReducer';
import playerDataReducer from './playerDataReducer';
import dockingAreasReducer from './dockingAreasReducer';
import npcShipMoverReducer from './npcShipMoverReducer';

export default combineReducers({
	map: mapReducer,
	selectedSector: selectedSectorReducer,
	path: getPathReducer,
	sectorStartingPosition: getStartingPositionReducer,
	sectorPosition: moveShipReducer,
	npcShips: npcShipGeneratorReducer,
	selectedShip: selectedShipReducer,
	playerData: playerDataReducer,
	dockingAreas: dockingAreasReducer,
	npcActiveShips: npcShipMoverReducer
});