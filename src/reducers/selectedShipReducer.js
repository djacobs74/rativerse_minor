const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHIP_SELECTED':
			// debugger;
			return action.payload;
		default:
			return state;
	}
}