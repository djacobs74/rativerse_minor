const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			return action.payload;
		default:
			return state;
	}
}