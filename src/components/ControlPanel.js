import React, { Component } from 'react';
import Move from './Move';

import { connect } from 'react-redux';



class ControlPanel extends Component {

	// write function to put comma and space between x, y for display purposes

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
				<div>Selected Sector: {this.props.sector}</div>
				<Move />
			</div>
		);
	}



}
	


const mapStateToProps = (state) => {
	return {sector: state.selectedSector}
}



export default connect(mapStateToProps)(ControlPanel);