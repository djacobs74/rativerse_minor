import PATH_SET from '../components/_utils/actionTypes';

let initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'PATH_SET':
			return action.payload;
		default:
			return state;
	}
}