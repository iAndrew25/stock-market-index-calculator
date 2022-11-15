import React, {Fragment, useContext, useState, useRef} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RangeSlider from 'rn-range-slider';

import Company from '../../components/list-items/company/company';
import BottomSheet from '../../components/bottom-sheet/bottom-sheet';

const defaultCompany = {
	name: '',
	symbol: '',
	weight: 0
};

const getSliderMax = (usedWeight, weight, isEditMode) => {
	if(isEditMode) {
		return 100 - (usedWeight - weight);
	} else {
		if(usedWeight === 100) {
			return weight;
		} else {
			return 100 - usedWeight;
		}
	}
}

// TODO: reducer
function ManageCompany({navigation, route}) {
	const [company, setCompany] = useState(route.params?.company || defaultCompany);
	const isEditMode = Boolean(route.params?.company)

	const textInputColor = false ? '#ec5664' : "#66ce47";
	const sliderMax = useRef(getSliderMax(route.params?.usedWeight || 0, company.weight, isEditMode)).current;

	const handleOnAdd = () => {
		navigation.navigate('IndexWizzard', {
			screen: 'AddCompanies',
			params: {
				progress: 0.75,
				company,
				isEditMode
			},
		})
	}

	return (
		<Fragment>
			<TextInput
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Company name"
				value={company.name}
				onChangeText={name => setCompany(prevCompany => ({...prevCompany, name}))}
			/>
			<TextInput
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Company symbol"
				value={company.symbol}
				onChangeText={symbol => setCompany(prevCompany => ({...prevCompany, symbol}))}
			/>
			<TextInput
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Weight"
				value={company.weight.toString()}
				onChangeText={weight => setCompany(prevCompany => ({...prevCompany, weight}))}
			/>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				<RangeSlider
					style={{flex: 1, marginHorizontal: 16}}
					disableRange
					low={company.weight}
					min={0}
					max={sliderMax}
					step={1}
					// minRange={30}
					// floatingLabel
					renderThumb={() => <View style={{width: 20, height: 20, backgroundColor: 'red', borderRadius: 10}}/>}
					renderRail={() => <View style={{flex: 1, height: 8, backgroundColor: 'grey', borderRadius: 8}} />}
					renderRailSelected={() => <View style={{flex: 1, height: 8, backgroundColor: 'blue', borderRadius: 8}} />}
					renderLabel={no => <Text>{no}</Text>}
					// renderNotch={renderNotch}
					onSliderTouchEnd={weight => setCompany(prevCompany => ({...prevCompany, weight}))}
				/>
			</View>
			<Button style={{marginHorizontal: 16, marginTop: 16}} buttonColor="#66ce47" mode="contained" onPress={handleOnAdd}>
				Add company
			</Button>
			
			<View style={{marginVertical: 32, marginHorizontal: 32, height: 4, backgroundColor:'#ddd'}} />
		</Fragment>
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

export default ManageCompany;