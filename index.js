import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './src/app';
import AppStore from './src/config/store';
import { name as appName } from './app.json';

const queryClient = new QueryClient();

export default function Main() {
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider>
				<AppStore>
					<App />
				</AppStore>
			</PaperProvider>
		</QueryClientProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);

// https://dribbble.com/shots/4028772-Freebies-Flat-Flags-227
// Both "indexes" and "indices" are acceptable plural forms of the word "index"

//https://www.slickcharts.com/dowjones
//https://indexarb.com/indexComponentWtsDJ.html