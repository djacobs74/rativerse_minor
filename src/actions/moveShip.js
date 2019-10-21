import { rangeOne } from '.././components/_utils/rangeOne';

export const moveShip = (position, destination) => {

	// PUT TIMEOUT HERE? WILL BE BASED ON MARTEL DRIVE, FOR NOW DEFAULT TIME

	// Math.sign(3)

	const posX = position[0];
	const posY = position[1];
	const destX = destination[0];
	const destY = destination[1];

	let newCoords = [];

	const rangeOneResults = rangeOne(posX, posY);
	let moveOptions = [];

	if ((posX < destX) && (posY <= destY)) {
		console.log('moving down-right');
		moveOptions.push(rangeOneResults.bottomRight);
	} 
	if ((posX < destX) && (destY <= posY)) {
		console.log('moving down-left');
		moveOptions.push(rangeOneResults.bottomLeft);
	}
	if (((posX > destX) && (destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY) <= 1))) {
		console.log('moving top-left');
		moveOptions.push(rangeOneResults.topLeft);
	}
	if (((posX > destX) && (destY >= posY))|| (((posX - destX) >= 3) && ((destY - posY) <= 1))) {
		console.log('moving top-right');
		moveOptions.push(rangeOneResults.topRight);
	}
	if ((posX === destX) && (destY < posY)) {
		console.log('moving left');
		moveOptions.push(rangeOneResults.left);
	}
	if (destY > posY) {
		if ((posX === destX) || ((destY - posY) >= 2)) {
			console.log('moving right');
			moveOptions.push(rangeOneResults.right);
		}
	}

	let option = 0;

	if (moveOptions.length > 1) {
		option = Math.floor(Math.random() * Math.floor(2));
	}

	newCoords = moveOptions[option];


	// FUTURE PATHING: do newCoords match destination? If no, run this again, push newCoords into object
	console.log('move options', moveOptions);
	console.log('moving to newCoords', newCoords);
  	// debugger;
  	return {type: 'MOVE_SHIP', payload: newCoords};
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions