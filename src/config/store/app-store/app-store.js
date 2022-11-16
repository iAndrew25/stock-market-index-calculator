import { createStore, combineReducers } from 'redux';
// import preferencesReducer from './reducers/preferences-reducer';
import indexesReducer from './reducers/indexes-reducer';

export default createStore(
	combineReducers({
		indexes: indexesReducer
		// preferences: preferencesReducer
	})
);