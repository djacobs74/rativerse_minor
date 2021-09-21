import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck, combatCheck } from '.././components/_utils/movement';
import { getPath } from './getPath';
import _ from 'lodash';

export const npcShipMover = (npcShips, playerPosition, player, npcActiveShips, playerShipSignature) => {

	let npcShipsActive = [];
	const moveOptionNum = 5;
	// debugger;
	// console.log('npcShipMover player', player);
	// console.log('npcShipMover npcShips', npcShips);


	if(npcShips) {

		npcShips.map(s => {

			// const inCombat = combatCheck(s, playerPosition.position, player);
			const npc = npcActiveShips.find(x => x.id === s.id);

			let inCombat = false;

			if(npc) {
				inCombat = combatCheck(s, playerPosition, player);
			}

			if(npc && npc.isDestroyed) {
				s.inCombat = false;
				s.isDestroyed = true;
			} else if(npc && !npc.isDestroyed) {
				s.inCombat = inCombat;
			}

			if(!s.inCombat && !s.isDestroyed) {
				let npcWillMove = false;
				let npcIsHostile = false;
				let npcInRange = false;
				let posX = s.x;
				let posY = s.y;
				const destX = playerPosition[0];
				const destY = playerPosition[1];
				let rangeOneResults = rangeOne(posX, posY);
				let moveOptions = [];
				let newCoords = [];

				if(!_.isEmpty(player)) {
					const shipFaction = s.faction;
					const playerRep = player.reputation;
					let repValue = null;
		
					player.reputation.map(r => {
						const key = Object.keys(r).join();
						if(key === shipFaction) {
							repValue = Object.values(r)[0];
						}
					})
		
					if(repValue < 0) { // this needs to be the same setting as in combatCheck
						npcIsHostile = true;
					}

					if(npcIsHostile && !player.docked) {
						const path = getPath([posX, posY], [destX, destY], null, 'game', true);
						const rangeToTarget = path.length;
						if(playerShipSignature !== 0 && (rangeToTarget <= playerShipSignature)) {
							npcInRange = true;
						}
					}

					if(npcInRange && npcIsHostile) {
						npcWillMove = true;
					}
				}

				if(npcWillMove) {
					/////////   NPC MOVE TOWARD PLAYER /////////
					if (posX < destX) {
						if ( ((destX - posX) >= 3 ) || ((destY - posY) >= 0 ) ) {
							// console.log('moving down-right');
							if(pathCheck(rangeOneResults.bottomRight)) {
								moveOptions.push(rangeOneResults.bottomRight);
							}
							
						}
					} 
					if (posX < destX) {
						if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
							// console.log('moving down-left');
							if(pathCheck(rangeOneResults.bottomLeft)) {
								moveOptions.push(rangeOneResults.bottomLeft);
							}
						}
					}
					if (destX < posX) {
						if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
							// console.log('moving top-left');
							if(pathCheck(rangeOneResults.topLeft)) {
								moveOptions.push(rangeOneResults.topLeft);
							}
						}	
					}
					if (destX < posX) {
						if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
							// console.log('moving top-right');
							if(pathCheck(rangeOneResults.topRight)) {
								moveOptions.push(rangeOneResults.topRight);
							}
						}
					}
					if (destY < posY) {
						if ((posX === destX) || ((destY - posY) <= 3)) {
							// console.log('moving left');
							if(pathCheck(rangeOneResults.left)) {
								moveOptions.push(rangeOneResults.left);
							}
						}
					}
					if (destY > posY) {
						if ((posX === destX) || ((destY - posY) >= 3)) {
							// console.log('moving right');
							if(pathCheck(rangeOneResults.right)) {
								moveOptions.push(rangeOneResults.right);
							}
						}
					}
				} else {
						/////////   NPC CHANCE FOR RANDOM MOVE /////////
						const moveChance = Math.floor(Math.random() * Math.floor(moveOptionNum));
						if(moveChance == (moveOptionNum-1)) {
							npcWillMove = true;
		
							if(pathCheck(rangeOneResults.bottomRight)) {
								moveOptions.push(rangeOneResults.bottomRight);
							}
							
							if(pathCheck(rangeOneResults.bottomLeft)) {
								moveOptions.push(rangeOneResults.bottomLeft);
							}
		
							if(pathCheck(rangeOneResults.topLeft)) {
								moveOptions.push(rangeOneResults.topLeft);
							}
		
							if(pathCheck(rangeOneResults.topRight)) {
								moveOptions.push(rangeOneResults.topRight);
							}
		
							if(pathCheck(rangeOneResults.left)) {
								moveOptions.push(rangeOneResults.left);
							}
		
							if(pathCheck(rangeOneResults.right)) {
								moveOptions.push(rangeOneResults.right);
							}
		
							// let option = 0;
							
							// let length = moveOptions.length;
							// if (moveOptions.length) {
							// 	option = Math.floor(Math.random() * Math.floor(length));
							// }
							// // debugger;
							// newCoords = moveOptions[option];
		
							// s.x = newCoords[0];
							// s.y = newCoords[1];
						}
					}
					if(!s.isDestroyed) {
						let option = 0;
							
						let length = moveOptions.length;
						if (moveOptions.length) {
							option = Math.floor(Math.random() * Math.floor(length));
							newCoords = moveOptions[option];
							s.x = newCoords[0];
							s.y = newCoords[1];
						}
						// debugger;
						
					}
				}
				npcShipsActive.push(s);
		})

	}
	// console.log('### npcShipMover npcShipsActive', npcShipsActive);
	// debugger;
	return (dispatch) => {
			dispatch({type: 'NPC_SHIP_MOVER'});
			dispatch(npcShipsUpdated(npcShipsActive))
  	}
};


export const npcShipsUpdated = (npcShipsUpdated) => {
	return (dispatch) => { dispatch({type: 'NPC_SHIPS_UPDATED', payload: npcShipsUpdated})};
}

export const npcShieldRecharger = (npcs) => {
	// console.log('!!!! npcShieldRecharger');
	npcs.forEach(s => {
		
			// console.log('!!!! npcShieldRecharger', s.id);
			if(s.shields.shieldsHp < s.shields.shieldsMax) {
				s.shields.shieldsHp = (s.shields.shieldsHp + s.shields.shieldsRegen);
				if(s.shields.shieldsHp > s.shields.shieldsMax) {
					s.shields.shieldsHp = s.shields.shieldsMax;
				}
			}
		

	})
	return (dispatch) => { 
		dispatch({type: 'NPC_SHIPS_RECHARGED'});
		dispatch(npcShipsUpdated(npcs))
	}
}




