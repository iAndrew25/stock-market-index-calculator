import React, { useContext} from 'react';
import { Text } from 'react-native-paper';

import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext} from '../../wizzard-context';

function Summary({navigation, route}) {
	const {indexProps, onNext} = useContext(WizzardContext);
	const handleOnFinish = () => navigation.navigate('Home');

	return (
		<TabLayout
			title="Summary"
			//subtitle="the weights will adjust according to the selected companies and their original weights"
			progress={route.params.progress}
			onPrimaryPress={handleOnFinish}
			onSecondaryPress={navigation.goBack}
			primaryText="Finish"
			secondaryText="Back"
		>
			<Text>{JSON.stringify(indexProps, null, 4)}</Text>
		</TabLayout>
	);
}

export default Summary;