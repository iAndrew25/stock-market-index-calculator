import React, {useContext, useState} from 'react';

import Company from '../../../../components/list-items/company/company';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext} from '../../wizzard-context';

const companiesToInvestOptions = [
	{id: '1', name: 'Company 1', symbol: 'C1', weight: '20%', value: 1000},
	{id: '2', name: 'Company 2', symbol: 'C2', weight: '20%', value: 1000},
	{id: '3', name: 'Company 3', symbol: 'C3', weight: '20%', value: 1000},
	{id: '4', name: 'Company 4', symbol: 'C4', weight: '20%', value: 1000},
	{id: '5', name: 'Company 5', symbol: 'C5', weight: '20%', value: 1000},
	{id: '6', name: 'Company 6', symbol: 'C6', weight: '20%', value: 1000},
	{id: '7', name: 'Company 7', symbol: 'C7', weight: '20%', value: 1000},
	{id: '8', name: 'Company 8', symbol: 'C8', weight: '20%', value: 1000},
	{id: '9', name: 'Company 9', symbol: 'C9', weight: '20%', value: 1000},
	{id: '10', name: 'Company 10', symbol: 'C10', weight: '20%', value: 1000},
	{id: '11', name: 'Company 11', symbol: 'C11', weight: '20%', value: 1000},
	{id: '12', name: 'Company 12', symbol: 'C12', weight: '20%', value: 1000}
];

function CompaniesToInvest({navigation, route}) {
	const [companies, setCompanies] = useState([]);
	const {onNext} = useContext(WizzardContext);
	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'CompaniesToInvest',
			companies
		});

		navigation.navigate(tabName, params);
	};

	return (
		<TabLayout
			title="Select companies"
			subtitle="the weights will adjust according to the selected companies and their original weights"
			progress={route.params.progress}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			<Selection
				Element={Company}
				options={companiesToInvestOptions}
				selected={companies}
				onChange={setCompanies}
				isMultiple
			/>			
		</TabLayout>
	);
}

export default CompaniesToInvest;