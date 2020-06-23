export const pathCheck = (hex) => {
	if(Math.abs(hex[0]) > 5 || Math.abs(hex[1]) > 5) {
		return false
	}
	return true
}

export const getPosition = (props) => {
	let position = [];
	let currentPosition = props.currentPosition.position || [];
	if(currentPosition.length) {
      position = currentPosition;
    } else {
      position = props.startingPosition;
    }

    return position
}

export const moveCheck = (position, destination) => {
	let moving = true;
	if(position && destination) {
		if ((position[0] === destination[0]) && (position[1] === destination[1])) {
			moving = false;
		} 
	}
	
	return moving
}

export const getDockOption = (position, map) => {

	// console.log('POSITION', position);
	let canDock = false;
	
	if (position.position && position.position.length) {
		
		map.map(m => {
			if ((position.position[0] === m.x) && (position.position[1] === m.y)) {
			
				if (m.dockingArea.length) {
					canDock = true;

				}

			}
		})
	}
		

	return canDock

}