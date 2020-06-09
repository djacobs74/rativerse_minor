import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';
import { getSector } from '../actions/selectedSector';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();
		// START NPC SHIP SPAWN FUNCTION
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
		let position = this.props.currentPosition.position || [];
	
		if(pathLength > 1){
			for (i = 0; i < pathLength; i++) {
			
			 	if(setPath[i][0] === mapSec[0] && setPath[i][1] === mapSec[1]) {
			 		pathingSec = 'pathingSec';
			 	}
			}
		}

		if(position.length) {
			if(position[0] === mapSec[0] && position[1] === mapSec[1]) {
				pathingSec = 'currentSector';
			}
		} else {
			if(this.props.startingPosition[0] === mapSec[0] && this.props.startingPosition[1] === mapSec[1]) {
				pathingSec = 'currentSector';
			}
		}
		
		return pathingSec
	}

	// createNpcShips(props) {
	// 	function moveDelay () {
	// 		setTimeout(function () {
	// 			if () {
	// 				if() {

	// 				}
	// 				moveDelay();
	// 			}
	// 		}, 5000)
	// 	}
	// 	moveDelay();
	// }

	mapTest(map) {
		// TRY TO ADD TO mapData with mock ship info
		const npcs = [{value: 'avenger', id: 1, x: 1, y: 1}, {value: 'avenger', id: 2, x: 0, y: 1}];

		let result = map.reduce(function(r, e) {
		  let f = npcs.find(el => (e.x == el.x) && (e.y == el.y))
		  r.push(f ? f : e)
		  return r;
		}, [])

		console.log('RESULT', result)
		return result
	}

	// TODO: ships can be multiple, change sectorWrapper Ships attribute to a function that returns a string or something

	render () {
		const mapData = this.props.map;
		const mapUpdated = this.mapTest(this.props.map);
		return (
			<div>
				
				{mapUpdated.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={(x, y) => this.clickHandler(m['x'], m['y'])} ships={`id: ${m['id']} type: ${m['value']}`}> 
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


