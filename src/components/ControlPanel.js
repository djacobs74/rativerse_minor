import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';



class ControlPanel extends Component {

	state = {
		ship: {}
	}

	componentDidMount = () => {
		this.getShipType();
	}

	getShipType() {
		const faction = this.props.selectedFaction.value;
		const ship = SHIP_DATA.find(s => s.faction === faction)
		this.setState({ship: ship});
		console.log('SHIP', ship);
	}

	render () {
		const ship = this.state.ship;
		const selectedFaction = this.props.selectedFaction.label;
		// debugger;

		return (
			<div>
				<div className="header">
					Control Panel
				</div>
				<div className="shipData">
					<div>Faction: {selectedFaction}</div>
					<div>Current Ship: {ship.label} ({ship.type})</div>
				
					<div className="shipDetail">Ship data:
						<div>* Shield HP: {ship.shieldsHp}</div>
						<div>* Plasma Projectors: {ship.plasmaProjectors}</div>
						<div>* Torpedoes: {ship.torpedoes}</div>
						<div>* Sublight Speed: {ship.sublightSpeed}</div>
						{ ship.faction !== 'tscc' ?
							<div>* Martel Drive: {ship.martelDrive}</div>
							: <div>* Star Drive: {ship.martelDrive}</div>
						}
						<div>* Signature: {ship.signature}</div>
						<div>* Scanner: {ship.scanner}</div>
						<div>* Cargo Space: {ship.cargo}</div>
					</div>
				</div>
				<div>Selected Sector: {prettyCoords(this.props.sector)}</div>
				<Destination />
				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path
});



export default connect(mapStateToProps)(ControlPanel);