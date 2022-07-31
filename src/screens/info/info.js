import React, { useState } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Button, Appbar, Surface, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function Calculate({navigation, route}) {

	return (
		<ScrollView style={styles.wrapper} keyboardShouldPersistTaps="handled">
			<Appbar.Header mode="center-aligned" style={styles.header}>
				<Appbar.BackAction onPress={navigation.goBack} />
			</Appbar.Header>
			<Text style={styles.title} variant="headlineLarge">Info</Text>

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
	}
});

export default Calculate;