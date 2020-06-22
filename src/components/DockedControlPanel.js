import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {

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


	render () {
		
		console.log('CURRENT SHIP', this.props.currentShip);
		
		
		const currentShip = this.props.currentShip;

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