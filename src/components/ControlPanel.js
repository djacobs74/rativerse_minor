import React, { Component } from 'react';
import Move from './Move';

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
				<div>Selected Sector: </div>
				<Move />
			</div>
		);
	}



}
	




export default ControlPanel;