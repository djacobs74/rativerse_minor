import { rangeOne } from './rangeOne';
import { pathCheck } from './movement';
import { getPath } from '../../actions/getPath';

export const getStartingRange = () => {
  	return Math.floor(Math.random() * (11 - 5) + 5);
}

export const setRangeToTarget = (targetShip, playerShip, direction) => {
	// console.log('^^^^ targetShip', targetShip);
	// console.log('^^^^ playerShip', playerShip);
	const currentRange = targetShip.range;
	const playerShipSpeed = playerShip.sublightSpeed;
	const targetShipSpeed = targetShip.sublightSpeed;
	const speedDiff = Math.abs(targetShipSpeed - playerShipSpeed);
	let newRange = currentRange;
	let toastData = {type: null, msg: null};

	// debugger;

	if(direction === 'away') {

		if(playerShipSpeed > targetShipSpeed) {
			newRange = currentRange + speedDiff;
			toastData.type = 'success';
			toastData.msg = 'Moving Outside Weapons Range';
		} else if(playerShipSpeed < targetShipSpeed) {
			newRange = currentRange - speedDiff;
			toastData.type = 'error';
			toastData.msg = 'Unable to Move Outside Weapons Range';
		} 
	}

	if(direction === 'close') {
		newRange = currentRange - (playerShipSpeed + targetShipSpeed);
		toastData.type = 'success';
		toastData.msg = 'Closing Range to Target';
	}

	if(newRange < 0) {
		newRange = 0;
	}

	const rangeData = {newRange, toastData}

	return rangeData


	// sublightSpeed
	// targetShip.range
}


// export const rangeDelay = (npcs, playerShip, direction) => {
// 	// debugger;
// 	let npcSpeedArray = [{npcsSlower: 0}, {npcsEven: 0}, {npcsFaster: 0}];

// 	setInterval(function () {
// 		npcs.map(n => {
// 			const playerShipSpeed = playerShip.sublightSpeed;
// 			const targetShipSpeed = n.sublightSpeed;
// 			if(playerShipSpeed > targetShipSpeed) {

// 			}
// 		})

// 		console.log('&&&& range data');
		
// 	}, 5000)
// }

export const checkRange = (npcs, playerShip, direction) => {
	let npcSpeedTracker = {npcsSlower: 0, npcsFaster: 0};
	let toastData = {type: null, msg: null};

	npcs.map(n => {
		const playerShipSpeed = playerShip.sublightSpeed;
		const targetShipSpeed = n.sublightSpeed;

		if(direction === 'away') {
			if(playerShipSpeed > targetShipSpeed) {
				n.inRangeMsg = 'Out of Weapons Range';
				n.inRangePP = false;
				n.inRangeT = false;
				npcSpeedTracker.npcsSlower = npcSpeedTracker.npcsSlower + 1;
			} else {
				n.inRangeMsg = 'In Range of All Weapons';
				n.inRangePP = true;
				n.inRangeT = true;
				npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
			}
		}
		if(direction === 'closeRange') {
			n.inRangeMsg = 'In Range of All Weapons';
			n.inRangePP = true;
			n.inRangeT = true;
			npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
		}
		if(direction === 'maxRange') {
			if(playerShipSpeed > targetShipSpeed) {
				n.inRangeMsg = 'In Plasma Projector Weapons Range';
				n.inRangePP = true;
				n.inRangeT = false;
				npcSpeedTracker.npcsSlower = npcSpeedTracker.npcsSlower + 1;
			} else {
				n.inRangeMsg = 'In Range of All Weapons';
				n.inRangePP = true;
				n.inRangeT = true;
				npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
			}
		}

	})

	if(direction === 'away') {
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster === 0) {
			toastData = {type: 'success', msg: 'Moving Outside Weapons Range of All Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'warning', msg: 'Moving Outside Weapons Range of Slower Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower === 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'error', msg: 'Unable to Move Outside Weapons Range of Any Hostile Ships'};
		}
	}

	if(direction === 'closeRange') {
		toastData = {type: 'success', msg: 'Moving Inside Weapons Range of All Hostile Ships'};
	}

	if(direction === 'maxRange') {
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster === 0) {
			toastData = {type: 'success', msg: 'Moving to Max Plasma Projector Weapons Range'};
		}
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'warning', msg: 'Moving to Max Plasma Projector Weapons Range of Slower Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower === 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'error', msg: 'Unable to Move to Max Plasma Projector Weapons Range of Any Hostile Ships'};
		}
	}

	// debugger;
	const rangeData = {npcs, toastData};

	return rangeData

	// toast.success('Martel Drive Engaged');

}

