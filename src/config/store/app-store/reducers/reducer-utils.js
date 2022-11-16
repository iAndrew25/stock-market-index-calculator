const insertIndex = (state, payload) => {
	return {
		...state,
		indexesList: [...state.indexesList, payload]
	}
};

const initIndexes = () => {};
const updateIndex = () => {};
const deleteIndex = () => {};

export default {
	initIndexes,
	insertIndex,
	updateIndex,
	deleteIndex
};
