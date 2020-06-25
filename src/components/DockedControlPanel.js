import React, { Component } from 'react';
import Destination from './Destination';
import { selectedShip } from '../actions/selectedShip';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

	state = {
		cargoOptions: []
	}

	// componentDidMount = () => {
	// 	this.setState({cargoOptions: })
	// }

	getDockingArea(sector) {
		let dockingArea = [];
		this.props.map.map(m => {
			if ((m.x === sector.position[0]) && (m.y === sector.position[1])) {
				dockingArea = m.dockingArea;
			}
		})
		// debugger;
		return dockingArea
	}

	updateCargo(tradeGood, amount) {
		let cargoOptions = this.state.cargoOptions;
		let cargo = this.state.cargoOptions.find((c) => c.value === tradeGood.value);
		const cargoDetails = {value: tradeGood.value, amount: amount, price: tradeGood.buyPrice || tradeGood.sellPrice }
		if (!cargo) {
			cargoOptions.push(cargoDetails);
		} else {
			if (amount === 0) {
				// debugger;
				cargo.amount = 0;
			} else {
				// debugger;
				if (cargo.amount + amount >= tradeGood.amount) {
					// debugger;
					cargo.amount = tradeGood.amount
				} else {
					cargo.amount += amount;
				}
				// debugger;
				
			}
			
			// debugger;
		}

		this.setState({cargoOptions:  cargoOptions});
		// PROBLEM HERE
		console.log('CARGO OPTIONS', this.state.cargoOptions);
	}

	transAction(t, cargoOptions) {
		let shipCargo = this.props.currentShip.cargoHold;
		// let shipCargoCount = this.props.currentShip.cargo;
		let playerShip = this.props.currentShip;
		const transactionType = t.buyPrice ? 'buy' : 'sell';
		let cargo = cargoOptions.find((c) => c.value === t.value);

		const playerCredits = this.props.player.credits;
		const shipCargoSpaceMax = this.props.currentShip.cargoMax;
		const availableSpace = (shipCargoSpaceMax - playerShip.cargo);
		// debugger;
		if (transactionType === 'sell') { // BUYING CARGO
			if (availableSpace >= cargo.amount) {
				const priceTotal = (cargo.amount * cargo.price);
				if(playerCredits >= priceTotal) {
					playerShip.cargoHold.map(c => {
						if (c.value === cargo.value) {
							// debugger;
							c.amount += cargo.amount;
						} 
					})
					playerShip.cargo += cargo.amount;
					// adjust player credits 
				}
			}
		} else { // SELLING CARGO
			// see if cargo type is in shipCargo
			playerShip.cargoHold.map(c => {
				if (c.value === cargo.value) {
					if (c.amount >= cargo.amount) {
						c.amount -= cargo.amount;
						c.cargo -= cargo.amount;
						// adjust player credits
					}
				}
			})
			// debugger;
		}
		// { value: 'monolith', label: 'Monolith', type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 2, scanner: 2, signature: 6, cargo: 0, cargoHold: [], cargoMax: 40, price: 0, description: 'A small but well rounded frieghter' }
		this.props.selectedShip(playerShip);
		cargo.amount = 0;
		this.setState({cargoOptions:  cargoOptions});
		// check ship cargo capacity with cargo volume
		// add / subtract cargo with ship cargohold
		// adjust player $$
		// debugger;

	}

	getTotal(tradeGood, cargoOptions) {
		let cargoTotal = cargoOptions.find((c) => c.value === tradeGood.value);
		console.log('CARGO TOTAL', cargoTotal);
		cargoTotal = cargoTotal ? cargoTotal.amount : null;
		return cargoTotal
	}


	render () {
		// console.log('CARGO OPTIONS', this.state.cargoOptions);
		console.log('CURRENT SHIP', this.props.currentShip);
		
		
		const currentShip = this.props.currentShip;
		const cargoOptions = this.state.cargoOptions;
		const dockingArea = this.getDockingArea(this.props.currentPosition);
		const tradeGoods = dockingArea ? dockingArea[0].tradeGoods : null;
		const playerData = this.props.player;
		
		console.log('DOCKED SECTOR', this.props.currentPosition);

		return (
			<div className="ControlPanel">
				<div className="header">Docking Control Panel</div>
				{dockingArea.length
    				? dockingArea.map(d =>
    					<div key={d.id}>{d.type} {d.id}</div>
    				) : <div></div>
				}

				<div>Available Cargo Space: {currentShip.cargoMax - currentShip.cargo}</div>
				<div>Credits: {playerData.credits}</div>	

				{tradeGoods.length
    				? tradeGoods.map(t =>

    					<div key={dockingArea[0].id + t.value} className='tradeGoodWrapper'>
	    					<div>{t.label}</div>
	    					<div>{t.buyPrice && `Buying at ${t.buyPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{t.sellPrice && `Selling at ${t.sellPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{`Amount ${t.amount} (max amount: ${t.maxAmount})`}</div>
	    					{t.buyPrice ? 
	    						<div>Add to Cart
	    							<button onClick={() => this.updateCargo(t, 1)}>1</button>
	    							<button onClick={() => this.updateCargo(t, 5)}>5</button>
	    							<button onClick={() => this.updateCargo(t, 10)}>10</button>
	    							<button onClick={() => this.updateCargo(t, 25)}>25</button>
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => this.updateCargo(t, 0)}>Clear</button>
	    							<button onClick={() => {this.transAction(t, cargoOptions)}}>Sell</button>{this.getTotal(t, cargoOptions)}
	    						</div> : 
	    						<div>Add to Cart
	    							<button onClick={() => this.updateCargo(t, 1)}>1</button>
	    							<button onClick={() => this.updateCargo(t, 5)}>5</button>
	    							<button onClick={() => this.updateCargo(t, 10)}>10</button>
	    							<button onClick={() => this.updateCargo(t, 25)}>25</button>
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => this.updateCargo(t, 0)}>Clear</button>
	    							<button onClick={() => {this.transAction(t, cargoOptions)}}>Buy</button>{this.getTotal(t, cargoOptions)}
	    						</div>
	    					} 
	    				</div>
    				) : <div></div>
				}


		
			</div>
		);
	}


}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	currentShip: state.selectedShip,
  	map: state.map,
  	currentPosition: state.currentPosition,
  	player: state.playerData
});



export default connect(mapStateToProps, {selectedShip})(DockedControlPanel);