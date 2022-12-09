import React, { useState, useContext } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Appbar, Surface, Text, TextInput, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux';

import Company from '../../components/list-items/company/company';
import ScreenLayout from '../../components/screen-layout/screen-layout';
import {getCompanies} from '../../services';

import {AppContext} from '../../config/store';
function InvestResults({navigation, route}) {
	const dispatch = useDispatch();
	
	const { budget, companies, indexData} = route.params;
	const {symbol: indexSymbol, currency, currencyPlacement, isTrackingAllCompanies} = indexData;
	console.log("indexData", indexData);

	const setCurrency = parseCurrency({currency, currencyPlacement});
	const parsedCompanies = getAmount({companies, budget, currency, currencyPlacement, isTrackingAllCompanies});
	console.log("parsedCompanies", parsedCompanies);

	const handleOnSave = () => {
		const newCompanies = parsedCompanies.map(({value, companyAmount, ...rest}) => ({
			...rest,
			value: (Number(value || 0) + Number(companyAmount || 0)).toFixed(2)
		}));

		dispatch({
			type: 'UPDATE_INDEX',
			payload: {
				...indexData,
				companies: newCompanies
			}
		});

		navigation.pop(2)
	}

	return (
		<ScreenLayout
			// isLoading={isLoading}
			title={`To invest ${setCurrency(budget)} in ${indexSymbol}, you need to buy the following companies`}
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<Button style={{marginLeft: 8}} buttonColor="#66ce47" mode="contained" onPress={handleOnSave}>
				Save values
			</Button>
			<View style={styles.itemsWrapper}>
				{parsedCompanies.map(({symbol, name, value, weight, companyAmount}) => (
					<Company
						key={symbol}
						name={name}
						value={Boolean(value) ? `${value} + ` : ''}
						symbol={symbol}
						weight={weight}
						highlightedValue={companyAmount}
					/>
				))}
			</View>
			{/*{Boolean(lastUpdated) && <Text variant="bodyMedium" style={styles.lastUpdated}>Last index update: {lastUpdated}</Text>}*/}
		</ScreenLayout>
	);
}

const parseCurrency = ({currency, currencyPlacement}) => amount => currencyPlacement === 'left' ? `${currency}${amount}` : `${amount}${currency}`;
const getAmount = ({companies = [], budget, setCurrency, isTrackingAllCompanies}) => companies.map(company => ({
	...company,
	companyAmount: (budget * ((isTrackingAllCompanies ? company.weight : company.newWeight) / 100)).toFixed(2)
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

export default InvestResults;