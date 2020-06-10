import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck } from '.././components/_utils/movement';

export const npcShipGenerator = (npcShips, faction) => {
	// check max ships counts VS current
	// if not at max, create one and assign to random hex
	// add 'hostile' key depending on faction




  	return (dispatch) => {
  		dispatch({type: 'NPC_SHIPS', payload: npcShips});
  	}
};