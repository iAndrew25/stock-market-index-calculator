import React, { useState } from 'react';
import { ScrollView, Image, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Appbar, Surface, Text, TextInput, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const companies = [{
	symbol: 'SNN',
	companyName: 'SNN dskjgbskjbgksd jbsdkj sdgsd  nskldnlk nsld ksndl sdi sdoh dg',
	value: 925732
}, {
	symbol: 'TLV',
	companyName: 'TLV dskjgbskjbgksd jbsdkj sdgsd  nskldnlk nsld ksndl sdi sdoh dg',
	value: 925732
}, {
	symbol: 'SNP',
	companyName: 'SNP',
	value: 925732
}, {
	symbol: 'TSLA',
	companyName: 'DIGI dskjgbskjbgksd jbsdkj sdgsd  nskldnlk nsld ksndl sdi sdoh dg',
	value: 925732
}, {
	symbol: 'NASDAQ',
	companyName: 'S dskjgbskjbgksd jbsdkj sdgsd  nskldnlk nsld ksndl sdi sdoh dg',
	value: 925732
}];

function Composition({navigation, route}) {
	const {indexName, ammount} = route.params;

	return (
		<ScrollView style={styles.wrapper}>
			<Appbar.Header mode="center-aligned" style={styles.header}>
				<Appbar.BackAction onPress={navigation.goBack} />
			</Appbar.Header>
			<Text style={styles.title} variant="headlineLarge">To invest {ammount} in {indexName}, you need to buy the following companies</Text>
			<View style={styles.itemsWrapper}>
				{companies.map(({symbol, companyName, value}) => (
					<List.Item 
						key={symbol}
						style={styles.item}
						right={() => <View style={styles.ammountWrapper}><Text variant="titleMedium" style={styles.ammount}>{value}</Text></View>}
						left={() => <View style={styles.symbolWrapper}><Text style={styles.symbol} variant="labelLarge">{symbol}</Text></View>}
						title={companyName}
					/>
				))}
			</View>
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