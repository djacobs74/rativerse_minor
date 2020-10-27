import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck, combatCheck } from '.././components/_utils/movement';

export const npcShipMover = (npcShips, playerPosition, player, npcActiveShips) => {

	let npcShipsActive = [];
	const moveOptionNum = 5;
	// debugger;
	console.log('npcShipMover player', player);
	console.log('npcShipMover npcShips', npcShips);


	if(npcShips) {

		npcShips.map(s => {

			// const inCombat = combatCheck(s, playerPosition.position, player);
			const npc = npcActiveShips.find(x => x.id === s.id);

			let inCombat = false;

			if(npc) {
				inCombat = combatCheck(s, playerPosition.position, player);
			}

			if(npc && npc.isDestroyed) {
				s.inCombat = false;
				s.isDestroyed = true;
			} else if(npc && !npc.isDestroyed) {
				s.inCombat = inCombat;
			}


			// shield regen 
			if(s.shields.shieldsHp < s.shields.shieldsMax) {
				s.shields.shieldsHp = (s.shields.shieldsHp + s.shields.shieldsRegen);
				if(s.shields.shieldsHp > s.shields.shieldsMax) {
					s.shields.shieldsHp = s.shields.shieldsMax;
				}
			}

			if(!s.inCombat && !s.isDestroyed) {
				
				const moveChance = Math.floor(Math.random() * Math.floor(moveOptionNum));
				if(moveChance == (moveOptionNum-1)) {
					let posX = s.x;
					let posY = s.y;
					let moveOptions = [];
					let newCoords = [];
					let rangeOneResults = rangeOne(posX, posY);

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

					let option = 0;
					
					let length = moveOptions.length;
					if (moveOptions.length) {
						option = Math.floor(Math.random() * Math.floor(length));
					}
					// debugger;
					newCoords = moveOptions[option];

					s.x = newCoords[0];
					s.y = newCoords[1];
				}
			}
			if(!s.isDestroyed) {
				npcShipsActive.push(s);
			}
			
			// set hostile here?
		})

	}
	console.log('### npcShipMover npcShipsActive', npcShipsActive);
	// debugger;
	return (dispatch) => {
  		dispatch({type: 'NPC_SHIP_MOVER', payload: npcShipsActive});
  	}


};

