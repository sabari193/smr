import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Image } from 'react-native';
import _ from 'lodash';
import * as axios from 'axios';
import {
    colors, FormRow, List, Button, ListItem,
    WalletHeader, RadioButton, Divider, FormInput, Card
} from '../../components/PocketUI/index';
import realm from '../../providers/realm';
import moment from 'moment'
export default class RandomListScreen extends React.Component {
    state = {
        selectedTab: 'RandomListScreen'
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            surveyDetails: []
        }
    }
    componentWillMount(props) {
        const { navigate } = this.props.navigation;
        if (realm.objects('RandomSurvey').length === 0) {
            const ClusterId = JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status = "active"')))[0].clusterID;
            Alert.alert(
                'Generate Random List',
                'Do you want to generate random list ?',
                [
                    { text: 'Cancel', onPress: () => { navigate('Dashboard'); console.log('cancel generating random list') }, style: 'cancel' },
                    {
                        text: 'Generate', onPress: () => {
                            axios.post('http://www.allianceaircon.com/MRSurvey/surveydetails_request.php', {
                                ClusterId: ClusterId
                            })
                                .then((response) => {
                                    if (!response.data.Message) {
                                        realm.write(() => {
                                            realm.create('RandomSurvey', { clusterID: ClusterId, surveyDetails: JSON.stringify(response.data.SurveyDetails), status: 'saved' });
                                        });
                                        this.setState({ surveyDetails: response.data.SurveyDetails, loading: false });
                                    }
                                    else {
                                        alert('No List available');
                                        navigate('Dashboard');
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                ],
                { cancelable: false }
            );
        }
        else {
            const surveyDatafromRealm = JSON.parse(JSON.stringify(realm.objects('RandomSurvey')))[0].surveyDetails;
            this.setState({ loading: false, surveyDetails: JSON.parse(surveyDatafromRealm) });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: 'white', opacity: 0.7 }}>
                {(this.state.loading) &&
                    <View style={{ marginTop: 250, marginLeft: 160 }}>
                        {/* <Image
                            source={require('../../images/loader.gif')}
                        /> */}
                        <Text style={{ fontSize: 40, marginTop: 100 }}>Loading....</Text>
                    </View>
                }
                {(!this.state.loading) &&
                    <ScrollView style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                        {this.state.surveyDetails.map(function (survey, index) {
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
                }
            </ScrollView>
        )
    }
}