import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class StarMap extends Component {

	render () {
		return (
			<div>
				<button onClick={() => this.props.createMap()}>Create Star Map</button>
				<div>{this.props.map}</div>
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map}
}



export default connect(mapStateToProps, { createMap })(StarMap);