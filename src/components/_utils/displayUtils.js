export const prettyCoords = (coords) => {
	if(coords.length > 0) {
		coords = coords[0] + ', ' + coords[1];
	}
	return coords
}

