import React, { Component } from 'react';
import Starmap from './Starmap';
// import CombatDisplay from './CombatDisplay';
import NewCombatDisplay from './NewCombatDisplay';
import ControlPanel from './ControlPanel';
import RativerseInfo from './RativerseInfo';
import DockedControlPanel from './DockedControlPanel';
import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { STARTER_SHIPS } from './_utils/constants';
import { playerData } from '../actions/playerData';
import Dropdown from 'react-dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { npcShipMover, npcShieldRecharger } from '../actions/npcShipMover';
import { createMap } from '../actions/map';
import { npcShipGenerator } from '../actions/npcShipGenerator';
import { shieldRecharger } from '../actions/selectedShip';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';

class Game extends Component {

	constructor(props) {
	    super(props)

	    // this.dockHandler = this.dockHandler.bind(this)
	 }

	componentDidMount = () => {
		const newGame = true;
		const mapSize = 25;
		this.props.playerData(newGame);
		// this.props.npcShipMover();
		this.moveNpcShips();
		this.props.createMap(mapSize, 'game');
		this.createNpcShips(this.props);
		this.rechargePlayerShields(this.props);
		this.rechargeNpcShields(this.props);
	}


	// dockHandler() {
	// 	// console.log('DOCKED SECTOR', this.props.sector);
	//     this.setState({
	//       docked: !this.state.docked
	//     })
	// }

	rechargePlayerShields(props) {
		const here = this;

		function rechargeDelay () {
			setInterval(function () {
				if(here.props.currentShip) {
					here.props.shieldRecharger(here.props.currentShip);
				}	
			}, 10000)
		}
		rechargeDelay();
	}

	rechargeNpcShields(props) {
		const here = this;

		function npcRechargeDelay () {
			setInterval(function () {
				if(here.props.npcActiveShips.length) {
					here.props.npcShieldRecharger(here.props.npcActiveShips);
				}			
			}, 10000)
		}
		npcRechargeDelay();
	}

	createNpcShips(props) {
		// const npcShips = this.props.npcShips;
		// const playerFaction = this.props.selectedFaction.value;
		const here = this;

		function spawnDelay () {
			setInterval(function () {
				// console.log('^^^^^^^^^^ npcShips', here.props.npcShips);
				here.props.npcShipGenerator(here.props.npcShips)
				
			}, 10000)
		}
		spawnDelay();
	}

	moveNpcShips() {
		const npcShips = this.props.npcShips;
		const playerShipSignature = this.props.currentShip ? this.props.currentShip.signature : 0;
		
		// const playerFaction = this.props.selectedFaction.value;
		let npcShipsActive = [];
		const here = this;

		function spawnDelay () {
			setInterval(function () {
				const player= here.props.player;
				const playerPosition = here.props.sectorPosition;
				// debugger;
				npcShipsActive = here.props.npcShipMover(here.props.npcShips, playerPosition, player, here.props.npcActiveShips, playerShipSignature);
				// here.setState({npcShipsActive: npcShipsActive});
			
				
				// debugger;
				
			}, 5000)
		}
		spawnDelay();
	}


	render () {

		return (
			<div>

				{!this.props.player.inCombat ? 
					<div>
						<div className="main-wrapper">
							<div className="huds-wrapper">
								<div className="hud">
									<ControlPanel dockHandler = {this.dockHandler}/>
								</div>
								{ this.props.player.docked &&
									<div className="hud docked">
										<DockedControlPanel />
									</div>
								}
							</div>
					        <div className="mapBox game">  	
						    	<Starmap 
						    	/>
					        </div>
						</div>
					</div>

				:

				// <CombatDisplay playerInCombat={this.props.player.inCombat} />
				<NewCombatDisplay playerInCombat={this.props.player.inCombat} />

				}


				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					/>
					{/* Same as */}
				<ToastContainer />

				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	currentShip: state.selectedShip.ship,
  	player: state.playerData,
  	npcActiveShips: state.npcActiveShips,
  	npcShips: state.npcShips,
  	sectorPosition: state.sectorPosition.position
});



export default connect(mapStateToProps, {playerData, npcShipMover, createMap, npcShipGenerator, shieldRecharger, npcShieldRecharger})(Game);