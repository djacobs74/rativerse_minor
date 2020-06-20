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
	  		this.moving(true);
	  	}
	    // console.log('STARTING POSITION', position);
	    this.props.moveShip(position, this.props.path);
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
  		console.log('MOVING', moving);
  		let dockOption = getDockOption(this.props.currentPosition, this.props.map);

		return (
			<div>
				<div>
		  			Set Destination To Selected Sector: 
		  			{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
		  			<button ref="destinationBtn" disabled={moving} className="moveLabelInput" onClick={() => this.setDestination()}>Set Destination</button>
				</div>
				{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
				<div>Destination: {prettyCoords(this.state.destination)}</div>
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
