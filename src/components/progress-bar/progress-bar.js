import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';

function ProgressBar({progress = 0}) {
	const { width } = useWindowDimensions();
	const progressWizzardBarWidth = width - 64; // 32 margin horizontal

	return (
		<View style={StyleSheet.compose(styles.wrapper, {
			width: progressWizzardBarWidth
		})}>
			<View style={StyleSheet.compose(styles.active, {
				width: progressWizzardBarWidth * progress
			})}/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		height: 8,
		borderRadius: 8,
		backgroundColor: '#b7e7a6'
	},
	active: {
		height: 8,
		borderRadius: 8,
		backgroundColor: '#41a935',
		position: 'absolute'
	}
})

export default ProgressBar;