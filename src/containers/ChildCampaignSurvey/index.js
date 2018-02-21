import React from 'react';
import { StyleSheet, TouchableHighlight, ScrollView, View, Alert, TextInput } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class ChildCampaignSurvey extends ValidationComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Household Survey',
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
        selectedTab: 'ChildCampaignSurvey'
    };
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.household_status = [
            { value: '01', label: 'AGREED TO PARTICIPATE' },
            { value: '02', label: 'NO HOUSEHOLD MEMBER AT HOME OR NO COMPETENT RESPONDENT AT HOME AT TIME OF VISIT' },
            { value: '03', label: 'ENTIRE HOUSEHOLD ABSENT FOR EXTENDED PERIOD OF TIME' },
            { value: '04', label: 'POSTPONED' },
            { value: '05', label: 'REFUSED – DUE TO CONCERNS OF BLOOD COLLECTION' },
            { value: '06', label: ' REFUSED – OTHER REASONS, WILL RESCHEDULE VISIT' },
            { value: '07', label: 'REFUSED – OTHER REASONS, WILL NOT RESCHEDULE(NOT RELATED TO BLOOD COLLECTION)' },
            { value: '08', label: 'INELIGIBLE' },
            { value: '99', label: 'OTHER' }
        ]
        this.optionList = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '88', label: 'Dont Know' }];

        this.optionListBoolean = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' }];

        this.relationship = [
            { value: '01', label: 'HEAD OF HOUSEHOLD' },
            { value: '02', label: 'WIFE OR HUSBAND' },
            { value: '03', label: 'SON OR DAUGHTER' },
            { value: '04', label: 'BROTHER OR SISTER' },
            { value: '05', label: 'IN - LAW' },
            { value: '06', label: 'PARENT/GRANDPARENT' },
            { value: '05', label: 'OTHER RELATIVE' },
            { value: '08', label: 'OTHER NOT RELATED' },
        ];

        this.migratoryCategory = [
            { value: '01', label: 'Urban slum with migration' },
            { value: '02', label: 'Nomads' },
            { value: '03', label: 'Brick kilns' },
            { value: '04', label: 'Construction sites' },
            { value: '99', label: 'Other' }];

        this.householdCategory = [
            { value: '01', label: 'Owned' },
            { value: '02', label: 'Rented' },
            { value: '03', label: 'Provided free of charge by relative/employer' },
            { value: '99', label: 'Other' }];


        this.religion = [
            { value: '01', label: 'Hindu' },
            { value: '02', label: 'Muslim' },
            { value: '03', label: 'Christian' },
            { value: '04', label: 'Sikh' },
            { value: '05', label: 'Buddhist' },
            { value: '06', label: 'Jain' },
            { value: '07', label: 'No religion' },
            { value: '99', label: 'Other religion' }
        ];

        this.headofHouseholdEducation = [
            { value: '01', label: 'Professional or honors' },
            { value: '02', label: 'Graduate or postgraduate' },
            { value: '03', label: 'Intermediate/post-high school diploma' },
            { value: '04', label: 'High School Certificate' },
            { value: '05', label: 'Middle School Certificate' },
            { value: '06', label: 'Primary School Certificate' },
            { value: '07', label: 'Illiterate' },
            { value: '88', label: 'Don’t know' }
        ];


        this.householdOccupation = [
            { value: '01', label: 'Professional' },
            { value: '02', label: 'Semi-professional' },
            { value: '03', label: 'Clerical, Shop Owner, Farmer' },
            { value: '04', label: 'Skilled Worker' },
            { value: '05', label: 'Semi-Skilled Worker' },
            { value: '06', label: 'Unskilled Worker' },
            { value: '07', label: 'Unemployed' },
            { value: '88', label: 'Don’t know' }
        ];

        this.caste = [
            { value: '01', label: 'General' },
            { value: '02', label: 'Schedule Caste (SC)' },
            { value: '03', label: 'Schedule Tribe (ST)' },
            { value: '04', label: 'Other Backward Class (OBC)' },
            { value: '05', label: 'None of them' },
            { value: '88', label: 'Don’t know' }
        ];

        this.housingMaterial = [
            { value: '01', label: 'Kuchha' },
            { value: '02', label: 'Pucca' },
            { value: '03', label: 'Houseless households' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'Other' }
        ];

        this.healthFacility = [
            { value: '01', label: 'PUBLIC HEALTH SECTOR' },
            { value: '02', label: 'PRIVATE HEALTH SECTOR' },
            { value: '99', label: 'OTHER' },
            { value: '03', label: 'NONE' },
        ];
        this.state = {
            h1hhid: '',
            h4avisit1: '01',
            h6astatusvis1: '01',
            h6astatusothsp: '',
            h8respondentname: '',
            h9relationship: '01',
            h14migratory: '01',
            h15migratorycat: '01',
            h15migratothsp: '',
            h16hhstatus: '01',
            h16hhstatusothsp: '',
            h17hhreligion: '01',
            h18hhbpl: '01',
            h19hheducation: '01',
            h20hhoccupation: '01',
            h21hhcaste: '01',
            h22hhmaterials: '01',
            h22hhmaterothsp: '',
            h23afourwheeler: '01',
            h23bbicycle: '01',
            h23cmotorcycle: '01',
            h23dland: '01',
            h23emobile: '01',
            h24mobile: '',
            h25facility: '01',
            h26vaxfacilitytyp: '01',
            h31intcomments: '',
            h27latitude: '',
            h28longitude: ''
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
    }

    onChange(value) {
        this.setState({ formValue: value });
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        if (this.isFormValid()) {
            this.setState({
                h1hhid: params.HouseholdID,
                h4avisit1: moment().format('MM-DD-YYY h:mm:ss a'),
                h27latitude: '2.2',
                h28longitude: '3.3'
            });
            const surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 &&  && HouseholdID=$1', params.Sno, params.HouseholdID)[0].surveyID;
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
                    <Text style={styles.headingLetter}>1. Household ID*</Text>
                    <FormInput
                        ref="h1hhid"
                        editable={false}
                        value={params.HouseholdID}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>3. Status of interview Result Code</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal={true}
                        radio_props={this.household_status}
                        initial={0}
                        onPress={(value) => { this.setState({ h6astatusvis1: value }); console.log(this.state) }}
                    />
                    {(this.state.h6astatusvis1 == '99') &&
                        <View>
                            <Text style={styles.headingLetter}>Others Specify*</Text>
                            <FormInput
                                value={this.state.h6astatusothsp}
                                onChangeText={(name) => this.setState({ h6astatusothsp: name })} />
                        </View>
                    }
                </View >
                {this.state.h6astatusvis1 === '01' &&
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>4. RESPONDENT TO HOUSEHOLD QUESTIONNAIRE*</Text>
                            <FormInput
                                value={this.state.h8respondentname}
                                onChangeText={(name) => this.setState({ h8respondentname: name })} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>5. RESPONDENT’S RELATIONSHIP TO HEAD OF HOUSEHOLD</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.relationship}
                                initial={0}
                                onPress={(value) => { this.setState({ relationship: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>6. ARE YOU A MIGRATORY FAMILY?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionList}
                                initial={0}
                                onPress={(value) => { this.setState({ h14migratory: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>6a. Migratory Type</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.migratoryCategory}
                                initial={0}
                                onPress={(value) => { this.setState({ h15migratorycat: value }); console.log(this.state) }}
                            />
                        </View>
                        {(this.state.h15migratorycat == '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>6b. Others Specify*</Text>
                                <FormInput
                                    value={this.state.h15migratothsp}
                                    onChangeText={(name) => this.setState({ h15migratothsp: name })} />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>7. IS HOUSEHOLD ?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.householdCategory}
                                initial={0}
                                onPress={(value) => { this.setState({ h16hhstatus: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>7a. WHAT IS THE RELIGION OF THE HOUSEHOLD?*</Text>
                            <FormInput
                                value={this.state.h16hhstatusothsp}
                                onChangeText={(name) => this.setState({ h16hhstatusothsp: name })} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>8. WHAT IS THE RELIGION OF THE HOUSEHOLD?*</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.religion}
                                initial={0}
                                onPress={(value) => { this.setState({ h17hhreligion: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>9. DOES SOMEONE IN THE HOUSEHOLD HAVE A BPL CARD?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionList}
                                initial={0}
                                onPress={(value) => { this.setState({ h18hhbpl: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>10. HEAD OF HOUSEHOLD’S EDUCATION</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.headofHouseholdEducation}
                                initial={0}
                                onPress={(value) => { this.setState({ h19hheducation: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>11. HEAD OF HOUSEHOLD’S OCCUPATION</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.householdOccupation}
                                initial={0}
                                onPress={(value) => { this.setState({ h20hhoccupation: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>12. WHAT IS YOUR CASTE?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.caste}
                                initial={0}
                                onPress={(value) => { this.setState({ h21hhcaste: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>13. HOUSING MATERIALS</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.housingMaterial}
                                initial={0}
                                onPress={(value) => { this.setState({ h22hhmaterials: value }); console.log(this.state) }}
                            />
                        </View>
                        {(this.state.h22hhmaterials == '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>13a. Others Specify*</Text>
                                <FormInput
                                    value={this.state.h22hhmaterothsp}
                                    onChangeText={(name) => this.setState({ h22hhmaterothsp: name })} />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>14a. Four wheeler vehicle</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h23afourwheeler: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>14b. Bicycle</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h23bbicycle: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>14c. Motorcycle</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h23cmotorcycle: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>14d. Land</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h23dland: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>14e. Mobile phone</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h23emobile: value }); console.log(this.state) }}
                            />
                        </View>
                        {(this.state.h23emobile) &&
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionListBoolean}
                                initial={0}
                                onPress={(value) => { this.setState({ h24mobile: value }); console.log(this.state) }}
                            />
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>16. WOULD YOU EVER TAKE YOUR CHILD TO FACILITY?*</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.optionList}
                                initial={0}
                                onPress={(value) => { this.setState({ h25facility: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>17. WHAT TYPE OF HEALTH FACILITY WOULD YOU USUALLY TAKE YOUR CHILD TO FOR VACCINATIONS? </Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal={true}
                                radio_props={this.healthFacility}
                                initial={0}
                                onPress={(value) => { this.setState({ h26vaxfacilitytyp: value }); console.log(this.state) }}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>18. INTERVIEWER’S COMMENTS*</Text>
                            <FormInput
                                value={this.state.h31intcomments}
                                onChangeText={(name) => this.setState({ h31intcomments: name })} />
                        </View>
                    </View>
                }
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
