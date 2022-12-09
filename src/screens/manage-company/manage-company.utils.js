const getSliderMax = (usedWeight, weight, isEditMode) => {
	if(isEditMode) {
		return 100 - (usedWeight - weight);
	} else {
		if(usedWeight === 100) {
			return weight;
		} else {
			return 100 - usedWeight;
		}
	}
}

export {
	getSliderMax
};
