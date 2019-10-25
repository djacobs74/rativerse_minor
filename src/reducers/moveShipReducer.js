const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SHIP_MOVED':
			return action.payload;
		default:
			return state;
	}
}