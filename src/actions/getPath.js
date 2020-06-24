import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck } from '.././components/_utils/movement';

export const getPath = (position, destination, newPath) => {
	// debugger;
	// PUT TIMEOUT HERE? WILL BE BASED ON MARTEL DRIVE, FOR NOW DEFAULT TIME

	// Math.sign(3)
	let path;
	let counter = 0;
	let pathOptions = [];
	if(position && destination) {
		while (counter < 50) {
		
			let posX = position[0];
			let posY = position[1];
			const destX = destination[0];
			const destY = destination[1];

			let pathOption = {};
			path = [];
			
			while (posX !== destX || posY !== destY) {
				// console.log('posX, posY', posX, posY);
				// console.log('starting while loop');
				let rangeOneResults = rangeOne(posX, posY);
				// console.log('Range One', rangeOneResults);
				let moveOptions = [];
				let newCoords = [];

				if (posX < destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) >= 0 ) ) {
						// console.log('moving down-right');
						if(pathCheck(rangeOneResults.bottomRight)) {
							moveOptions.push(rangeOneResults.bottomRight);
						}
						
					}
				} 
				if (posX < destX) {
					if ( ((destX - posX) >= 3 ) || ((destY - posY) <= 0 ) ) {
						// console.log('moving down-left');
						if(pathCheck(rangeOneResults.bottomLeft)) {
							moveOptions.push(rangeOneResults.bottomLeft);
						}
					}
				}
				if (destX < posX) {
					if (((destY <= posY)) || (((posX - destX) >= 3) && ((destY - posY ) <= 1))) {
						// console.log('moving top-left');
						if(pathCheck(rangeOneResults.topLeft)) {
							moveOptions.push(rangeOneResults.topLeft);
						}
					}	
				}
				if (destX < posX) {
					if (((destY >= posY)) || (((posX - destX) >= 3) && ((destY - posY ) >= 1))) {
						// console.log('moving top-right');
						if(pathCheck(rangeOneResults.topRight)) {
							moveOptions.push(rangeOneResults.topRight);
						}
					}
				}
				if (destY < posY) {
					if ((posX === destX) || ((destY - posY) <= 3)) {
						// console.log('moving left');
						if(pathCheck(rangeOneResults.left)) {
							moveOptions.push(rangeOneResults.left);
						}
					}
				}
				if (destY > posY) {
					if ((posX === destX) || ((destY - posY) >= 3)) {
						// console.log('moving right');
						if(pathCheck(rangeOneResults.right)) {
							moveOptions.push(rangeOneResults.right);
						}
					}
				}

				let option = 0;

				// console.log('move options', moveOptions);
				// moveOptions.map(m => {
				// 	if(Math.abs(m[0]) > 5 || Math.abs(m[1]) > 5) {
				// 		debugger;
				// 		moveOptions.splice(m, 1);
				// 	}
				// })

				if (moveOptions.length > 1) {
					option = Math.floor(Math.random() * Math.floor(2));
				}

				newCoords = moveOptions[option];
				path.push(newCoords);

				posX = newCoords[0];
				posY = newCoords[1];

				// console.log('move options final', moveOptions);
				// console.log('moving to newCoords', newCoords);
			}
			pathOption = path;
			pathOptions.push(pathOption);
			counter ++;
		
		}
	}

	let shortestPath = pathOptions[0];
	console.log('pathOptions', pathOptions);
	// console.log('shortestPath', shortestPath);
	// console.log('REDUCE PATHS', pathOptions.reduce((prev, next) => prev.length > next.length ? next : prev));

 	// pathOptions.map(p => {
 	// 	if (p.length < shortestPath.length) {
 	// 		shortestPath = p;
 	// 	}
 	// })
 	if(pathOptions.length) {
 		shortestPath = pathOptions.reduce((prev, next) => prev.length > next.length ? next : prev);
 	}
 	
	
 	path = shortestPath;

	if(!position && !destination) {
		if(newPath) {
			path = newPath;
		}
	}

	
	console.log('PATH', path);


  	// return {type: 'PATH_SET', payload: path};
  	return (dispatch) => {
  		dispatch({type: 'PATH_SET', payload: path});
  	}
};

// TODO : func for path. show path in control panel? flagged sectors appear as red
// calculate / show ETA?
// might need re-usable functions