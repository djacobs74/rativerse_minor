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
		selectedFaction: 'Select a Faction',
		gameReady: false
	}

	selectedFaction = (option) =>  {
		this.setState({selectedFaction: option, gameReady: true})
	}

	startGame() {
		this.setState({startGame: true})
	}


	render () {
		const options = FACTIONS;
		let startGame = this.state.startGame;
	
		console.log('START GAME STATE', startGame);
		// debugger;

		return (
			<div>
				{ !startGame ? 
					// <div>Welcome to the Rativerse!</div>

					<div className="homePage">
						<div className="welcome">Welcome to the Rativerse!</div>
						
						<Dropdown options={options} onChange={this.selectedFaction} value={this.state.selectedFaction} placeholder="Select an option" />
						<button disabled={!this.state.gameReady} className="startBtn" onClick={() => this.startGame()}>Start Game</button>
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