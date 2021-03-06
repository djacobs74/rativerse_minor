import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck } from '.././components/_utils/movement';


export const npcShipGenerator = (npcShips, playerFaction) => {

	// assign ships to random hexes
	// add 'hostile' key depending on faction

	let factionNpcShipCounts = { uwc: 0, bfr: 0, cnp: 0, ob: 0, tscc: 0 };
	// debugger;
	const maxShips = 4;
	
	npcShips.map(s => {
		let faction = s.faction;
		factionNpcShipCounts[faction] ++;
		// set hostile here?

	})

	// console.log('factionNpcShipCounts', factionNpcShipCounts);

	let maxId = Math.max.apply(Math, npcShips.map(function(o) { return o.id; }))
	// console.log('MAXID', maxId);

	if (factionNpcShipCounts['uwc'] < maxShips) {
		maxId++;
		npcShips.push({value: 'uwcNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc', factionName: 'United Worlds Commonwealth', plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 0, y: 0 })
	}

	if (factionNpcShipCounts['bfr'] < maxShips) {
		maxId++;
		npcShips.push({value: 'bfrNpcDD', id: maxId,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr', factionName: 'Blood Fleet Raiders',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: -5, y: -5})
	}

	if (factionNpcShipCounts['cnp'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'cnpNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp', factionName: 'Coral Nebula Pirates',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: -5, y: 5})
	}

	if (factionNpcShipCounts['ob'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'obNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'ob', factionName: 'Orion BrotherHood',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 5, y: -5})
	}

	if (factionNpcShipCounts['tscc'] < maxShips) {
		maxId++;
		npcShips.push({ value: 'tsccNpcDD', id: maxId, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc', factionName: 'Third Star Cluster Clans',  plasmaProjectors: 'PP-MK2', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 5, y: 5})
	}


	// console.log('NPC_SHIPS', npcShips);
	// console.log('MAXID', maxId);
  	return (dispatch) => {
  		dispatch({type: 'NPC_SHIPS', payload: npcShips});
  	}
};