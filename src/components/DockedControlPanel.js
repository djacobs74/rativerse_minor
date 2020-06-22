import React, { Component } from 'react';
import Destination from './Destination';

import { prettyCoords } from './_utils/displayUtils';
import { SHIP_DATA } from './_utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { STARTER_SHIPS } from './_utils/constants';
import { connect } from 'react-redux';



class DockedControlPanel extends Component {




	render () {
		console.log('DOCKED SECTOR', this.props.dockingArea);
		console.log('CURRENT SHIP', this.props.currentShip);
		const dockingArea = this.props.dockingArea;
		const tradeGoods = dockingArea ? dockingArea[0].tradeGoods : null;

		return (
			<div className="ControlPanel">
				<div>DOCKED</div>
				{dockingArea.length
    				? dockingArea.map(d =>
    					<div key={d.id}>{`Docking ID ${d.id}`}</div>
    				) : <div></div>
				}	

				{tradeGoods.length
    				? tradeGoods.map(t =>
    					<div key={dockingArea[0].id + t.value} className='tradeGoodWrapper'>
	    					<div>{t.label}</div>
	    					<div>{t.buyPrice && `Buying at ${t.buyPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{t.sellPrice && `Selling at ${t.sellPrice}  (min: ${t.minPrice}  max: ${t.maxPrice})`}</div>
	    					<div>{`Amount ${t.amount}`}</div>
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
  	map: state.map
});



export default connect(mapStateToProps)(DockedControlPanel);