import React from 'react';
import { connect } from 'react-redux';
import { moveShip } from '../actions/moveShip';
import { prettyCoords } from './_utils/displayUtils';


class Destination extends React.Component {
	  	constructor(props) {
		super(props);
		this.state = {value: '', destination: '', position: [0, 0]};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(event) {
		this.setState({value: event.target.value});
		console.log('HANDLECHANGE', this.state.destination);
  	}

  	handleSubmit(event) {
  		this.setState({destination: this.props.sector});
		console.log('SET DESTINATION', this.props.sector);
		event.preventDefault();
  	}

  	// MARTEL DRIVE STARTS MOVEMENT FUNCTION HERE. IF POSITION != DESTINATION, CALL MOVE FUNCTION AGAIN.



  	render() {
		return (
			<div>
		  		<form onSubmit={this.handleSubmit}>
					<label>
			  			Set Destination To Selected Sector: 
			  			<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />
					</label>
					<input className="moveLabelInput" type="submit" value="Submit" />
					<div>Destination: {prettyCoords(this.state.destination)}</div>
		  		</form>
	  			<button onClick={(position, destination) => moveShip(this.state.position, this.state.destination)}>Engage Martel Drive</button>
	  		</div>
		);
  	}
}

const mapStateToProps = (state) => {
  	return {sector: state.selectedSector}
}



export default connect(mapStateToProps)(Destination);