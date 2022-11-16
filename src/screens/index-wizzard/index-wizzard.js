import React, {useContext, useState} from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {noop} from '../../utils/helpers';

import IndexState from './tabs/index-state/index-state';
import SelectIndex from './tabs/select-index/select-index';
import CreateIndex from './tabs/create-index/create-index';
import InvestIn from './tabs/invest-in/invest-in';
import CompaniesToInvest from './tabs/companies-to-invest/companies-to-invest';
import AddCompanies from './tabs/add-companies/add-companies';
import Summary from './tabs/summary/summary';

import {WizzardContext} from './wizzard-context';

const Tab = createBottomTabNavigator();

function IndexWizzard() {
	const [indexProps, setIndexProps] = useState({
		id: '',
		color: '',
		symbol: '',
		country: '',
		companies: [],		
		isNewIndex: false,
		isTrackingAllCompanies: false
	});

	const onNext = ({prevTabName, isNewIndex, id, country, isTrackingAllCompanies, companies, symbol, color}) => {
		switch(prevTabName) {
			case 'IndexState': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					isNewIndex
				}));

				return {
					tabName: isNewIndex ? 'CreateIndex' : 'SelectIndex',
					params: {
						progress: 0.25
					}
				};
			}
			break;
			case 'SelectIndex': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					id,
					symbol,
					country: id.split('_')[0]
				}));

				return {
					tabName: 'InvestIn',
					params: {
						progress: 0.5
					}
				};
			}
			break;
			case 'InvestIn': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					isTrackingAllCompanies
				}));

				return {
					tabName: isTrackingAllCompanies ? 'Summary' : 'CompaniesToInvest',
					params: {
						progress: isTrackingAllCompanies ? 1 : 0.75
					}
				};
			}
			break;
			case 'CompaniesToInvest': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					companies,
					symbol
				}));

				return {
					tabName: 'Summary',
					params: {
						progress: 1
					}
				};
			}
			break;
			case 'CreateIndex': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					symbol,
					color
				}));

				return {
					tabName: 'AddCompanies',
					params: {
						progress: 0.75
					}
				};
			}
			case 'AddCompanies': {
				setIndexProps(prevIndexProps => ({
					...prevIndexProps,
					companies
				}));

				return {
					tabName: 'Summary',
					params: {
						progress: 1
					}
				};
			}
			break;
			case 'Summary': {
				
			}
			break;
		}
		// <DevScreen/>
	}

	return (
		<WizzardContext.Provider value={{indexProps, onNext}}>
			<Tab.Navigator screenOptions={{ headerShown: false }} tabBar={noop} backBehavior="history">
				<Tab.Screen name="IndexState" component={IndexState} />
				<Tab.Screen name="SelectIndex" component={SelectIndex} />
				<Tab.Screen name="CreateIndex" component={CreateIndex} />
				<Tab.Screen name="InvestIn" component={InvestIn} />
				<Tab.Screen name="CompaniesToInvest" component={CompaniesToInvest} />
				<Tab.Screen name="AddCompanies" component={AddCompanies} />
				<Tab.Screen name="Summary" component={Summary} />
			</Tab.Navigator>
		</WizzardContext.Provider>
	);
}

const styles = StyleSheet.create({
	TabLayout: {

	},
	listRow: {
		borderWidth: 2,
		borderColor: 'white',
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8
	},
	isSelected: {
		borderColor: '#66ce47',
	},
	tabFooter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		position: 'absolute',
		bottom: 16,
		left: 0,
		right: 0
	}
})

export default IndexWizzard;