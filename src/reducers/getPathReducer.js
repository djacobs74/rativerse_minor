const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			debugger;
			return action.payload;
		default:
			return state;
	}
}