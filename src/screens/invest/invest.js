import React, {Fragment, useState, useContext, useEffect} from 'react';
import {StyleSheet,ScrollView, Image, View, TouchableHighlight, useWindowDimensions } from 'react-native';
import { Appbar, Surface, Text, Button,TextInput } from 'react-native-paper';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import RNBootSplash from "react-native-bootsplash";
import { useSelector } from 'react-redux';

import Flag from '../../components/flag/flag';
import ScreenLayout from '../../components/screen-layout/screen-layout';
import IndexCard from '../../components/index-card/index-card';
import MarketIndexCard from '../../components/market-index-card/market-index-card';
import Loader from '../../components/loader/loader';

import {AppContext} from '../../config/store';
import {getMarketIndexes} from '../../services';

function Invest({navigation, route}) {
	const {companies, indexData} = route.params;
	console.log("companies", companies);

	const [budget, setBudget] = useState('');
	const [hasError, setHasError] = useState(false);

	const textInputColor = hasError ? '#ec5664' : "#66ce47";

	const handleOnCalculate = () => {
		if(budget && !isNaN(budget) && parseInt(budget) > 0) {
			navigation.navigate('InvestResults', {budget, companies, indexData});
		} else {
			setHasError(true);
		}
	}

	return (
		<Fragment>
			<ScreenLayout
				title="How much would you like to invest in [???]?"
				// isLoading={isLoading}
				appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
			>
				<TextInput
					autoFocus
					style={styles.inputBudget}
					mode="outlined"
					keyboardType="numeric"
					outlineColor={textInputColor}
					activeOutlineColor={textInputColor}
					label="Amount"
					value={budget}
					onChangeText={setBudget}
				/>
				{hasError && <Text variant="labelLarge" style={styles.errorMessage}>Please enter a number</Text>}
				<Button style={styles.calculateButton} buttonColor="#66ce47" mode="contained" onPress={handleOnCalculate}>
					Calculate
				</Button>
			</ScreenLayout>
		</Fragment>
	);
}

const IMAGE_WIDTH = 142;

const styles = StyleSheet.create({
	inputBudget: {
		marginHorizontal: 24
	},
	calculateButton: {
		marginHorizontal: 24,
		marginTop: 16
	},
	errorMessage: {
		color: '#ec5664',
		marginLeft: 24,
		marginTop: 4
	}
});

export default Invest;