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
					
					if (randomNum >= 10) {
						const amount = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
						t.amount = amount;
						console.log('**********************************');
						console.log('getDockingAreas', d.dockingArea.id, t.value, t.amount);
						console.log('**********************************');
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



// export const onlyUnique = (value, index, self) => { 

//     return self.indexOf(value) === index;
// }



