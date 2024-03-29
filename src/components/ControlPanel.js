import React, { Component } from 'react';
import Destination from './Destination';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { getPath } from '../actions/getPath';
import { playerData } from '../actions/playerData';
import { connect } from 'react-redux';


class ControlPanel extends Component {

	state = {
		ship: {},
		npcShipsScan: [],
		showStoredShips: false,
		showPosRep: false
	}

	componentDidMount = () => {
		// this.getShipType();
	}

	componentDidUpdate(prevProps, props) {
		if (prevProps.sector !== this.props.sector) {
			this.getShips(this.props.sector);
		}
	}

	getShipType() {
		const selectedShip = this.props.currentShip.value || null;
		const ship = STARTER_SHIPS.find(s => s.value === selectedShip)
		this.setState({ship: ship});
	}

	getDockingArea(sectorData) {
		let dockingArea = 'None';

		if (sectorData.length) {
			if(sectorData[0].dockingArea && sectorData[0].dockingArea.length) {
				dockingArea = sectorData[0].dockingArea[0].type + ' ' + sectorData[0].dockingArea[0].id;
			}
		}
		return dockingArea
	}

	getShips(sectorData) {
		// check range to sector
		let ships = [];

		const posX = this.props.sectorPosition.position[0];
		const posY = this.props.sectorPosition.position[1];
		const sectorX = sectorData[0]['x'];
		const sectorY = sectorData[0]['y'];
		const scannerRange = this.props.currentShip ? this.props.currentShip.scanner : 0;
		const path = getPath([posX, posY], [sectorX, sectorY], null, 'game', true);
		const rangeToTarget = path.length;
		// debugger;

		if(rangeToTarget <= scannerRange) {
			if(sectorData[0].npcShips.length) {
				ships = sectorData[0].npcShips;			
			}
		} else {
			ships = [{'key': ''}]
		}
		this.setState({npcShipsScan: ships});
	}

	getStoredShips(dockingAreas) {
		let storedShips = [];

		dockingAreas.map(d => {
			if(d.dockingArea.hangar.space > 0) {
				storedShips.push(d);
			}
		})
		return storedShips
	}

	checkRep(playerRep) {
		let posRep = false;
		
		playerRep.map(r => {

			if(Object.values(r) > -1) {
				posRep = true;
			}
		})
		return posRep
	}

	setFactionToHostile = (faction, playerData) => {
		let playerRep = playerData.reputation;

		let uwc = playerRep[0].uwc;
		let bfr = playerRep[1].bfr;
		let cnp = playerRep[2].cnp;
		let ob = playerRep[3].ob;
		let tscc = playerRep[4].tscc;

		if(Object.keys(faction)[0] === 'uwc') {
			uwc = -1;
		};
		if(Object.keys(faction)[0] === 'bfr') {
			bfr = -1;
		};
		if(Object.keys(faction)[0] === 'cnp') {
			cnp = -1;
		};
		if(Object.keys(faction)[0] === 'ob') {
			ob = -1;
		};
		if(Object.keys(faction)[0] === 'tscc') {
			tscc = -1;
		};

		const newRep = [{uwc}, {bfr}, {cnp}, {ob}, {tscc}];
		playerData.reputation = newRep;

		this.props.playerData(false, playerData);
	}


