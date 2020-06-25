export const playerData = () => {
	let data = {credits: 1000, reputation: [{uwc: 1}, {bfr: -5}, {cnp: -5}, {ob: -1}, {tscc: -10}]}

	return (dispatch) => {
  		dispatch({type: 'PLAYER_DATA', payload: data});
  	}
	
};