import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import Loader from '../loader/loader';

function ScreenLayout({title, isLoading, appbarChildren, children}) {
	return (
		<ScrollView style={styles.wrapper} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
			{isLoading && <Loader />}
			<Appbar.Header mode="center-aligned" style={styles.header}>
				{appbarChildren}
			</Appbar.Header>
			<Text style={styles.title} variant="headlineLarge">{title}</Text>
			{children}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#f7f7f7',
		flex: 1
	},
	container: {
		paddingBottom: 32,
		flexGrow: 1
	},
	title: {
		marginBottom: 24,
		marginHorizontal: 24,
		fontWeight: 'bold',
		color: '#333333'
	},
	header: {
		backgroundColor: '#f7f7f7'
	},
});

export default ScreenLayout;