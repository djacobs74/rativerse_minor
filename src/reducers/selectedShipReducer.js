const initialState = {};

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
		case 'SHIP_UPGRADED':
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}


