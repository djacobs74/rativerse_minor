export const playerData = (newGame, data) => {

	if(newGame === true) {
		let pData = {credits: 10000, reputation: [{uwc: 1}, {bfr: -5}, {cnp: -5}, {ob: -1}, {tscc: -10}]}
		data = pData;
	}

	return (dispatch) => {
  		dispatch({type: 'PLAYER_DATA', payload: data});
  	}
	
};