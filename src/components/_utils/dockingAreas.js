export const createDockingAreas = (map) => {
	let id = 0;
	const typesArray = ['Planet', 'Space Station', 'Asteroid Base'];
	const spaceTypeArray = [{name: 'Solar System', value: 'solarSystem'}, {name: 'Open Space', value: 'openSpace'}, {name: 'Asteroid Belt', value: 'asteroidBelt'}];

	map.map(m => {
		m.dockingArea = [];
		m.sectorType = [];
		m.sectorType.push(spaceTypeArray[1]);
		
		const addDockingArea = Math.floor(Math.random() * Math.floor(11));
		if (addDockingArea >= 9) {
			id++;
			const typeNum = Math.floor(Math.random() * Math.floor(3));
			console.log('typeNum', typeNum);
			
			const type = typesArray[typeNum];

			let dockingArea = {id: id, type: type};
			       
			m.sectorType[0] = spaceTypeArray[typeNum];

			m.dockingArea.push(dockingArea);
		}
			

	})
	return map
}