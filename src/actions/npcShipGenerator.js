import { rangeOne } from '.././components/_utils/rangeOne';
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
	let maxId = 0;

	if(npcShips.length) {
		maxId = Math.max.apply(Math, npcShips.map(function(o) { return o.id; }))
	}
	// if(!maxId || maxId === 0) {maxId = 1};
	console.log('** MAXID', maxId);
	
	// const npcShipsCopy = _.cloneDeep(NPC_SHIPS);
	let npcShipsCopy = JSON.parse(JSON.stringify(NPC_SHIPS));
	// debugger;

	if (factionNpcShipCounts['uwc'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[0];
		ship.id = maxId;
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['bfr'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[1];
		ship.id = maxId;
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['cnp'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[2];
		ship.id = maxId;
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['ob'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[3];
		ship.id = maxId;
		npcShips.push(ship);
	}

	if (factionNpcShipCounts['tscc'] < maxShips) {
		maxId++;
		let ship = npcShipsCopy[4];
		ship.id = maxId;
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