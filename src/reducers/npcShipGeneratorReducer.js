import { NPC_SHIPS } from '../components/_utils/constants';
import _ from 'lodash';

let initialState = NPC_SHIPS;

export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIPS':

			let npcsArrayCopy = _.cloneDeep(action.payload);
			npcsArrayCopy.map((n, index) => {
				if(n.isDestroyed) {
					npcsArrayCopy.splice(index, 1);
				
				}
			})

			return npcsArrayCopy;
		default:
			return state;
	}
}