import React, { Component } from 'react';
import Destination from './Destination';
import { selectNewShip, updateShip } from '../actions/selectedShip';
import { playerData } from '../actions/playerData';
import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA, PLAYER_SHIPS } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { toast } from 'react-toastify';
import { getDockingAreas, updateDockingArea } from '../actions/dockingAreas';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

	state = {
		cargoOptions: [],
		stationNav: 'tradeGoods',
		buyShipOption: null
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
							c.priceTotal += priceTotal;
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
						c.priceTotal -= priceTotal;
						if(c.priceTotal < 0 || c.cargo <= 0) {
							c.priceTotal = 0;
						}
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
		
		



		this.props.updateShip(playerShip);
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

	getAverageValue(t, currentShip) {
		let averageprice = 0;
		currentShip.cargoHold.map(c => {
			if ((c.value === t.value) && c.amount > 0) {
				averageprice = c.priceTotal / c.amount;
			}
		})
		return Math.round(averageprice)
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

	setStationNav(nav) {
		this.setState({stationNav: nav});
	}

	setShipOption = (ship) => {
		const currentShipOption = this.state.buyShipOption;
		const { currentShip, player } = this.props;
		const tradeInPrice = currentShip ? currentShip.sellPrice+player.credits : player.credits;

		if(currentShipOption && (ship.value === currentShipOption.value)) {
			this.setState({buyShipOption: null});
			return false
		}
		
		if(tradeInPrice < ship.price) {
			toast.error(`You do not have enough credits to buy a ${ship.label}.`);
			return false
		}
		if(currentShip) {
			if(currentShip.cargo > ship.cargoMax) {
				toast.error(`A ${ship.label} does not have enough cargo space to accomodate your current cargo. Sell some cargo first!`);
				return false
			} 
		}

		this.setState({buyShipOption: ship});
		
	}

	buyNewShip = (ship) => {
		const { currentShip, player, playerShipMaxId } = this.props;
		let shipCost = ship.price;
		let cargo = null;
		if(currentShip) {
			shipCost = shipCost-currentShip.sellPrice;
			cargo = currentShip.cargoHold;
		}
		player.credits = player.credits-shipCost;
		this.props.selectNewShip(ship, cargo, playerShipMaxId);
		this.props.playerData(false, player);
	}

	repairHull = (repairTotal) => {
		const { currentShip, player } = this.props;
		currentShip.hullHp = currentShip.hullMax;
		player.credits = player.credits - repairTotal;
		
		this.props.updateShip(currentShip);
		this.props.playerData(false, player);
		toast.success('Hull repaired');
	}

	buyTorpedoes = (buyTorpedoesTotal) => {
		const { currentShip, player } = this.props;
		currentShip.torpedoAmmo = currentShip.torpedoAmmoMax;
		player.credits = player.credits - buyTorpedoesTotal;

		this.props.updateShip(currentShip);
		this.props.playerData(false, player);
		toast.success('Torpedoes restocked');
	}

	purchaseHanger = () => {
		const { currentShip, player, dockingAreas, sectorPosition} = this.props;
		const dockingArea = this.getDockingArea(sectorPosition);
		
		let dockingAreaToUpdate = dockingAreas.find(x => x.dockingArea.id === dockingArea.id);

		if(player.credits >= 5000) {
			player.credits = player.credits - 5000;
			dockingAreaToUpdate.dockingArea.hangar.space = dockingAreaToUpdate.dockingArea.hangar.space+1;
			this.props.playerData(false, player);
			this.props.updateDockingArea(dockingAreas)
		}
	}

	storeShipInHangar = (currentShip, dockingArea, playerData) => {
		// if ship in hangar already, swap
		let dockingAreas = this.props.dockingAreas;
		let dockingAreaToUpdate = dockingAreas.find(x => x.dockingArea.id === dockingArea.id);
		if(dockingAreaToUpdate.dockingArea.hangar.ships.length) { // ship already in hangar
			this.props.updateShip(dockingAreaToUpdate.dockingArea.hangar.ships[0], this.props.playerShipMaxId)
			dockingAreaToUpdate.dockingArea.hangar.ships = [currentShip];
		} else { // hangar is empty
			dockingAreaToUpdate.dockingArea.hangar.ships.push(currentShip);
			this.props.updateShip(null, this.props.playerShipMaxId)
		}
		// dockingAreaToUpdate.dockingArea.hangar.ships.push(currentShip);

		// if ship in storage, swap 

		this.props.updateDockingArea(dockingAreas);
	}


	render () {
		// console.log('CARGO OPTIONS', this.state.cargoOptions);
		// console.log('CURRENT SHIP', this.props.currentShip);
		
		
		const currentShip = this.props.currentShip;
		const cargoOptions = this.state.cargoOptions;
		const dockingArea = this.getDockingArea(this.props.sectorPosition);
		const tradeGoods = dockingArea ? dockingArea.tradeGoods : [];
		const playerData = this.props.player;
		const showTradeGoodNav = currentShip && this.state.stationNav === 'tradeGoods';

		const repairTotal = currentShip ? (currentShip.hullMax-currentShip.hullHp)*50 : 0;
		const buyTorpedoesTotal = currentShip ? (currentShip.torpedoAmmoMax-currentShip.torpedoAmmo)*25 : 0;
		
		console.log('dockingArea', dockingArea);

		return (
			<div className="ControlPanel">
				<div className="header">Docking Control Panel</div>
				{dockingArea ? <div key={dockingArea.id}>{dockingArea.type} {dockingArea.id}</div> : <div></div>}

				<div>Credits: {playerData.credits}</div>

				<div className='stationNav'>
					<button className={`${this.state.stationNav === 'tradeGoods' && 'active'}`} onClick={() => this.setStationNav('tradeGoods')}>Trade Goods</button>
					<button className={`${this.state.stationNav === 'shipDealer' && 'active'}`} onClick={() => this.setStationNav('shipDealer')}>Ship Dealer</button>
					<button className={`${this.state.stationNav === 'hangar' && 'active'}`} onClick={() => this.setStationNav('hangar')}>Hangar</button>
				</div>

					{showTradeGoodNav &&
						<div>
							<div>Available Cargo Space: {currentShip.cargoMax - currentShip.cargo}</div>
							{tradeGoods && (tradeGoods.length > 0)
									? tradeGoods.map(t =>

										<div key={dockingArea.id + t.value} className={`tradeGoodWrapper ${this.addCargoToSellClassname(t, currentShip)}`}>
											<div>{t.label}</div>
									<div>Total in Cargo Hold: {this.getCargoHoldData(t, currentShip)} {`Average Purchase Price: ${this.getAverageValue(t, currentShip)}`}</div>
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
					}

					{this.state.stationNav === 'shipDealer' &&
						<div>
							{currentShip &&
								<div>Ship trade in value: {`${currentShip.sellPrice}`}</div>
							}
							{ currentShip ? PLAYER_SHIPS.map(ship => 
							ship.value !== currentShip.value &&
								<div key={ship.value} className={`tradeGoodWrapper shipOption ${this.state.buyShipOption && ((ship.value === this.state.buyShipOption.value) && 'active')}`} onClick={() => this.setShipOption(ship)}>
									<div className='dealerShipLabel'>{ship.label}</div>
									<div>Price: {`${ship.price} (${ship.price - currentShip.sellPrice} after trade in)`}</div>
									<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsMax})`}</div>
									<div>* Hull: {ship.hullHp}</div>
									<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} `}</div>
									<div>{ship.torpedoes && `* ${ship.torpedoes.name} `}</div>
									<div>* Sublight Speed: {ship.sublightSpeed.name}</div>
									<div>* Martel Drive: {ship.martelDrive.name}</div>
									<div>* Signature: {ship.signature}</div>
									<div>* Scanner: {ship.scanner}</div>
									<div>* Cargo Space: {ship.cargoMax}</div>
									<div></div>
									<div className='top-pad'>"{ship.description}"</div>
									{this.state.buyShipOption && (this.state.buyShipOption.value === ship.value) &&
										<div>
											{repairTotal > 0 ?
												<div className='top-pad'>Repair current ship hull damage before trading in your ship!</div>
											: <div className='top-pad'>
													<button onClick={() => this.buyNewShip(ship)}>Buy this ship</button>
												</div>
											}
										</div>
									}
								</div>
							) : 
								PLAYER_SHIPS.map(ship => 
									<div key={ship.value} className={`tradeGoodWrapper shipOption ${this.state.buyShipOption && ((ship.value === this.state.buyShipOption.value) && 'active')}`} onClick={() => this.setShipOption(ship)}>
										<div className='dealerShipLabel'>{ship.label}</div>
										<div>Price: {ship.price}</div>
										<div>{ship.shields && `* ${ship.shields.name} (${ship.shields.shieldsMax})`}</div>
										<div>* Hull: {ship.hullHp}</div>
										<div>{ship.plasmaProjectors && `* ${ship.plasmaProjectors.name} `}</div>
										<div>{ship.torpedoes && `* ${ship.torpedoes.name} `}</div>
										<div>* Sublight Speed: {ship.sublightSpeed.name}</div>
										<div>* Martel Drive: {ship.martelDrive.name}</div>
										<div>* Signature: {ship.signature}</div>
										<div>* Scanner: {ship.scanner}</div>
										<div>* Cargo Space: {ship.cargoMax}</div>
										<div></div>
										<div className='top-pad'>"{ship.description}"</div>
										{this.state.buyShipOption && (this.state.buyShipOption.value === ship.value) &&
											<div className='top-pad'>
												<button onClick={() => this.buyNewShip(ship)}>Buy this ship</button>
											</div>
										}
									</div>
								)
							
							}
						</div>
					}

					{this.state.stationNav === 'hangar' &&	
						
						<div> 
							{currentShip ?
								<div>
									<div className='tradeGoodWrapper'>
										<div>{`Current Ship: ${currentShip && currentShip.label} ID: ${currentShip && currentShip.id}`}</div>
										{dockingArea.hangar.space > 0 ?
											<div className='top-pad'>
												<button onClick={() => this.storeShipInHangar(currentShip, dockingArea, playerData)}>{`Leave ${currentShip.label} ID: ${currentShip.id} and store it in this hangar`}</button>
											</div>
										: <div>Purchase Hangar Storage to Keep Your Ship Here</div>}
									</div>
									{currentShip.hullHp < currentShip.hullMax &&
										<div className='tradeGoodWrapper top-pad'>
											<div>{`Hull damaged! ${currentShip.hullHp} out of ${currentShip.hullMax} remaining.`}</div>
											<div>Total cost to repair: {repairTotal}</div>
											{playerData.credits >= repairTotal ?
												<div className='top-pad'>
													<button onClick={() => this.repairHull(repairTotal)}>Repair Hull</button>
												</div>
											: <div>Not enough credits to repair</div>}

										</div>
									}
									{currentShip.torpedoAmmo < currentShip.torpedoAmmoMax && 
										<div className='top-pad'>
											<button onClick={() => this.buyTorpedoes(buyTorpedoesTotal)}>{`Restock Torpedoes for ${buyTorpedoesTotal}`}</button>
										</div>
									}
								</div>
								
								: <div className='tradeGoodWrapper'>
										<div>No Ship Selected</div>
									</div>
								}
								<div className='tradeGoodWrapper'>
									{dockingArea.hangar.space > 0 &&
										<div>
											{dockingArea.hangar.ships.length ?
												<div>{`Ship in Storage: ${dockingArea.hangar.ships[0].label} ID: ${dockingArea.hangar.ships[0].id}`}</div>
											: <div>Ship in Storage: None</div>}
										</div>
											
									}
								
									{((playerData.credits >= 5000) && (dockingArea.hangar.space < 1)) &&
										<div className='top-pad'>
											<button onClick={() => this.purchaseHanger()}>Purchase a hangar storage space for 5000 creadits</button>
										</div>
									}
										
									
								</div>


						</div>
						
					}
		
			</div>

			
		);
	}


}
	


const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	currentShip: state.selectedShip.ship,
  	map: state.map.gameMap,
  	sectorPosition: state.sectorPosition,
  	player: state.playerData,
		dockingAreas: state.dockingAreas,
		playerShipMaxId: state.selectedShip.playerShipMaxId
});



export default connect(mapStateToProps, {selectNewShip, updateShip, playerData, getDockingAreas, updateDockingArea})(DockedControlPanel);