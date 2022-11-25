import React, {useContext, useState, useMemo} from 'react';
import { useQuery } from '@tanstack/react-query'

import Company from '../../../../components/list-items/company/company';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';
import {getCompanies} from '../../../../services';

import {WizzardContext} from '../../wizzard-context';
import {listToObject} from '../../../../utils/helpers';

const adjustCompaniesWeight = (companies, company) => {
	const updatedCompanies = companies.map(({newWeight, ...currentCompany}) => {
		if (currentCompany.id === company.id) {
			const isSelected = !Boolean(currentCompany.isSelected);
			return {
				...currentCompany,
				isSelected,
				...(isSelected && newWeight)
			}
		} else {
			return currentCompany;	
		};
	});
	
	const totalWeightLeft = updatedCompanies.filter(({isSelected}) => Boolean(isSelected)).reduce((total, item) => total + Number(item.weight), 0);

	return updatedCompanies.map(item => item.isSelected ? ({...item, newWeight: (item.weight / totalWeightLeft) * 100}) : item);
}

function CompaniesToInvest({navigation, route}) {
	const {indexProps: {symbol}, onNext} = useContext(WizzardContext);
	const [companies, setCompanies] = useState([]);
	const {data, isLoading} = useQuery([`companies-${symbol}`, symbol], async () => setCompanies((await getCompanies(symbol))?.data));

	const handleOnPress = company => () => setCompanies(prevCompanies => adjustCompaniesWeight(prevCompanies, company));

	const handleOnNext = () => {
		const selectedCompanies = companies.filter(({isSelected}) => Boolean(isSelected)).map(({isSelected, ...rest}) => rest);

		const {tabName, params} = onNext({
			companies: selectedCompanies,
			prevTabName: 'CompaniesToInvest',
			label: `${symbol}(${selectedCompanies.length})`
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
			{Boolean(companies?.length) && companies.map(company => (
				<Company 
					{...company}
					key={company.id}
					onPress={handleOnPress(company)}
				/>
			))}
		</TabLayout>
	);
}

export default CompaniesToInvest;