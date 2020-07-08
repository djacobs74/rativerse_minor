const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'DOCKING_AREAS':
			// debugger;
			return [
				...state,
				...action.payload
			];
		default:
			return state;
	}
}