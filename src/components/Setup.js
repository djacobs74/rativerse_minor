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
	}

	startGame() {
		this.setState({startGame: true})
	}


	render () {
		const options = STARTER_SHIPS;
		let startGame = this.state.startGame;

		// const gameReady = Object.keys(this.props.currentShip).length ? true : false;
		let gameReady = false;
		if(this.props.currentShip && (Object.keys(this.props.currentShip).length && !this.state.startGame)) {
			gameReady = true;
		} else if(this.state.startGame) {
			gameReady = true;
		};
	
		console.log('gameReady', gameReady);
		// debugger;

		return (
			<div>
				{ !startGame ? 
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
  	currentShip: state.selectedShip.ship
});



export default connect(mapStateToProps)(Setup);