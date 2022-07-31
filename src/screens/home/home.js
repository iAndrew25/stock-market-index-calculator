import React, {useContext} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';

import ScreenLayout from '../../components/screen-layout/screen-layout';
import Loader from '../../components/loader/loader';

import {AppContext} from '../../config/store';

const indexes = [{
	country: 'ro',
	indexName: 'BET Index',
	flag: require('../../assets/flags/ro.png'),
	symbol: 'BET',
	isActive: true
}, {
	country: 'de',
	indexName: 'DAX Index',
	flag: require('../../assets/flags/de.png'),
	symbol: 'DAX',
	isActive: false
}, {
	country: 'us',
	indexName: 'Dow Jones Industrial Average Index',
	symbol: 'DWJ',
	flag: require('../../assets/flags/us.png'),
	isActive: false
}];

function Home({navigation}) {
	const { width } = useWindowDimensions();
	const [, setStore] = useContext(AppContext);

	const defaultMargin = (width - (2 * (IMAGE_WIDTH + (16 * 2)))) / 3;
	const handleOnInfo = () => navigation.navigate('Info');
	const handleOnCalculate = indice => () => {
		setStore(indice);
		navigation.navigate('Calculate');
	}

	return (
		<ScreenLayout
			title="Stock Market Index Calculator"
			appbarChildren={
				<>
					<Appbar.Content title="" />
					<Appbar.Action icon="information-outline" iconColor="#333333" onPress={handleOnInfo} />
				</>
			}
		>
			<View style={styles.indexes}>
				{indexes.map(({country, indexName, flag, symbol}) => (
					<TouchableHighlight
						underlayColor="#dfdfdf"
						style={[styles.cardWrapper, {marginBottom: defaultMargin}]}
						key={country}
						onPress={handleOnCalculate({country, indexName, flag, symbol})}
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
				))}
			</View>
		</ScreenLayout>
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