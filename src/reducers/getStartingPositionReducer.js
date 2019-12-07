let initialState = [0, 0];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'POSITION':
			return action.payload;
		default:
			return state;
	}
}