export const firePlayerWeapons = (plasmaProjectors, torpedoes, currentShip, currentTarget) => {
	

	// get damage from PP, T
	// add that damage together
	// Math.floor(Math.random() * (max - min) + min);
	let pDmg = 0;
	let tDmg = 0;
	let totalDmg = 0;
	let toastData = {type: null, msg: null};

	if(plasmaProjectors) {
		pDmg = Math.floor(Math.random() * (currentShip.plasmaProjectors.maxDamage - currentShip.plasmaProjectors.minDamage) + currentShip.plasmaProjectors.minDamage);
	}

	if(torpedoes) {
		tDmg = Math.floor(Math.random() * (currentShip.torpedoes.maxDamage - currentShip.torpedoes.minDamage) + currentShip.torpedoes.minDamage);
	}

	totalDmg = pDmg + tDmg;

	let npcShields = currentTarget.shields.shieldsHp;
	let npcHull = currentTarget.hullHp;

	if((npcShields - totalDmg) < 0) {
		const leftOverDmg = (npcShields - totalDmg) * -1;
		if((npcHull - leftOverDmg) <= 0) {
			npcHull = 0;
		} else {
			npcHull = npcHull - leftOverDmg;
		}
		npcShields = 0;
		
	} else {
		npcShields = (npcShields - totalDmg);
	}

	const npcDestroyed = npcHull < 1 ? true : false;
	
	currentTarget.shields.shieldsHp = npcShields;
	currentTarget.hullHp = npcHull;
	currentTarget.isDestroyed = npcDestroyed;

	if(npcDestroyed) {
		toastData = {type: 'success', msg: `${currentTarget.faction} ${currentTarget.type} ${currentTarget.id} DESTOYED!`};
	} else {
		toastData = {type: 'success', msg: `${totalDmg} damage to ${currentTarget.faction} ${currentTarget.type} ${currentTarget.id}!`};
	}

	
	// debugger

	return {npcDestroyed, currentTarget, toastData}

	;

	// 	this need to be set to a timer
}

export const adjustStandings = (faction, playerData) => {

	let playerRep = playerData.reputation;

	if (faction === 'uwc') {
		playerRep[0]["uwc"] = playerRep[0]["uwc"] - 1;
		playerRep[1]["bfr"] = playerRep[1]["bfr"] + 1;
		playerRep[2]["cnp"] = playerRep[2]["cnp"] + 1;
		playerRep[3]["ob"] = playerRep[3]["ob"] - 1;
		playerRep[4]["tscc"] = playerRep[4]["tscc"] + 1;
	} else if (faction === 'bfr') {
		playerRep[0]["uwc"] = playerRep[0]["uwc"] + 1;
		playerRep[1]["bfr"] = playerRep[1]["bfr"] - 1;
		// playerRep[2]["cnp"] = playerRep[2]["cnp"] + 1;
		playerRep[3]["ob"] = playerRep[3]["ob"] + 1;
		// playerRep[4]["tscc"] = playerRep[4]["tscc"] + 1;
	} else if (faction === 'cnp') {
		playerRep[0]["uwc"] = playerRep[0]["uwc"] + 1;
		// playerRep[1]["bfr"] = playerRep[1]["bfr"] + 1;
		playerRep[2]["cnp"] = playerRep[2]["cnp"] - 1;
		// playerRep[3]["ob"] = playerRep[3]["ob"] - 1;
		// playerRep[4]["tscc"] = playerRep[4]["tscc"] + 1;
	} else if (faction === 'ob') {
		playerRep[0]["uwc"] = playerRep[0]["uwc"] - 1;
		playerRep[1]["bfr"] = playerRep[1]["bfr"] + 1;
		// playerRep[2]["cnp"] = playerRep[2]["cnp"] + 1;
		playerRep[3]["ob"] = playerRep[3]["ob"] - 1;
		// playerRep[4]["tscc"] = playerRep[4]["tscc"] + 1;
	} else if (faction === 'tscc') {
		playerRep[0]["uwc"] = playerRep[0]["uwc"] + 1;
		// playerRep[1]["bfr"] = playerRep[1]["bfr"] + 1;
		// playerRep[2]["cnp"] = playerRep[2]["cnp"] + 1;
		// playerRep[3]["ob"] = playerRep[3]["ob"] - 1;
		playerRep[4]["tscc"] = playerRep[4]["tscc"] - 1;
	}


	playerRep.map((r, index) => {
		const key = Object.keys(r);
		if (r[key[0]] > 10) {
			r[key[0]] = 10;
		} else if (r[key[0]] < -10) {
			r[key[0]] = -10;
		}
	})

}

