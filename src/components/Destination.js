import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../actions/getPath';
import { getStartingPosition } from '../actions/getStartingPosition';
import { moveShip } from '../actions/moveShip';
import { prettyCoords } from './_utils/displayUtils';
import { getPosition } from './_utils/movement';


class Destination extends React.Component {

	// componentDidMount() {
	// 	this.setPosition(this.props.startingPosition);
	// }
	state = {
		destination: []
	}

	constructor(props) {
		super(props);
		this.state = {value: '', destination: ''};
		// this.path = this.props.path;
  	}


	setDestination() {
		if(this.props.sector.length) {
			const position = getPosition(this.props);

			this.setState({destination: this.props.sector});
			this.props.getPath(position, this.props.sector);
		}
	}

  	martelDrive() {
	  	const position = getPosition(this.props);

	  	if(this.state.destination.length) {
	  		const destination = this.state.destination;
	  		if ((destination[0] !== position[0]) && (destination[1] !== position[1])) {
	  			this.refs.martelDriveBtn.setAttribute("disabled", "disabled");
	  		}
	  		
	  	}
	  	
	    console.log('STARTING POSITION', position);
	    this.props.moveShip(position, this.props.path);
	}


  	render() {
  		const position = this.props.currentPosition.position || []; 
  		const moving = this.props.currentPosition.moving || false;
  	
  		// debugger;
		return (
			<div>
				<div>
		  			Set Destination To Selected Sector: 
		  			{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
		  			<button className="moveLabelInput" onClick={() => this.setDestination()}>Set Destination</button>
				</div>
				{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
				<div>Destination: {prettyCoords(this.state.destination)}</div>
		  		<div>Current Sector: {position.length ? position[0] +', ' + position[1] : ''}</div>
	  			<button ref="martelDriveBtn" disabled={moving} onClick={() => this.martelDrive()}>Engage Martel Drive</button>
	  		</div>
		);
  	}
}

const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	startingPosition: state.startingPosition,
  	currentPosition: state.currentPosition
});



export default connect(mapStateToProps, { getPath, getStartingPosition, moveShip })(Destination);
