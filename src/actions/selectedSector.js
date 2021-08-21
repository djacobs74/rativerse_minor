export const getSector = (m, sectorType) => {
	const type = sectorType === 'game' ? 'GAME_SECTOR_SELECTED' : 'COMBAT_SECTOR_SELECTED'

  	// console.log('getsector', x, y);
 	// debugger;
  	return {type, payload: m};
};

