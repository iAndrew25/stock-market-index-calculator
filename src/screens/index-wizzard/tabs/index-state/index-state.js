import React, {useContext, useState} from 'react';
import {View} from 'react-native';

import BaseRow from '../../../../components/list-items/base-row/base-row';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext, options} from '../../wizzard-context';

const indexStateOptions = [{
	id: options.TRACK_INDEX,
	text: 'Track an existing index'
}, {
	id: options.CREATE_INDEX,
	text: 'Create my own index'
}];

function IndexState({navigation, route}) {
	const [indexState, setIndexState] = useState(indexStateOptions[0]);
	const {onNext} = useContext(WizzardContext);
	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'IndexState',
			isNewIndex: indexState.id === options.CREATE_INDEX
		});

		navigation.navigate(tabName, params);
	};

	return (
		<TabLayout
			title="I want to"
			progress={0}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			<View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Selection
					Element={BaseRow}
					options={indexStateOptions}
					selected={indexState}
					onChange={setIndexState}
				/>
			</View>
		</TabLayout>
	);
}

export default IndexState;