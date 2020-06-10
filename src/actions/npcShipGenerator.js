import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck } from '.././components/_utils/movement';


export const npcShipGenerator = (npcShips, playerFaction) => {

	// assign ships to random hexes
	// add 'hostile' key depending on faction

	let factionNpcShipCounts = { uwc: 0, bfr: 0, cnp: 0, ob: 0, tscc: 0 };
	// debugger;
	const maxShips = 7;
	
	npcShips.map(s => {
		let faction = s.faction;
		factionNpcShipCounts[faction] ++
		// set hostile here?
	})

	console.log('factionNpcShipCounts', factionNpcShipCounts);

	let maxId = Math.max.apply(Math, npcShips.map(function(o) { return o.id; }))
	// console.log('MAXID', maxId);

	if (factionNpcShipCounts['uwc'] < maxShips) {
		maxId++;
		npcShips.push({value: 'uwcNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3})
	}

	if (factionNpcShipCounts['bfr'] < maxShips) {
		maxId++;
		npcShips.push({value: 'bfrNpcDD', id: maxId,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3})
	}

	if (factionNpcShipCounts['cnp'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'cnpNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3})
	}

	if (factionNpcShipCounts['ob'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'obNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3})
	}

	if (factionNpcShipCounts['tscc'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'tsccNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3})
	}


	console.log('NPC_SHIPS', npcShips);
	console.log('MAXID', maxId);
  	return (dispatch) => {
  		dispatch({type: 'NPC_SHIPS', payload: npcShips});
  	}
};