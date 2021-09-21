const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'DOCKING_AREAS':
			// debugger;
			return [...action.payload];
		case 'UPDATE_DOCKING_AREA':
			return [...action.payload];
		default:
			return state;
	}
}