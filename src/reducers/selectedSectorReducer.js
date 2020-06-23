const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SECTOR_SELECTED':
		// debugger;
			let selected = [];
			selected.push(action.payload);
			// debugger;
			return selected;
		default:
			return state;
	}
}