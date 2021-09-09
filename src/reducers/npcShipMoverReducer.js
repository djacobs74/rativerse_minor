import _ from 'lodash';
let initialState = [];


export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIPS_UPDATED':
			return action.payload;
		// case 'NPC_SHIPS_RECHARGED':
		// 	return action.payload;
		default:
			return state;
	}
}