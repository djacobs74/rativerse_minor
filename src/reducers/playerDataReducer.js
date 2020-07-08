let initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PLAYER_DATA':
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}