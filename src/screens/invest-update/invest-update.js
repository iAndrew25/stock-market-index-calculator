import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';

import { TabView, SceneMap } from 'react-native-tab-view';

import ScreenLayout from '../../components/screen-layout/screen-layout';

const Page = ({route}) => {
	const textInputColor = false ? '#ec5664' : "#66ce47";

	return (
		<View style={{flex: 1, paddingHorizontal: 24}}>
			<Text variant="headlineMedium" style={styles.bold}>{route.name}?</Text>
				<TextInput
					autoFocus
					mode="outlined"
					keyboardType="numeric"
					outlineColor={textInputColor}
					activeOutlineColor={textInputColor}
					label="Amount"
					defaultValue={route.value}
					// value={budget}
					// onChangeText={setBudget}
				/>
		</View>
	);
}

function InvestUpdate({navigation, route}) {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const routes = React.useRef(route.params.companies.map(({id, ...rest}) => ({key: id, id, ...rest}))).current;
	const renderScene = SceneMap(
		routes.reduce((total, {id}) => ({
			...total,
			[id]: Page
		})
	, {}));

	return (
		<ScreenLayout
			// isLoading={isLoading}
			title={`How much did you invest in`}
			appbarChildren={<Appbar.BackAction onPress={navigation.goBack} />}
		>
			<TabView
				renderTabBar={() => null}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold'
	}
});

export default InvestUpdate;