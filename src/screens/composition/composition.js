import React, { useState, useContext } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Appbar, Surface, Text, TextInput, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import ScreenLayout from '../../components/screen-layout/screen-layout';
import {getCompanies} from '../../services';

import {ListRow} from '../_dev-screen/dev-screen';
import {AppContext} from '../../config/store';

function Composition({navigation, route}) {
	const queryClient = useQueryClient();
	const [{symbol, lastUpdated, currency, currencyPlacement}] = useContext(AppContext);
	const {data, isLoading} = useQuery(['companies', symbol], () => getCompanies(symbol));
	
	const { budget } = route.params;
	const setCurrency = parseCurrency({currency, currencyPlacement});
	const companies = getAmount({companies: data?.data, budget, currency, currencyPlacement, setCurrency});

	return (
		<ScreenLayout
			isLoading={isLoading}
			title={`To invest ${setCurrency(budget)} in ${symbol}, you need to buy the following companies`}
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<View style={styles.itemsWrapper}>
				{companies.map(({symbol, name, weight, companyAmount}) => (
					<ListRow
						symbol={symbol}
						name={name}
						weight={weight}
						value={companyAmount}
					/>
				))}
			</View>
			{Boolean(lastUpdated) && <Text variant="bodyMedium" style={styles.lastUpdated}>Last index update: {lastUpdated}</Text>}
		</ScreenLayout>
	);
}

const parseCurrency = ({currency, currencyPlacement}) => amount => currencyPlacement === 'left' ? `${currency}${amount}` : `${amount}${currency}`;
const getAmount = ({companies = [], budget, setCurrency}) => companies.map(company => ({
	...company,
	companyAmount: setCurrency((budget * (company.weight / 100)).toFixed(2))
})).sort((firstCompany,secondCompany)=>secondCompany.weight-firstCompany.weight);

const styles = StyleSheet.create({
	amountWrapper: {
		paddingLeft: 8,
		justifyContent: 'center'
	},
	budget: {
		color: '#66ce47',
		fontWeight: 'bold'
	},
	itemsWrapper: {
		marginHorizontal: 16
	},
	item: {
		padding: 16,
		marginVertical: 4,
		backgroundColor: 'white',
		borderRadius: 16
	},
	symbolWrapper: {
		padding: 8,
		backgroundColor: '#333333',
		width: 80,
		height: 35,
		borderRadius: 8,
		justifyContent: 'center'
	},
	symbol: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: 'Roboto-Regular'
	},
	lastUpdated: {
		color: '#333',
		marginLeft: 24,
		textAlign: 'center'
	}
});

export default Composition;