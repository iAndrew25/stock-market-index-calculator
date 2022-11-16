import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query'

import BaseRow from '../../../../components/list-items/base-row/base-row';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';
import IndexCard from '../../../../components/index-card/index-card';

import {WizzardContext} from '../../wizzard-context';

import {getMarketIndexes} from '../../../../services';

const sortByCountry = (marketIndexes = []) => marketIndexes.sort((first, second) => first.country > second.country);

function SelectIndex({navigation, route}) {
	const {data, isLoading} = useQuery(['marketIndexes'], getMarketIndexes);
	const indexesList = sortByCountry(data?.data);

	const [selectedIndex, setSelectedIndex] = useState(indexesList[0]);
	const {onNext} = useContext(WizzardContext);

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'SelectIndex',
			id: selectedIndex.id,
			symbol: selectedIndex.symbol
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
			<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
				<Selection
					Element={IndexCard}
					options={indexesList}
					selected={selectedIndex}
					onChange={setSelectedIndex}
				/>
			</View>
		</TabLayout>
	);
}

export default SelectIndex;