export const SHIP_DATA = [
  { value: 'kidd',     label: 'Kidd',     type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BWC Destroyer' },
  { value: 'scythe',   label: 'Scythe',   type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BFR Destroyer' },
  { value: 'phantom',  label: 'Phantom',  type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical CNP Destroyer' },
  { value: 'vanguard', label: 'Vanguard', type: 'Destroyer', faction: 'ob',   plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical OB Destroyer' },
  { value: 'avenger',  label: 'Avenger',  type: 'Destroyer', faction: 'tscc', plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical TSCC Destroyer' }
]

export const PLASMA_PROJECTORS = [
	{ name: 'Plasma Projectors MK2',  value: 'PP-MK2',  range: 3, damage: 3 },
	{ name: 'Plasma Projectors MK2C', value: 'PP-MK2C', range: 2, damage: 4 },
	{ name: 'Plasma Projectors MK2L', value: 'PP-MK2L', range: 4, damage: 2 }
]

// export const SHIP_CLASS = [
//  { 'Kidd (Destroyer)', 'Executor (Heavy Cruiser)' }
// ]

export const FACTIONS = [
	{ value: 'uwc',  label: 'United Worlds Commonwealth'}, 
	{ value: 'bfr',  label: 'Blood Fleet Raiders'},
	{ value: 'cnp',  label: 'Coral Nebula Pirates'},
	{ value: 'ob',   label: 'Orion BrotherHood'},
	{ value: 'tscc', label: 'Third Star Cluster Clans'}
]

export const NPC_SHIPS = [
	{ value: 'uwcNpcDD', id: 1, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 0, y: 0 },
	// { value: 'uwcNpcDD', id: 2, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 3, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 4, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'uwcNpcDD', id: 5, label: 'NPC Ship', type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'bfrNpcDD', id: 6,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: -5, y: -5 },
	// { value: 'bfrNpcDD', id: 7,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 8,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 9,  label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'bfrNpcDD', id: 10, label: 'NPC Ship', type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'cnpNpcDD', id: 11, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: -5, y: 5 },
	// { value: 'cnpNpcDD', id: 12, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 13, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 14, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'cnpNpcDD', id: 15, label: 'NPC Ship', type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'obNpcDD', id: 16, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 5, y: -5 },
	// { value: 'obNpcDD', id: 17, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 18, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 19, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'obNpcDD', id: 20, label: 'NPC Ship', type: 'Destroyer', faction: 'ob',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},

	{ value: 'tsccNpcDD', id: 21, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3, x: 5, y: 5 }
	// { value: 'tsccNpcDD', id: 22, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 23, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 24, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	// { value: 'tsccNpcDD', id: 25, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3}
]

export const STARTER_SHIPS = [
	{ value: 'monolith', label: 'Monolith', type: 'Freighter', faction: 'none',  plasmaProjectors: 'PP-MK1',  torpedoes: null, shieldsHp: 2, shieldsRegen: 1, martelDrive: 2, sublightSpeed: 2, scanner: 2, signature: 6, cargo: 5, price: 0, description: 'A small but well rounded frieghter' },
	{ value: 'badger',   label: 'Badger',   type: 'Frigate',   faction: 'none',  plasmaProjectors: 'PP-MK2',  torpedoes: null, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 3, scanner: 2, signature: 3, cargo: 2, price: 0, description: 'The Badger provides good firepower for its size, but dont expect to win any fights against bigger ships.' },
	{ value: 'shadow',   label: 'Shadow',   type: 'Freighter', faction: 'none',  plasmaProjectors: 'PP-MK1',  torpedoes: null, shieldsHp: 1, shieldsRegen: 1, martelDrive: 2, sublightSpeed: 3, scanner: 3, signature: 3, cargo: 4, price: 0, description: 'Less cargo space than a standard freighter, the Shadow was designed to have a low signature. A good choice for those who wish to haul cargo without drawing a lot of attention.' }
]
