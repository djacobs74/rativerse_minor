import React from 'react';
import Starmap from './Starmap';


class App extends React.Component {

	render() {
		return (
			<div className="">
				Welcome to the Rativerse!
				<div className="hud">
					control panel
				</div>
		        <div className="mapBox">  	
			    	<Starmap />
		        </div>

	
			</div>
	
		);
	}
}

export default App;