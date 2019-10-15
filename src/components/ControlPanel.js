import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';

import { connect } from 'react-redux';



class ControlPanel extends Component {

	render () {
		// const props = this.props;


		return (
			<div>
				<div className="header">
					Control Panel
				</div>
				<div className="shipData">
					<div>Current Ship: Destroyer</div>
					<div>Ship data:</div>
						<div>* shields</div>
				</div>
				<div>Selected Sector: {prettyCoords(this.props.sector)}</div>
				<Destination />
				
			</div>
		);
	}



}
	


const mapStateToProps = (state) => {
	return {sector: state.selectedSector}
}



export default connect(mapStateToProps)(ControlPanel);