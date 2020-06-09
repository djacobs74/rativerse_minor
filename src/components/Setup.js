import React, { Component } from 'react';
import Starmap from './Starmap';
import ControlPanel from './ControlPanel';
import FactionDescriptions from './FactionDescriptions';

import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { FACTIONS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';



class Setup extends Component {
	state = {
		startGame: false,
		selectedShip: '',
		selectedFaction: 'Select a Faction'
	}

	selectedFaction = (option) =>  {
		
		this.setState({startGame: true, selectedFaction: option})
	}


	render () {
		const options = FACTIONS;
		const defaultFactionOption = 'Select a Faction';
		let startGame = this.state.startGame;
	
		console.log('START GAME STATE', startGame);
		// debugger;

		return (
			<div>
				{ !startGame ? 
					// <div>Welcome to the Rativerse!</div>

					<div className="homePage">
						<div className="welcome">Welcome to the Rativerse!</div>
						
						<Dropdown options={options} onChange={this.selectedFaction} value={defaultFactionOption} placeholder="Select an option" />
						<FactionDescriptions />
					</div>

				:
					<div className="">
						<div className="hud">
							<ControlPanel
							selectedFaction={this.state.selectedFaction} 
							// selectedShip={this.getSelectedShip()}
							/>
						</div>
				        <div className="mapBox">  	
					    	<Starmap />
				        </div>
					</div>
				}

				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path
});



export default connect(mapStateToProps)(Setup);