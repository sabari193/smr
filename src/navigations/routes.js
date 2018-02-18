import React from 'react';
//import { Button } from '../components/PocketUI';
import HomeScreen from '../containers/HomeScreen/index';
import DashboardScreen from '../containers/DashboardScreen/index';
import HouseHoldScreen from '../containers/HouseHoldScreen/index';
import AddIndividualScreen from '../containers/AddIndividualScreen/index';
/* import ClusterScreen from "../containers/ClusterScreen/index";

import ClusterFormScreen from '../containers/ClusterFormScreen/index';


import ViewClusterScreen from '../containers/ViewClusterScreen/index';
import ViewHouseholdDetails from '../containers/ViewHouseholdDetails/index';
import EditIndividual from '../containers/EditIndividual/index';
import RandomListScreen from '../containers/RandomListScreen/index';
import ViewSurveyDetails from '../containers/ViewSurveyDetails/index';
import HouseholdSurvey from "../containers/HouseholdSurvey/index";
import WomenCampaignSurvey from '../containers/WomenCampaignSurvey/index'; */

const Routes = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Cluster Information',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold', color: '#fff' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    },
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            title: 'Survey Dashboard',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    },
    HouseHold: {
        screen: HouseHoldScreen,
        navigationOptions: {
            title: 'Add Household',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    },
    AddIndividual: {
        screen: AddIndividualScreen,
        navigationOptions: {
            title: 'Add Household Individual',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, padding: 10, backgroundColor: '#4c9689' },
            headerLeft: null
        }
    }
    /*
    ViewCluster: {
        screen: ViewClusterScreen
    },
    ViewHousehold: {
        screen: ViewHouseholdDetails
    },
    EditIndividual: {
        screen: EditIndividual
    },
    RandomListScreen: {
        screen: RandomListScreen
    },
    ViewSurveyDetails: {
        screen: ViewSurveyDetails,
        navigationOptions: {
            title: 'Survey Details'
        }
    },
    HouseholdForm: {
        screen: HouseholdSurvey,
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            return {
                title: 'Househould Survey',
                headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
                headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
                headerRight: (
                    <Button
                        buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                        title='Save'
                        onPress={params.handleSubmit}
                    />
                )
            }
        }
    },
    WomenCampaignSurvey: {
        screen: WomenCampaignSurvey,
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            return {
                title: 'Women Campaign Survey',
                headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
                headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
                headerRight: (
                    <Button
                        buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                        title='Save'
                        onPress={params.handleSubmit}
                    />
                )
            }
        }
    } */
};

export default Routes;