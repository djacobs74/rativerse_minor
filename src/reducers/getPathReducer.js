let initialState = {gamePath: [], combatPath: []};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			return {...state,
				gamePath: action.payload
			}
		default:
			return state;
	}
}

