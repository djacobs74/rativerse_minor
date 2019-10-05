import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class StarMap extends Component {

	render () {
		const mapData = this.props.map;
		return (
			<div>
				<button onClick={() => this.props.createMap(5)}>Create Star Map</button>
				{mapData.map((m, index) => (
					
	    			<div className={`x-${m['x']} y-${m['y']} sector`} key={index}>{`sector: ${m['x']}, ${m['y']}`}</div>
					
	    		))}
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map}
}



export default connect(mapStateToProps, { createMap })(StarMap);