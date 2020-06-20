export const prettyCoords = (coords) => {
	// debugger;
	if(coords && coords.length) {
		coords = coords[0].x + ', ' + coords[0].y;
	}

	return coords
}

