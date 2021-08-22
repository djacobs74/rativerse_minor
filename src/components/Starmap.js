import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSector } from '../actions/selectedSector';
// import { npcShipGenerator } from '../actions/npcShipGenerator';
import { getDockingAreas } from '../actions/dockingAreas';

class StarMap extends Component {

	state = {
		npcShipsActive: []
	}

	componentDidMount() {
		// START NPC SHIP SPAWN FUNCTION
		// this.createNpcShips(this.props)
		// console.log('NPC SHIPS', this.props.npcShips);

		// this.moveNpcShips();

	}

	componentDidUpdate = (prevProps, props) => {
		if (!prevProps.map.length && this.props.map.length) {
			this.tradeGoodsInterval(this.props);
		}
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

	clickHandler(m, event) {
		// debugger;
		this.clickedSector = [];
		this.clickedSector.push(m.x, m.y);
		this.getCoords(m, 'game');
	}

	pathSec(m) {
		let pathingSec = '';
		let mapSec = [];
		mapSec.push(m['x'], m['y']);
		const setPath = this.props.path;
		const pathLength = setPath.length;
		let i = 0;
		let position = this.props.sectorPosition || [];
	
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
		} 
		// else {
		// 	debugger;
		// 	if(this.props.sectorStartingPosition[0] === mapSec[0] && this.props.sectorStartingPosition[1] === mapSec[1]) {
		// 		pathingSec = 'currentSector';
		// 	}
		// }
		
		return pathingSec
	}

	updateMap(map) {
		const npcs = this.props.npcActiveShips;
		const newMap = [...map];

		newMap.map(m => { m.npcShips = [] });

		npcs.map(n => {
			let sector = newMap.find( m => (m.x === n.x) && (m.y === n.y) ) 
			sector && sector.npcShips.push(n);
		})

		// console.log('UPDATED MAP', newMap[120]);
		return newMap
	}

	tradeGoodsInterval() {
		this.props.getDockingAreas('start', this.props.map);
		let here = this;

		function goodsAdjust() {
			setInterval(function () {
				if (here.props.dockingAreas.length) {
					// debugger;
					here.props.getDockingAreas('interval', here.props.dockingAreas);
				}
				
			}, 10000)
		}
		goodsAdjust();
	}


	render () {
		const mapData = this.props.map;
		const mapUpdated = this.updateMap(this.props.map);
		// console.log('SHIP LOCATIONS', this.props.npcActiveShips);

		// console.log('DOCKING AREAS', this.props.dockingAreas);

		return (
			<div>
				
				{mapUpdated.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={() => this.clickHandler(m)} > 
						<div className={`sector sectorTop ${m.sectorType[0].value} ${this.pathSec(m)}  ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
		    			<div className={`sector sectorMiddle ${m.sectorType[0].value} ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}>{`${m['x']}, ${m['y']}`}
		    				{m.npcShips.length
			    				? m.npcShips.map(ship =>
			    					<div className={`${ship.value}`} key={ship.id}></div>
			    				) : <div></div>
		    				}
		    				{m.dockingArea.length
			    				? m.dockingArea.map(area =>
			    					<div className={`${area.value}`} key={area.id}></div>
			    				) : <div></div>
		    				}
		    			</div>
		    			<div className={`sector sectorBottom ${m.sectorType[0].value} ${this.pathSec(m)} ${this.active = this.clickedSector[0] === m['x'] && this.clickedSector[1] === m['y'] ? 'active' : ''}`}></div>
					</div>
	    		))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	map: state.map.gameMap,
	sector: state.selectedSector,
	path: state.path,
	sectorPosition: state.sectorPosition.position,
	npcShips: state.npcShips,
	dockingAreas: state.dockingAreas,
	npcActiveShips: state.npcActiveShips
});

export default connect(mapStateToProps, { getSector, getDockingAreas })(StarMap);


