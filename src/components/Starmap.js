import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';
import { getSector } from '../actions/selectedSector';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();
	}

	constructor(props){
        super(props);
        //does whatever stuff        
        this.getCoords = this.props.getSector;

    }

	oddEven(num) {
		if(num % 2) {
			return 'even'
		} else {
			return 'odd'
		}

	}



	// getCoords = (x, y) => {
	// 	console.log('Clicked!');
	// 	getSector(x, y);
	// };



	render () {
		const mapData = this.props.map;
		// onClick={this.props.getSector} for ON CLICK will trigger reducer
		// onClick={(x, y) => getSector(m['x'], m['y']) }
		return (
			<div>
				
				{mapData.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index} onClick={ (x, y) => this.getCoords(m['x'], m['y']) }> 
						<div className={`sector sectorTop`}></div>
		    			<div className={`sector sectorMiddle`}>{`${m['x']}, ${m['y']}`}</div>
		    			<div className={`sector sectorBottom`}></div>
					</div>
	    		))}
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map}
}



export default connect(mapStateToProps, { createMap, getSector })(StarMap);


