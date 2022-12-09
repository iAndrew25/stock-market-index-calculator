import React, {useContext, useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput, Chip  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Flag from '../../../../components/flag/flag';
import TabLayout from '../../components/tab-layout/tab-layout';
import IndexCard from '../../../../components/index-card/index-card';
import {WizzardContext} from '../../wizzard-context';

const backgrounds = ['#40b8ff', '#addc11', '#66ce47', '#d536a7', '#83d1ff', '#987bf4', '#553da5', '#1a242c'];

const currencies = ['EUR', 'USD', 'RON', 'NONE'];
const currencyPlacements = ['right', 'left'];

function CreateIndex({navigation, route}) {
	const [symbol, setSymbol] = useState('');
	const [color, setColor] = useState(backgrounds[0]);
	const [currency, setCurrency] = useState(currencies[0]);
	const [currencyPlacement, setCurrencyPlacement] = useState(currencyPlacements[0]);
	const {onNext} = useContext(WizzardContext);

	const textInputColor = false ? '#ec5664' : "#66ce47";

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'CreateIndex',
			symbol,
			color,
			currency,
			currencyPlacement
		});

		navigation.navigate(tabName, params);
	};

	return (
		<TabLayout
			title="Create index"
			progress={route.params.progress}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			<TextInput
				autoFocus
				style={styles.inputBudget}
				mode="outlined"
				maxLength={6}
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Index symbol"
				value={symbol}
				onChangeText={setSymbol}
			/>
			<Text>Currency</Text>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				{currencies.map(currentCurrency => 
					<Chip
						style={{marginHorizontal: 4}}
						selectedColor="#66ce47"
						textStyle={{color: 'black'}}
						mode="outlined"
						selected={currentCurrency === currency}
						onPress={() => setCurrency(currentCurrency)}>
						{currentCurrency}
					</Chip>
				)}
			</View>
			<Text>Currency Placement</Text>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				{currencyPlacements.map(currentCurrencyPlacement => 
					<Chip
						style={{marginHorizontal: 4}}
						selectedColor="#66ce47"
						textStyle={{color: 'black'}}
						mode="outlined"
						selected={currentCurrencyPlacement === currencyPlacement}
						onPress={() => setCurrencyPlacement(currentCurrencyPlacement)}>
						{currentCurrencyPlacement}
					</Chip>
				)}
			</View>
			<Text>Pick a color to distinguish your index</Text>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				{backgrounds.map(backgroundColor => (
					<Pressable key={backgroundColor} style={{width: 30, height: 30, borderRadius: 8, margin: 8, overflow: 'hidden'}} onPress={() => setColor(backgroundColor)}>
						<View style={{width: '100%', height: '100%', backgroundColor }} />
						{color === backgroundColor && <View style={{...StyleSheet.absoluteFill, justifyContent:'center', alignItems: 'center'}}>
							<View style={{...StyleSheet.absoluteFill, opacity: 0.2, backgroundColor: '#000000'}}/>
							<Icon name="check" color="#ffffff" />
						</View >}
					</Pressable>
				))}
			</View>
			<Text>preview</Text>
			<IndexCard color={color} label={symbol} />
		</TabLayout>
	);
}

const styles = StyleSheet.create({
	inputBudget: {
		marginHorizontal: 24
	},
	flagContent: {
		...StyleSheet.absoluteFill,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8
	}
});

export default CreateIndex;