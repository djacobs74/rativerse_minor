let initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			console.log('*** PATH', action.payload) // array of arrays [[-1, 0], [-2. -1]]
			return action.payload;
		default:
			return state;
	}
}