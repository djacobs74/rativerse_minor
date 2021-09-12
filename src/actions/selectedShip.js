import { TRADE_GOODS, PLAYER_SHIPS } from '../components/_utils/constants';

export const selectNewShip = (ship, cargo, id) => {
	let copiedShip = JSON.parse(JSON.stringify(ship));
	let newMaxId = id + 1;

	copiedShip.id = newMaxId;
	if(!cargo){
		let cargoOptions = [];
		TRADE_GOODS.map(t => {
			cargoOptions.push({value: t.value, label: t.label, amount: 0, priceTotal: 0})
		})
		copiedShip.cargoHold = cargoOptions;
	} else {
		copiedShip.cargoHold = cargo;
		let cargoTotal = 0;
		cargo.map(c => {
			if(c.amount !== 0) {
				cargoTotal = cargoTotal+c.amount;
			}
		})
		copiedShip.cargo = cargoTotal;
	}

	return (dispatch) => {
		dispatch({type: 'SHIP_SELECTED', payload: {ship: copiedShip, maxId: newMaxId}});
		// dispatch({type: 'SHIP_MAX_ID', payload: newMaxId});
	}
  	
  	// return {type: 'SHIP_SELECTED', payload: ship};
};

export const shieldRecharger = (ship) => {
	if(ship.shields.shieldsHp < ship.shields.shieldsMax) {
		ship.shields.shieldsHp = (ship.shields.shieldsHp + ship.shields.shieldsRegen);
		if(ship.shields.shieldsHp > ship.shields.shieldsMax) {
			ship.shields.shieldsHp = ship.shields.shieldsMax;
		}
	}
	return (dispatch) => {
		dispatch({type: 'SHIP_SHIELD_REGEN', payload: ship});
	}

}

export const updateShip = (ship, maxId) => {
	return (dispatch) => {
		dispatch({type: 'SHIP_UPDATED', payload: {ship: ship, maxId: maxId}});
	}
}

export const shipInStorage = (ships, id, action) => {
	// add or remove ship from storage

	return (dispatch) => {
		dispatch({type: 'SHIP_STORAGE', payload: ships});
	}
}