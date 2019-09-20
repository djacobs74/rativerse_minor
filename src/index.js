import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import mapReducer from './reducers/mapReducer';

ReactDOM.render(
	<Provider store={createStore(mapReducer)}>
		<App />
	</Provider>,
	document.querySelector('#root')
);