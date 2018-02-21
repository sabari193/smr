import React from 'react';
import { StyleSheet, View, ScrollView, DatePickerAndroid, Switch } from 'react-native';
import { Card, colors, WalletHeader, MenuHeader, Button, Text } from '../../components/PocketUI/index';
import realm from '../../providers/realm';

export default class ViewSurveyDetails extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            personList: params.individualInfo,
            householdSurveyStatus: false
        }
        console.log('params', params)

    }

    static navigationOptions = {
        title: 'Survey Details view',
        headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
        headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
    };

    state = {
        selectedTab: 'ViewSurveyDetails'
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        realm.write(() => {
            this.setState({
                householdSurveyStatus: realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "open" && HouseholdID=$0', params.HouseholdID).length > 0 ? false : true
            });
        });

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
                            <WalletHeader
                                headingIcon={person.Sex}
                                heading={`${person.Name} / ${person.AgeGroup == 'C' ? 'Women campaign Form' : 'Children campaign Form'}`}
                                rightIcon='pencil-square'
                                rightIconClick={() => person.AgeGroup == 'C' ? navigate('WomenCampaignSurvey', { HouseholdID: params.HouseholdID }) : navigate('ChildCampaignSurvey', { HouseholdID: params.HouseholdID })}
                            />
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