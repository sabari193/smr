import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import _ from 'lodash';
import {
    colors, FormRow, List, Button, ListItem,
    WalletHeader, RadioButton, Divider, FormInput, Card
} from '../../components/PocketUI/index';
import realm from '../../providers/realm';
import moment from 'moment'
export default class CompletedSurveyDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Completed Survey',
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 }
        }
    }
    state = {
        selectedTab: 'CompletedSurveyDetails'
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const surveyData = JSON.parse(params.surveyDetails);
        return (
            <ScrollView style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                {surveyData.map(function (survey, index) {
                    return <Card
                        key={index}
                        onPress={() => navigate('ViewSurveyDetails', { individualInfo: survey.IndividualInfo, HouseholdID: survey.HouseholdID })}
                        title={`Head Name : ${survey.HoueholdHead}`}
                        subTitle={`Household ID : ${survey.HouseholdID}`}
                        number={`Count : ${survey.selectedIndividualCount}`}
                        expiration={`Last Updated : ${moment().format('DD-MM-YYYY h:mm:ss a')}`}
                        moreText='View'
                    >
                    </Card>
                }, this)}
            </ScrollView>
        )
    }
}