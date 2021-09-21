const initialState = {ship: null, playerShipMaxId: 0};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHIP_SELECTED':
			return {
				ship: action.payload.ship,
				playerShipMaxId: action.payload.maxId
			};
		case 'SHIP_SHIELD_REGEN':
			// debugger;
			return {
				...state,
				...action.payload
			};
		case 'SHIP_UPDATED':
			return {
				ship: action.payload.ship,
				playerShipMaxId: action.payload.maxId
			};
		// case 'SHIP_MAX_ID':
		// 	return {
		// 		playerShipMaxId: action.payload
		// 	};
		default:
			return state;
	}
}


