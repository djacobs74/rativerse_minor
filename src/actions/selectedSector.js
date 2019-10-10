export const getSector = (x, y) => async dispatch => {

  	console.log('getsector', x, y);
  	const selectedSector = [x, y];
  
  	dispatch({type: 'SECTOR_SELECTED', payload: selectedSector});
};

