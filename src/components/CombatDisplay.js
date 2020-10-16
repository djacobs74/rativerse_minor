import React, { Component } from 'react';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
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






	render () {
		const ship = this.props.currentShip;
		const npcShipsInCombat = this.state.npcs;
		console.log('/// combat npcs', npcShipsInCombat);

		return (
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

				{/* map NPC ships here */}
				{ npcShipsInCombat.map((s, index) => (
					<div className="npcCombatPanel">
						<div className="cpSection">
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



export default connect(mapStateToProps)(CombatDisplay);