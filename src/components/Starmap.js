import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class StarMap extends Component {

	showMap() {
		// take the map object from createMap and make it usable to show coords
		return (
			<div>
				Show Map
			</div>
		);
	}

	render () {
		return (
			<div>
				<button onClick={() => this.props.createMap(5)}>Create Star Map</button>
				<div>{this.showMap()}</div>
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map}
}



export default connect(mapStateToProps, { createMap })(StarMap);