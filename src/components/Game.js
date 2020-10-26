import React, { Component } from 'react';
import Starmap from './Starmap';
import CombatDisplay from './CombatDisplay';
import ControlPanel from './ControlPanel';
import RativerseInfo from './RativerseInfo';
import DockedControlPanel from './DockedControlPanel';
import { SHIP_DATA } from './_utils/constants';
import { SHIP_CLASS } from './_utils/constants';
import { STARTER_SHIPS } from './_utils/constants';
import { playerData } from '../actions/playerData';
import Dropdown from 'react-dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { npcShipMover } from '../actions/npcShipMover';
import { createMap } from '../actions/map';
import 'react-dropdown/style.css';

import { connect } from 'react-redux';

class Game extends Component {

	constructor(props) {
	    super(props)

	    // this.dockHandler = this.dockHandler.bind(this)
	 }

	state = {
		// docked: false,
		startingCombat: false
	}

	componentDidMount = () => {
		const newGame = true;
		this.props.playerData(newGame);
		// this.props.npcShipMover();
		this.moveNpcShips();
		this.props.createMap();
	}

	componentDidUpdate = (prevProps) => {
		if(this.state.startingCombat === false && (this.state.startingCombat !== this.props.player.inCombat)) {
			this.setState({startingCombat: true});
			this.props.player.inCombat && toast.error('ENTERING COMBAT !!');
		}
	}

	// dockHandler() {
	// 	// console.log('DOCKED SECTOR', this.props.sector);
	//     this.setState({
	//       docked: !this.state.docked
	//     })
	// }

	moveNpcShips() {
		const npcShips = this.props.npcShips;
		
		// const playerFaction = this.props.selectedFaction.value;
		let npcShipsActive = [];
		const here = this;

		function spawnDelay () {
			setInterval(function () {
				const player= here.props.player;
				const playerPosition = here.props.currentPosition;
				// debugger;
				npcShipsActive = here.props.npcShipMover(here.props.npcShips, playerPosition, player, here.props.npcActiveShips);
				// here.setState({npcShipsActive: npcShipsActive});
			
				
				// debugger;
				
			}, 5000)
		}
		spawnDelay();
	}


	render () {

		// console.log('CURRENT', this.props.currentShip);
		console.log('npcActiveShips', this.props.npcActiveShips);
		console.log('npcShips', this.props.npcShips);
		// console.log('currentPosition', this.props.currentPosition);
		console.log('game state', this.state);
		console.log('player data', this.props.player);
		// this.props.player.inCombat = true;
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
					        <div className="mapBox">  	
						    	<Starmap 
						    	/>
					        </div>
						</div>
					</div>

				:

				<CombatDisplay playerInCombat={this.props.player.inCombat} />

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
  	path: state.path,
  	currentShip: state.selectedShip,
  	player: state.playerData,
  	npcActiveShips: state.npcActiveShips,
  	npcShips: state.npcShips,
  	currentPosition: state.currentPosition
});



export default connect(mapStateToProps, {playerData, npcShipMover, createMap})(Game);