import React, { Component } from 'react';
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

  	render() {
		return (
	  		<form onSubmit={this.handleSubmit}>
				<label>
		  			Move To: 
		  			<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
				<div>destination: {this.state.destination}</div>
	  		</form>
		);
  	}
}

const mapStateToProps = (state) => {
  	return {map: state.map}
}



export default connect(mapStateToProps, { createMap })(Move);