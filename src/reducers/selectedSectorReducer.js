const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SECTOR_SELECTED':
			return action.payload;
		default:
			return state;
	}
}