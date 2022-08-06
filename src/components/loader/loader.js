import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

function Loader() {
	return (
		<View style={styles.wrapper}>
			<ActivityIndicator size="large" color="#66ce47" />
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		...StyleSheet.absoluteFill,
		top: 56,
		backgroundColor: '#f7f7f7',
		opacity: 0.9,
		zIndex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center'
	}
});

export default Loader;