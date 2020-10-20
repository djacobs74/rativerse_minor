export const FACTIONS = [
	{ value: 'uwc',  label: 'United Worlds Commonwealth'}, 
	{ value: 'bfr',  label: 'Blood Fleet Raiders'},
	{ value: 'cnp',  label: 'Coral Nebula Pirates'},
	{ value: 'ob',   label: 'Orion BrotherHood'},
	{ value: 'tscc', label: 'Third Star Cluster Clans'}
]

export const PLASMA_PROJECTORS = [
	{ name: 'Plasma Projectors MK2',  value: 'PP-MK2',  range: 3, damage: 3 },
	{ name: 'Plasma Projectors MK2C', value: 'PP-MK2C', range: 2, damage: 4 },
	{ name: 'Plasma Projectors MK2L', value: 'PP-MK2L', range: 4, damage: 2 }
]

export const TORPEDOES = [
	{ name: 'Torpedoes MK1',  value: 'T-MK2',  range: 3, damage: 3 },
	{ name: 'Torpedoes MK2',  value: 'T-MK2',  range: 3, damage: 4 },
	{ name: 'Torpedoes MK3',  value: 'T-MK2',  range: 3, damage: 5 }
]

export const SHIELDS = [
	{ name: 'Shields MK1',  value: 'S-MK2',  shieldsHp: 20, shieldsRegen: 2, shieldsMax: 20 },
	{ name: 'Shields MK2',  value: 'S-MK2',  shieldsHp: 30, shieldsRegen: 3, shieldsMax: 30 },
	{ name: 'Shields MK3',  value: 'S-MK2',  shieldsHp: 40, shieldsRegen: 4, shieldsMax: 40 }
]

export const SHIP_DATA = [
  { value: 'kidd',     label: 'Kidd',     type: 'Destroyer', faction: 'uwc',  plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BWC Destroyer' },
  { value: 'scythe',   label: 'Scythe',   type: 'Destroyer', faction: 'bfr',  plasmaProjectors: PLASMA_PROJECTORS[1], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BFR Destroyer' },
  { value: 'phantom',  label: 'Phantom',  type: 'Destroyer', faction: 'cnp',  plasmaProjectors: PLASMA_PROJECTORS[2], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical CNP Destroyer' },
  { value: 'vanguard', label: 'Vanguard', type: 'Destroyer', faction: 'ob',   plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical OB Destroyer' },
  { value: 'avenger',  label: 'Avenger',  type: 'Destroyer', faction: 'tscc', plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical TSCC Destroyer' }
]

export const NPC_SHIPS = [
	{ value: 'uwcNpcDD', id: 1, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[0].value, factionName: FACTIONS[0].label, plasmaProjectors: PLASMA_PROJECTORS[2],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 0, y: 0, inCombat: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false },
	// { value: 'uwcNpcDD', id: 2, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 3, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 4, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 5, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'bfrNpcDD', id: 2,  label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[1].value, factionName: FACTIONS[1].label, plasmaProjectors: PLASMA_PROJECTORS[1],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: -5, y: -5, inCombat: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false },
	// { value: 'bfrNpcDD', id: 7,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 8,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 9,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 10, label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'cnpNpcDD', id: 3, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[2].value, factionName: FACTIONS[2].label, plasmaProjectors: PLASMA_PROJECTORS[2],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: -5, y: 5, inCombat: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false },
	// { value: 'cnpNpcDD', id: 12, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 13, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 14, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 15, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'obNpcDD', id: 4, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[3].value, factionName: FACTIONS[3].label, plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 5, y: -5, inCombat: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false },
	// { value: 'obNpcDD', id: 17, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 18, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 19, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 20, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'tsccNpcDD', id: 5, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[4].value, factionName: FACTIONS[4].label, plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 5, y: 5, inCombat: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false }
	// { value: 'tsccNpcDD', id: 22, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 23, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 24, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 25, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3}
]

export const STARTER_SHIPS = [
	{ value: 'monolith', label: 'Monolith', type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 2, scanner: 2, signature: 6, cargo: 0, cargoHold: [], cargoMax: 40, price: 0, description: 'A small but well rounded frieghter' },
	{ value: 'badger',   label: 'Badger',   type: 'Frigate',   faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[1],  torpedoes: TORPEDOES[0], shields: SHIELDS[1], martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 0, cargoHold: [], cargoMax: 10, price: 0, description: 'The Badger provides good firepower for its size, but dont expect to win any fights against bigger ships.' },
	{ value: 'shadow',   label: 'Shadow',   type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 5, scanner: 3, signature: 3, cargo: 0, cargoHold: [], cargoMax: 20, price: 0, description: 'Less cargo space than a standard freighter, the Shadow was designed to have a low signature and good speed. A good choice for those who wish to haul cargo without drawing a lot of attention.' }
]

export const TRADE_GOODS = [
	{ value: 'water', label: 'Water', minPrice: 100, maxPrice: 500, cargoSpace: 1, minAmount: 0, maxAmount: 200},
	{ value: 'food', label: 'Food', minPrice: 100, maxPrice: 500, cargoSpace: 1, minAmount: 0, maxAmount: 200},
	{ value: 'plasmaRifle', label: 'Plasma Rifle', minPrice: 750, maxPrice: 2000, cargoSpace: 1, minAmount: 0, maxAmount: 50},
	{ value: 'rawOre', label: 'Raw Ore', minPrice: 100, maxPrice: 200, cargoSpace: 1, minAmount: 0, maxAmount: 200},
	{ value: 'slaves', label: 'Slaves', minPrice: 600, maxPrice: 1200, cargoSpace: 1, minAmount: 0, maxAmount: 25},
	{ value: 'drugs', label: 'Drugs', minPrice: 800, maxPrice: 2000, cargoSpace: 1, minAmount: 0, maxAmount: 75},
	{ value: 'salvage', label: 'Salvage', minPrice: 120, maxPrice: 300, cargoSpace: 1, minAmount: 0, maxAmount: 200}
]
