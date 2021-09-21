import React, { Component } from 'react';
import { STARTER_SHIPS } from './_utils/constants';
import { selectNewShip } from '../actions/selectedShip';
import { connect } from 'react-redux';

class RativerseInfo extends Component {

	// constructor(props){
 //        super(props);      
 //        this.setShip = this.props.selectedShip;

 //    }


 	setSelectedShip = (s) =>  {
 		const newShip = true;
		this.props.selectNewShip(s, null, this.props.playerShipMaxId);
	}


	render () {
		const ship = this.props.currentShip;
		// console.log('SELECTED SHIP IS', ship);
		// console.log('MAX ID', this.props.playerShipMaxId);

		return (
			<div>
				<div className="shipDescriptionContainer">
					{STARTER_SHIPS.map(s => <div className={`starterShipWrapper ${ship && (ship.value === s.value) ? 'selectedStarterShip' : ''}`} key={s.value} onClick={() => this.setSelectedShip(s)}>
						<div className="starterShipLabel">
							<h3>{s.label} ({s.type})</h3>
						</div>
						<div>{s.description}</div>
						
					</div>)}
				</div>
				<div className="factionDescriptionContainer">
					<div className="factionDescriptionHeader">There are five different factions you will encounter in the Rats universe. How they interact with you will depend on your reputation level with each of them. Your reputation will change from the actions you take.</div>
					<div className="factionDescription">
						<h3>United Worlds Commonwealth (UWC)</h3>
						<div>Backed by the company, the UWC is a collection of protectorate worlds in the rim, out at the edge of known space. The UWC is there to help with the settlement of new worlds and to keep the peace, but corruption is widespread.</div>
					</div>

					<div className="factionDescription">
						<h3>Blood Fleet Raiders (BFR)</h3>
						<div>A criminal organization that will do just about anything for a profit. While they have been known to take part in legal activities such as mining and salvaging, they make most of their profits from illegal activities. The BFR will commonly attack weakly defended targets, even taking control of entire planets out on the edge of space, taking prisoners as slaves, introducing and controlling the prostitution and illegal drug markets.</div>
					</div>

					<div className="factionDescription">
						<h3>Coral Nebula Pirates (CNP)</h3>
						<div>The Coral Nebula Pirates are opportunists. While some consider their tactics to be cowardly, they have proven to be effective. Often striking when they have the advantage, they excel at hit and run raids and escaping bad situations when out gunned.</div>
					</div>

					<div className="factionDescription">
						<h3>Orion Brotherhood (OB)</h3>
						<div>Originally a loose confederation of pirates, the Orion Brotherhood was infiltrated and reorganized by the Martel family. The Brotherhood became the instrument of protection for the people who staked their lives and fortunes on the emigrants hope for a life of peace, freedom and justice.</div>
					</div>

					<div className="factionDescription">
						<h3>Third Star Cluster Clans (TSCC)</h3>
						<div>Little is known about this newly discovered civilization beyond human controlled space. What is known is that this is a Clan society, and that while the clans often fight among themselves, they will also unite against a common threat. Although human, they are not descendants of Earth. Their ships use powerful ancient technology. Failure in this society is not tolerated: soldiers that retreat or surrender are often killed by their superiors if they make it back home. It is rumored that they will even ram other ships to make the kill if necessary.</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentShip: state.selectedShip.ship,
	playerShipMaxId: state.selectedShip.playerShipMaxId
});



export default connect(mapStateToProps, { selectNewShip })(RativerseInfo);