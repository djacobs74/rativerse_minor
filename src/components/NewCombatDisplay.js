import React, { Component } from 'react';
import { adjustStandings, setNpcStartingLocation, moveNpcShips, playerFire } from './_utils/combatUtils';
import { getSector } from '../actions/selectedSector';
import { toast } from 'react-toastify';
import { getPath } from '../actions/getPath';
import { moveShip } from '../actions/moveShip';
import { playerData } from '../actions/playerData';
import { createMap } from '../actions/map';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import _ from 'lodash';


class NewCombatDisplay extends Component {

	state = {
		currentTarget: null,
		npcs: [],
		rangeSetting: 'away',
		plasmaProjectors: false,
		torpedoes: false,
		fire: false,
		destination: [],
		moving: false
	}

	constructor(props){
		super(props);
		// this.getCoords = this.props.getSector;     
		this.clickedSector = [];
	}	

	componentDidMount = () => {
		this.props.npcActiveShips.map(s => {
			if(s.inCombat) {
				let npcsArray = this.state.npcs;
				setNpcStartingLocation(s);
				npcsArray.push(s);
			}
		})

		const mapSize = [0, 1, 2, 3, 4, 5];
		this.props.createMap(mapSize, 'combat');
		toast.error('ENTERING COMBAT !!');

		this.intervalNpcMpvementId  = setInterval(this.startNpcMovement, 1000);
		// this.intervalPlayerFireId  = setInterval(this.startPlayerFire, 1000);
	}

	componentDidUpdate = (prevProps, prevState) => {

		if(!this.state.npcs.length) {
			// debugger;
			this.props.player.inCombat = false;
			this.props.playerData(false, this.props.player);
		}

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

		if(prevProps.sectorPosition !== this.props.sectorPosition) {
			this.moving(true);
		}

		if((!prevState.currentTarget && this.state.currentTarget) || (prevState.currentTarget !== this.state.currentTarget)) {
			clearInterval(this.intervalPlayerFireId);
			this.intervalPlayerFireId  = setInterval(this.startPlayerFire, 1000);
		}
	}

	setDestination() {
		if(this.props.sector.length) {
			const position = this.props.sectorPosition;
			// debugger;
			const destinationCoords = [this.props.sector[0].x, this.props.sector[0].y];
			this.setState({destination: destinationCoords});
			this.props.getPath(position, destinationCoords, null, 'combat');
			toast.success(`Destination set to ${destinationCoords}`, 'success');
		}
	}

	sublightDrive() {
		const position = this.props.sectorPosition;
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
		const position = this.props.sectorPosition;
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
		let position = this.props.sectorPosition || [];
	
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
		const playerPosition = this.props.sectorPosition;
		console.log('!!!!!  startNpcMovement');

		const updatedNpcs = moveNpcShips(npcs, playerPosition);
		this.setState({npcs: updatedNpcs});
	}

	startPlayerFire = () => {
		const currentTarget = this.state.currentTarget;
		const playerShip = this.props.currentShip;
		const npcs = this.state.npcs;
		let npcsArray = [...npcs];
		if(currentTarget) {
			const {npcDestroyed, updatedNpc, toastData} = playerFire(currentTarget, playerShip);

			let npcToUpdate = npcsArray.find(n => n.id === updatedNpc.id);
			npcToUpdate = updatedNpc;
			toastData && this.toastMessage(toastData.type, toastData.msg);
			this.setState({npcs: npcsArray});
			if(npcDestroyed) {
				this.setState({currentTarget: null});
				clearInterval(this.intervalPlayerFireId);
			}
		}
	}


	render () {
		const ship = this.props.currentShip;
		const npcShipsInCombat = this.state.npcs;
		const currentTarget = this.state.currentTarget;
		const mapUpdated = this.updateMap(this.props.map);
		const moving = this.state.moving;
		const destination = this.state.destination;
		const position = this.props.sectorPosition || [];
		const newDestination = ((destination[0] !== position[0]) || (destination[1] !== position[1]));

		console.log('^^^ state npcs', this.state.npcs);

		return (
			<div>
				<div className="combatControlPanelWrapper">
					<div className="combatControlPanel">
						<div className="cpSection">
							<div>Current Ship: {ship.label} ({ship.type})</div>
						
							<div className="shipDetail">Ship Systems:
								<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsHp})`}</div>
								<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} (Range: ${ship.plasmaProjectors.range})`}</div>
								<div>{ship.torpedoes && `* ${ship.torpedoes.name} (Range: ${ship.torpedoes.range})`}</div>
								<div>* Sublight Speed: {ship.sublightSpeed.name}</div>
								<div>* Signature: {ship.signature}</div>
								<div>* Scanner: {ship.scanner}</div>
						
							</div>
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
							<button ref="martelDriveBtn" disabled={moving || this.props.player.docked || !newDestination} onClick={() => this.sublightDrive()}>Engage Sublight Drive</button>
					</div>

				
					{ this.state.npcs.map((s, index) => (
						!s.isDestroyed && 
							<div className="npcCombatPanel" onClick={() => this.targetNpc(s)} key={s.id}>
								<div className={`cpSection ${this.state.currentTarget && ((s.id === this.state.currentTarget.id) && 'currentTarget')}`}>
									<div>{s.factionName} {s.type} {s.id}</div>
								
									<div className="shipDetail">Ship Systems:
										<div>{`* Shields: ${s.shields.name} (${s.shields.shieldsHp})`}</div>
										<div>{`* Hull: ${s.hullHp}`}</div>
										<div>{`* Plasma Projectors: ${s.plasmaProjectors.value} (Range: ${s.plasmaProjectors.range})`}</div>
										{s.toredoes && <div>{`* Torpedoes: ${s.torpedoes.value} (Range: ${s.torpedoes.range})`}</div>}
										<div>{`* Sublight Drive: ${s.sublightSpeed.name}`}</div>
										<div>{`* Signature: ${s.signature}`}</div>
										<div>{s.inRangeMsg && `* ${s.inRangeMsg}`}</div>
									</div>
								</div>
							</div>
					))}

				</div>




				<div className="mapBox">
				
				{mapUpdated && mapUpdated.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={() => this.clickHandler(m)} > 
						<div className={`sector sectorTop ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
		    			<div className={`sector sectorMiddle ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}>{`${m['x']}, ${m['y']}`}
		    				{m.npcShips.length
			    				? m.npcShips.map(ship =>
			    					<div className={`${ship.value}`} key={ship.id}></div>
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
	sectorPosition: state.sectorPosition.combatPosition,
	npcShips: state.npcShips,
	npcActiveShips: state.npcActiveShips,
	player: state.playerData,
	map: state.map.combatMap
});

export default connect(mapStateToProps, { getSector, createMap, playerData, getPath, moveShip })(NewCombatDisplay);