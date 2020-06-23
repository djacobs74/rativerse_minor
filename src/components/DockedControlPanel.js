import React, { Component } from 'react';
import Destination from './Destination';

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
		let cargo = this.state.cargoOptions.find((c) => c.value === tradeGood.value);
		const cargoDetails = {value: tradeGood.value, amount: amount, price: tradeGood.buyPrice || tradeGood.sellPrice }
		if (!cargo) {
			this.state.cargoOptions.push(cargoDetails);
		} else {
			cargo.amount += amount;

			// debugger;
			this.setState({cargoOptions:  [cargo]});
		}
		// PROBLEM HERE
		console.log('CARGO OPTIONS', this.state.cargoOptions);
	}

	transAction(t, cargoOptions) {
		let shipCargo = this.props.currentShip.cargoHold;
		let shipCargoCount = this.props.currentShip.cargo;
		const transActionType = t.buyPrice ? 'buy' : 'sell';
		debugger;

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

		console.log('DOCKED SECTOR', this.props.currentPosition);

		return (
			<div className="ControlPanel">
				<div>DOCKED</div>
				{dockingArea.length
    				? dockingArea.map(d =>
    					<div key={d.id}>{`Docking ID ${d.id}`}</div>
    				) : <div></div>
				}

				<div>Available Cargo Space: {currentShip.cargoMax - currentShip.cargo}</div>	

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
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => {this.transAction(t, this.state.cargoOptions)}}>Buy</button>{this.getTotal(t, cargoOptions)}
	    						</div> : 
	    						<div>Add to Cart
	    							<button onClick={() => this.updateCargo(t, 1)}>1</button>
	    							<button onClick={() => this.updateCargo(t, 5)}>5</button>
	    							<button onClick={() => this.updateCargo(t, 10)}>10</button>
	    							<button onClick={() => this.updateCargo(t, t.amount)}>All</button>
	    							<button onClick={() => {this.transAction(t, this.state.cargoOptions)}}>Sell</button>{this.getTotal(t, cargoOptions)}
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
  	currentPosition: state.currentPosition
});



export default connect(mapStateToProps)(DockedControlPanel);