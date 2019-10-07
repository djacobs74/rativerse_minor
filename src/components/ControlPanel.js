import React, { Component } from 'react';
import { connect } from 'react-redux';


class ControlPanel extends Component {



	render () {
		const props = this.props;

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
			</div>
		);
	}



}
	




export default ControlPanel;