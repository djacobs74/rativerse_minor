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

	// GET HEXES IN RANGE 1 FROM POSITION. MOVE TO ONE OF THOSE TOWARD DESTINATION
	// WRITE GET RANGE FUNC IN UTILS, PASS IN 1 IN THIS CASE

	const moveOptions = rangeOne(posX, posY);

	const direction = '';

	if((posX < destX) && (posY < destY)) {
		console.log('moving down-right');
		newCoords = moveOptions.bottomRight;
	} else if ((posX < destX) && (destY <= posY)) {
		console.log('moving down-left');
		newCoords = moveOptions.bottomLeft;
	} else if ((posX > destX) && (destY <= posY)) {
		console.log('moving top-left');
		newCoords = moveOptions.topLeft;
	} else if ((posX > destX) && (destY >= posY)) {
		console.log('moving top-right');
		newCoords = moveOptions.topRight;
	} else if ((posX === destX) && (destY < posY)) {
		console.log('moving left');
		newCoords = moveOptions.left;
	} else if ((posX === destX) && (destY > posY)) {
		console.log('moving right');
		newCoords = moveOptions.right;
	}

	


  	// debugger;
  	return {type: 'MOVE_SHIP', payload: newCoords};
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions