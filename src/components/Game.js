import React, { Component } from 'react';
import Starmap from './Starmap';
import ControlPanel from './ControlPanel';
import RativerseInfo from './RativerseInfo';
import DockedControlPanel from './DockedControlPanel';
import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { STARTER_SHIPS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';

class Game extends Component {

	constructor(props) {
	    super(props)

	    this.dockHandler = this.dockHandler.bind(this)
	 }

	state = {
		docked: false
	}

	dockHandler() {
		// console.log('DOCKED SECTOR', this.props.sector);
	    this.setState({
	      docked: !this.state.docked
	    })
	}


	render () {

		

		return (
			<div>

				<div className="main-wrapper">
					<div className="hud">
						<ControlPanel dockHandler = {this.dockHandler} docked={this.state.docked}/>
					</div>
					{ this.state.docked &&
						<div className="hud docked">
							<DockedControlPanel />
						</div>
					}
			        <div className="mapBox">  	
				    	<Starmap 
				    	/>
			        </div>
				</div>
				

				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	currentShip: state.selectedShip
});



export default connect(mapStateToProps)(Game);