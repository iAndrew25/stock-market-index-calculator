import React, { useState, useContext } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Appbar, Surface, Text, TextInput, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import ScreenLayout from '../../components/screen-layout/screen-layout';
import {getCompanies} from '../../services/get-companies';

import {AppContext} from '../../config/store';

function Composition({navigation, route}) {
	const queryClient = useQueryClient();
	const [{indexName, symbol, lastUpdated, currency=''}] = useContext(AppContext);
	const {data, isLoading} = useQuery(['companies', symbol], () => getCompanies(symbol));

	const { amount } = route.params;

	return (
		<ScreenLayout
			isLoading={isLoading}
			title={`To invest ${currency}${amount} in ${indexName}, you need to buy the following companies`}
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<View style={styles.itemsWrapper}>
				{getAmount({companies: data?.data, amount}).map(({symbol, name, companyAmount}) => (
					<List.Item 
						title={name}
						key={symbol}
						style={styles.item}
						left={() => <View style={styles.symbolWrapper}><Text style={styles.symbol} variant="labelLarge">{symbol}</Text></View>}
						right={() => <View style={styles.amountWrapper}><Text variant="titleMedium" style={styles.amount}>{currency}{companyAmount}</Text></View>}
					/>
				))}
			</View>
			{Boolean(lastUpdated) && <Text variant="bodyMedium" style={styles.lastUpdated}>Last index update: {lastUpdated}</Text>}
		</ScreenLayout>
	);
}

const getAmount = ({companies = [], amount}) => companies.map(company => ({
	...company,
	companyAmount: (amount * (company.weight / 100)).toFixed(2)
}));

const styles = StyleSheet.create({
	amountWrapper: {
		paddingLeft: 8,
		justifyContent: 'center'
	},
	amount: {
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