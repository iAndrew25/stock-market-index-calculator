import React, { useState } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Button, Appbar, Surface, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function Calculate({navigation, route}) {
	const [ammount, setAmmount] = useState('');
	const [hasError, setHasError] = useState(false);
	const {indexName} = route.params;
	const textInputColor = hasError ? '#ec5664' : "#66ce47";

	const handleOnCalculate = () => {
		if(ammount && !isNaN(ammount)) {
			navigation.navigate('Composition', {...route.params, ammount});
		} else {
			setHasError(true);
		}
	}

	return (
		<ScrollView style={styles.wrapper}>
			<Appbar.Header mode="center-aligned" style={styles.header}>
				<Appbar.BackAction onPress={navigation.goBack} />
			</Appbar.Header>
			<Text style={styles.title} variant="headlineLarge">Enter the ammount you want to invest in {indexName}</Text>
			<TextInput
				autoFocus
				style={styles.inputAmmount}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Ammount to invest"
				value={ammount}
				onChangeText={setAmmount}
			/>
			{hasError && <Text variant="labelLarge" style={styles.errorMessage}>Please enter a number</Text>}
			<Button style={styles.calculateButton} buttonColor="#66ce47" mode="contained" onPress={handleOnCalculate}>
				Calculate
			</Button>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#f7f7f7',
		flex: 1
	},
	title: {
		marginBottom: 24,
		marginLeft: 24,
		fontWeight: 'bold',
		color: '#333333'
	},
	header: {
		backgroundColor: '#f7f7f7'
	},
	inputAmmount: {
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