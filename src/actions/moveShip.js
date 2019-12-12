import { moveCheck } from '.././components/_utils/movement';
import { getPath } from '../actions/getPath';

export const moveShip = (position, path) => {

	const pathLength = path.length - 1;
	const destination = path[pathLength];
	let counter = 0;
	const nullPosition = null;
	const nullDestination = null;


	function getNewPath (newPath) {
		getPath(nullPosition, nullDestination, newPath);
	}
	// debugger;

	console.log('PATH', path);

	return (dispatch) => {
		function moveDelay () {
			setTimeout(function () {
				position = path[0];
				dispatch({type: 'MOVE_SHIP', payload: position});
				console.log('SHIP MOVED, NEW POSITION = ', position);
				if (path.length > 1) {
					if(position[0] === path[0][0] && position[1] === path[0][1]) {
						let removed = path.splice(0, 1);
					
						getNewPath(path);
						// debugger;
					}


					// counter++;

					moveDelay();
					
				}
			}, 2000)
		}

		moveDelay();
	}

};


