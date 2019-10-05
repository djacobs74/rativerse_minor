import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class StarMap extends Component {



	showMap() {
		// take the map object from createMap and make it usable to show coords
		// const mapData = this.props.map;
		// console.log('MAP', mapData);
		
	    // {mapData.map(m => (
	    // 	<div className="m" key={m.x}>sector:{m.x, m.y}</div>
	    	
	      	
	    // ))}
	  
	}

	render () {
		const mapData = this.props.map;
		return (
			<div>
				<button onClick={() => this.props.createMap(5)}>Create Star Map</button>
				{mapData.map((m, index) => (
					
	    			<div className="m" key={index}>{`sector: ${m['x']}, ${m['y']}`}</div>
					
	    		))}
			</div>
		);
	}



}
	
const mapStateToProps = (state) => {
	return {map: state.map}
}



export default connect(mapStateToProps, { createMap })(StarMap);