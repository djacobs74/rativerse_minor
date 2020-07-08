import { TRADE_GOODS } from '../components/_utils/constants';

export const getDockingAreas = (initial, dockingArea) => dispatch => {
	let dockingArray = [];
	if (initial) {
		dockingArea.map(d => {
			
			if (d.dockingArea.length) {
				dockingArray.push({x: d.x, y: d.y, dockingArea: d.dockingArea[0]});
			}
		})
	}

	// debugger;

  
  	dispatch({type: 'DOCKING_AREAS', payload: dockingArray});

  	
  	// return {type: 'SHIP_SELECTED', payload: ship};
};