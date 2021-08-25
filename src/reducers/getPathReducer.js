let initialState = {gamePath: [], combatPath: []};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			return {...state,
				gamePath: action.payload
			}
			case 'COMBAT_PATH_SET':
				return {...state,
					combatPath: action.payload
				}
		default:
			return state;
	}
}

