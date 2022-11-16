import React, {useContext, useState} from 'react';
import { useQuery } from '@tanstack/react-query'

import Company from '../../../../components/list-items/company/company';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';
import {getCompanies} from '../../../../services';

import {WizzardContext} from '../../wizzard-context';

function CompaniesToInvest({navigation, route}) {
	const {indexProps: {symbol}, onNext} = useContext(WizzardContext);
	const {data, isLoading} = useQuery([`companies-${symbol}`, symbol], () => getCompanies(symbol));
	const [companies, setCompanies] = useState([]);

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'CompaniesToInvest',
			companies,
			symbol: `${symbol}(${companies.length})`
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
			{Boolean(data?.data?.length) && <Selection
				Element={Company}
				options={data.data}
				selected={companies}
				onChange={setCompanies}
				isMultiple
			/>}
		</TabLayout>
	);
}

export default CompaniesToInvest;