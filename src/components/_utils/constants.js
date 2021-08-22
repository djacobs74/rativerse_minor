export const FACTIONS = [
	{ value: 'uwc',  label: 'United Worlds Commonwealth'}, 
	{ value: 'bfr',  label: 'Blood Fleet Raiders'},
	{ value: 'cnp',  label: 'Coral Nebula Pirates'},
	{ value: 'ob',   label: 'Orion BrotherHood'},
	{ value: 'tscc', label: 'Third Star Cluster Clans'}
]

export const PLASMA_PROJECTORS = [
	{ name: 'Plasma Projectors MK2',  value: 'PP-MK2',  range: 3, minDamage: 5, maxDamage: 10 },
	{ name: 'Plasma Projectors MK2C', value: 'PP-MK2C', range: 2, minDamage: 6, maxDamage: 11 },
	{ name: 'Plasma Projectors MK2L', value: 'PP-MK2L', range: 4, minDamage: 4, maxDamage: 9 },
	{ name: 'Plasma Projectors MK3',  value: 'PP-MK3', range: 4, minDamage: 8, maxDamage: 14 }
]

export const TORPEDOES = [
	{ name: 'Torpedoes MK1',  value: 'T-MK2',  range: 3, minDamage: 8, maxDamage: 12 },
	{ name: 'Torpedoes MK2',  value: 'T-MK2',  range: 3, minDamage: 10, maxDamage: 14 },
	{ name: 'Torpedoes MK3',  value: 'T-MK2',  range: 3, minDamage: 12, maxDamage: 16 }
]

export const SHIELDS = [
	{ name: 'Shields MK1',  value: 'S-MK1',  shieldsHp: 60, shieldsRegen: 2, shieldsMax: 60 },
	{ name: 'Shields MK2',  value: 'S-MK2',  shieldsHp: 70, shieldsRegen: 3, shieldsMax: 70 },
	{ name: 'Shields MK3',  value: 'S-MK3',  shieldsHp: 80, shieldsRegen: 4, shieldsMax: 80 }
]

export const MartelDrives = [
	{ name: 'MK1', value: 5000 },
	{ name: 'MK2', value: 4000 },
	{ name: 'MK3', value: 3000 },
	{ name: 'MK4', value: 2000 }
]

export const SublightDrives = [
	{ name: 'MK1', value: 5000 },
	{ name: 'MK2', value: 4000 },
	{ name: 'MK3', value: 3000 },
	{ name: 'MK4', value: 2000 }
]

export const SHIP_DATA = [
  { value: 'kidd',     label: 'Kidd',     type: 'Destroyer', faction: 'uwc',  plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BWC Destroyer' },
  { value: 'scythe',   label: 'Scythe',   type: 'Destroyer', faction: 'bfr',  plasmaProjectors: PLASMA_PROJECTORS[1], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical BFR Destroyer' },
  { value: 'phantom',  label: 'Phantom',  type: 'Destroyer', faction: 'cnp',  plasmaProjectors: PLASMA_PROJECTORS[2], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical CNP Destroyer' },
  { value: 'vanguard', label: 'Vanguard', type: 'Destroyer', faction: 'ob',   plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical OB Destroyer' },
  { value: 'avenger',  label: 'Avenger',  type: 'Destroyer', faction: 'tscc', plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3, description: 'A typical TSCC Destroyer' }
]

export const NPC_SHIPS = [
	{ value: 'uwcNpcDD', id: 1, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[0].value, factionName: FACTIONS[0].label, plasmaProjectors: PLASMA_PROJECTORS[2],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 0, y: 0, inCombat: false, isDestroyed: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false, hullHp: 20, hullMax: 20 },

	{ value: 'bfrNpcDD', id: 2,  label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[1].value, factionName: FACTIONS[1].label, plasmaProjectors: PLASMA_PROJECTORS[1],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: -5, y: -5, inCombat: false, isDestroyed: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false, hullHp: 20, hullMax: 20 },

	{ value: 'cnpNpcDD', id: 3, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[2].value, factionName: FACTIONS[2].label, plasmaProjectors: PLASMA_PROJECTORS[2],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: -5, y: 5, inCombat: false, isDestroyed: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false, hullHp: 20, hullMax: 20 },

	{ value: 'obNpcDD', id: 4, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[3].value, factionName: FACTIONS[3].label, plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 5, y: -5, inCombat: false, isDestroyed: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false, hullHp: 20, hullMax: 20 },

	{ value: 'tsccNpcDD', id: 5, label: 'NPC Ship', type: 'Destroyer', faction: FACTIONS[4].value, factionName: FACTIONS[4].label, plasmaProjectors: PLASMA_PROJECTORS[0], torpedoes: TORPEDOES[0], shields: SHIELDS[0], signature: 3, x: 5, y: 5, inCombat: false, isDestroyed: false, sublightSpeed: 4, inRangeMsg: 'Out of Weapons Range', inRangePP: false, inRangeT: false, hullHp: 20, hullMax: 20}
]

export const STARTER_SHIPS = [
	{ value: 'monolith', label: 'Monolith', type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: MartelDrives[1], sublightSpeed: SublightDrives[1], scanner: 2, signature: 6, cargo: 0, cargoHold: [], cargoMax: 40, price: 0, hullHp: 20, hullMax: 20, description: 'A well rounded freighter with moderate cargo space.' },
	{ value: 'badger',   label: 'Badger',   type: 'Frigate',   faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[1],  torpedoes: TORPEDOES[0], shields: SHIELDS[1], martelDrive: MartelDrives[1], sublightSpeed: SublightDrives[2], scanner: 2, signature: 3, cargo: 0, cargoHold: [], cargoMax: 10, price: 0, hullHp: 20, hullMax: 20, description: 'The Badger provides good firepower for its size, but dont expect to win any fights against bigger ships.' },
	{ value: 'shadow',   label: 'Shadow',   type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: MartelDrives[3], sublightSpeed: SublightDrives[3], scanner: 3, signature: 3, cargo: 0, cargoHold: [], cargoMax: 20, price: 0, hullHp: 20, hullMax: 20, description: 'Less cargo space than a standard freighter, the Shadow was designed to have a low signature and good speed. A good choice for those who wish to haul cargo quickly without drawing a lot of attention.' },
	{ value: 'hercules',   label: 'Hercules',   type: 'Gunship', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[3],  torpedoes: TORPEDOES[2], shields: SHIELDS[2], martelDrive: MartelDrives[2], sublightSpeed: SublightDrives[2], scanner: 3, signature: 4, cargo: 0, cargoHold: [], cargoMax: 5, price: 0, hullHp: 20, hullMax: 20, description: 'The aptly named Hercules was designed for one purpose: combat. This capable warship is a good choice for bounty hunters, pirates, or even haulers concerned with defending a small load of valuable cargo.' }
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
