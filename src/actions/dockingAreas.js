import { TRADE_GOODS } from '../components/_utils/constants';

export const getDockingAreas = (type, dockingAreas) => dispatch => {
	let dockingArray = [];


	if (type === 'start') {

		dockingAreas.map(d => {
			
			if (d.dockingArea.length) {
				dockingArray.push({x: d.x, y: d.y, dockingArea: d.dockingArea[0]});
			}
		})
	}

	// debugger;

	if (type === 'interval') {
		// debugger;
		// const unique = dockingArea.filter( onlyUnique );
		
		dockingArray = dockingAreas;
		// debugger;
		dockingArray.map(d => {
			if (d.dockingArea.tradeGoods.length) {
				d.dockingArea.tradeGoods.map(t => {
					const randomNum = Math.floor(Math.random() * Math.floor(11));
					// debugger;
					if (randomNum >= 10) {
						let amount = null;
						if(t.sellPrice) { // PLAYER IS BUYING
							amount = Math.floor(Math.random() * (t.maxAmount - 0 + 1)) + 0;
						} else { // PLAYER IS SELLING
							const randomAmount = Math.floor(Math.random() * Math.floor(11));
							amount = t.amount + randomAmount;
							if(amount > (t.maxAmount / 2)) {
								if(randomAmount > 8) {
									amount = t.amount - (randomAmount * 2);
								}
							}
							if(amount >= t.maxAmount) {
								amount = t.maxAmount;
							}
							if(amount <= t.minAmount) {
								amount = t.minAmount;
							}
						}


						// const amount = Math.floor(Math.random() * (t.maxAmount - 0 + 1)) + 0;
						t.amount = amount;
						// console.log('**********************************');
						// console.log('getDockingAreas', d.dockingArea.id, t.value, t.amount);
						// console.log('**********************************');
					}

				})
			}
		})		
	}

	if (type === 'adjust') {
		dockingArray = dockingAreas;
	}

	// debugger;

  
  	dispatch({type: 'DOCKING_AREAS', payload: dockingArray});

  	
  	// return {type: 'SHIP_SELECTED', payload: ship};
};

export const updateDockingArea = (dockingAreas) => {
	// add or remove ship from storage

	return (dispatch) => {
		dispatch({type: 'UPDATE_DOCKING_AREA', payload: dockingAreas});
	}
}



