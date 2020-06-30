import React, { Component } from 'react';
import Destination from './Destination';
import { selectedShip } from '../actions/selectedShip';
import { playerData } from '../actions/playerData';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

	state = {
		cargoOptions: []
	}

	componentDidMount = () => {
		let cargoOptions = [];
		const dockingArea = this.getDockingArea(this.props.currentPosition);
		const tradeGoods = dockingArea ? dockingArea[0].tradeGoods : null;
		tradeGoods.map(t => {
			cargoOptions.push({value: t.value, label: t.label, amount: 0})
		})
		this.setState({cargoOptions: cargoOptions});
		toast.success(`Docking at ${dockingArea[0].type} ${dockingArea[0].id}`);

	}

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
		let selectedCargoOption = cargoOptions.find((c) => c.value === tradeGood.value);
		let selectedTradegood = {value: tradeGood.value, amount: amount, price: tradeGood.buyPrice || tradeGood.sellPrice };
		const transactionType = tradeGood.buyPrice ? 'buy' : 'sell';
		const shipCargoTotal = this.getCargoHoldData(tradeGood, this.props.currentShip);
		const shipCargoAvailable = (this.props.currentShip.cargoMax - this.props.currentShip.cargo);
		const playerCredits = this.props.player.credits;
		// debugger;
		let matchingCargo = this.props.currentShip.cargoHold.find( c => (c.value === selectedCargoOption.value))

		// debugger;

		if (amount === 0) {
			selectedCargoOption.amount = 0;
		} else {
			// debugger;
			if (transactionType === 'sell') { // Buying from station
				let priceTotal = ((selectedCargoOption.amount + amount) * selectedTradegood.price);
				console.log('PLAYER CREDITS', playerCredits);
				console.log('PRICE TOTAL', priceTotal);
				// debugger;
				if ( ((selectedCargoOption.amount + amount) > shipCargoAvailable) ) {
					toast.warn('Not enough Ship Cargo Space Available, Adjusting Amount');
					// const lowestAmount = Math.min(shipCargoAvailable, tradeGood.amount);
					selectedCargoOption.amount = shipCargoAvailable;
					priceTotal = (selectedCargoOption.amount * selectedTradegood.price);
				} else if (priceTotal > playerCredits) {
					toast.error('Not Enough Credits');
					console.log('NOT ENOUGH CREDITS');
					selectedCargoOption.amount = 0;
				} else if ((selectedCargoOption.amount + amount) > tradeGood.amount) {
					toast.warn('Sell Amount limited, adjusting total');
					selectedCargoOption.amount = tradeGood.amount;
				} else {
					selectedCargoOption.amount += amount;
				}
				
				
			} else { // Selling to station
				// debugger;
				if (((selectedCargoOption.amount + amount) > matchingCargo.amount)) {
					toast.warn('You dont have that many, matching to cargo hold amount');
					selectedCargoOption.amount = matchingCargo.amount;
				} else if ((selectedCargoOption.amount + amount) > tradeGood.amount) {
					toast.warn('Buy Amount limited, adjusting total');
					selectedCargoOption.amount = tradeGood.amount;
				} else {
					selectedCargoOption.amount += amount;
				}
			}
	 	}

		this.setState({cargoOptions:  cargoOptions});
	
		console.log('CARGO OPTIONS', cargoOptions);
	}

	transAction(t, cargoOptions) {
		// debugger;
		let shipCargo = this.props.currentShip.cargoHold;
		// let shipCargoCount = this.props.currentShip.cargo;
		let playerShip = this.props.currentShip;
		const transactionType = t.buyPrice ? 'buy' : 'sell';
		let cargo = cargoOptions.find((c) => c.value === t.value);

		let playerData = this.props.player;
		const shipCargoSpaceMax = this.props.currentShip.cargoMax;
		const availableSpace = (shipCargoSpaceMax - playerShip.cargo);
		const priceTotal = (cargo.amount * (t.sellPrice || t.buyPrice));
		// debugger;
		if (transactionType === 'sell') { // BUYING CARGO ***************
			// debugger;
			if (availableSpace >= cargo.amount) {
				
				if(playerData.credits >= priceTotal) {
					playerShip.cargoHold.map(c => {
						if (c.value === cargo.value) {
							// debugger;
							c.amount += cargo.amount;
							playerShip.cargo += cargo.amount;
							playerData.credits -= priceTotal;
						} 
					})
				} else {
					toast.error('Not Enough Credits');
					return false
				}
			} else {
				toast.error('Not Enough Cargo Space');
				return false
			}
		} else { // SELLING CARGO **************
			playerShip.cargoHold.map(c => {
				if (c.value === cargo.value) {
					if (c.amount >= cargo.amount) {
						c.amount -= cargo.amount;
						c.cargo -= cargo.amount;
						playerShip.cargo -= cargo.amount;
						playerData.credits += priceTotal;
					}
				}
			})
			// debugger;
		}
		// { value: 'monolith', label: 'Monolith', type: 'Freighter', faction: 'none',  plasmaProjectors: PLASMA_PROJECTORS[0],  torpedoes: null, shields: SHIELDS[0], martelDrive: 2, sublightSpeed: 2, scanner: 2, signature: 6, cargo: 0, cargoHold: [], cargoMax: 40, price: 0, description: 'A small but well rounded frieghter' }
		this.props.selectedShip(playerShip);
		this.props.playerData(false, playerData);
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

	getCargoHoldData(t, currentShip) {
		let cargoAmount = 0;
		currentShip.cargoHold.map(c => {
			if (c.value === t.value) {
				cargoAmount = c.amount;
			}
		})
		return cargoAmount
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
	    					<div>Total in Cargo Hold: {this.getCargoHoldData(t, currentShip)}</div>
	    					<div>{t.buyPrice && `Buying at ${t.buyPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{t.sellPrice && `Selling at ${t.sellPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{`Amount ${t.amount} (max amount: ${t.maxAmount})`}</div>
	    					{t.buyPrice &&
	    						(this.getCargoHoldData(t, currentShip) > 0) &&
	    						<div>Add to Cart
	    							<button onClick={() => this.updateCargo(t, 1)}>1</button>
	    							<button onClick={() => this.updateCargo(t, 5)}>5</button>
	    							<button onClick={() => this.updateCargo(t, 10)}>10</button>
	    							<button onClick={() => this.updateCargo(t, 25)}>25</button>
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => this.updateCargo(t, 0)}>Clear</button>
	    							<button onClick={() => {this.transAction(t, cargoOptions)}}>Sell</button>{this.getTotal(t, cargoOptions)}
	    						</div> }
	    					{t.sellPrice && 
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



export default connect(mapStateToProps, {selectedShip, playerData})(DockedControlPanel);