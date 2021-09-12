import React, { Component } from 'react';
import { adjustStandings, setNpcStartingLocation, moveNpcShips, playerFire, npcsFire, playerShipDestroyed, retreatToSector } from './_utils/combatUtils';
import { getSector } from '../actions/selectedSector';
import { toast } from 'react-toastify';
import { getPath, resetPath } from '../actions/getPath';
import { moveShip, newPlayerPostion, newPlayerCombatPostion } from '../actions/moveShip';
import { playerData } from '../actions/playerData';
import { createMap } from '../actions/map';
import { updateShip } from '../actions/selectedShip';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import _ from 'lodash';


class NewCombatDisplay extends Component {

	state = {
		currentTarget: null,
		npcs: [],
		torpedoes: false,
		fire: false,
		destination: [],
		moving: false,
		retreating: false,

	}

	constructor(props){
		super(props);
		// this.getCoords = this.props.getSector;     
		this.clickedSector = [];
	}	

	componentDidMount = () => {
		this.setState({destination: []});
		this.props.npcActiveShips.map(s => {
			if(s.inCombat) {
				let npcsArray = this.state.npcs;
				setNpcStartingLocation(s);
				npcsArray.push(s);
			}
		})

		this.props.resetPath('combat')

		const mapSize = [0, 1, 2, 3, 4, 5];
		this.props.createMap(mapSize, 'combat');
		toast.error('ENTERING COMBAT !!');

		this.intervalNpcMpvementId = setInterval(this.startNpcMovement, 1000);
		this.intervalNpcFiringId = setInterval(this.startNpcFiring, 1000);

	}

	componentDidUpdate = (prevProps, prevState) => {

		// if(!this.state.npcs.length) { /// this will not work. look for all npcs destroyed?? move to func and call when a npc is destroyed
		// 	// debugger;
		// 	this.props.player.inCombat = false;
		// 	this.props.playerData(false, this.props.player);
		// }

		this.props.npcActiveShips.map(s => {
			if(s.inCombat && !s.isDestroyed) {
				let npcsArray = this.state.npcs;
				if(!npcsArray.some(npc => npc.id === s.id)) {
					setNpcStartingLocation(s);
					console.log('!!!!! Updated setNpcStartingLocation');
					npcsArray.push(s);
				}
			}
		})

		if(prevProps.playerCombatPosition !== this.props.playerCombatPosition) {
			this.moving(true);
		}

		if((!prevState.currentTarget && this.state.currentTarget) || (prevState.currentTarget !== this.state.currentTarget)) {
			clearInterval(this.intervalPlayerFireId);
			this.intervalPlayerFireId  = setInterval(this.startPlayerFire, 1000);
		}
	}

	setDestination() {
		if(this.props.sector.length) {
			const position = this.props.playerCombatPosition;
			// debugger;
			const destinationCoords = [this.props.sector[0].x, this.props.sector[0].y];
			this.setState({destination: destinationCoords});
			this.props.getPath(position, destinationCoords, null, 'combat');
			toast.success(`Destination set to ${destinationCoords}`, 'success');
		}
	}

	sublightDrive() {
		const position = this.props.playerCombatPosition;
		const moving = this.state.moving;
		const destination = this.state.destination;
		const sublightDriveRating = this.props.currentShip.sublightSpeed;
		
		if( (destination[0] !== position[0]) || (destination[1] !== position[1]) ) {
			if( (moving === false || moving == null) && destination.length ) {
				this.moving(true);
				this.props.moveShip(position, this.props.path, sublightDriveRating, 'combat');
				toast.success('Sublight Drive Engaged');
			}
			
		}
	}

	moving(moving) {
		// debugger;
		const position = this.props.playerCombatPosition;
		const destination = this.state.destination;
		let shipMoving = false;

		if ( (destination[0] === position[0]) && (destination[1] === position[1]) && (moving === true)) {
			shipMoving = false;
			toast.success(`Destination Reached: ${position}`);
		} else if (moving) {
			shipMoving = true;
		}
		this.setState({moving: shipMoving})
	}

