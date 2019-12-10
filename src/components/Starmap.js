import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';
import { getSector } from '../actions/selectedSector';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();

	}

	componentDidUpdate() {
		// console.log('StarMap UPDATED', this.props.sector);
		// console.log('clickedSector', this.clickedSector);
	}

	constructor(props){
        super(props);      
        this.getCoords = this.props.getSector;
        this.clickedSector = [];
        this.active = '';
    }

	oddEven(num) {
		if(num % 2 === 0) {
			return 'even'
		} else {
			return 'odd'
		}

	}

	clickHandler(x, y, event) {
		this.clickedSector = [];
		this.clickedSector.push(x, y);
		this.getCoords(x, y);
	}

	pathSec(m) {
		let pathingSec = '';
		let mapSec = [];
		mapSec.push(m['x'], m['y']);
		const setPath = this.props.path;
		const pathLength = setPath.length;
		let i = 0;
	
		if(pathLength > 1){
			for (i = 0; i < pathLength; i++) {
			
			 	if(setPath[i][0] === mapSec[0] && setPath[i][1] === mapSec[1]) {
			 		pathingSec = 'pathingSec';
			 	}
			}
		}

		if(this.props.currentPosition.length) {
			if(this.props.currentPosition[0] === mapSec[0] && this.props.currentPosition[1] === mapSec[1]) {
				pathingSec = 'currentSector';
			}
		} else {
			if(this.props.startingPosition[0] === mapSec[0] && this.props.startingPosition[1] === mapSec[1]) {
				pathingSec = 'currentSector';
			}
		}
		
		return pathingSec
		
		
	}

	// Func for pathing that adds a class if Path matches sector. Remove path when player moves into that sector and add Current class

	render () {
		const mapData = this.props.map;
		// onClick={this.props.getSector} for ON CLICK will trigger reducer
		// onClick={(x, y) => getSector(m['x'], m['y']) }
		return (
			<div>
				
				{mapData.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={ (x, y) => this.clickHandler(m['x'], m['y']) }> 
						<div className={`sector sectorTop ${this.pathSec(m)}  ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
		    			<div className={`sector sectorMiddle ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}>{`${m['x']}, ${m['y']}`}</div>
		    			<div className={`sector sectorBottom ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
					</div>
	    		))}
			</div>
		);
	}



}


	
const mapStateToProps = state => ({
	map: state.map,
	sector: state.selectedSector,
	path: state.path,
  	startingPosition: state.startingPosition,
  	currentPosition: state.currentPosition
});



export default connect(mapStateToProps, { createMap, getSector })(StarMap);


