import React from 'react';
import { connect } from 'react-redux';
import { createMap } from '../actions/map';

class Move extends React.Component {
	  	constructor(props) {
		super(props);
		this.state = {value: '', destination: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(event) {
		this.setState({value: event.target.value});
  	}

  	handleSubmit(event) {
  		this.setState({destination: this.state.value});
		console.log(this.state.destination);
		event.preventDefault();
  	}

  	// USE CURRENTLY SELECTED SECTOR, HIT "SET DESTINATION" BUTTON TO SET AS DESTINATION. HIT "STAR DRIVE" BUTTON TO BEGIN MOVEMENT

  	render() {
		return (
	  		<form onSubmit={this.handleSubmit}>
				<label>
		  			Move To Selected Sector: 
		  			<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />
				</label>
				<input className="moveLabelInput" type="submit" value="Submit" />
				<div>destination: {this.state.destination}</div>
	  		</form>
		);
  	}
}

const mapStateToProps = (state) => {
  	return {map: state.map, sector: state.selectedSector}
}



export default connect(mapStateToProps, { createMap })(Move);