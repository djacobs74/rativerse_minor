import React, { Component } from 'react';
import Destination from './Destination';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';


class ControlPanel extends Component {

	state = {
		ship: {},
		npcShipsScan: []
	}

	componentDidMount = () => {
		this.getShipType();
	}

	componentDidUpdate(prevProps, props) {
		if (prevProps.sector !== this.props.sector) {
			this.getShips(this.props.sector);
		}
	}

	getShipType() {
		const selectedShip = this.props.currentShip.value;
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
		let ships = [];

		if(sectorData[0].npcShips.length) {
			ships = sectorData[0].npcShips;			
		}
		this.setState({npcShipsScan: ships});
	}


	render () {
		const ship = this.props.currentShip;
		const selectedShip = this.props.currentShip.label;
		const moving = this.props.sectorPosition.moving || false;
		const selectedSectorType = this.props.sector.length && this.props.sector[0].sectorType[0].name || '';
		const selectedSectorData = this.props.sector;
		const playerData = this.props.player;

		let cargoData = [];
		ship.cargoHold.map(c => {
			if(c.amount > 0) {
				cargoData.push(c);
			}
		})
	
		return (
			<div className="ControlPanel">
				<div className="cpSection">
					<div className="header">Ship Data</div>
					<div>Current Ship: {ship.label} ({ship.type})</div>
				
					<div className="shipDetail">Ship Systems:
						<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsHp})`}</div>
						<div>* Hull: {ship.hullHp}</div>
						<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} `}</div>
						<div>{ship.torpedoes && `* ${ship.torpedoes.name} `}</div>
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

				<div className="cpSection">
					<div className="header">Credits and Reputation</div>
					<div>* Credits: {playerData.credits}</div>
					<div>* UWC: {playerData.reputation && playerData.reputation[0].uwc}</div>
					<div>* BFR: {playerData.reputation && playerData.reputation[1].bfr}</div>
					<div>* CNP: {playerData.reputation && playerData.reputation[2].cnp}</div>
					<div>* OB: {playerData.reputation && playerData.reputation[3].ob}</div>
					<div>* TSCC: {playerData.reputation && playerData.reputation[4].tscc}</div>
				</div>

				<div className="cpSection">
					<div className="header">Selected Sector Scan Data</div>
					<div>{prettyCoords(selectedSectorData)} {selectedSectorType && `  ${selectedSectorType}`}</div>
					<div>Docking Area: {this.getDockingArea(selectedSectorData)}</div>
					<div>SHIPS: {this.state.npcShipsScan.length === 0 && 'None'}</div>
					{this.state.npcShipsScan.length > 0 && this.state.npcShipsScan.map(s => 
						<div key={s.id} className="npcShipsData">
							<div>Type: {s.type} (ID: {s.id})</div>
							<div>Faction: {s.factionName}</div>
						</div>
					)}
				</div>

				<Destination dockHandler = {this.props.dockHandler}/>
			</div>
		);
	}
}
	

const mapStateToProps = state => ({
  	sector: state.selectedSector.gameMapSector,
  	currentShip: state.selectedShip,
  	sectorPosition: state.sectorPosition,
  	npcShips: state.npcShips,
  	player: state.playerData
});

export default connect(mapStateToProps)(ControlPanel);