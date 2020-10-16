import React, { Component } from 'react';
// import { prettyCoords } from './_utils/displayUtils';
// import { SHIP_DATA } from './_utils/constants';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import { STARTER_SHIPS } from './_utils/constants';

import { toast } from 'react-toastify';
import { playerData } from '../actions/playerData';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';



class CombatDisplay extends Component {

	state = {
		currentTarget: null,
		npcs: []
	}

	componentDidMount = () => {
		// debugger;
		this.props.npcActiveShips.map(s => {
			s.inCombat && this.state.npcs.push(s);
		})
	}

	targetNpc = (ship) => {
		let npcsArray = this.state.npcs;
		const currentTarget = npcsArray.find(npc => npc.id ===ship.id);
		if(!currentTarget) {
			npcsArray.push(ship);
		}
		this.setState({currentTarget: ship});
	}


	// toast.success('Martel Drive Engaged');

	render () {
		const ship = this.props.currentShip;
		const npcShipsInCombat = this.state.npcs;
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
									</div>
								</div>
							</div>
					))}

				</div>

				<div className="playerControlWrapper">
					<div><button>some button</button></div>
					<div><button>some button</button></div>
					<div><button>some button</button></div>
					<div><button>some button</button></div>
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