import _ from 'lodash';
let initialState = [];


export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIP_MOVER':
			
			return action.payload;
		default:
			return state;
	}
}