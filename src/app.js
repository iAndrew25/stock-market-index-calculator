import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNBootSplash from "react-native-bootsplash";

import Home from './screens/home/home';
import Info from './screens/info/info';
import Calculate from './screens/calculate/calculate';
import Composition from './screens/composition/composition';
import DevScreen from './screens/_dev-screen/dev-screen';
import IndexWizzard from './screens/index-wizzard/index-wizzard';
import ManageCompany from './screens/manage-company/manage-company';

const Stack = createNativeStackNavigator();
const screenOptions = {
	headerShown: false
};

function App() {
	// return <DevScreen />

	useEffect(() => {
		RNBootSplash.hide();
	}, [])

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Info" component={Info} />
				<Stack.Screen name="Calculate" component={Calculate} />
				<Stack.Screen name="Composition" component={Composition} />
				<Stack.Screen name="IndexWizzard" component={IndexWizzard} />
				<Stack.Screen name="ManageCompany" component={ManageCompany} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;