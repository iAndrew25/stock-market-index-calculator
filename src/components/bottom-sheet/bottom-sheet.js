import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import RNModal from 'react-native-modal';

function BottomSheet({ title, children, style, ...props }) {
	return (
		<RNModal backdropTransitionOutTiming={0} style={styles.bottomSheet} {...props}>
			<View
				style={StyleSheet.compose(styles.bottomSheetInnerWrapper)}>
				<View style={styles.header}>
					<Text variant="tm" textTransform="uppercase" color="primaryText" fontWeight="bold">
						{title}
					</Text>
				</View>
				<ScrollView keyboardShouldPersistTaps="handled" style={StyleSheet.compose(styles.content, style)}>
					{children}
				</ScrollView>
			</View>
		</RNModal>
	);
}

const styles = StyleSheet.create({
	bottomSheet: {
		margin: 0,
		justifyContent: 'flex-end',
	},
	bottomSheetInnerWrapper: {
		maxHeight: '70%',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: 'white'
	},
	header: {
		padding: 16
	},
	content: {
		paddingBottom: 32
	}
});

export default BottomSheet;
