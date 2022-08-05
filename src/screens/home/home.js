import React, {useContext} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';

import ScreenLayout from '../../components/screen-layout/screen-layout';
import IndiceCard from '../../components/indice-card/indice-card';
import Loader from '../../components/loader/loader';

import {AppContext} from '../../config/store';

const indexes = [{
	country: 'ro',
	name: 'Bucharest Exchange Trading',
	flag: require('../../assets/flags/ro.png'),
	symbol: 'BET',
	isActive: true
}, {
	country: 'de',
	name: 'Deutscher Aktien Index',
	flag: require('../../assets/flags/de.png'),
	symbol: 'DAX-40',
	isActive: false
}, {
	country: 'us',
	name: 'Dow Jones Industrial Average',
	symbol: 'DJIA-30',
	flag: require('../../assets/flags/us.png'),
	isActive: false
}, {
	country: 'fr',
	name: 'Cotation Assistée en Continu',
	symbol: 'CAC-40',
	flag: require('../../assets/flags/fr.png'),
	isActive: false
}, {
	country: 'uk',
	name: 'Financial Times Stock Exchange',
	symbol: 'FTSE-100',
	flag: require('../../assets/flags/uk.png'),
	isActive: false
}];

function Home({navigation}) {
	const { width } = useWindowDimensions();
	const [, setStore] = useContext(AppContext);

	const marginBottom = (width - (2 * (IMAGE_WIDTH + (16 * 2)))) / 3;
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
				{indexes.sort((a,b)=>a.country > b.country).map(indice => (
					<IndiceCard
						{...indice}
						key={indice.name}
						onPress={handleOnCalculate(indice)}
						style={{marginBottom}}
					/>
				))}
			</View>
		</ScreenLayout>
	);
}

const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	indexes: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default Home;