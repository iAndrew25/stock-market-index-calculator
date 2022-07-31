import React from 'react';
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';

function IndiceCard({style, onPress, flag, country, indexName}) {
	return (
		<TouchableHighlight
			key={country}
			underlayColor="#dfdfdf"
			style={StyleSheet.compose(styles.cardWrapper, style)}
			onPress={onPress}
		>
			<>
				<Image source={flag} />
				<View>
					<View style={styles.countryCircleWrapper}>
					<View style={styles.countryCircle}>
						<Text variant="labelMedium" style={styles.countryName}>{country}</Text>
					</View>
					</View>
					<Text variant="bodyLarge" style={styles.indexName}>{indexName}</Text>
				</View>
			</>
		</TouchableHighlight>
	);
}

const COUNTRY_CIRCLE_SIZE = 40;
const COUNTRY_CIRCLE_BORDER = 5;
const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	cardWrapper: {
		padding: 16,
		borderRadius: 16,
		backgroundColor: 'white',
		width: IMAGE_WIDTH + (16 * 2)
	},
	countryCircleWrapper: {
		position: 'absolute',
		marginTop: -(COUNTRY_CIRCLE_SIZE / 2 + COUNTRY_CIRCLE_BORDER / 2),
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	countryCircle: {
		justifyContent: 'center',
		backgroundColor: '#333333',
		borderRadius: COUNTRY_CIRCLE_SIZE/2,
		width: COUNTRY_CIRCLE_SIZE,
		height: COUNTRY_CIRCLE_SIZE,
		borderColor: 'white',
		borderWidth: COUNTRY_CIRCLE_BORDER	
	},
	countryName: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'white',
		textTransform: 'uppercase',
		fontFamily: 'Roboto-Regular'
	},
	indexName: {
		textAlign:'center',
		textTransform: 'uppercase',
		fontFamily: 'Roboto-Regular',
		marginTop: 16,
		color: '#333333',
		letterSpacing: 1,
	}
});

export default IndiceCard;