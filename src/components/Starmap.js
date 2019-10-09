import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';
// import { getSector } from './_utils/movement';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();
	}

	oddEven(num) {
		if(num % 2) {
			return 'even'
		} else {
			return 'odd'
		}

		return ''
	}

	// getSector = (x, y) => {
	//   console.log('getsector');
	// };



	render () {
		const mapData = this.props.map;
		return (
			<div>
				
				{mapData.map((m, index) => (
					<div className={`sectorWrapper ${this.oddEven(m['x'])}`} sector={`x: ${m['x']} y: ${m['y']}`} key={index}>
						<div className={`sector sectorTop`}></div>
		    			<div className={`sector sectorMiddle`} key={index}>{`${m['x']}, ${m['y']}`}</div>
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



export default connect(mapStateToProps, { createMap })(StarMap);