export const rangeOne = (x, y) => {
	
	const left = [x, (y - 1)];
	const right = [x, (y + 1)];
	const topLeft = [(x - 1), y];
	const topRight = [(x - 1), (y + 1)];
	const bottomLeft = [(x + 1), y];
	const bottomRight = [(x + 1), (y + 1)];

	const surroundingSystems = {left: left, right: right, topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight};

	return surroundingSystems
}