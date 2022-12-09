import React, {Fragment, memo} from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';

function Company({value, highlightedValue, symbol, weight, newWeight, name, isSelected, onPress}) {
	return (
		<TouchableHighlight style={[styles.listRow, isSelected && styles.isSelected]} underlayColor="#e2e2e2" onPress={onPress}>
			<>
				<View style={styles.listRowFoot}>
					<Text style={styles.listRowFootText}>{name}</Text>
					{Boolean(highlightedValue || value) && (
						<View style={{flexDirection: 'row'}}>
							{Boolean(value) && (<Text style={styles.listRowFootValue}>{value}</Text>)}
							{Boolean(highlightedValue) && <Text style={StyleSheet.compose(styles.listRowFootValue, styles.listRowFootValueHighlighted)}>{highlightedValue}</Text>}
						</View>
					)}
				</View>
				<View style={styles.listRowHead}>
					<View style={styles.listRowHeadItem}>
						<Text style={styles.listRowHeadItemLabel}>SYMBOL</Text>
						<Text style={styles.listRowHeadItemValue}>{symbol}</Text>
					</View>
					<View style={styles.listRowHeadItem}>
						<Text style={styles.listRowHeadItemLabel}>WEIGHT</Text>
						<Text style={styles.listRowHeadItemValue}>{weight}%</Text>
					</View>
					{Boolean(newWeight) && <View style={styles.listRowHeadItem}>
						<Text style={styles.listRowHeadItemLabel}>NEW WEIGHT</Text>
						<Text style={StyleSheet.compose(styles.listRowHeadItemValue, styles.highlightText)}>{newWeight.toFixed(2)}%</Text>
					</View>}
				</View>
			</>
		</TouchableHighlight>
	);	
}

const styles = StyleSheet.create({
	isSelected: {
		borderColor: '#66ce47',
	},
	listRow: {
		borderWidth: 2,
		borderColor: 'white',
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8
	},
	listRowHead: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 16,
		borderTopWidth: 1,
		borderColor: '#eee'
	},
	listRowHeadItem: {
		alignItems: 'center'
	},
	listRowHeadItemLabel: {
		textTransform: 'uppercase',
		fontSize: 10,
		letterSpacing: 2
	},
	listRowHeadItemValue: {
		textTransform: 'uppercase',
		fontWeight: 'bold'
	},
	listRowFoot: {
		paddingBottom: 16,
		alignItems: 'center'
	},
	listRowFootText: {
		fontWeight: 'bold'
	},
	listRowFootValue: {
		fontWeight: 'bold',
		fontSize: 17,
		marginTop: 8
	},
	listRowFootValueHighlighted: {
		color: '#66ce47'
	},
	highlightText: {
		color: '#66ce47'
	}
})

export default memo(Company);