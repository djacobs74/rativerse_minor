import React, { Component } from 'react';
import Starmap from './Starmap';
import ControlPanel from './ControlPanel';
import RativerseInfo from './RativerseInfo';

import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { STARTER_SHIPS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';



class Game extends Component {


	render () {

		return (
			<div>

				<div className="main-wrapper">
					<div className="hud">
						<ControlPanel
						selectedShip={this.props.currentShip} 
						// selectedShip={this.getSelectedShip()}
						/>
					</div>
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