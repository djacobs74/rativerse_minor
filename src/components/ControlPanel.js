import React, { Component } from 'react';
import Move from './Move';
import { prettyCoords } from './_utils/displayUtils';

import { connect } from 'react-redux';



class ControlPanel extends Component {

	// prettyCoords() {
	// 	let coords = this.props.sector;
	// 	if(coords.length > 0) {
	// 		coords = coords[0] + ', ' + coords[1];
	// 	}
	// 	return coords
	// }

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
				<Move />
			</div>
		);
	}



}
	


const mapStateToProps = (state) => {
	return {sector: state.selectedSector}
}



export default connect(mapStateToProps)(ControlPanel);