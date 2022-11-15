import React, {useContext, useState} from 'react';

import BaseRow from '../../../../components/list-items/base-row/base-row';
import Selection from '../../../../components/selection/selection';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext, options} from '../../wizzard-context';

const investInOptions = [{id: options.ALL, text: options.ALL}, {id: options.SOME, text: options.SOME}];

function InvestIn({navigation, route}) {
	const [investIn, setInvestIn] = useState(investInOptions[0]);
	const {onNext} = useContext(WizzardContext);
	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'InvestIn',
			isTrackingAllCompanies: investIn.id === options.ALL
		});

		navigation.navigate(tabName, params);
	};

	return (
		<TabLayout
			title="I want to invest in"
			progress={route.params.progress}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			<Selection
				Element={BaseRow}
				options={investInOptions}
				selected={investIn}
				onChange={setInvestIn}
			/>
		</TabLayout>
	);
}

export default InvestIn;