	toastMessage = (toastType, toastMsg) => {
		if(toastType === 'success') {
			toast.success(toastMsg);
		}
		if(toastType === 'warning') {
			toast.warning(toastMsg);
		}
		if(toastType === 'error') {
			toast.error(toastMsg);
		}
	}

	targetNpc = (ship) => {
		const currentTarget = this.state.currentTarget;
		ship.isDestroyed = false;

		if(this.state.retreating) {
			return false
		}

		if(currentTarget && (ship.id === currentTarget.id)) {
			this.setState({currentTarget: null});
		} else {
			this.setState({currentTarget: ship});
		}
	}

	oddEven(num) {
		if(num % 2 === 0) {
			return 'even'
		} else {
			return 'odd'
		}
	}

	updateMap(map) {
		const npcs = this.state.npcs;
		const newMap = [...map];

		newMap.map(m => { m.npcShips = [] });

		npcs.map(n => {
			// debugger;
			if(!n.isDestroyed) {
				let sector = newMap.find( m => (m.x === n.combatPositionX) && (m.y === n.combatPositionY) ) 
				sector && sector.npcShips.push(n);
			}
		})
		// debugger;
		return newMap
	}

	clickHandler(m, event) {
		// debugger;
		this.clickedSector = [];
		this.clickedSector.push(m.x, m.y);
		this.props.getSector(m, 'combat');
	}

	pathSec(m) {
		let pathingSec = '';
		let mapSec = [];
		mapSec.push(m['x'], m['y']);
		const setPath = this.props.path;
		const pathLength = setPath.length;
		let i = 0;
		let position = this.props.playerCombatPosition || [];
	
		if(pathLength > 1){
			for (i = 0; i < pathLength; i++) {
			
			 	if(setPath[i][0] === mapSec[0] && setPath[i][1] === mapSec[1]) {
			 		pathingSec = 'pathingSec';
			 	}
			}
		}

		if(position.length) {
			if(position[0] === mapSec[0] && position[1] === mapSec[1]) {
				pathingSec = 'currentSector';
			}
		} 
		
		return pathingSec
	}

	startNpcMovement = () => {
		const npcs = this.state.npcs;
		const playerPosition = this.props.playerCombatPosition;
		console.log('!!!!!  startNpcMovement');

		const updatedNpcs = moveNpcShips(npcs, playerPosition);
		this.setState({npcs: updatedNpcs});
	}

	startPlayerFire = () => {
		const currentTarget = this.state.currentTarget;
		const playerShip = this.props.currentShip;
		const npcs = this.state.npcs;
		const playerPosition = this.props.playerCombatPosition;
		const torpedoesEnabled = this.state.torpedoes;
		let npcsArray = [...npcs];
		if(currentTarget) {
			const {targetDestroyed, updatedTarget, toastData} = playerFire(currentTarget, playerShip, playerPosition, torpedoesEnabled);

			let npcToUpdate = npcsArray.find(n => n.id === updatedTarget.id);
			npcToUpdate = updatedTarget;
			toastData && this.toastMessage(toastData.type, toastData.msg);
			this.setState({npcs: npcsArray});
			if(targetDestroyed) {
				this.setState({currentTarget: null});
				let npcsLeft = [];
				npcsArray.map(n => {
					if(!n.isDestroyed) {
						npcsLeft.push(n);
					}
				})
				if(!npcsLeft.length) {
					this.exitCombat(false);
				}
				clearInterval(this.intervalPlayerFireId);
			}
		}
	}

	startNpcFiring = () => {
		const playerShip = this.props.currentShip;
		const npcs = this.state.npcs;
		const playerPosition = this.props.playerCombatPosition;
		let npcsArray = [...npcs];

		if(npcsArray.length) {
			npcsArray.map(npc => {
				const {targetDestroyed, updatedTarget, toastData} = npcsFire(playerShip, playerPosition, npc);
				toastData && this.toastMessage(toastData.type, toastData.msg);

				if(targetDestroyed) {
					this.exitCombat(true);
					clearInterval(this.intervalNpcFiringId);
				}

			})
		}
		
		
	}

