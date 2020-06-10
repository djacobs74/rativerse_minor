export const SHIP_DATA = [
  { value: 'kidd',     label: 'Kidd',     type: 'Destroyer', faction: 'uwc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3 },
  { value: 'scythe',   label: 'Scythe',   type: 'Destroyer', faction: 'bfr',  plasmaProjectors: 'PP-MK2C', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3 },
  { value: 'phantom',  label: 'Phantom',  type: 'Destroyer', faction: 'cnp',  plasmaProjectors: 'PP-MK2L', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3 },
  { value: 'vanguard', label: 'Vanguard', type: 'Destroyer', faction: 'ob',   plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3 },
  { value: 'avenger',  label: 'Avenger',  type: 'Destroyer', faction: 'tscc', plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, martelDrive: 2, sublightSpeed: 5, scanner: 2, signature: 3, cargo: 3 }
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
	{ value: 'npsShip', id: 1, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2', torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3},
	{ value: 'npsShip', id: 2, label: 'NPC Ship', type: 'Destroyer', faction: 'tscc',  plasmaProjectors: 'PP-MK2',  torpedoes: 2, shieldsHp: 3, shieldsRegen: 2, signature: 3}
]
