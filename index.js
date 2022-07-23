import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/app';
export default function Main() {
	return (
		<PaperProvider>
			<App />
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);

// https://dribbble.com/shots/4028772-Freebies-Flat-Flags-227