import { TRADE_GOODS } from '../components/_utils/constants';

export const selectedShip = (ship, newShip) => {

	if(newShip) {
		let cargoOptions = [];
		TRADE_GOODS.map(t => {
			cargoOptions.push({value: t.value, label: t.label, amount: 0})
		})
		ship.cargoHold = cargoOptions;
	}


  	return (dispatch) => {
  		dispatch({type: 'SHIP_SELECTED', payload: ship});
  	}
  	
  	// return {type: 'SHIP_SELECTED', payload: ship};
};