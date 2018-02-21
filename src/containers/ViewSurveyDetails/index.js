import React from 'react';
import { StyleSheet, View, ScrollView, DatePickerAndroid, Switch } from 'react-native';
import { Card, colors, WalletHeader, MenuHeader, Button, Text } from '../../components/PocketUI/index';
import realm from '../../providers/realm';
import _ from 'lodash';

export default class ViewSurveyDetails extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            personList: '',
            householdSurveyStatus: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
            headerLeft: null,
            headerRight: (
                <Button
                    buttonStyle={{ width: 170, height: 100, backgroundColor: '#4c9689' }}
                    title='Save'
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
        }
    }

    state = {
        selectedTab: 'ViewSurveyDetails'
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID)
        this.setState({
            personList: realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID),
            householdSurveyStatus: realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "open" && HouseholdID=$0', params.HouseholdID).length > 0 ? false : true
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSubmit: this.handleSubmit.bind(this), goHome: this._goHome.bind(this) });
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    handleSubmit() {
        const { params } = this.props.navigation.state;
        const openSurveyCount = realm.objects('SurveyInformation').filtered('status = "open" && HouseholdID=$0', params.HouseholdID).length
        if (openSurveyCount > 0) {
            alert('Please save all forms for this household before submitting')
        }
        else {
            const surveyList = realm.objects('SurveyInformation').filtered('HouseholdID=$0', params.HouseholdID)
            realm.write(() => {
                _.forEach(surveyList, (survey) => {
                    realm.create('SurveyInformation', { surveyID: survey.surveyID, status: 'saved' }, true);
                });
            });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {(!this.state.householdSurveyStatus) &&
                        <Button
                            buttonStyle={{ marginTop: 75, marginBottom: 30 }}
                            title={`Household survey for ${params.HouseholdID}`}
                            onPress={() =>
                                navigate('HouseholdForm', { HouseholdID: params.HouseholdID })
                            }
                        />
                    }
                    {(this.state.householdSurveyStatus) &&
                        <Button
                            disabled={true}
                            buttonStyle={{ marginTop: 75, marginBottom: 30, backgroundColor: 'grey' }}
                            title={`Household survey for ${params.HouseholdID} completed`}
                            onPress={() =>
                                navigate('HouseholdForm', { HouseholdID: params.HouseholdID })
                            }
                        />
                    }
                    {this.state.personList.map(function (person, index) {
                        return <View key={index}>
                            {(person.AgeGroup != 'H') &&
                                <View>
                                    {(person.status != 'open') &&
                                        <WalletHeader
                                            headingIcon={person.Sex}
                                            heading={`${person.Name} / ${person.AgeGroup == 'C' ? 'Women campaign Form' : 'Children campaign Form'}`}
                                            rightIcon='check-square-o'
                                        />
                                    }
                                    {(person.status == 'open') &&
                                        <WalletHeader
                                            headingIcon={person.Sex}
                                            heading={`${person.Name} / ${person.AgeGroup == 'C' ? 'Women campaign Form' : 'Children campaign Form'}`}
                                            rightIcon='pencil-square'
                                            rightIconClick={() => person.AgeGroup == 'C' ? navigate('WomenCampaignSurvey', { HouseholdID: params.HouseholdID, Sno: person.Sno }) : navigate('ChildCampaignSurvey', { HouseholdID: params.HouseholdID, Sno: person.Sno })}
                                        />
                                    }
                                </View>
                            }
                        </View>;
                    }, this)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flex: 1,
    },
    headingLetter: {
        color: '#3E4A59',
        fontWeight: '800',
        fontSize: 25,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 35
    }
});