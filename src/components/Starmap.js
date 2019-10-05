import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class StarMap extends Component {

	componentDidMount() {
		this.props.createMap();
	}

	render () {
		const mapData = this.props.map;
		return (
			<div>
				
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