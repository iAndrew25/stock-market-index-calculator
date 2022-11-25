import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {Unit} from '@sizes';

import styles from './spacer-style';

function getSpacerStyles(directions, sizes) {
	if (Array.isArray(directions) && Array.isArray(sizes)) {
		return directions.map((side, index) => styles[`${side}_${sizes[index]}_Spacing`]);
	}
	if (Array.isArray(directions) && typeof sizes === 'string') {
		return directions.map(side => styles[`${side}_${sizes}_Spacing`]);
	}
	if (typeof directions === 'string' && typeof sizes === 'string') {
		return styles[`${directions}_${sizes}_Spacing`];
	}
	return null;
}

function Spacer({direction, size, style, children, ...rest}) {
	const composedStyle = getSpacerStyles(direction, size);
	return (
		<View style={StyleSheet.compose(composedStyle, style)} {...rest}>
			{children}
		</View>
	);
}

const directions = ['full', 'horizontal', 'vertical', 'left', 'top', 'right', 'bottom'];
const units = Object.keys(Unit);
Spacer.propTypes = {
	direction: PropTypes.oneOfType([PropTypes.oneOf(directions), PropTypes.arrayOf(PropTypes.oneOf(directions))]),
	size: PropTypes.oneOfType([PropTypes.oneOf(units), PropTypes.arrayOf(PropTypes.oneOf(units))]),
	children: PropTypes.node
};

export {directions, units};
export default memo(Spacer);