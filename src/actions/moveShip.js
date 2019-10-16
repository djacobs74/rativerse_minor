import { rangeOne } from '.././components/_utils/rangeOne';

export const moveShip = (position, destination) => {

	// PUT TIMEOUT HERE? WILL BE BASED ON MARTEL DRIVE, FOR NOW DEFAULT TIME

	// Math.sign(3)

	const posX = position[0];
	const posY = position[1];
	const destX = destination[0];
	const destY = destination[1];

	let newX = posX;
	let newY = posY;

	let newCoords = [newX, newY];

	const rangeOneResults = rangeOne(posX, posY);



	// TODO: add some randomness to direction. Currently uses the first check that passes when there are 2 directions possible.
	// REMOVE ELSE IFS, CHANGE TO ALL IFS AND PUSH RESULTS INTO DICT. IF DICT HAS MORE THAN 1 RESULT, PICK ONE AT RANDOM
	if((posX < destX) && (posY < destY)) {
		console.log('moving down-right');
		newCoords = rangeOneResults.bottomRight;
	} else if ((posX < destX) && (destY <= posY)) {
		console.log('moving down-left');
		newCoords = rangeOneResults.bottomLeft;
	} else if ((posX > destX) && (destY <= posY)) {
		console.log('moving top-left');
		newCoords = rangeOneResults.topLeft;
	} else if ((posX > destX) && (destY >= posY)) {
		console.log('moving top-right');
		newCoords = rangeOneResults.topRight;
	} else if ((posX === destX) && (destY < posY)) {
		console.log('moving left');
		newCoords = rangeOneResults.left;
	} else if ((posX === destX) && (destY > posY)) {
		console.log('moving right');
		newCoords = rangeOneResults.right;
	}

	// FUTURE PATHING: do newCoords match destination? If no, run this again, push newCoords into object

	console.log('moving to', newCoords);
  	// debugger;
  	return {type: 'MOVE_SHIP', payload: newCoords};
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions