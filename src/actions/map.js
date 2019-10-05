export const createMap = (size) => {
	// THIS WILL CREATE AN ARRAY OF COORDINATE OBJECTS AND RETURN THEM

	let mapSize = [0, 1, 2, 3, 4, 5];
	let newMap = [];
	let starMap = [];
	
	mapSize.map(function (c) {

		const coord = {x: c, y: c};
	
		newMap.push(coord);

		newMap.map(function (keys) {
			console.log('=========== newMap =============');
			console.log('keys', keys);
			console.log('keys x', keys['x']);

			let row = {x: c, y: keys['x']};
			let col = {x: keys['x'], y: c};
			if(row['x'] !== col['x'] && row['y'] !== col['y']) {
				starMap.push(row, col);
			} else {
				starMap.push(row);
			}
			return false
		
		});
		return false

		// const row = Object.keys(newMap)
		
	});

	console.log('starMap', starMap);


	return {type: 'MAP_CREATED', payload: starMap};
	

};

