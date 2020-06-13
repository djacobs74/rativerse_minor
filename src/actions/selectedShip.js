export const selectedShip = (ship) => {

	// let currentShip = [];
	// currentShip.push(ship);

  	return (dispatch) => {
  		dispatch({type: 'SHIP_SELECTED', payload: ship});
  	}
  	
  	// return {type: 'SHIP_SELECTED', payload: ship};
};