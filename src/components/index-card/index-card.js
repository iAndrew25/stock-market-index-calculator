import React from 'react';
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';
import Flag from '../flag/flag';

function IndexCard({style, onPress, isSelected, country, color, label, symbol, name}) {
	return (
		<TouchableHighlight
			underlayColor="#dfdfdf"
			style={StyleSheet.compose(styles.cardWrapper, isSelected && {borderColor: '#66ce47'})}
			onPress={onPress}
		>
			<>
				{Boolean(country) ? (
					<View style={{
						width: 142,
						height: 96,
						borderRadius: 16,
						overflow: 'hidden'
					}}>
						<Image source={flags[country]} />
					</View>
				) : (
					<Flag color={color} />
				)}
					
				<View>
					<View style={styles.countryCircleWrapper}>
					<View style={styles.countryCircle}>
						<Text variant="labelMedium" style={styles.countryName}>{label || symbol}</Text>
					</View>
					</View>
					{Boolean(name) && false && <Text variant="labelLarge" style={styles.name}>{name}</Text>}
				</View>
			</>
		</TouchableHighlight>
	);
}

const flags = {
	ro: require('../../assets/flags/ro.png'),
	uk: require('../../assets/flags/uk.png'),
	de: require('../../assets/flags/de.png'),
	us: require('../../assets/flags/us.png'),
	fr: require('../../assets/flags/fr.png')
};

const COUNTRY_CIRCLE_SIZE = 40;
const COUNTRY_CIRCLE_BORDER = 5;
const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	cardWrapper: {
		borderWidth: 2,
		borderColor: 'white',
		padding: 16,
		paddingBottom: 16 + COUNTRY_CIRCLE_SIZE/4,
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
		paddingHorizontal: 8,
		minWidth: COUNTRY_CIRCLE_SIZE,
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
	symbol: {
		textAlign:'center',
		textTransform: 'uppercase',
		fontFamily: 'Roboto-Regular',
		marginTop: 8,
		color: '#333333',
		letterSpacing: 1,
		fontWeight:'bold'
	},
	name: {
		textAlign:'center',
		fontFamily: 'Roboto-Regular',
		marginTop: 24,
		color: '#333333',

	}
});

export default IndexCard;