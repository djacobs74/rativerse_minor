import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../actions/getPath';
import { prettyCoords } from './_utils/displayUtils';


class Destination extends React.Component {
	  	constructor(props) {
		super(props);
		this.state = {value: '', destination: '', position: [0, 0]};

		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
  	}

  // 	handleChange(event) {
		// this.setState({value: event.target.value});
		// console.log('HANDLECHANGE', this.state.destination);
		
  // 	}

  // 	handleSubmit(event) {
  // 		this.setState({destination: this.props.sector});
		// console.log('SET DESTINATION', this.props.sector);
		// event.preventDefault();
  // 	}

  	setDestination(event) {
  		this.setState({destination: this.props.sector});
  		getPath(this.state.position, this.props.sector);
  		event.preventDefault();
  	}

  	// MARTEL DRIVE STARTS MOVEMENT FUNCTION HERE. IF POSITION != DESTINATION, CALL MOVE FUNCTION AGAIN.



  	render() {
		return (
			<div>
				<div>
		  			Set Destination To Selected Sector: 
		  			{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
		  			<button className="moveLabelInput" onClick={(event) => this.setDestination(event)}>Set Destination</button>
				</div>
				{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
				<div>Destination: {prettyCoords(this.state.destination)}</div>
		  		
	  			{/*<button onClick={(position, destination) => getPath(this.state.position, this.state.destination)}>Engage Martel Drive</button>*/}
	  		</div>
		);
  	}
}

const mapStateToProps = (state) => {
  	return {sector: state.selectedSector}
}



export default connect(mapStateToProps)(Destination);