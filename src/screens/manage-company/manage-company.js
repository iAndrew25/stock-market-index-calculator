import React, {Fragment, useContext, useState, useRef, useReducer} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import { Button, Appbar, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RangeSlider from 'rn-range-slider';
import { v4 as uuidV4 } from 'uuid';

import Company from '../../components/list-items/company/company';
import BottomSheet from '../../components/bottom-sheet/bottom-sheet';

import {companyReducer, defaultCompany} from './manage-company.reducer';
import {getSliderMax} from './manage-company.utils';

function ManageCompany({navigation, route}) {
	const [company, dispatch] = useReducer(companyReducer, route.params?.company || defaultCompany);
	const isEditMode = Boolean(route.params?.company)

	const textInputColor = false ? '#ec5664' : "#66ce47";
	const sliderMax = useRef(getSliderMax(route.params?.usedWeight || 0, company?.weight, isEditMode)).current;

	const actionDispatcher = type => payload => dispatch({type, payload});

	const handleOnAdd = () => {
		navigation.navigate('IndexWizzard', {
			screen: 'AddCompanies',
			params: {
				isEditMode,
				progress: 0.75,
				company: {
					...company,
					id: uuidV4()
				}
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
				onChangeText={actionDispatcher('UPDATE_NAME')}
			/>
			<TextInput
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Company symbol"
				value={company.symbol}
				onChangeText={actionDispatcher('UPDATE_SYMBOL')}
			/>
			<TextInput
				style={styles.inputBudget}
				mode="outlined"
				outlineColor={textInputColor}
				activeOutlineColor={textInputColor}
				label="Weight"
				value={company.weight.toString()}
				onChangeText={actionDispatcher('UPDATE_WEIGHT')}
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
					onSliderTouchEnd={actionDispatcher('UPDATE_WEIGHT')}
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