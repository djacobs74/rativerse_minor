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
			case 'RESET_GAME_PATH':
				return {...state,
					gamePath: action.payload
				}
			case 'RESET_COMBAT_PATH':
				return {...state,
					combatPath: action.payload
				}
		default:
			return state;
	}
}

