import _ from 'lodash';
let initialState = [];


export default (state = initialState, action) => {
	switch (action.type) {
		case 'NPC_SHIP_MOVER':
			// debugger;
			let npcsArrayCopy = _.cloneDeep(action.payload);
			
			npcsArrayCopy.map((n, index) => {
				if(n.isDestroyed) {
					debugger;
					npcsArrayCopy.splice(index, 1);
				
				}
			})

			
			
			return npcsArrayCopy;
		default:
			return state;
	}
}