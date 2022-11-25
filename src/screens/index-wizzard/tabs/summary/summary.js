import React, { useContext} from 'react';
import {View} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query'

import Company from '../../../../components/list-items/company/company';
import TabLayout from '../../components/tab-layout/tab-layout';
import IndexCard from '../../../../components/index-card/index-card';

import {WizzardContext} from '../../wizzard-context';
import {getCompanies} from '../../../../services';

function Summary({navigation, route}) {
	const dispatch = useDispatch();
	const {indexProps} = useContext(WizzardContext);

	const {data, isLoading} = useQuery({
		queryKey: [`companies-${indexProps.symbol}`, indexProps.symbol],
		queryFn: () => getCompanies(indexProps.symbol),
		enabled: indexProps.isTrackingAllCompanies
	});
	
	const handleOnFinish = () => {
		dispatch({
			type: 'INSERT_INDEX',
			payload: {
				...indexProps,
				...(indexProps.isTrackingAllCompanies && {
					companies: data?.data
				})
			}
		});

		navigation.navigate('Home');
	};

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
				<View style={{marginHorizontal: 16, backgroundColor: 'white', alignItems: 'center', borderRadius: 16}}>
					<IndexCard {...indexProps} />
				</View>
				<View style={{marginTop: 16, flexDirection:'column'}}>
					{(Boolean(indexProps.isTrackingAllCompanies) ? (data?.data || []) : indexProps.companies).map(item => (<Company key={item.id} {...item} />))}
				</View>

			<Text>{JSON.stringify(indexProps, null, 4)}</Text>
		</TabLayout>
	);
}

export default Summary;