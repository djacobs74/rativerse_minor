import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';
import { getSector } from '../actions/selectedSector';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();
	}

	componentDidUpdate() {
		// activeSector();
		console.log('StarMap UPDATED', this.props.sector);
		console.log('clickedSector', this.clickedSector);

		// this.matchSectors(this.props.sector, this.clickedSector);
		
	}

	constructor(props){
        super(props);
        //does whatever stuff        
        this.getCoords = this.props.getSector;
        this.clickedSector = [];
        this.active = '';
    }

	oddEven(num) {
		if(num % 2) {
			return 'even'
		} else {
			return 'odd'
		}

	}

	// matchSectors(one, two) {
	// 	// REMOVE ALL ACTIVE CLASS FIRST
	// 	if(one[0] === two[0] && one[1] === two[1]) {
	// 		console.log('WE HAVE A MATCH');
	// 		this.active = 'active';
	// 	} else {
	// 		console.log('DIFF SECTORS SELECTED');
	// 	}
	// }



	clickHandler(x, y, event) {
		this.clickedSector = [];
		this.clickedSector.push(x, y);
		// console.log('clickedSector', this.clickedSector);
		this.getCoords(x, y);
		
	}

	render () {
		const mapData = this.props.map;
		

		// onClick={this.props.getSector} for ON CLICK will trigger reducer
		// onClick={(x, y) => getSector(m['x'], m['y']) }
		return (
			<div>
				
				{mapData.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={ (x, y) => this.clickHandler(m['x'], m['y']) }> 
						<div className={`sector sectorTop ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
		    			<div className={`sector sectorMiddle ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}>{`${m['x']}, ${m['y']}`}</div>
		    			<div className={`sector sectorBottom ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
					</div>
	    		))}
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map, sector: state.selectedSector}
}



export default connect(mapStateToProps, { createMap, getSector })(StarMap);


