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
import { getDockingAreas } from '../actions/dockingAreas';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

	state = {
		cargoOptions: []
	}

	componentDidMount = () => {
		let cargoOptions = [];
		const dockingArea = this.getDockingArea(this.props.sectorPosition);
		const tradeGoods = dockingArea ? dockingArea.tradeGoods : [];
		tradeGoods && tradeGoods.map(t => {
			cargoOptions.push({value: t.value, label: t.label, amount: 0})
		})
		this.setState({cargoOptions: cargoOptions});
		toast.success(`Docking at ${dockingArea.type} ${dockingArea.id}`);

	}

	getDockingArea(sector) {
		let dockingArea = [];
		this.props.dockingAreas.map(m => {
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
				selectedCargoOption.amount += amount;
				if ( ((selectedCargoOption.amount) > shipCargoAvailable) ) {
					toast.warn('Not enough Ship Cargo Space Available, Adjusting Amount');
					// const lowestAmount = Math.min(shipCargoAvailable, tradeGood.amount);
					selectedCargoOption.amount = shipCargoAvailable;
					priceTotal = (selectedCargoOption.amount * selectedTradegood.price);
				} 
				if (priceTotal > playerCredits) {
					toast.error('Not Enough Credits');
					// adjust to max affordable amount ?
					const newAmount = playerCredits / selectedTradegood.price;
				
					selectedCargoOption.amount = Math.floor(newAmount);
				} 
				if ((selectedCargoOption.amount) >= tradeGood.amount) {
					toast.warn('Sell Amount limited, adjusting total');
					selectedCargoOption.amount = tradeGood.amount;
				} 
				
				
			} else { // Selling to station.   ***** TEST SELLING MORE ******
				// debugger;
				selectedCargoOption.amount += amount;
				if ((selectedCargoOption.amount) > tradeGood.amount) {
					toast.warn('Buy Amount limited, adjusting total');
					selectedCargoOption.amount = tradeGood.amount;
				}
				if (((selectedCargoOption.amount) > matchingCargo.amount)) { 
					toast.warn('You dont have that many, matching to cargo hold amount');
					selectedCargoOption.amount = matchingCargo.amount;
				} 
				 
			}
	 	}

		this.setState({cargoOptions:  cargoOptions});
	
		console.log('CARGO OPTIONS', cargoOptions);
	}

	transAction(t) {
		// debugger;
		let cargoOptions = this.state.cargoOptions;
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

		const dockingAreaInfo = this.getDockingArea(this.props.sectorPosition);
		const dockingAreaId = dockingAreaInfo.id;
		let dockingAreas = this.props.dockingAreas;
		// let cargoCopy = playerShip.cargoHold;
	
		// debugger;
		dockingAreas.map(d => {
			if(d.dockingArea.id === dockingAreaId) {
				// debugger;
				let cargoId = d.dockingArea.tradeGoods.find(c => c.value === cargo.value);
				cargoId.amount = (cargoId.amount - cargo.amount);
				if(cargoId.amount < 0) {
					cargoId.amount = 0;
				}
			}
		})

		this.props.getDockingAreas('adjust', dockingAreas );
		
		



		this.props.selectedShip(playerShip);
		this.props.playerData(false, playerData);
		cargo.amount = 0;
		this.setState({cargoOptions:  cargoOptions});


	}

	getTotal(tradeGood, cargoOptions) {
		let cargoTotal = cargoOptions.find((c) => c.value === tradeGood.value);
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

	addCargoToSellClassname(t, currentShip) {
		let cargoAmount = 0;
		let className = '';
		currentShip.cargoHold.map(c => {
			if (c.value === t.value) {
				cargoAmount = c.amount;
			}
		})

		if (cargoAmount > 0 && t.buyPrice) {
			className = 'sell';
		}

		return className
	}


	render () {
		// console.log('CARGO OPTIONS', this.state.cargoOptions);
		// console.log('CURRENT SHIP', this.props.currentShip);
		
		
		const currentShip = this.props.currentShip;
		const cargoOptions = this.state.cargoOptions;
		const dockingArea = this.getDockingArea(this.props.sectorPosition);
		const tradeGoods = dockingArea ? dockingArea.tradeGoods : [];
		const playerData = this.props.player;
		
		// console.log('DOCKED SECTOR', this.props.sectorPosition);

		console.log('dockingArea', dockingArea);

		return (
			<div className="ControlPanel">
				<div className="header">Docking Control Panel</div>
				{dockingArea ? <div key={dockingArea.id}>{dockingArea.type} {dockingArea.id}</div> : <div></div>}

				<div>Available Cargo Space: {currentShip.cargoMax - currentShip.cargo}</div>
				<div>Credits: {playerData.credits}</div>	

				{tradeGoods && (tradeGoods.length > 0)
    				? tradeGoods.map(t =>

    					<div key={dockingArea.id + t.value} className={`tradeGoodWrapper ${this.addCargoToSellClassname(t, currentShip)}`}>
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
	    							<button onClick={() => {this.transAction(t)}}>Sell</button>{this.getTotal(t, cargoOptions)}
	    						</div> }
	    					{t.sellPrice && 
	    						<div>Add to Cart
	    							<button onClick={() => this.updateCargo(t, 1)}>1</button>
	    							<button onClick={() => this.updateCargo(t, 5)}>5</button>
	    							<button onClick={() => this.updateCargo(t, 10)}>10</button>
	    							<button onClick={() => this.updateCargo(t, 25)}>25</button>
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => this.updateCargo(t, 0)}>Clear</button>
	    							<button onClick={() => {this.transAction(t)}}>Buy</button>{this.getTotal(t, cargoOptions)}
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
  	currentShip: state.selectedShip,
  	map: state.map.gameMap,
  	sectorPosition: state.sectorPosition,
  	player: state.playerData,
  	dockingAreas: state.dockingAreas
});



export default connect(mapStateToProps, {selectedShip, playerData, getDockingAreas})(DockedControlPanel);