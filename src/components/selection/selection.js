import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';

function Selection({Element, options, selected, onChange, isMultiple}) {
	const handleOnChange = option => {
		if (isMultiple) {
			onChange(
				selected.some(({id}) => id === option.id)
					? selected.filter(({id}) => id !== option.id)
					: [...selected, option]
			);
		} else {
			onChange(option);
		}
	};

	return options.map((option, index) => (
		<Element
			{...option}
			testID="Selection"
			key={option.id}
			isMultiple={isMultiple}
			isSelected={getIsSelected({isMultiple, selected, option})}
			handleOnChange={() => handleOnChange(option)}
		/>
	));
};

const getIsSelected = ({isMultiple, selected, option}) => {
	if (!option) {
		return false;
	}
	if (isMultiple) {
		return selected.some(({id}) => id === option.id);
	}
	return option.id === selected.id;
};

export default Selection;