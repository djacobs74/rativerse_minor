export const getStartingRange = () => {
  	return Math.floor(Math.random() * (11 - 5) + 5);
}

export const setRangeToTarget = (targetShip, playerShip, direction) => {
	// console.log('^^^^ targetShip', targetShip);
	// console.log('^^^^ playerShip', playerShip);
	const currentRange = targetShip.range;
	const playerShipSpeed = playerShip.sublightSpeed;
	const targetShipSpeed = targetShip.sublightSpeed;
	const speedDiff = Math.abs(targetShipSpeed - playerShipSpeed);
	let newRange = currentRange;
	let toastData = {type: null, msg: null};

	if(direction === 'away') {
		if(playerShipSpeed > targetShipSpeed) {
			newRange = currentRange + speedDiff;
			toastData = {type: 'success', msg: 'Increasing Range to Target'};
		} else if(playerShipSpeed < targetShipSpeed) {
			newRange = currentRange - speedDiff;
			toastData = {type: 'error', msg: 'Unable to Increase Range to Target'};
		} 
	}

	if(direction === 'maintain') {
		if(playerShipSpeed < targetShipSpeed) {
			newRange = currentRange - speedDiff;
			toastData = {type: 'error', msg: 'Unable to Increase Range to Target'};
		}
	}

	if(direction === 'close') {
		newRange = currentRange - (playerShipSpeed + targetShipSpeed);
		toastData = {type: 'success', msg: 'Closing Range to Target'};
	}

	if(newRange < 0) {
		newRange = 0;
	}

	const rangeData = {newRange, toastData}

	return rangeData


	// sublightSpeed
	// targetShip.range
}