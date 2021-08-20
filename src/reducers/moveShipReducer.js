let initialState = {moving: false, position: [0, 0]};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'MOVE_SHIP':
			// console.log('*** MOVE SHIP', action.payload);
			return {...state,
				moving: action.payload.moving,
				position: action.payload.position
			}
		default:
			return state;
	}
}