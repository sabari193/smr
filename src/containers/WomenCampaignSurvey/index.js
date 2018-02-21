import React from 'react';
import { StyleSheet, TouchableHighlight, ScrollView, View, Alert, TextInput } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class WomenCampaignSurvey extends ValidationComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
            headerStyle: { height: 60, borderWidth: 1, borderBottomColor: 'white', padding: 10 },
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
        selectedTab: 'WomenCampaignSurvey'
    };
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.optionList = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '88', label: 'Dont Know' }];

        this.optionListBoolean = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' }];

        this.maritalStatus = [
            { value: '01', label: 'Married' },
            { value: '02', label: 'Unmarried' }
        ];

        this.mrdoseoptions = [
            { value: '01', label: 'Yes, Documented' },
            { value: '02', label: 'Yes, Reported' },
            { value: '03', label: 'No' },
            { value: '88', label: 'Dont Know' }
        ];

        this.state = {
            surveyType: '',
            w2name: '',
            w3dob: '',
            w3adayunknown: '01',
            w3bmonthunknown: '01',
            w4age: '',
            w5maritalstat: '01',
            w6children : '',
            w7livehhcampaign: '01',
            w8mrcampaigndose: '',
            w9mrvaxhistory: '01',
            w11intcomments: '',            
        };

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                marginTop: 50,
                padding: 20,
                backgroundColor: '#ffffff',
            },
            title: {
                fontSize: 30,
                alignSelf: 'center',
                marginBottom: 30
            },
            buttonText: {
                fontSize: 18,
                color: 'white',
                alignSelf: 'center'
            },
            button: {
                height: 36,
                backgroundColor: '#48BBEC',
                borderColor: '#48BBEC',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                alignSelf: 'stretch',
                justifyContent: 'center'
            }
        });
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    componentWillMount() {
        this.props.navigation.setParams({ handleSubmit: this.onPress.bind(this), goHome: this._goHome.bind(this) });
        const surveyType = realm.objects('Cluster').filtered('status = "active"')[0].surveyType;
        this.setState({ surveyType: surveyType});
    }

    onChange(value) {
        this.setState({ formValue: value });
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        if (this.isFormValid()) {
            /* this.setState({
                h1hhid: params.HouseholdID,
                h4avisit1: moment().format('MM-DD-YYY h:mm:ss a'),
                h27latitude: '2.2',
                h28longitude: '3.3'
            }); */
            const surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 && HouseholdID=$1', params.Sno, params.HouseholdID)[0].surveyID;
            realm.write(() => {
                realm.create('SurveyInformation', { surveyID: surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                navigate('RandomListScreen');
            });
        }
        else {
            Alert.alert(
                'Validation Error',
                'Mandatory Fields are missing',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={this.styles.container}>
                {/* <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetterErr}>{this.getErrorMessages()}</Text>
                </View> */}

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Women's Full Name</Text>
                    <FormInput
                       value={this.state.w2name}
                       onChangeText={(name) => this.setState({ w2name: name })}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>On what day, month and year you born?</Text>
                    <FormInput
                        value={this.state.w3dob}
                        onChangeText={(name) => this.setState({ w3dob: name })}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Was day unknoun in date of birth?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal={true}
                        radio_props={this.optionListBoolean}
                        initial={0}
                        onPress={(value) => { this.setState({ w3adayunknown: value }); console.log(this.state) }}
                    />
                </View >
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Was month unknown in the date of birth?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal={true}
                        radio_props={this.optionListBoolean}
                        initial={0}
                        onPress={(value) => { this.setState({ w3bmonthunknown: value }); console.log(this.state) }}
                    />
                </View >
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>How old are you?</Text>
                            <FormInput
                                value={this.state.w4age}
                                onChangeText={(name) => this.setState({ w4age: name })} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>What is your current marital status?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.maritalStatus}
                                initial={0}
                                onPress={(value) => { this.setState({ w5maritalstat: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>How many children have you had?</Text>
                            <FormInput
                                value={this.state.w6children}
                                onChangeText={(name) => this.setState({ w6children: name })} />
                        </View>
                        { this.state.surveyType === '02' &&
                        <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Were you living in this household when the MR campaign was occuring?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ w7livehhcampaign: value }); console.log(this.state) }}
                            />
                        </View>                        
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Did you receive a MR dose during the recent vaccination campaign?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.mrdoseoptions}
                                initial={0}
                                onPress={(value) => { this.setState({ w8mrcampaigndose: value }); console.log(this.state) }}
                            />
                        </View>
                        </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Do you have any history of vaccines with rubella vaccine such as a Measles-Rubella(MR) or Measles-Mumps-Rubella(MMR) vaccine?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionList}
                                initial={0}
                                onPress={(value) => { this.setState({ w9mrvaxhistory: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Interviewer's comment</Text>
                            <FormInput
                                value={this.state.w11intcomments}
                                onChangeText={(name) => this.setState({ w11intcomments: name })} />
                        </View>
                    </View>
            </ScrollView >
        );
    }

}

const styles = StyleSheet.create({
    headingLetter: {
        color: '#3E4A59',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    },
    headingLetterErr: {
        color: 'red',
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    }
});
