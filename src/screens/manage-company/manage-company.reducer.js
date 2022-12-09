const defaultCompany = {
	name: '',
	symbol: '',
	weight: 0
};

function companyReducer(state, {type, payload}) {
	switch(type) {
		case 'UPDATE_NAME':
			return {
				...state,
				name: payload
			}
			break;
		case 'UPDATE_SYMBOL':
			return {
				...state,
				symbol: payload
			}
			break;
		case 'UPDATE_WEIGHT':
			return {
				...state,
				weight: payload
			}
			break;
		default:
			return state;
	}
}

export {
	companyReducer,
	defaultCompany
};
