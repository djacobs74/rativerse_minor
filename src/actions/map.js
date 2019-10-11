import _ from 'lodash';

export const createMap = (size) => async dispatch => {
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

			let rowNegX = {x: (c * -1), y: (keys['x'])};
			let colNegY = {x: (keys['x']), y: (c * -1)};

			let rowPosX = {x: (c), y: (keys['x'] * -1)};
			let colPosY = {x: (keys['x'] * -1), y: (c)};

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

			if (rowPosX['y'] === -0) {
				rowPosX['y'] = 0;
			}

			if (colNegY['y'] === -0) {
				colNegY['y'] = 0;
			}

			if (rowNegX['x'] === -0) {
				rowNegX['x'] = 0;
			}

			if (colPosY['x'] === -0) {
				colPosY['x'] = 0;
			}

   // 	    	console.log('row', row);
			// console.log('rowNeg', rowNeg);
			// console.log('rowNegX', rowNegX);
			// console.log('rowPosX', rowPosX);
			// console.log('col', col);
			// console.log('colNeg', colNeg);
			// console.log('colNegY', colNegY);
			// console.log('colPosY', colPosY);

			if((row['x'] !== col['x']) && (row['y'] !== col['y'])) {
				starMap.push(row, col);
			} else {
				starMap.push(row);
			}
						
			if ((rowNegX['x'] !== colNegY['x']) && (rowNegX['y'] !== colNegY['y'])) { 
				starMap.push(rowNegX, colNegY);
			} 

			if ((rowNeg['x'] !== 0 && colNeg['x'] !== 0) && (rowNeg['y'] !== 0 && colNeg['y'] !== 0)) {
				if ((rowNeg['x'] !== colNeg['x']) && (rowNeg['y'] !== colNeg['y'])) {
					starMap.push(rowNeg, colNeg);
				} else {
					starMap.push(rowNeg);
				}
			}

			if ((rowNegX['x'] !== colPosY['x']) && (rowNegX['y'] !== colPosY['y'])) { 
				if (colPosY['x'] !== 0) {
					starMap.push(rowPosX, colPosY);
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

	dispatch({type: 'MAP_CREATED', payload: starMap});
	

};