	adjustReputation = (playerRep, tally) => {
		let uwc = playerRep[0].uwc;
		let bfr = playerRep[1].bfr;
		let cnp = playerRep[2].cnp;
		let ob = playerRep[3].ob;
		let tscc = playerRep[4].tscc;

		tally.map(x => {
			if(x.faction === 'uwc') {
				uwc = Number((uwc - 0.5).toFixed(1));
				ob = Number((ob - 0.2).toFixed(1));
				tscc = Number((tscc + 0.1).toFixed(1));
				bfr = Number((bfr + 0.2).toFixed(1));
				cnp = Number((cnp + 0.1).toFixed(1));
			};
			if(x.faction === 'bfr') {
				bfr = Number((bfr - 0.5).toFixed(1));
				uwc = Number((uwc + 0.2).toFixed(1));
				ob = Number((ob + 0.1).toFixed(1));
			};
			if(x.faction === 'cnp') {
				cnp = Number((cnp - 0.5).toFixed(1));
				uwc = Number((uwc + 0.1).toFixed(1));
				ob = Number((ob + 0.2).toFixed(1));
			};
			if(x.faction === 'ob') {
				ob = Number((ob - 0.5).toFixed(1));
				uwc = Number((uwc - 0.2).toFixed(1));
				cnp = Number((cnp + 0.2).toFixed(1));
				bfr = Number((bfr + 0.1).toFixed(1));
			};
			if(x.faction === 'tscc') {
				tscc = Number((tscc - 0.5).toFixed(1));
				uwc = Number((uwc + 0.2).toFixed(1));
				ob = Number((ob + 0.1).toFixed(1));
			};
		})
		// debugger;
		// max and min 10?
		return [{uwc}, {bfr}, {cnp}, {ob}, {tscc}]
	}

	exitCombat = (playerDestroyed) => {
		clearInterval(this.intervalRetreatId);
		let tally = [];
		this.state.npcs.forEach(n => {
			if(n.isDestroyed) {
				tally.push(n);
			}
		})
		// reputation adjustment here
		const rep = this.adjustReputation(this.props.player.reputation, tally);
		this.props.player.reputation = rep;
		clearInterval(this.intervalNpcMpvementId);
		clearInterval(this.intervalPlayerFireId);
		clearInterval(this.intervalNpcFiringId);
		if(playerDestroyed) {
			const newPlayerPosition = playerShipDestroyed(this.state.npcs, this.props.sectorPosition, this.props.dockingAreas);
			this.props.newPlayerPostion(newPlayerPosition);
			this.props.player.docked = true;
			this.props.updateShip(null);
		}
		this.props.player.inCombat = false;
		this.props.playerData(false, this.props.player);
		this.props.newPlayerCombatPostion();
		
		// console.log('^^^ state npcs', this.state.npcs);
	}

	retreat = () => {
		clearInterval(this.intervalPlayerFireId);
		this.setState({currentTarget: null})
		this.intervalRetreatId = setTimeout(this.attemptRetreat, 8000);
		this.setState({retreating: true})
	}

	attemptRetreat = () => {
		const newPosition = retreatToSector(this.props.sectorPosition);
		this.props.newPlayerPostion(newPosition);
		toast.success(`Retreating to Sector ${newPosition[0]}, ${newPosition[1]}`);
		this.exitCombat(false);
	}

	toggleTorpedoes = () => {
		this.setState({torpedoes: !this.state.torpedoes});
	}


