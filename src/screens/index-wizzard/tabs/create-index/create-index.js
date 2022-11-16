import React, {useContext, useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Flag from '../../../../components/flag/flag';
import TabLayout from '../../components/tab-layout/tab-layout';
import IndexCard from '../../../../components/index-card/index-card';
import {WizzardContext} from '../../wizzard-context';

const backgrounds = ['#40b8ff', '#addc11', '#66ce47', '#d536a7', '#83d1ff', '#987bf4', '#553da5', '#1a242c'];

function CreateIndex({navigation, route}) {
	const [symbol, setSymbol] = useState('');
	const [color, setColor] = useState(backgrounds[0]);
	const {onNext} = useContext(WizzardContext);

	const textInputColor = false ? '#ec5664' : "#66ce47";

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'CreateIndex',
			symbol,
			color
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
			<IndexCard color={color} symbol={symbol} />

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