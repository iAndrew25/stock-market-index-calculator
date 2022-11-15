import React, {useContext, useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Flag from '../../../../components/flag/flag';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext} from '../../wizzard-context';

const backgrounds = ['#40b8ff', '#addc11', '#66ce47', '#d536a7', '#83d1ff', '#987bf4', '#553da5', '#1a242c'];

function CreateIndex({navigation, route}) {
	const [indexName, setIndexName] = useState('');
	const [indexColor, setIndexColor] = useState(backgrounds[0]);
	const {onNext} = useContext(WizzardContext);

	const textInputColor = false ? '#ec5664' : "#66ce47";

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'CreateIndex',
			indexName,
			indexColor
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
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Index name"
				value={indexName}
				onChangeText={setIndexName}
			/>
			<Text>Pick a color to distinguish your index</Text>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				{backgrounds.map(backgroundColor => (
					<Pressable key={backgroundColor} style={{width: 30, height: 30, borderRadius: 8, margin: 8, overflow: 'hidden'}} onPress={() => setIndexColor(backgroundColor)}>
						<View style={{width: '100%', height: '100%', backgroundColor }} />
						{indexColor === backgroundColor && <View style={{...StyleSheet.absoluteFill, justifyContent:'center', alignItems: 'center'}}>
							<View style={{...StyleSheet.absoluteFill, opacity: 0.2, backgroundColor: '#000000'}}/>
							<Icon name="check" color="#ffffff" />
						</View >}
					</Pressable>
				))}
			</View>
			<Text>preview</Text>
			<Flag color={indexColor}>
				<Flag.Content text={indexName} />
			</Flag>
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