	render () {
		const ship = this.props.currentShip;
		const npcShipsInCombat = this.state.npcs;
		const currentTarget = this.state.currentTarget;
		const mapUpdated = this.updateMap(this.props.map);
		const moving = this.state.moving;
		const destination = this.state.destination;
		const position = this.props.playerCombatPosition || [];
		const newDestination = ((destination[0] !== position[0]) || (destination[1] !== position[1]));
		const torpedoes = this.state.torpedoes;

		// console.log('^^^ state npcs', this.state.npcs);

		return (
			<div>
				<div className="combatControlPanelWrapper">
					<div className="combatControlPanel">
						<div className="cpSection">
							{ ship ?
								<div>
									<div>Current Ship: {ship.label} ({ship.type})</div>
								
									<div className="shipDetail">Ship Systems:
										<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsHp})`}</div>
										<div>{`* Hull: ${ship.hullHp}`}</div>
										<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.value} (Range: ${ship.plasmaProjectors.range})`}</div>
										<div>{ship.torpedoes && `* ${ship.torpedoes.value} (Range: ${ship.torpedoes.range})`}</div>
										<div>* Sublight Speed: {ship.sublightSpeed.name}</div>
										<div>* Signature: {ship.signature}</div>
										<div>* Scanner: {ship.scanner}</div>
									</div>
								</div>
							: <div>No ship currently selected</div>
							}
						</div>
					</div>


					<div className="cpSection destination-wrapper">
						<div className="header">Navigation</div>
						<div>
								Set Destination To Selected Sector: 
								{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
								<button ref="destinationBtn" disabled={moving} className="moveLabelInput" onClick={() => this.setDestination()}>Set Destination</button>
						</div>
						{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
						<div>Destination: {destination.length ? `${destination[0]}, ${destination[1]}` : ''}</div>
							<div>Current Sector: {position.length ? position[0] +', ' + position[1] : ''}</div>
							<button ref="martelDriveBtn" disabled={moving || this.state.retreating || !newDestination} onClick={() => this.sublightDrive()}>Engage Sublight Drive</button>
							{/* retreat here */}
							<button disabled={moving || this.state.retreating} onClick={() => this.retreat()}>Retreat</button>
					</div>

					{ship && ship.torpedoes &&
						<div className="cpSection">
							<div className="header">Torpedo Control</div>
							{ship.torpedoAmmo > 0 ?
								<div className='top-pad'>
									<button onClick={() => this.toggleTorpedoes()}>{`${torpedoes ? 'Torpedoes Firing' : 'Fire Torpedoes'}`}</button>
								</div>
							: <div>Out of torpedo ammo</div>}
						</div>
					}
						

				
					{ this.state.npcs.map((s, index) => (
						!s.isDestroyed && 
							<div className="npcCombatPanel" onClick={() => this.targetNpc(s)} key={s.id}>
								<div className={`cpSection ${this.state.currentTarget && ((s.id === this.state.currentTarget.id) && 'currentTarget')}`}>
									<div>{s.factionName} {s.type} {s.id}</div>
								
									<div className="shipDetail">Ship Systems:
										<div>{`* Shields: ${s.shields.name} (${s.shields.shieldsHp})`}</div>
										<div>{`* Hull: ${s.hullHp}`}</div>
										<div>{`* Plasma Projectors: ${s.plasmaProjectors.value} (Range: ${s.plasmaProjectors.range})`}</div>
										{s.torpedoes && <div>{`* Torpedoes: ${s.torpedoes.value} (Range: ${s.torpedoes.range})`}</div>}
										<div>{`* Sublight Drive: ${s.sublightSpeed.name}`}</div>
										<div>{`* Signature: ${s.signature}`}</div>
									</div>
								</div>
							</div>
					))}

				</div>




				<div className="combat mapBox">
				
				{mapUpdated && mapUpdated.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={() => this.clickHandler(m)} > 
						<div className={`sector sectorTop ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
		    			<div className={`sector sectorMiddle ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}>{`${m['x']}, ${m['y']}`}
		    				{m.npcShips.length
			    				? m.npcShips.map(ship =>
			    					<div className={`${ship.value} ${currentTarget && ((currentTarget.id === ship.id) && 'combatCurrentTarget')}`} key={ship.id}></div>
			    				) : <div></div>
		    				}
		    			</div>
		    			<div className={`sector sectorBottom ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
					</div>
	    		))}
				</div>



			</div>
		);
	}
}





const mapStateToProps = state => ({
	sector: state.selectedSector.combatMapSector,
	path: state.path.combatPath,
	currentShip: state.selectedShip,
	playerCombatPosition: state.sectorPosition.combatPosition,
	sectorPosition: state.sectorPosition.position,
	npcShips: state.npcShips,
	npcActiveShips: state.npcActiveShips,
	player: state.playerData,
	dockingAreas: state.dockingAreas,
	map: state.map.combatMap
});

export default connect(mapStateToProps, { getSector, createMap, playerData, getPath, moveShip, newPlayerPostion, updateShip, newPlayerCombatPostion, resetPath })(NewCombatDisplay);