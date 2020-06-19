import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

	render () {

		return (
			<div className="ControlPanel">
				DOCKED
				
			</div>
		);
	}


}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	currentShip: state.selectedShip
});



export default connect(mapStateToProps)(DockedControlPanel);