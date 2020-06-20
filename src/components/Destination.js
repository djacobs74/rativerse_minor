import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../actions/getPath';
import { getStartingPosition } from '../actions/getStartingPosition';
import { moveShip } from '../actions/moveShip';
import { prettyCoords } from './_utils/displayUtils';
import { getPosition, getDockOption } from './_utils/movement';


class Destination extends React.Component {

	// componentDidMount() {
	// 	this.setPosition(this.props.startingPosition);
	// }
	state = {
		destination: [],
		moving: false
	}

	componentDidUpdate(prevProps, props) {
		// debugger;
		if (prevProps.currentPosition !== this.props.currentPosition) {
			this.moving(true);
		}
	}

	constructor(props) {
		super(props);
		this.state = {value: '', destination: []};
		// this.path = this.props.path;
  	}


	setDestination() {
		if(this.props.sector.length) {
			const position = getPosition(this.props);
			// debugger;
			const destinationCoords = [this.props.sector[0].x, this.props.sector[0].y];
			this.setState({destination: destinationCoords});
			this.props.getPath(position, destinationCoords);
		}
	}

  	martelDrive() {
	  	const position = getPosition(this.props);
	  	const moving = this.state.moving;
	  	const destination = this.state.destination;
	  	
	  	if( (destination[0] !== position[0]) && (destination[1] !== position[1]) ) {
	  		if( (moving === false || moving == null) && destination.length ) {
	  			this.moving(true);
	  			this.props.moveShip(position, this.props.path);
	  		}
	  		
	  	}
	}

	moving(moving) {
		// debugger;
		const position = getPosition(this.props);
		const destination = this.state.destination;
		let shipMoving = false;

		if ( (destination[0] === position[0]) && (destination[1] === position[1]) && (moving === true)) {
			shipMoving = false;
		} else if (moving) {
			shipMoving = true;
		}
		this.setState({moving: shipMoving})
	}


  	render() {
  		const position = this.props.currentPosition.position || [];   		
  		const moving = this.state.moving;
  		const destination = this.state.destination;
  		let dockOption = getDockOption(this.props.currentPosition, this.props.map);
  		console.log('Moving', moving);

		return (
			<div>
				<div>
		  			Set Destination To Selected Sector: 
		  			{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
		  			<button ref="destinationBtn" disabled={moving} className="moveLabelInput" onClick={() => this.setDestination()}>Set Destination</button>
				</div>
				{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
				<div>Destination: {destination.length ? `${destination[0]}, ${destination[1]}` : ''}</div>
		  		<div>Current Sector: {position.length ? position[0] +', ' + position[1] : ''}</div>
	  			<button ref="martelDriveBtn" disabled={moving || this.props.docked} onClick={() => this.martelDrive()}>Engage Martel Drive</button>
	  			<button ref="dockBtn" disabled={moving || !dockOption} onClick = {this.props.dockHandler}>{this.props.docked ? 'un-dock' : 'dock'}</button>
	  		</div>
		);
  	}
}

const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	startingPosition: state.startingPosition,
  	currentPosition: state.currentPosition,
  	map: state.map
});



export default connect(mapStateToProps, { getPath, getStartingPosition, moveShip })(Destination);
