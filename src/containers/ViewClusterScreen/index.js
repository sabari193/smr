import React from 'react';
import {
    StyleSheet, View, ScrollView,
    DatePickerAndroid, Switch, Alert, Image, NetInfo
} from 'react-native';
import _ from 'lodash';
import { Card, colors, Button, Text } from '../../components/PocketUI/index';
import * as axios from 'axios';
import realm from '../../providers/realm';

export default class ViewClusterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            householdList: [],
            clusterInfo: '',
            loading: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
            headerRight: (
                <Button
                    buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                    fontSize={30}
                    title='Submit to Server'
                    onPress={params.handleSubmit}
                />
            ),
            headerLeft: (
                <Button
                    buttonStyle={{ width: 100, height: 100, backgroundColor: '#4c9689', marginRight: 10 }}
                    fontSize={25}
                    title='Home'
                    onPress={params.goHome}
                />
            )
        };
    };

    state = {
        selectedTab: 'ViewClusterScreen'
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    componentWillMount() {
        this.setState({
            clusterInfo: JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status="active"')))
        });
        this.props.navigation.setParams({ handleSubmit: this.handleSubmit.bind(this), goHome: this._goHome.bind(this) });
        const obj = JSON.parse(JSON.stringify(realm.objects('Household').filtered('Submitted="inprogress"')));
        const result = _.chain(obj).groupBy('HouseholdID').map((group, HouseholdID) => ({ // map the groups to new objects
            HouseholdID,
            HouseholdPrimary: group[0].HouseholdPrimary,
            IndividualsCount: group[0].Name ? String(group.length) : '0',
            headName: group[0].Name,
            UpdatedTime: group[group.length - 1].UpdatedTime,
            latitude: group[0].latitude ? group[0].latitude : '',
            longitude: group[0].longitude ? group[0].longitude : '',
            accuracy: group[0].accuracy ? group[0].accuracy : '',
            HouseholdStatusValue: group[0].HouseholdStatusValue,
            IndividualInfo: group.map(({ Age, DOB, Name, Sex, id, IsPersonAvailable, KnowDOB, AgeDays }) => ({
                Age,
                DOB,
                Name,
                Sex,
                id,
                IsPersonAvailable,
                KnowDOB,
                AgeDays
            }))
        })).value();
        this.setState({
            householdList: result
        });
    }
    handleSubmit() {
        const { dispatch } = this.props.navigation;
        /* NetInfo.isConnected.fetch().then(isConnected => {
            alert('isConnected', isConnected);
        }); */
        Alert.alert(
            'Submit Household Information',
            'Do you want to submit household information for the cluster ',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        this.setState({
                            loading: true
                        });
                        const postData = {
                            ClusterId: this.state.clusterInfo[0].clusterID,
                            PlaceName: this.state.clusterInfo[0].villageName,
                            CensusForm: this.state.householdList
                        };
                        console.log('postData', postData);
                        axios.post('http://www.allianceaircon.com/MRSurvey/CensusDetails.php', postData)
                            .then((response) => {
                                console.log(response);

                                //let idList = [];
                                realm.write(() => {
                                    _.forEach(this.state.householdList, (house) => {
                                        realm.create('HouseholdNumber', { HouseholdPrimary: house.HouseholdPrimary, Submitted: 'completed' }, true);
                                        _.forEach(house.IndividualInfo, (person) => {
                                            realm.create('Household', { id: person.id, Submitted: 'completed' }, true);
                                        });
                                    });
                                    this.setState({
                                        loading: false
                                    });
                                    dispatch({ type: 'goToDashboard' });
                                });
                            })
                            .catch((error) => {
                                console.log(JSON.stringify(error));
                                if (JSON.stringify(error).status == '503' || JSON.stringify(error).status == '503') {
                                    if (realm.objects('ServerUnavailable').length == 0) {
                                        realm.write(() => {
                                            realm.create('ServerUnavailable', { updatedTimeStamp: new Date() });
                                        });
                                    } else {
                                        const lastUpdatedTime = JSON.parse(JSON.stringify(realm.objects('ServerUnavailable')))[0].updatedTimeStamp;
                                        const timeDifference = Math.floor((new Date().getTime() - lastUpdatedTime) / (1000 * 60));
                                        if (timeDifference > 15) {

                                        }
                                    }
                                }
                                this.setState({
                                    loading: false
                                });
                                dispatch({ type: 'goToDashboard' });
                            });
                        console.log('submit clutser information', postData);
                    }
                },
            ],
            { cancelable: false }
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {(this.state.loading) &&
                    <ScrollView style={{ backgroundColor: 'white', opacity: 0.7 }}>
                        <View style={{ marginTop: 250, marginLeft: 160 }}>
                            {/* <Image
                                source={require('../../images/loader.gif')}
                            /> */}
                            <Text style={{ fontSize: 40, marginTop: 100 }}>Loading....</Text>
                        </View>
                    </ScrollView>
                }
                {(!this.state.loading) &&
                    <ScrollView style={{ backgroundColor: 'white' }}>
                        <Text style={styles.headingLetterMain}>HouseHold Information</Text>
                        <View>
                            {this.state.householdList.map(function (house, index) {
                                return (<Card
                                    key={house.HouseholdID}
                                    onPress={() => { house.IndividualsCount > 0 ? navigate('ViewHousehold', { headName: house.headName, members: house.IndividualInfo, HouseholdID: house.HouseholdID, clusterInfo: this.state.clusterInfo }) : alert('Members not available'); }}
                                    title={`Head Name : ${house.headName}`}
                                    subTitle={`Household ID : ${house.HouseholdID}`}
                                    number={`Count : ${house.IndividualsCount}`}
                                    expiration={`Last Updated : ${house.UpdatedTime}`}
                                    subTitle2={`Household Status : ${house.HouseholdStatusValue}`}
                                    moreText='View'
                                />);
                            }, this)}
                        </View>
                    </ScrollView>
                }

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flex: 1,
    },
    headingLetterMain: {
        color: '#3E4A59',
        fontWeight: '800',
        fontSize: 30,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 30,
        flex: 1,
        textAlign: 'center'
    }
});
