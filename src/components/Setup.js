import React, { Component } from 'react';
import Game from './Game';

import RativerseInfo from './RativerseInfo';

import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { STARTER_SHIPS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';



class Setup extends Component {
	state = {
		startGame: false,
		// selectedShip: this.props.currentShip,
		// selectedFaction: 'Select a Faction',
		// selectedShip: 'Select a Ship',
		// gameReady: false
	}

	// componentDidUpdate(prevProps, props) {
	// 	if(prevProps.currentShip !== props.currentShip) {
	// 		this.setState({gameReady: true})
	// 	}
	// }

	// selectedFaction = (option) =>  {
	// 	this.setState({selectedFaction: option, gameReady: true})
	// }

	// selectedShip = (option) =>  {
	// 	this.setState({selectedShip: option, gameReady: true})
	// }

	startGame() {
		this.setState({startGame: true})
	}


	render () {
		const options = STARTER_SHIPS;
		let startGame = this.state.startGame;
		// const selectedFaction = this.state.selectedFaction.value ? this.state.selectedFaction.value : 'notSelected';
		// const selectedShip = this.state.selectedShip.value ? this.state.selectedShip.value : '';
		const gameReady = Object.keys(this.props.currentShip).length ? true : false;
	
		console.log('gameReady', gameReady);
		// debugger;

		return (
			<div>
				{ !startGame ? 
					// <div>Welcome to the Rativerse!</div>

					<div className="homePage">
						<div className="welcome">Welcome to the Rativerse!</div>
						
						
						<button disabled={!gameReady} className="startBtn" onClick={() => this.startGame()}>Start Game</button>
						<RativerseInfo />
					</div>

				:
					<Game />
				}

				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	currentShip: state.selectedShip
});



export default connect(mapStateToProps)(Setup);