import React, { Component } from 'react';
// import { prettyCoords } from './_utils/displayUtils';
// import { SHIP_DATA } from './_utils/constants';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import { STARTER_SHIPS } from './_utils/constants';
import { getStartingRange, setRangeToTarget, checkRange } from './_utils/combatUtils';
import { toast } from 'react-toastify';
import { playerData } from '../actions/playerData';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';



class CombatDisplay extends Component {

	state = {
		currentTarget: null,
		npcs: [],
		rangeSetting: 'away'
	}

	componentDidMount = () => {
		const rangeData = checkRange(this.state.npcs, this.props.currentShip, this.state.rangeSetting);
		this.toastMessage(rangeData.toastData.type, rangeData.toastData.msg);
		console.log('&&&& range data', rangeData);
	}

	componentDidUpdate = (prevProps, prevState) => {
		// debugger;
		if((prevState.rangeSetting !== this.state.rangeSetting) || (prevState.npcs !== this.state.npcs)) {
			const rangeData = checkRange(this.state.npcs, this.props.currentShip, this.state.rangeSetting);

			// debugger;
			this.toastMessage(rangeData.toastData.type, rangeData.toastData.msg);

			console.log('&&&& range data', rangeData);
		}
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
		// let npcsArray = this.state.npcs;
		// const currentTarget = npcsArray.find(npc => npc.id ===ship.id);
		// if(!currentTarget) {
		// 	npcsArray.push(ship);
		// }
		this.setState({currentTarget: ship});
		// this.startRangeInterval('close');
	}

	addNpcToNpcsArray = (ship) => {
		let npcsArray = this.state.npcs;
		const currentTarget = npcsArray.find(npc => npc.id === ship.id);
		if(!currentTarget) {
			// const startingRange = getStartingRange();
			// ship.range = startingRange;
			npcsArray.push(ship);
		}
	}

	toggleRange = (direction) => {
		document.getElementById('away').classList.remove("active");
		// document.getElementById('maintain').classList.remove("active");
		document.getElementById('close').classList.remove("active");

		document.getElementById(direction).classList.add("active");

		this.setState({rangeSetting: direction});


		// const npcsRange = checkRange(this.state.npcs, this.props.currentShip, direction);

	}

	// startRangeInterval = (direction) => {
	// 	const here = this;

	// 	function rangeDelay () {
	// 		setInterval(function () {
	// 			const targetShip = here.props.npcActiveShips.find(s => s.id === here.state.currentTarget.id);
	// 			const playerShip = here.props.currentShip;
			
	// 			const rangeData = setRangeToTarget(targetShip, playerShip, direction);
	// 			console.log('&&&& range data', rangeData);
				
	// 		}, 5000)
	// 	}
	// 	rangeDelay();
	// }


	

	// toast.success('Martel Drive Engaged');

	render () {
		const ship = this.props.currentShip;
		const npcShipsInCombat = this.state.npcs;
		const currentTarget = this.state.currentTarget;
		console.log('/// this.state.npcs', npcShipsInCombat);

		return (
			<div>
				<div className="combatControlPanelWrapper">
					<div className="combatControlPanel">
						<div className="cpSection">
							<div>Current Ship: {ship.label} ({ship.type})</div>
						
							<div className="shipDetail">Ship Systems:
								<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsHp})`}</div>
								<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} (range: ${ship.plasmaProjectors.range})`}</div>
								<div>{ship.torpedoes && `* ${ship.torpedoes.name} `}</div>
								<div>* Sublight Speed: {ship.sublightSpeed}</div>
								<div>* Signature: {ship.signature}</div>
								<div>* Scanner: {ship.scanner}</div>
						
							</div>
						</div>
					</div>

				
					{ this.props.npcActiveShips.map((s, index) => (
						s.inCombat && this.addNpcToNpcsArray(s),
						s.inCombat && 
							<div className="npcCombatPanel" onClick={() => this.targetNpc(s)} key={s.id}>
								<div className={`cpSection ${this.state.currentTarget && ((s.id === this.state.currentTarget.id) && 'currentTarget')}`}>
									<div>{s.factionName} {s.type} {s.id}</div>
								
									<div className="shipDetail">Ship Systems:
										<div>{`* Shields: ${s.shields.name} (${s.shields.shieldsHp})`}</div>
										<div>{`* Plasma Projectors: ${s.plasmaProjectors.value}`}</div>
										{s.torpedoes && <div>{`* Torpedoes: ${s.torpedoes.value}`}</div>}
										<div>{`* Sublight Speed: ${s.sublightSpeed}`}</div>
										<div>{`* Signature: ${s.signature}`}</div>
										<div>{s.inRange && `* ${s.inRange}`}</div>
									</div>
								</div>
							</div>
					))}

				</div>

				 
					<div className="playerControlWrapper">
						{ currentTarget ?
							<div>
								<div id="rangeWrapper">
									<h3>Range Control</h3>
									<div><button id="away" className="active" onClick={() => this.toggleRange("away")}>Move Outside of Weapons Range</button></div>
									<div><button id="close" onClick={() => this.toggleRange("close")}>Move Inside Weapons Range</button></div>
								</div>

								<div>
									<h3>Fire Control</h3>
									<div><button>Fire Plasma Projectors</button></div>
									<div><button>Fire Torpedoes</button></div>
								</div>
							</div>
						: <h3>Select a Target</h3>}
					</div>
				
			</div>
		);
	}



}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	currentShip: state.selectedShip,
  	currentPosition: state.currentPosition,
  	npcShips: state.npcShips,
  	npcActiveShips: state.npcActiveShips,
  	player: state.playerData
});



export default connect(mapStateToProps, {playerData})(CombatDisplay);