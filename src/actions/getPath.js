import { rangeOne } from '.././components/_utils/rangeOne';

export const getPath = (position, destination) => {

	// PUT TIMEOUT HERE? WILL BE BASED ON MARTEL DRIVE, FOR NOW DEFAULT TIME

	// Math.sign(3)
	let path = [];

	let posX = position[0];
	let posY = position[1];
	const destX = destination[0];
	const destY = destination[1];

	

	while (posX !== destX || posY !== destY) {
		// console.log('posX, posY', posX, posY);
		console.log('starting while loop');
		let rangeOneResults = rangeOne(posX, posY);
		console.log('Range One', rangeOneResults);
		let moveOptions = [];
		let newCoords = [];

		if (posX < destX) {
			if ( ((destX - posX) >= 3 ) || ((destY - posY) >= 1 ) ) {
				console.log('moving down-right');
				moveOptions.push(rangeOneResults.bottomRight);
			}
		} 
		if (posX < destX) {
			if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
				console.log('moving down-left');
				moveOptions.push(rangeOneResults.bottomLeft);
			}
		}
		if (destX < posX) {
			if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
				console.log('moving top-left');
				moveOptions.push(rangeOneResults.topLeft);
			}	
		}
		if (destX < posX) {
			if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
				console.log('moving top-right');
				moveOptions.push(rangeOneResults.topRight);
			}
		}
		if (destY < posY) {
			if ((posX === destX) || ((destY - posY) <= 3)) {
				console.log('moving left');
				moveOptions.push(rangeOneResults.left);
			}
		}
		if (destY > posY) {
			if ((posX === destX) || ((destY - posY) >= 3)) {
				console.log('moving right');
				moveOptions.push(rangeOneResults.right);
			}
		}

		let option = 0;

		if (moveOptions.length > 1) {
			option = Math.floor(Math.random() * Math.floor(2));
		}

		newCoords = moveOptions[option];
		path.push(newCoords);

		posX = newCoords[0];
		posY = newCoords[1];

		console.log('move options', moveOptions);
		console.log('moving to newCoords', newCoords);
	}


	console.log('PATH', path);

  	// debugger;
  	// return {type: 'PATH_SET', payload: path};
  	return (dispatch) => {
  		dispatch({type: 'PATH_SET', payload: path});
  	}
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions