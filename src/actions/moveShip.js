export const moveShip = (x, y) => {
	// take current coords
	// 

  	// console.log('getsector', x, y);
  	const newCoords = [x, y];
  	return {type: 'MOVE_SHIP', payload: newCoords};
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions