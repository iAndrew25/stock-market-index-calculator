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
	const [{indexName, symbol, currency=''}] = useContext(AppContext);
	const {data, isLoading} = useQuery(['companies', symbol], () => getCompanies(symbol));

	const { ammount } = route.params;

	return (
		<ScreenLayout
			isLoading={isLoading}
			title={`To invest ${currency}${ammount} in ${indexName}, you need to buy the following companies`}
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<View style={styles.itemsWrapper}>
				{getAmmount({companies: data?.data, ammount}).map(({symbol, name, companyAmmount}) => (
					<List.Item 
						title={name}
						key={symbol}
						style={styles.item}
						left={() => <View style={styles.symbolWrapper}><Text style={styles.symbol} variant="labelLarge">{symbol}</Text></View>}
						right={() => <View style={styles.ammountWrapper}><Text variant="titleMedium" style={styles.ammount}>{currency}{companyAmmount}</Text></View>}
					/>
				))}
			</View>
		</ScreenLayout>
	);
}

const getAmmount = ({companies = [], ammount}) => companies.map(company => ({
	...company,
	companyAmmount: (ammount * (company.weight / 100)).toFixed(2)
}));

const styles = StyleSheet.create({
	ammountWrapper: {
		paddingLeft: 8,
		justifyContent: 'center'
	},
	ammount: {
		color: '#66ce47',
		fontWeight: 'bold'
	},
	itemsWrapper: {
		marginHorizontal: 16,
		paddingBottom: 32
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
	}
});

export default Composition;