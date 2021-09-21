let initialState = {credits: 20000, reputation: [{uwc: 1}, {bfr: -5}, {cnp: -5}, {ob: 0}, {tscc: -10}], docked: false, inCombat: false};

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