	render () {
		const ship = this.props.currentShip;
		// const selectedShip = this.props.currentShip.label;
		const moving = this.props.sectorPosition.moving || false;
		const selectedSectorType = this.props.sector.length && this.props.sector[0].sectorType[0].name || '';
		const selectedSectorData = this.props.sector;
		const playerData = this.props.player;
		const playerHasPositiveRep = this.checkRep(playerData.reputation);
		


		let cargoData = [];
		ship && ship.cargoHold.map(c => {
			if(c.amount > 0) {
				cargoData.push(c);
			}
		})

		const storedShips = this.getStoredShips(this.props.dockingAreas);
	
		return (
			<div className="ControlPanel">
				<div className="cpSection">
					<div className="header">Ship Data</div>
					{ ship ?
						<div>
							<div>Current Ship: {ship.label} ({ship.type})</div>
						
							<div className="shipDetail">Ship Systems:
								<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsHp})`}</div>
								<div>* Hull: {ship.hullHp}</div>
								<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} `}</div>
								<div>{ship.torpedoes && `* ${ship.torpedoes.name} (${ship.torpedoAmmo}) `}</div>
								<div>* Sublight Speed: {ship.sublightSpeed.name}</div>
								<div>* Martel Drive: {ship.martelDrive.name}</div>
								<div>* Signature: {ship.signature}</div>
								<div>* Scanner: {ship.scanner}</div>
								<div>* Cargo Hold Space Used: {`${ship.cargo} of ${ship.cargoMax}`}</div>
								{cargoData.length
									? cargoData.map(c =>
									<div key={c.value}>=== {c.label}: {c.amount}</div>
									) : <div></div>
								}
							</div>
						</div>
					: <div>No ship currently selected</div>}
				</div>

				<div className="cpSection">
					<div className="header">Credits and Reputation</div>
					<div>* Credits: {playerData.credits}</div>
					<div>* UWC: {playerData.reputation && playerData.reputation[0].uwc}</div>
					<div>* BFR: {playerData.reputation && playerData.reputation[1].bfr}</div>
					<div>* CNP: {playerData.reputation && playerData.reputation[2].cnp}</div>
					<div>* OB: {playerData.reputation && playerData.reputation[3].ob}</div>
					<div>* TSCC: {playerData.reputation && playerData.reputation[4].tscc}</div>
					{playerHasPositiveRep && 
						<div className='top-pad'>
							<button onClick={() => this.setState({showPosRep: !this.state.showPosRep})}>{`${this.state.showPosRep ? 'Hide' : 'Show'} Factions I Can Set to Hostile`}</button>
						</div>
					}
					{this.state.showPosRep &&
						<div className='top-pad'>{playerData && playerData.reputation.map(r =>
							Object.values(r) > -1 &&
						<button className='upperCase' onClick={() => this.setFactionToHostile(r, playerData)}>{`Set ${Object.keys(r)} to Hostile`}</button>
						)}

						</div>
					}
				</div>

				<div className="cpSection">
					<div className="header">Selected Sector Scan Data</div>
					<div>{prettyCoords(selectedSectorData)} {selectedSectorType && `  ${selectedSectorType}`}</div>
					<div>Docking Area: {this.getDockingArea(selectedSectorData)}</div>
					<div>SHIPS: {this.state.npcShipsScan.length === 0 && 'None'}</div>
					{this.state.npcShipsScan.length === 1 && !this.state.npcShipsScan[0].id ?
						<div className="npcShipsData">
							<div>Sector out of Scanning Range</div>
						</div>
					: this.state.npcShipsScan.map(s =>
							<div key={s.id} className="npcShipsData">
								<div>Type: {s.type} (ID: {s.id})</div>
								<div>Faction: {s.factionName}</div>
							</div>
						)
					}
				</div>

				<Destination dockHandler = {this.props.dockHandler}/>

				{storedShips.length > 0 &&
					<div className="cpSection">
						<button onClick={() => this.setState({showStoredShips: !this.state.showStoredShips})}>{`${this.state.showStoredShips ? 'Hide' : 'Show' } Hangar Storage`}</button>
						{this.state.showStoredShips && 
							<div>{storedShips.map(d => 
								d.dockingArea.hangar.ships.length > 0 ?
								<div className='top-pad'>{`${d.dockingArea.hangar.ships[0].label} ID: ${d.dockingArea.hangar.ships[0].id} Location: ${d.dockingArea.type} ${d.dockingArea.id}`}</div>
								: <div className='top-pad'>Open Hangar at Location: {`${d.dockingArea.type} ${d.dockingArea.id}`}</div>
							)}</div>
						}
					</div>
				}
			</div>
		);
	}
}
	

const mapStateToProps = state => ({
  	sector: state.selectedSector.gameMapSector,
  	currentShip: state.selectedShip.ship,
  	sectorPosition: state.sectorPosition,
  	npcShips: state.npcShips,
		player: state.playerData,
		dockingAreas: state.dockingAreas
});

export default connect(mapStateToProps, {playerData})(ControlPanel);