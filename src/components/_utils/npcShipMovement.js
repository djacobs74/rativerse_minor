import { rangeOne } from './rangeOne';
import { pathCheck } from './movement';


export const npcShipMover = (npcShips, playerFaction) => {
	// return npcShips with updated locations
	let npcShipsActive = [];
	const moveOptionNum = 5;

	npcShips.map(s => {
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
			// path.push(newCoords);

			s.x = newCoords[0];
			s.y = newCoords[1];
		}
			
		npcShipsActive.push(s);

		// set hostile here?
	})

	return npcShipsActive
}