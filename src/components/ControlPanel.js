import React, { Component } from 'react';
import Destination from './Destination';
// import { dockUndockShip } from './_utils/movement';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';



class ControlPanel extends Component {

	state = {
		ship: {},
		docked: this.props.docked
	}

	componentDidMount = () => {
		this.getShipType();
	}

	getShipType() {
		const selectedShip = this.props.currentShip.value;
		const ship = STARTER_SHIPS.find(s => s.value === selectedShip)
		this.setState({ship: ship});
		console.log('SHIP', ship);
	}


	render () {
		const ship = this.props.currentShip;
		const selectedShip = this.props.currentShip.label;
		const moving = this.props.currentPosition.moving || false;
		// debugger;

		return (
			<div className="ControlPanel">
				<div className="header">
					Control Panel
				</div>
				{/*<div>Faction: {selectedShip}</div>*/}
				<div className="shipData">
					
					<div>Current Ship: {ship.label} ({ship.type})</div>
				
					<div className="shipDetail">Ship Systems:
						<div>{ship.shields && `* ${ship.shields.name} `}</div>
						<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} `}</div>
						<div>{ship.torpedoes && `* ${ship.torpedoes.name} `}</div>
						<div>* Sublight Speed: {ship.sublightSpeed}</div>
				
						<div>* Martel Drive: {ship.martelDrive}</div>

						<div>* Signature: {ship.signature}</div>
						<div>* Scanner: {ship.scanner}</div>
						<div>* Cargo Space: {ship.cargo}</div>
					</div>
				</div>
				<div>Selected Sector: {prettyCoords(this.props.sector)}</div>
				<Destination dockHandler = {this.props.dockHandler} docked={this.props.docked}/>
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	currentShip: state.selectedShip,
  	currentPosition: state.currentPosition
});



export default connect(mapStateToProps)(ControlPanel);