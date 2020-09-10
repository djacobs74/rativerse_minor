import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck, combatCheck } from '.././components/_utils/movement';

export const npcShipMover = (npcShips, playerPosition, player) => {

	let npcShipsActive = [];
	const moveOptionNum = 5;
	// debugger;
	console.log('npcShipMover player', player);
	console.log('npcShipMover npcShips', npcShips);


	if(npcShips) {

		npcShips.map(s => {
			const inCombat = combatCheck(s, playerPosition.position, player);

			if(!inCombat) {

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
			npcShipsActive.push(s);
			
			// set hostile here?
		})

	}
	// debugger;
	return (dispatch) => {
  		dispatch({type: 'NPC_SHIP_MOVER', payload: npcShipsActive});
  	}


};
