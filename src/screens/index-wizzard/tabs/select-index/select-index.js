import React, {useContext, useState} from 'react';

import BaseRow from '../../../../components/list-items/base-row/base-row';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext} from '../../wizzard-context';

const selectIndexOptions = [{id: 'BET', text: 'BET index'}, {id: 'NSQ', text: 'NSQ index'}];

function SelectIndex({navigation, route}) {
	const [selectedIndex, setSelectedIndex] = useState(selectIndexOptions[0]);
	const {onNext} = useContext(WizzardContext);
	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'SelectIndex',
			indexId: selectedIndex.id
		});

		navigation.navigate(tabName, params);
	};

	return (
		<TabLayout
			title="Select index"
			progress={route.params.progress}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			<Selection
				Element={BaseRow}
				options={selectIndexOptions}
				selected={selectedIndex}
				onChange={setSelectedIndex}
			/>
		</TabLayout>
	);
}

export default SelectIndex;