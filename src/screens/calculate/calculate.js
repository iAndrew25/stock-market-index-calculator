import React, { useState, useContext } from 'react';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import ScreenLayout from '../../components/screen-layout/screen-layout';

import {AppContext} from '../../config/store';

function Calculate({navigation, route}) {
	const [budget, setBudget] = useState('');
	const [hasError, setHasError] = useState(false);
	const [{symbol}] = useContext(AppContext);

	const textInputColor = hasError ? '#ec5664' : "#66ce47";

	const handleOnCalculate = () => {
		if(budget && !isNaN(budget) && parseInt(budget) > 0) {
			navigation.navigate('Composition', {budget});
		} else {
			setHasError(true);
		}
	}

	return (
		<ScreenLayout title={`Enter the amount you want to invest in ${symbol}`} appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}>
			<TextInput
				autoFocus
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Your budget"
				value={budget}
				onChangeText={setBudget}
			/>
			{hasError && <Text variant="labelLarge" style={styles.errorMessage}>Please enter a number</Text>}
			<Button style={styles.calculateButton} buttonColor="#66ce47" mode="contained" onPress={handleOnCalculate}>
				Calculate
			</Button>
		</ScreenLayout>
	);
}

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

export default Calculate;