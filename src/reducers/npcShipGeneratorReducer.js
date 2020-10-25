import { NPC_SHIPS } from '../components/_utils/constants';
import _ from 'lodash';

let initialState = NPC_SHIPS;

export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIPS':
			return action.payload;
		default:
			return state;
	}
}