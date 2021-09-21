import _ from 'lodash';
import { playerData } from '../../actions/playerData';

export const pathCheck = (hex, mapType='game') => {
	const maxHex = mapType === 'game' ? 25 : 5;
	if(Math.abs(hex[0]) > maxHex || Math.abs(hex[1]) > maxHex) {
		return false
	}
	return true
}

export const moveCheck = (position, destination) => {
	let moving = true;
	if(position && destination) {
		if ((position[0] === destination[0]) && (position[1] === destination[1])) {
			moving = false;
		} 
	}
	
	return moving
}

export const getDockOption = (position, map) => {
	// console.log('POSITION', position);
	let canDock = false;
	
	if (position && position.length) {
		
		map.map(m => {
			if ((position[0] === m.x) && (position[1] === m.y)) {
			
				if (m.dockingArea.length) {
					canDock = true;

				}

			}
		})
	}
		

	return canDock

}

export const combatCheck = (ship, playerPos, player) => {
	// console.log('COMBAT CHECK PLAYERDATA', player);
	// console.log('COMBAT CHECK PLAYERPOS', playerPos);
	// console.log('COMBAT CHECK SHIP', ship);

	if(!_.isEmpty(player)) {
		if(ship.x === playerPos[0] && ship.y === playerPos[1]) {
			// console.log('** SHIP **', ship);
			const shipFaction = ship.faction;
			const playerRep = player.reputation;
			let repValue = null;

			player.reputation.map(r => {
				const key = Object.keys(r).join();
				// console.log('INSIDE MAP, R', r);
				// console.log('INSIDE MAP KEY', key);
				// console.log('INSIDE MAP shipFaction', shipFaction);
				if(key === shipFaction) {

					repValue = Object.values(r)[0];
					// console.log('COMBAT CHECK repValue, R', repValue, r);
				}
			})

			if(repValue < 0 && !player.docked && !ship.isDestroyed) {
				// debugger;
				player.inCombat = true;
				playerData(false, player);
				return true
			}

		}
	}
	
	return false
}



