const initialState = {gameMapSector:[], combatMapSector:[]};

export default (state = initialState, action) => {
	switch (action.type) {
		// case 'GAME_SECTOR_SELECTED':
		// 	let selected = [];
		// 	selected.push(action.payload);
		// 	debugger;
		// 	return selected;
		case 'GAME_SECTOR_SELECTED':
			let selectedGameSector = [];
			selectedGameSector.push(action.payload);
			return {...state,
				gameMapSector: selectedGameSector
			}
		case 'COMBAT_SECTOR_SELECTED':
			let selectedCombatSector = [];
			selectedCombatSector.push(action.payload);
			console.log('COMBAT_SECTOR_SELECTED', selectedCombatSector);
			return {...state,
				combatMapSector: selectedCombatSector
			}
		default:
			return state;
	}
}