//////////////////// ******* OLD UTILS ABOVE ******* //////////////////////

export const setNpcStartingLocation = (ship) => {
	let x = Math.floor(Math.random()*5) + 1;
	x *= Math.round(Math.random()) ? 1 : -1;

	let y = Math.floor(Math.random()*5) + 1;
	y *= Math.round(Math.random()) ? 1 : -1;

	ship.combatPositionX = x;
	ship.combatPositionY = y;
	ship.moveCounter = ship.sublightSpeed.value / 1000;
	
	return ship
}

const getNpcOptimalRange = (npc) => {
	const plasmas = npc.plasmaProjectors ? npc.plasmaProjectors.range : null;
	const torps = npc.torpedoes ? npc.torpedoes.range : null;

	return torps ? torps : plasmas
}

export const moveNpcShips = (npcs, playerPosition) => {
	let updatedNpcs = [];
	npcs.map(npc => {
		if(npc.moveCounter === npc.sublightSpeed.value / 1000) {
			let posX = npc.combatPositionX;
			let posY = npc.combatPositionY;
			let moveOptions = [];
			let newCoords = [];
			let rangeOneResults = rangeOne(posX, posY);

			const destX = playerPosition[0];
			const destY = playerPosition[1];
			const optimalRange = getNpcOptimalRange(npc);
			const path = getPath([posX, posY], [destX, destY], null, 'combat', 'npc');
			const rangeToTarget = path.length;
			let direction = '';
			if(rangeToTarget > optimalRange) {
				direction = 'toward';
			} else if(rangeToTarget < optimalRange) {
				direction = 'away';
			} else {
				direction = 'stayPut'
			}

			/////////   NPC MOVE AWAY FROM PLAYER /////////
			if(direction === 'away') {
				if (posX > destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) >= 0 ) ) {
						// console.log('moving down-right');
						if(pathCheck(rangeOneResults.bottomRight)) {
							moveOptions.push(rangeOneResults.bottomRight);
						}
						
					}
				} 
				if (posX > destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
						// console.log('moving down-left');
						if(pathCheck(rangeOneResults.bottomLeft)) {
							moveOptions.push(rangeOneResults.bottomLeft);
						}
					}
				}
				if (destX > posX) {
					if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
						// console.log('moving top-left');
						if(pathCheck(rangeOneResults.topLeft)) {
							moveOptions.push(rangeOneResults.topLeft);
						}
					}	
				}
				if (destX > posX) {
					if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
						// console.log('moving top-right');
						if(pathCheck(rangeOneResults.topRight)) {
							moveOptions.push(rangeOneResults.topRight);
						}
					}
				}
				if (destY > posY) {
					if ((posX === destX) || ((destY - posY) <= 3)) {
						// console.log('moving left');
						if(pathCheck(rangeOneResults.left)) {
							moveOptions.push(rangeOneResults.left);
						}
					}
				}
				if (destY < posY) {
					if ((posX === destX) || ((destY - posY) >= 3)) {
						// console.log('moving right');
						if(pathCheck(rangeOneResults.right)) {
							moveOptions.push(rangeOneResults.right);
						}
					}
				}
				if (destX === posX && destY === posY) {
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
				}
			}
			/////////   NPC MOVE TOWARD PLAYER /////////
			if(direction === 'toward') {
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
			}

			/////////   NPC STAY PUT ///////
			if(direction !== 'stayPut') {
				let option = 0;
			
				let length = moveOptions.length;
			
				if (moveOptions.length) {
					option = Math.floor(Math.random() * Math.floor(length));
				}
			
				newCoords = moveOptions[option];
		
				if(newCoords) {
					npc.combatPositionX = newCoords[0];
					npc.combatPositionY = newCoords[1];
				} else {
					npc.combatPositionX = posX;
					npc.combatPositionY = posY;
				}
			}
			npc.moveCounter = 0;
		} else {
			npc.moveCounter++;
		}
		updatedNpcs.push(npc);
	})
	return updatedNpcs
}

