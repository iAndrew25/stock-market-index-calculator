import React from 'react';
import { Image, View, TouchableOpacity, Linking } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import ScreenLayout from '../../components/screen-layout/screen-layout';

function Info({navigation, route}) {
	const handleOnPress = async () => {
		try {
			await Linking.openURL('https://play.google.com/store/apps/dev?id=5022131531953799940');
		} catch(error) {
			console.log('Info', error);
		}
	}

	return (
		<ScreenLayout
			title="Info"
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<View style={styles.section}>
				<Text variant="titleLarge" style={styles.title}>What is an index?</Text>
				<Text variant="bodyLarge">
					A <Text style={styles.bold}>stock market index</Text> is a tool used to measure a stock market performance. 
					In most cases, an index is made up of the <Text style={styles.bold}>most performant companies</Text> in a certain sector, exchange or economy.
				</Text>
			</View>
			<View style={styles.section}>
				<Text variant="titleLarge" style={styles.title}>How to invest in an index?</Text>
				<Text variant="bodyLarge">There are two ways to invest in an index:</Text>
				<View style={styles.listItem}>
					<Text variant="bodyLarge">1. by investing in an <Text style={styles.bold}>ETF</Text> (<Text style={styles.italic}>Exchange Traded Fund</Text>) that attempts to track the performance of an index;</Text>
				</View>
				<View style={styles.listItem}>
					<Text variant="bodyLarge">2. by investing in the <Text style={styles.bold}>individual companies</Text> that make up the index;</Text>
				</View>
			</View>
			<View style={styles.section}>
				<Text variant="titleLarge" style={styles.title}>What's the purpose of this app?</Text>
				<Text variant="bodyLarge">
					As the companies that are included in a certain index have <Text style={styles.bold}>different weights</Text>, and they are constantly changing, 
					it is often time consuming to always check the weight of each company when attempting to track the performance of the index by investing in <Text style={styles.bold}>individual companies</Text>.
				</Text>
				<Text variant="bodyLarge">
					By entering the ammount you're willing to invest in a specific index, the app shows you <Text style={styles.bold}>how much of each company you should buy</Text>.
				</Text>
			</View>
			<TouchableOpacity onPress={handleOnPress} style={styles.footer}>
				<Text style={styles.footerText}>Made with ❤️ in 🇷🇴</Text>
				<Image source={require('../../assets/logo/nativ-codes-logo.png')} resizeMode="contain" style={styles.ncLogo}/>
			</TouchableOpacity>
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	section: {
		marginHorizontal: 24,
		marginBottom: 24
	},
	title: {
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 8
	},
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	},
	listItem: {
		marginLeft: 24
	},
	footer: {
		marginTop: 24,
		opacity: 0.7
	},
	ncLogo: {
		width: 40,
		height: 40,
		alignSelf: 'center',
		marginTop: 16
	},
	footerText: {
		textAlign: 'center'
	}
});

export default Info;