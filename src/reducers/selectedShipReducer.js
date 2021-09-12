const initialState = {playerShipMaxId: 0};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHIP_SELECTED':
			return action.payload;
		case 'SHIP_SHIELD_REGEN':
			// debugger;
			return {
				...state,
				...action.payload
			};
		case 'SHIP_UPDATED':
			return action.payload;
		case 'SHIP_MAX_ID':
			return {...state,
				playerShipMaxId: action.payload
			};
		default:
			return state;
	}
}


