export const playerData = (newGame, data) => {

	if(newGame === true) {
		let pData = {credits: 20000, reputation: [{uwc: 1}, {bfr: -5}, {cnp: -5}, {ob: 0}, {tscc: -10}], docked: false, inCombat: false};
		data = pData;
	}


	return (dispatch) => {
  		dispatch({type: 'PLAYER_DATA', payload: data});
  	}
	
};