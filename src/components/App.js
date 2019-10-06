import React from 'react';
import Starmap from './Starmap';
import ControlPanel from './ControlPanel';


class App extends React.Component {

	render() {
		return (
			<div className="">
				Welcome to the Rativerse!
				<div className="hud">
					<ControlPanel />
				</div>
		        <div className="mapBox">  	
			    	<Starmap />
		        </div>

	
			</div>
	
		);
	}
}

export default App;