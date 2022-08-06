import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import ScreenLayout from '../../components/screen-layout/screen-layout';
import MarketIndexCard from '../../components/market-index-card/market-index-card';
import Loader from '../../components/loader/loader';

import {AppContext} from '../../config/store';
import {getMarketIndexes} from '../../services';

function Home({navigation}) {
	const queryClient = useQueryClient();
	const { width } = useWindowDimensions();
	const [, setStore] = useContext(AppContext);
	const [marketIndexes, setMarketIndexes] = useState([]);
	const {data, isLoading} = useQuery(['marketIndexes'], getMarketIndexes);

	const marginBottom = (width - (2 * (IMAGE_WIDTH + (16 * 2)))) / 3;
	const handleOnInfo = () => navigation.navigate('Info');
	const handleOnCalculate = marketIndex => () => {
		setStore(marketIndex);
		navigation.navigate('Calculate');
	}

	return (
		<ScreenLayout
			title="Stock Market Index Calculator"
			isLoading={isLoading}
			appbarChildren={
				<>
					<Appbar.Content title="" />
					<Appbar.Action icon="information-outline" iconColor="#333333" onPress={handleOnInfo} />
				</>
			}
		>
			<View style={styles.marketIndexes}>
				{sortByCountry(data?.data).map(marketIndex => (
					<MarketIndexCard
						{...marketIndex}
						key={marketIndex.name}
						onPress={handleOnCalculate(marketIndex)}
						style={{marginBottom}}
					/>
				))}
			</View>
		</ScreenLayout>
	);
}

const sortByCountry = (marketIndexes = []) => marketIndexes.sort((first, second) => first.country > second.country);

const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	marketIndexes: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default Home;