import ReducerUtils from './reducer-utils';

const initialState = {
	indexesList: []
};

function indexesReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'INIT_INDEXES':
			return ReducerUtils.initIndexes(state, payload);

		case 'INSERT_INDEX':
			return ReducerUtils.insertIndex(state, payload);

		case 'UPDATE_INDEX':
			return ReducerUtils.updateIndex(state, payload);

		case 'DELETE_INDEX':
			return ReducerUtils.deleteIndex(state, payload);

		default:
			return state;
	}
}

export default indexesReducer;
