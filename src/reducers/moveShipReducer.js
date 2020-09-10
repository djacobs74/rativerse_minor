let initialState = {moving: false, position: [0, 0]};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'MOVE_SHIP':
			return action.payload;
		default:
			return state;
	}
}