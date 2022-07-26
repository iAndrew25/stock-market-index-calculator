import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home/home';
import Info from './screens/info/info';
import Calculate from './screens/calculate/calculate';
import Composition from './screens/composition/composition';

const Stack = createNativeStackNavigator();
const screenOptions = {
	headerShown: false
};

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Info" component={Info} />
				<Stack.Screen name="Calculate" component={Calculate} />
				<Stack.Screen name="Composition" component={Composition} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;