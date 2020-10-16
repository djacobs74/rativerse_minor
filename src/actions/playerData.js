export const playerData = (newGame, data) => {

	if(newGame === true) {
		let pData = {credits: 10000, reputation: [{uwc: -5}, {bfr: -5}, {cnp: -5}, {ob: -1}, {tscc: -10}], docked: false, inCombat: false};
		data = pData;
	}


	return (dispatch) => {
  		dispatch({type: 'PLAYER_DATA', payload: data});
  	}
	
};