import React from 'react';
import {ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const indexes = [{
	country: 'ro',
	indexName: 'BET Index',
	flag: require('../../assets/flags/ro.png'),
	isActive: true
}, {
	country: 'de',
	indexName: 'DAX Index',
	flag: require('../../assets/flags/de.png'),
	isActive: false
}, {
	country: 'us',
	indexName: 'Dow Jones Industrial Average Index',
	flag: require('../../assets/flags/us.png'),
	isActive: false
}];

function Home({navigation}) {
	const { width } = useWindowDimensions();
	const defaultMargin = (width - (2 * (IMAGE_WIDTH + (16 * 2)))) / 3;

	return (
		<ScrollView style={styles.wrapper}>
			<Appbar.Header mode="center-aligned" style={styles.header}>
				<Appbar.Content title="" />
				<Appbar.Action icon="information-outline" iconColor="#333333" onPress={() => {}} />
			</Appbar.Header>
			<Text style={styles.title} variant="headlineLarge">Stock Market Index Calculator</Text>
			<View style={styles.indexes}>
				{indexes.map(({country, indexName, flag}) => (
					<TouchableHighlight underlayColor="#dfdfdf" style={[styles.cardWrapper, {marginBottom: defaultMargin}]} key={country} onPress={() => navigation.navigate('Calculate', {indexName})}>
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
				))}
			</View>
		</ScrollView>
	);
}

const COUNTRY_CIRCLE_SIZE = 40;
const COUNTRY_CIRCLE_BORDER = 5;
const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#f7f7f7',
		flex: 1
	},
	title: {
		marginBottom: 24,
		marginLeft: 24,
		fontWeight: 'bold',
		color: '#333333'
	},
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
	},
	indexes: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 32
	},
	header: {
		backgroundColor: '#f7f7f7'
	}
});

export default Home;