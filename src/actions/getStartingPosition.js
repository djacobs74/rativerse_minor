
export const getStartingPosition = (position) => {
	// eventually this will just get the stored position of a player when logging in or starting a new game
	return (dispatch) => {
  		dispatch({type: 'POSITION', payload: position});
  	}
	
};