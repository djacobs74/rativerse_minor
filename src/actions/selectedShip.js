import { TRADE_GOODS, PLAYER_SHIPS } from '../components/_utils/constants';

export const selectedShip = (newShip, ship, cargo) => {
	let copiedShip = JSON.parse(JSON.stringify(ship));
	if(newShip) {
		if(!cargo){
			let cargoOptions = [];
			TRADE_GOODS.map(t => {
				cargoOptions.push({value: t.value, label: t.label, amount: 0})
			})
			copiedShip.cargoHold = cargoOptions;
		} else {
			copiedShip.cargoHold = cargo;
		}
	} else {
		copiedShip = null;
	}


	return (dispatch) => {
		dispatch({type: 'SHIP_SELECTED', payload: copiedShip});
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