import { rangeOne } from './rangeOne';
import { pathCheck } from './movement';
import { getPath } from '../../actions/getPath';


export const fireWeapons = (plasmaProjectors, torpedoes, firingShip, targetShip) => {
	
	// Math.floor(Math.random() * (max - min) + min);
	let pDmg = 0;
	let tDmg = 0;
	let totalDmg = 0;
	let toastData = {type: null, msg: null};

	if(plasmaProjectors) {
		pDmg = Math.floor(Math.random() * (firingShip.plasmaProjectors.maxDamage - firingShip.plasmaProjectors.minDamage) + firingShip.plasmaProjectors.minDamage);
	}

	if(torpedoes) {
		tDmg = Math.floor(Math.random() * (firingShip.torpedoes.maxDamage - firingShip.torpedoes.minDamage) + firingShip.torpedoes.minDamage);
	}

	totalDmg = pDmg + tDmg;

	let targetShields = targetShip.shields.shieldsHp;
	let targetHull = targetShip.hullHp;

	if((targetShields - totalDmg) < 0) {
		const leftOverDmg = (targetShields - totalDmg) * -1;
		if((targetHull - leftOverDmg) <= 0) {
			targetHull = 0;
		} else {
			targetHull = targetHull - leftOverDmg;
		}
		targetShields = 0;
		
	} else {
		targetShields = (targetShields - totalDmg);
	}

	const targetDestroyed = targetHull < 1 ? true : false;
	
	targetShip.shields.shieldsHp = targetShields;
	targetShip.hullHp = targetHull;
	targetShip.isDestroyed = targetDestroyed;

	let msg;
	if(plasmaProjectors && torpedoes) {
		msg = 'plasma && torpedo';
	} 
	if(plasmaProjectors && !torpedoes) {
		msg = 'plasma';
	} 
	if(!plasmaProjectors && torpedoes) {
		msg = 'torpedo';
	}

	if(!targetShip.playerShip) { // Player firing
		if(targetDestroyed) {
			toastData = {type: 'success', msg: `${targetShip.faction} ${targetShip.type} ${targetShip.id} DESTOYED!`};
		} else {
			toastData = {type: 'success', msg: `${totalDmg} ${msg} damage to ${targetShip.faction} ${targetShip.type} ${targetShip.id}!`};
		}
	} else { // NPC firing
		// debugger;
		if(targetDestroyed) {
			toastData = {type: 'error', msg: `YOUR SHIP HAS BEEN DESTOYED!`};
		} else {
			toastData = {type: 'warning', msg: `${totalDmg} ${msg} damage from ${firingShip.faction} ${firingShip.type} ${firingShip.id}!`};
		}
	}

	// console.log('^^^ playerFire consts', targetShip);
	const updatedTarget = targetShip;
	return {targetDestroyed, updatedTarget, toastData}

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
			const path = getPath([posX, posY], [destX, destY], null, 'combat', true);
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
						if(pathCheck(rangeOneResults.bottomRight, 'combat')) {
							moveOptions.push(rangeOneResults.bottomRight);
						}
						
					}
				} 
				if (posX > destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
						// console.log('moving down-left');
						if(pathCheck(rangeOneResults.bottomLeft, 'combat')) {
							moveOptions.push(rangeOneResults.bottomLeft);
						}
					}
				}
				if (destX > posX) {
					if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
						// console.log('moving top-left');
						if(pathCheck(rangeOneResults.topLeft, 'combat')) {
							moveOptions.push(rangeOneResults.topLeft);
						}
					}	
				}
				if (destX > posX) {
					if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
						// console.log('moving top-right');
						if(pathCheck(rangeOneResults.topRight, 'combat')) {
							moveOptions.push(rangeOneResults.topRight);
						}
					}
				}
				if (destY > posY) {
					if ((posX === destX) || ((destY - posY) <= 3)) {
						// console.log('moving left');
						if(pathCheck(rangeOneResults.left, 'combat')) {
							moveOptions.push(rangeOneResults.left);
						}
					}
				}
				if (destY < posY) {
					if ((posX === destX) || ((destY - posY) >= 3)) {
						// console.log('moving right');
						if(pathCheck(rangeOneResults.right, 'combat')) {
							moveOptions.push(rangeOneResults.right);
						}
					}
				}
				if (destX === posX && destY === posY) {
					if(pathCheck(rangeOneResults.bottomRight, 'combat')) {
						moveOptions.push(rangeOneResults.bottomRight);
					}
					if(pathCheck(rangeOneResults.bottomLeft, 'combat')) {
						moveOptions.push(rangeOneResults.bottomLeft);
					}
					if(pathCheck(rangeOneResults.topLeft, 'combat')) {
						moveOptions.push(rangeOneResults.topLeft);
					}
					if(pathCheck(rangeOneResults.topRight, 'combat')) {
						moveOptions.push(rangeOneResults.topRight);
					}
					if(pathCheck(rangeOneResults.left, 'combat')) {
						moveOptions.push(rangeOneResults.left);
					}
					if(pathCheck(rangeOneResults.right, 'combat')) {
						moveOptions.push(rangeOneResults.right);
					}
				}
			}
			/////////   NPC MOVE TOWARD PLAYER /////////
			if(direction === 'toward') {
				if (posX < destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) >= 0 ) ) {
						// console.log('moving down-right');
						if(pathCheck(rangeOneResults.bottomRight, 'combat')) {
							moveOptions.push(rangeOneResults.bottomRight);
						}
						
					}
				} 
				if (posX < destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
						// console.log('moving down-left');
						if(pathCheck(rangeOneResults.bottomLeft, 'combat')) {
							moveOptions.push(rangeOneResults.bottomLeft);
						}
					}
				}
				if (destX < posX) {
					if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
						// console.log('moving top-left');
						if(pathCheck(rangeOneResults.topLeft, 'combat')) {
							moveOptions.push(rangeOneResults.topLeft);
						}
					}	
				}
				if (destX < posX) {
					if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
						// console.log('moving top-right');
						if(pathCheck(rangeOneResults.topRight, 'combat')) {
							moveOptions.push(rangeOneResults.topRight);
						}
					}
				}
				if (destY < posY) {
					if ((posX === destX) || ((destY - posY) <= 3)) {
						// console.log('moving left');
						if(pathCheck(rangeOneResults.left, 'combat')) {
							moveOptions.push(rangeOneResults.left);
						}
					}
				}
				if (destY > posY) {
					if ((posX === destX) || ((destY - posY) >= 3)) {
						// console.log('moving right');
						if(pathCheck(rangeOneResults.right, 'combat')) {
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

export const playerFire = (npc, playerShip, playerPosition, torpedoesEnabled) => {
	let plasmaProjectors = false;
	let torpedoes = false;
	let destX = npc.combatPositionX;
	let destY = npc.combatPositionY;
	const posX = playerPosition[0];
	const posY = playerPosition[1];
	const path = getPath([posX, posY], [destX, destY], null, 'combat', true);
	const rangeToTarget = path.length;

	if(playerShip.plasmaProjectors) {
		playerShip.plasmaCounter >= 0 ? playerShip.plasmaCounter++ : playerShip.plasmaCounter = 0; // adjust this?
		// console.log('^^^ playerShip.plasmaCounter', playerShip.plasmaCounter);
		if(playerShip.plasmaCounter >= 4) {
			if(rangeToTarget <= playerShip.plasmaProjectors.range) {
				plasmaProjectors = true;
				playerShip.plasmaCounter = 0;
			}
		}
	}
	if(torpedoesEnabled && (playerShip.torpedoAmmo > 0)) {
		playerShip.torpedoCounter >= 0 ? playerShip.torpedoCounter++ : playerShip.torpedoCounter = 0;
		if(playerShip.torpedoCounter >= 10) {
			// TODO: add ammo tracker: can only fire if player ship has ammo
			if(rangeToTarget <= playerShip.torpedoes.range) {
				torpedoes = true;
				playerShip.torpedoCounter = 0;
				playerShip.torpedoAmmo--;
			}
		}
	}

	let {targetDestroyed, updatedTarget, toastData} = fireWeapons(plasmaProjectors, torpedoes, playerShip, npc);
	if(!plasmaProjectors && !torpedoes) {
		toastData = null;
	}
	// console.log('^^^ playerFire consts', npcDestroyed);
	return {targetDestroyed, updatedTarget, toastData}
	// console.log('^^^ playership', playerShip.plasmaCounter);
}

export const npcsFire = (playerShip, playerPosition, npc) => {

		let plasmaProjectors = false;
		let torpedoes = false;
		let posX = npc.combatPositionX;
		let posY = npc.combatPositionY;
		const destX = playerPosition[0];
		const destY = playerPosition[1];
		const path = getPath([posX, posY], [destX, destY], null, 'combat', true);
		const rangeToTarget = path.length;

		if(npc.plasmaProjectors) {
			npc.plasmaCounter >= 0 ? npc.plasmaCounter++ : npc.plasmaCounter = 0; // adjust this?
			// console.log('^^^ playerShip.plasmaCounter', playerShip.plasmaCounter);
			if(npc.plasmaCounter >= 4) {
				if(rangeToTarget <= npc.plasmaProjectors.range) {
					plasmaProjectors = true;
					npc.plasmaCounter = 0;
				}
			}
		}
		if(npc.torpedoes) {
			npc.torpedoCounter >= 0 ? npc.torpedoCounter++ : npc.torpedoCounter = 0;
			if(npc.torpedoCounter >= 10) {
				// TODO: add ammo tracker: can only fire if player ship has ammo
				if(rangeToTarget <= npc.torpedoes.range) {
					torpedoes = true;
					npc.torpedoCounter = 0;
				}
			}
		}

		let {targetDestroyed, updatedTarget, toastData} = fireWeapons(plasmaProjectors, torpedoes, npc, playerShip);

		if(!plasmaProjectors && !torpedoes) {
			toastData = null;
		}

		// console.log('!!! target destroyed', targetDestroyed);

		return {targetDestroyed, updatedTarget, toastData}
}

export const playerShipDestroyed = (npcs, playerPosition, dockingAreas) => {
	const posX = playerPosition[0];
	const posY = playerPosition[1];
	let rangeOneResults = rangeOne(posX, posY);
	let dockedAt = [];
	const dockingAreasTotal = dockingAreas.length;

	const randomDockingArea = Math.floor(Math.random() * (0 - dockingAreasTotal) + dockingAreasTotal);
	const dockedAtData = dockingAreas[randomDockingArea];
	const newPlayerCoords = [dockedAtData.x, dockedAtData.y];

	return newPlayerCoords
} 

export const retreatToSector = (playerPosition) => {
	const posX = playerPosition[0];
	const posY = playerPosition[1];
	let rangeOneResults = rangeOne(posX, posY);
	let moveOptions = [];

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

	let length = moveOptions.length;
	let option = 0;
			
	if (moveOptions.length) {
		option = Math.floor(Math.random() * Math.floor(length));
	}

	let newCoords = moveOptions[option];

	return newCoords

}