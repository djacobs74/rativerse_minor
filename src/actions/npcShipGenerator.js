import { rangeOne } from '.././components/_utils/rangeOne';
import { pathCheck } from '.././components/_utils/movement';
import { NPC_SHIPS } from '.././components/_utils/constants';
import _ from 'lodash';


export const npcShipGenerator = (npcShips, playerFaction) => {

	// assign ships to random hexes
	// add 'hostile' key depending on faction
	console.log('npcShipGenerator RUNNING', npcShips);
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
	console.log('** MAXID', maxId);
	
	const npcShipsCopy = _.cloneDeep(NPC_SHIPS);

	if (factionNpcShipCounts['uwc'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[0];
		ship.shields.shieldsHp = npcShipsCopy[0].shields.shieldsMax;
		ship.hullHp = npcShipsCopy[0].hullMax;
		ship.id = maxId;
		ship.inRangePP = false
		ship.inRangeT = false
		ship.isDestroyed = false
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['bfr'] < maxShips) {
		// console.log('** BFR Below Count', factionNpcShipCounts['bfr']);
		maxId++;
		let ship = npcShipsCopy[1];
		ship.shields.shieldsHp = npcShipsCopy[1].shields.shieldsMax;
		ship.hullHp = npcShipsCopy[1].hullMax;
		ship.id = maxId;
		ship.inRangePP = false
		ship.inRangeT = false
		ship.isDestroyed = false
		npcShips.push(ship);
		// debugger;
	}

	if (factionNpcShipCounts['cnp'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[2];
		ship.shields.shieldsHp = npcShipsCopy[2].shields.shieldsMax;
		ship.hullHp = npcShipsCopy[2].hullMax;
		ship.id = maxId;
		ship.inRangePP = false
		ship.inRangeT = false
		ship.isDestroyed = false
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['ob'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[3];
		ship.shields.shieldsHp = npcShipsCopy[3].shields.shieldsMax;
		ship.hullHp = npcShipsCopy[3].hullMax;
		ship.id = maxId;
		ship.inRangePP = false
		ship.inRangeT = false
		ship.isDestroyed = false
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['tscc'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[4];
		ship.shields.shieldsHp = npcShipsCopy[4].shields.shieldsMax;
		ship.hullHp = npcShipsCopy[4].hullMax;
		ship.id = maxId;
		ship.inRangePP = false
		ship.inRangeT = false
		ship.isDestroyed = false
		npcShips.push(ship);
	}

	// let updatedNpcShips = _.cloneDeep(npcShips);

	let updatedNpcShips = [];
	npcShips.map(n => {
		if(!n.isDestroyed) {
			updatedNpcShips.push(n);
		}
	})

	// console.log('@@@@@  npcShipGenerator npcShips', npcShips);
	// console.log('@@@@@  npcShipGenerator updatedNpcShips', updatedNpcShips);
	// console.log('MAXID', maxId);
  	return (dispatch) => {
  		dispatch({type: 'NPC_SHIPS', payload: updatedNpcShips});
  	}
};