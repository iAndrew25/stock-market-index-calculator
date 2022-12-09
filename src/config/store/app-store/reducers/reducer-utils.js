const insertIndex = (state, payload) => {
	return {
		...state,
		indexesList: [...state.indexesList, payload]
	};
};

const updateIndex = (state, payload) => {
	return {
		...state,
		indexesList: state.indexesList.map(currentIndex => currentIndex.id === payload.id ? payload : currentIndex)
	};
};

const initIndexes = () => {};
const deleteIndex = () => {};

export default {
	initIndexes,
	insertIndex,
	updateIndex,
	deleteIndex
};
