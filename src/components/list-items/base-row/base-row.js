import React from 'react';

import { StyleSheet, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text} from 'react-native-paper';

function BaseRow({text, isSelected, onPress}) {
	return (
		<TouchableHighlight style={[styles.listRow, isSelected && styles.isSelected]} underlayColor="#e2e2e2" onPress={onPress}>
			<Text variant="bodyLarge" style={{fontWeight:'bold', textAlign: 'center'}}>{text}</Text>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	listRow: {
		borderWidth: 2,
		borderColor: 'white',
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8,
		width: 144 + 16 * 2,
		height: 94 + 16 * 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	isSelected: {
		borderColor: '#66ce47',
	}
})

export default BaseRow;