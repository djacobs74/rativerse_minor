let initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIP_MOVER':
			// debugger;
			return action.payload;
		default:
			return state;
	}
}