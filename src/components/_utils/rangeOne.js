export const rangeOne = (x, y) => {

	const left        = [x, (y - 1)];
	const right       = [x, (y + 1)];
	const topLeft     = (x % 2 == 0) ? [(x - 1), y] : [(x - 1), (y - 1)];
	const topRight    = (x % 2 == 0) ? [(x - 1), (y + 1)] : [(x - 1), y];
	const bottomLeft  = (x % 2 == 0) ? [(x + 1), y] : [(x + 1), (y - 1)];
	const bottomRight = (x % 2 == 0) ? [(x + 1), (y + 1)] : [(x + 1), y];

	const surroundingSystems = {left: left, right: right, topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight};
	// debugger;
	return surroundingSystems
}

