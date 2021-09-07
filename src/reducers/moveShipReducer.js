let initialState = {moving: false, position: [0, 0], combatMoving: false, combatPosition: [0, 0]};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'MOVE_SHIP':
			// console.log('*** MOVE SHIP', action.payload);
			return {...state,
				moving: action.payload.moving,
				position: action.payload.position
			}
		case 'COMBAT_MOVE_SHIP':
			// debugger;
			return {...state,
				combatMoving: action.payload.moving,
				combatPosition: action.payload.position
			}
		case 'NEW_PLAYER_POSITION':
			return {...state,
				moving: false,
				position: action.payload
			}
		case 'NEW_PLAYER_COMBAT_POSITION':
			return {...state,
				moving: false,
				combatPosition: action.payload
		}
		default:
			return state;
	}
}