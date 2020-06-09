import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';
import { SHIP_CLASS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';



class ControlPanel extends Component {

	render () {
		const options = SHIP_CLASS;
		const defaultOption = options[0];
		// const selectedShip = this.props.selectedShip;
		const selectedFaction = this.props.selectedFaction.label;
		// debugger;

		return (
			<div>
				<div className="header">
					Control Panel
				</div>
				<div className="shipData">
					<div>Faction: {selectedFaction}</div>
					{/*<div>Current Ship: {selectedShip}</div>*/}
					{/*<Dropdown className="shipSelect" options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />*/}
					<div>Ship data:</div>
						<div>* shields</div>
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