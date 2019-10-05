import _ from 'lodash';

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
			// console.log('keys', keys);
			// console.log('keys x', keys['x']);

			let row = {x: c, y: keys['x']};
			let col = {x: keys['x'], y: c};

			let rowNeg = {x: (c * -1), y: (keys['x'] * -1)};
			let colNeg = {x: (keys['x'] * -1), y: (c * -1)};

			let rowOff = {x: (c * -1), y: (keys['x'])};
			let colOff = {x: (keys['x']), y: (c * -1)};

			if (rowNeg['x'] === -0) {
				rowNeg['x'] = 0;
			}

			if (rowNeg['y'] === -0) {
				rowNeg['y'] = 0;
			}

			if (colNeg['x'] === -0) {
				colNeg['x'] = 0;
			} 

			if (colNeg['y'] === -0) {
				colNeg['y'] = 0;
			} 

   //    		console.log('row', row);
			console.log('rowNeg', rowNeg);
			console.log('rowOff', rowOff);
			console.log('col', col);
			console.log('colNeg', colNeg);
			console.log('colOff', colOff);

			if((row['x'] !== col['x']) && (row['y'] !== col['y'])) {
				starMap.push(row, col);
			} else {
				starMap.push(row);
			}
						
			if ((rowOff['x'] !== colOff['x']) && (rowOff['y'] !== colOff['y'])) { 
				starMap.push(rowOff, colOff);
			} 

			if ((rowNeg['x'] !== 0 && colNeg['x'] !== 0) && (rowNeg['y'] !== 0 && colNeg['y'] !== 0)) {
				if ((rowNeg['x'] !== colNeg['x']) && (rowNeg['y'] !== colNeg['y'])) {
					starMap.push(rowNeg, colNeg);
				} else {
					starMap.push(rowNeg);
				}
			}

			return false
		
		});
		return false

		// SORT STARMAP AND POST TO NEW ARRAY IN ORDER
	
		
		
	});

	starMap = _.sortBy(starMap, o => o.y);
	starMap = _.sortBy(starMap, o => o.x);
	console.log('starMap', starMap);

	return {type: 'MAP_CREATED', payload: starMap};
	

};

