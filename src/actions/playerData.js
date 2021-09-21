export const playerData = (newGame, data) => {

	return (dispatch) => {
  		dispatch({type: 'PLAYER_DATA', payload: data});
  	}
	
};