import React, {useContext} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';

import ScreenLayout from '../../components/screen-layout/screen-layout';
import IndiceCard from '../../components/indice-card/indice-card';
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
				{indexes.map(indice => (
					<IndiceCard
						{...indice}
						onPress={handleOnCalculate(indice)}
						style={{marginBottom: defaultMargin}}
					/>
				))}
			</View>
		</ScreenLayout>
	);
}

const COUNTRY_CIRCLE_SIZE = 40;
const COUNTRY_CIRCLE_BORDER = 5;
const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	indexes: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default Home;