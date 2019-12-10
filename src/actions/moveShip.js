import { moveCheck } from '.././components/_utils/movement';

export const moveShip = (position, path) => {

	const pathLength = path.length - 1;
	const destination = path[pathLength];
	let counter = 0;
	// debugger;

	console.log('PATH', path);

	return (dispatch) => {
		function moveDelay () {
			setTimeout(function () {
				position = path[counter];
				dispatch({type: 'MOVE_SHIP', payload: position});
				console.log('SHIP MOVED, NEW POSITION = ', position);
				if (counter < pathLength) {
					counter++;

					moveDelay();
					
				}
			}, 2000)
		}

		moveDelay();
	}

};


