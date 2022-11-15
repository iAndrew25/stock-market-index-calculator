import React, {Fragment, useContext, useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RangeSlider from 'rn-range-slider';

import Company from '../../../../components/list-items/company/company';
import BottomSheet from '../../../../components/bottom-sheet/bottom-sheet';
import TabLayout from '../../components/tab-layout/tab-layout';

import {WizzardContext} from '../../wizzard-context';

function AddCompanies({navigation, route}) {
	const [companies, setCompanies] = useState([]);
	const [usedWeight, setUsedWeight] = useState(0);

	const showBottomSheet = () => setIsBottomSheetVisible(true);
	const hideBottomSheet = () => setIsBottomSheetVisible(false);

	const {onNext} = useContext(WizzardContext);

	const textInputColor = false ? '#ec5664' : "#66ce47";

	const handleOnNext = () => {
		const {tabName, params} = onNext({
			prevTabName: 'AddCompanies',
			companies
		});

		navigation.navigate(tabName, params);
	};

	const handleOnAdd = company => () => {
		navigation.navigate('ManageCompany', {usedWeight, company});
	}

	React.useEffect(() => {
		if (route.params?.company) {
			if(route.params.isEditMode) {
				const prevCompany = companies.find(({symbol}) => symbol === route.params.company.symbol);
				setCompanies(prevCompanies => prevCompanies.map(company => company.symbol === route.params?.company.symbol ? route.params?.company : company));
				setUsedWeight(prevUsedWeight => prevUsedWeight - prevCompany.weight + Number(route.params?.company?.weight));
			} else {
				setCompanies(prevCompanies => [...prevCompanies, route.params?.company]);
				setUsedWeight(prevUsedWeight => prevUsedWeight + Number(route.params?.company?.weight));
			}
		}
	}, [route.params?.company]);

	return (
		<TabLayout
			title="Add companies"
			progress={route.params.progress}
			onPrimaryPress={handleOnNext}
			onSecondaryPress={navigation.goBack}
			primaryText="Next"
			secondaryText="Back"
		>
			{usedWeight !== 100 && <Button style={{marginHorizontal: 16, marginTop: 16}} buttonColor="#66ce47" mode="contained" onPress={handleOnAdd()}>
				Add category - {100 - usedWeight}% left
			</Button>}
			{companies.map(({name, symbol, weight}) => <Company
				key={symbol}
				symbol={symbol}
				weight={weight}
				name={name}
				handleOnChange={handleOnAdd({name, symbol, weight})}
			/>)}
		</TabLayout>
	);
}

const styles = StyleSheet.create({
	inputBudget: {
		marginHorizontal: 24,
		// flex: 1
	},
	// errorMessage: {
	// 	color: '#ec5664',
	// 	marginLeft: 24,
	// 	marginTop: 4
	// }
});

export default AddCompanies;