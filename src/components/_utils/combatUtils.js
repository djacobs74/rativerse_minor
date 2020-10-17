
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

	// debugger;

	if(direction === 'away') {

		if(playerShipSpeed > targetShipSpeed) {
			newRange = currentRange + speedDiff;
			toastData.type = 'success';
			toastData.msg = 'Moving Outside Weapons Range';
		} else if(playerShipSpeed < targetShipSpeed) {
			newRange = currentRange - speedDiff;
			toastData.type = 'error';
			toastData.msg = 'Unable to Move Outside Weapons Range';
		} 
	}

	if(direction === 'close') {
		newRange = currentRange - (playerShipSpeed + targetShipSpeed);
		toastData.type = 'success';
		toastData.msg = 'Closing Range to Target';
	}

	if(newRange < 0) {
		newRange = 0;
	}

	const rangeData = {newRange, toastData}

	return rangeData


	// sublightSpeed
	// targetShip.range
}


// export const rangeDelay = (npcs, playerShip, direction) => {
// 	// debugger;
// 	let npcSpeedArray = [{npcsSlower: 0}, {npcsEven: 0}, {npcsFaster: 0}];

// 	setInterval(function () {
// 		npcs.map(n => {
// 			const playerShipSpeed = playerShip.sublightSpeed;
// 			const targetShipSpeed = n.sublightSpeed;
// 			if(playerShipSpeed > targetShipSpeed) {

// 			}
// 		})

// 		console.log('&&&& range data');
		
// 	}, 5000)
// }

export const checkRange = (npcs, playerShip, direction) => {
	let npcSpeedTracker = {npcsSlower: 0, npcsFaster: 0};
	let toastData = {type: null, msg: null};

	npcs.map(n => {
		const playerShipSpeed = playerShip.sublightSpeed;
		const targetShipSpeed = n.sublightSpeed;

		if(direction === 'away') {
			if(playerShipSpeed > targetShipSpeed) {
				n.inRange = 'Out of Weapons Range';
				npcSpeedTracker.npcsSlower = npcSpeedTracker.npcsSlower + 1;
			} else {
				n.inRange = 'In Range of All Weapons';
				npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
			}
		}
		if(direction === 'closeRange') {
			n.inRange = 'In Range of All Weapons';
			npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
		}
		if(direction === 'maxRange') {
			if(playerShipSpeed > targetShipSpeed) {
				n.inRange = 'In Plasma Projector Weapons Range';
				npcSpeedTracker.npcsSlower = npcSpeedTracker.npcsSlower + 1;
			} else {
				n.inRange = 'In Range of All Weapons';
				npcSpeedTracker.npcsFaster = npcSpeedTracker.npcsFaster + 1;
			}
		}

	})

	if(direction === 'away') {
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster === 0) {
			toastData = {type: 'success', msg: 'Moving Outside Weapons Range of All Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'warning', msg: 'Moving Outside Weapons Range of Slower Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower === 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'error', msg: 'Unable to Move Outside Weapons Range of Any Hostile Ships'};
		}
	}

	if(direction === 'closeRange') {
		toastData = {type: 'success', msg: 'Moving Inside Weapons Range of All Hostile Ships'};
	}

	if(direction === 'maxRange') {
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster === 0) {
			toastData = {type: 'success', msg: 'Moving to Max Plasma Projector Weapons Range'};
		}
		if(npcSpeedTracker.npcsSlower > 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'warning', msg: 'Moving to Max Plasma Projector Weapons Range of Slower Hostile Ships'};
		}
		if(npcSpeedTracker.npcsSlower === 0 && npcSpeedTracker.npcsFaster > 0) {
			toastData = {type: 'error', msg: 'Unable to Move to Max Plasma Projector Weapons Range of Any Hostile Ships'};
		}
	}

	// debugger;
	const rangeData = {npcs, toastData};

	return rangeData

	// toast.success('Martel Drive Engaged');

}


