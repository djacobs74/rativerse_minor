import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../actions/getPath';
import { getStartingPosition } from '../actions/getStartingPosition';
import { prettyCoords } from './_utils/displayUtils';


class Destination extends React.Component {

	// componentDidMount() {
	// 	let startPos = [0, 0];
	// 	this.props.getStartingPosition(startPos);
	// }

	constructor(props) {
		super(props);
		this.state = {value: '', destination: ''};
		// this.path = this.props.path;
  	}

  	setDestination() {
  		this.setState({destination: this.props.sector});
  		// getPath(this.state.position, this.props.sector);
  		this.props.getPath(this.props.position, this.props.sector);

  		// getPath(this.state.position, this.props.sector);
  		// event.preventDefault();
  	}


  	render() {
  		const pos = this.props.position;
  		console.log('NEW POSITION = ', pos)
  		const path = this.props.path;
  		console.log('NEW PATH = ', path)
		return (
			<div>
				<div>
		  			Set Destination To Selected Sector: 
		  			{/*<input className="moveLabelInput" type="text" value={this.props.sector} onChange={this.handleChange} />*/}
		  			<button className="moveLabelInput" onClick={() => this.setDestination()}>Set Destination</button>
				</div>
				{/*<input className="moveLabelInput" type="submit" value="Set Destination" onChange={this.handleChange}/>*/}
				<div>Destination: {prettyCoords(this.state.destination)}</div>
		  		
	  			{/*<button onClick={(position, destination) => getPath(this.state.position, this.state.destination)}>Engage Martel Drive</button>*/}
	  		</div>
		);
  	}
}

const mapStateToProps = state => ({
  	sector: state.selectedSector,
  	path: state.path,
  	position: state.position
});



export default connect(mapStateToProps, { getPath, getStartingPosition })(Destination);
