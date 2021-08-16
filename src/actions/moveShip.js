import { getPath } from '../actions/getPath';
import { moveCheck, combatCheck } from '.././components/_utils/movement';


export const moveShip = (position, path, martelDriveRating) => {

	const pathLength = path.length - 1;
	const destination = path[pathLength];
	let counter = 0;
	const nullPosition = null;
	const nullDestination = null;
	const delay = martelDriveRating.value;


	function getNewPath (newPath) {
		getPath(nullPosition, nullDestination, newPath);
	}
	// debugger;

	// console.log('PATH', path);

	return (dispatch, getState) => {
		function moveDelay () {
			setTimeout(function () {
				position = path[0];

				let moving = moveCheck(position, destination);

				let payload = {position, moving}

				dispatch({type: 'MOVE_SHIP', payload: payload});
				// console.log('SHIP MOVED, NEW POSITION = ', position);
				
				let sectorData = getState().npcActiveShips;
				let player  = getState().playerData;
			

				// console.log('** sectorData **', sectorData);
				// console.log('## position ##', position);
				let inCombat = false;

				sectorData.map(s => {
					let check = combatCheck(s, position, player);
					if(check === true) {
						inCombat = true
					}
					// console.log('## CHECK ##', check);
				})

				// console.log('## inCombat ##', inCombat);
				if(path) {
					if (path.length > 1 && !inCombat) {
						if(position[0] === path[0][0] && position[1] === path[0][1]) {
							let removed = path.splice(0, 1);
							getNewPath(path);
							// debugger;
						}
						// counter++;
						moveDelay();
					}
				}
			}, delay)
		}

		moveDelay();
	}

};




