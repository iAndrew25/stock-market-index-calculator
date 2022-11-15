import React, {Fragment, useRef} from 'react';
import { Animated, ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import ProgressBar from '../../../../components/progress-bar/progress-bar';

function TabLayout({title, subtitle, progress, children, primaryText, onPrimaryPress, secondaryText, onSecondaryPress}) {
	const scrollRef = useRef(new Animated.Value(0)).current;

	return (
		<Fragment>
			<View style={styles.wrapper}>
				<ProgressBar progress={progress} />
			</View>
			<Animated.View style={StyleSheet.compose(styles.divider, {
				opacity: scrollRef.interpolate({
					inputRange: [0, 50],
					outputRange: [0, 1]
				})
			})} />
				
			<Animated.ScrollView contentContainerStyle={styles.scrollViewContainer} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollRef}}}], {useNativeDriver: true})}>
				{Boolean(title) && <Text variant="headlineMedium" style={styles.title}>{title}</Text>}
				{Boolean(subtitle) && <Text variant="bodyLarge" style={styles.description}>{subtitle}</Text>}
				<View style={styles.children}>
					{children}
				</View>
			</Animated.ScrollView>
			<View style={styles.footer}>
				<Button
					buttonColor="#ffffff"
					textColor="#000000"
					mode="text"
					// mode="contained"
					style={{marginHorizontal: 8}}
					onPress={onSecondaryPress}
				>
					{secondaryText}
				</Button>
				<Button
					buttonColor="#66ce47"
					mode="contained"
					textColor="#000"
					style={{marginHorizontal: 8}}
					onPress={onPrimaryPress}
				>
					{primaryText}
				</Button>
			</View>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider: {
		width: '100%',
		borderColor: '#ededed',
		borderBottomWidth: 1,
	},
	scrollViewContainer: {
		paddingBottom: 80
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	description: {
		textAlign: 'center',
		marginTop: 8
	},
	children: {
		// alignItems: 'center',
		marginTop: 16,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		position: 'absolute',
		bottom: 16,
		left: 0,
		right: 0
	}
})

export default TabLayout;