export const getSector = (x, y) => {

  	console.log('getsector', x, y);
  	const selectedSector = [x, y];
  
  	return {type: 'SECTOR_SELECTED', payload: selectedSector};
};

