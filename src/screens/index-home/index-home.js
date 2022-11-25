import React, {Fragment, useState, useContext, useEffect} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text, Button } from 'react-native-paper';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import RNBootSplash from "react-native-bootsplash";
import { useSelector } from 'react-redux';

import Flag from '../../components/flag/flag';
import ScreenLayout from '../../components/screen-layout/screen-layout';
import IndexCard from '../../components/index-card/index-card';
import MarketIndexCard from '../../components/market-index-card/market-index-card';
import Loader from '../../components/loader/loader';
import Company from '../../components/list-items/company/company';

import {AppContext} from '../../config/store';
import {getCompanies, getMarketIndexes} from '../../services';

const parseCompanies = (userCompanies, indexCompanies = []) => {
	return indexCompanies.reduce((parsedCompanies, indexCompany) => {
		const commonCompany = userCompanies.find(userCompany => userCompany.id === indexCompany.id);

		if(commonCompany) {
			return [...parsedCompanies, {...commonCompany, ...indexCompany}];
		} else {
			return parsedCompanies;
		}
	}, []);
}

function IndexHome({navigation, route}) {
	const {indexProps} = route.params;
	const { width } = useWindowDimensions();
	const [, setStore] = useContext(AppContext);
	const [marketIndexes, setMarketIndexes] = useState([]);
	const indexData = useSelector(({indexes}) => indexes.indexesList.find(({id}) => id === indexProps.id));
	const {data, error, isLoading, fetchStatus} = useQuery({
		queryKey: [`companies-${indexProps.symbol}`, indexProps.symbol],
		queryFn: () => getCompanies(indexProps.symbol),
		enabled: !indexData.isNewIndex
	});

	const parsedCompanies = indexData.isNewIndex ? indexData.companies : parseCompanies(indexData.companies, data?.data);

	const marginBottom = (width - (2 * (IMAGE_WIDTH + (16 * 2)))) / 3;
	const handleOnInfo = () => navigation.navigate('Info');
	const handleOnCalculate = marketIndex => () => {
		setStore(marketIndex);
		navigation.navigate('Calculate');
	}

	return (
		<Fragment>
			<ScreenLayout
				//title="Stock Market Index Tracker"
				isLoading={isLoading && fetchStatus !== "idle"}
				appbarChildren={
					<>
						<Appbar.BackAction onPress={navigation.goBack} />
						<Appbar.Content title="" />
						<Appbar.Action icon="information-outline" iconColor="#333333" onPress={handleOnInfo} />
					</>
				}
			>
				<View style={{marginHorizontal: 16, backgroundColor: 'white', alignItems: 'center', borderRadius: 16}}>
					<IndexCard {...indexProps} />
					<View style={{flexDirection: 'row', marginTop: 8, paddingBottom: 16}}>
						<Button textColor="black" mode="text" onPress={console.log}>
							Update
						</Button>
						<Button style={{marginLeft: 8}} buttonColor="#66ce47" mode="contained" onPress={console.log}>
							Invest
						</Button>
					</View>
				</View>
				<View style={{marginTop: 16, flexDirection:'column'}}>
					{parsedCompanies.map(item => (<Company key={item.id} {...item} />))}
				</View>
			</ScreenLayout>
		</Fragment>
	);
}

				// {sortByCountry(data?.data).map(marketIndex => (
				// 	<MarketIndexCard
				// 		{...marketIndex}
				// 		key={marketIndex.name}
				// 		onPress={handleOnCalculate(marketIndex)}
				// 		style={{marginBottom}}
				// 	/>
				// ))}
const sortByCountry = (marketIndexes = []) => marketIndexes.sort((first, second) => first.country > second.country);

const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	marketIndexes: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	createIndex: {
		position: 'absolute',
		bottom: 16,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default IndexHome;