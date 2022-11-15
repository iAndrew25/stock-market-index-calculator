import React from 'react';

import { StyleSheet, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text} from 'react-native-paper';

function BaseRow({text, isSelected, handleOnChange}) {
	return (
		<TouchableHighlight style={[styles.listRow, isSelected && styles.isSelected]} underlayColor="#e2e2e2" onPress={handleOnChange}>
			<Text variant="bodyLarge" style={{fontWeight:'bold'}}>{text}</Text>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	listRow: {
		borderWidth: 2,
		borderColor: 'white',
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8
	},
	isSelected: {
		borderColor: '#66ce47',
	}
})

export default BaseRow;