import React, {useState} from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';

function DevScreen({}) {
	return (
		<View>
			{[1,2,3,4].map(() => <ListRow />)}
		</View>
	);
}

const ListRow = ({value, symbol, weight, name}) => {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<TouchableHighlight style={[styles.listRow, isSelected && styles.isSelected]} underlayColor="#e2e2e2" onPress={() => setIsSelected(ss => !ss)}>
			<>
				<View style={styles.listRowFoot}>
					<Text style={styles.listRowFootText}>{name}</Text>
					<Text style={styles.listRowFootValue}>{value}</Text>
				</View>
				<View style={styles.listRowHead}>
					<View style={styles.listRowHeadItem}>
						<Text style={styles.listRowHeadItemLabel}>SYMBOL</Text>
						<Text style={styles.listRowHeadItemValue}>{symbol}</Text>
					</View>
					<View style={styles.listRowHeadItem}>
						<Text style={styles.listRowHeadItemLabel}>WEIGHT</Text>
						<Text style={styles.listRowHeadItemValue}>{weight}</Text>
					</View>
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
		color: '#66ce47',
		fontSize: 17,
		marginTop: 8
	}
})

export {ListRow};
export default DevScreen;