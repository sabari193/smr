import React from 'react';
import { StyleSheet, DatePickerAndroid, ScrollView, View, Alert, TextInput } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class HouseHoldSurvey extends ValidationComponent {
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
        };
    }
    state = {
        selectedTab: 'HouseHoldSurvey'
    };
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.household_status = [
            { value: '01', label: 'Agreed to participate' },
            { value: '02', label: 'Locked,no household member at home, or no competent respondent at home at time of visit' },
            { value: '03', label: 'Refused' },
            { value: '99', label: 'other' }
        ];
        this.optionList = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '88', label: 'Dont Know' }];

        this.optionListOneTwo = [
            { value: '01', label: 'One' },
            { value: '02', label: 'Two' }];

        this.optionListMother = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '03', label: 'Mother not alive' }];

        this.optionListBoolean = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' }];

        this.relationship = [
            { value: '01', label: 'Head of household' },
            { value: '02', label: 'Wife or husband' },
            { value: '03', label: 'Son or daughter' },
            { value: '04', label: 'Brother or sister' },
            { value: '05', label: 'In-Law' },
            { value: '06', label: 'parent or guardian' },
            { value: '07', label: 'Other relative' },
            { value: '08', label: 'Other' }
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
            { value: '88', label: 'Dont know' },
            { value: '99', label: 'Other, Specify*' }
        ];


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
            { value: '02', label: 'Sales worker' },
            { value: '03', label: 'Service worker' },
            { value: '04', label: 'Production worker (skilled)' },
            { value: '05', label: 'Production worker (unskilled)' },
            { value: '06', label: 'Agricultural worker' },
            { value: '07', label: 'Home maker' },
            { value: '08', label: 'Unemployed' },
            { value: '09', label: 'Student' },
            { value: '88', label: 'Don’t know' }
        ];

        this.caste = [
            { value: '01', label: 'General' },
            { value: '02', label: 'Schedule Caste (SC)' },
            { value: '03', label: 'Schedule Tribe (ST)' },
            { value: '04', label: 'Other Backward Class (OBC)' },
            { value: '05', label: 'None of them' },
            { value: '06', label: 'No Response' },
            { value: '88', label: 'Don’t know' }
        ];

        this.housingMaterial = [
            { value: '01', label: 'Kuchha' },
            { value: '02', label: 'Pucca' },
            { value: '03', label: 'Semi-pucca' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'Other' }
        ];

        this.healthFacility = [
            { value: '01', label: 'Public health sector' },
            { value: '02', label: 'Private health sector' },
            { value: '99', label: 'Other' },
            { value: '03', label: 'None' },
        ];
        this.toiletFacility = [
            { value: '01', label: 'Own toilet (outside or inside house)' },
            { value: '02', label: 'Shared common toilet' },
            { value: '99', label: 'Public toilet' },
            { value: '03', label: 'No facilities/uses open space' },
        ];

        this.state = {
            editedField: false,
            h1hhid: '',
            h6astatusvis1: '',
            h6astatusothsp: '',
            h8respondentname: '',
            h9relationship: '',
            h14migratory: '',
            h15migratorycat: '',
            h15migratothsp: '',
            h16hhstatus: '',
            h16hhstatusothsp: '',
            h17hhreligion: '',
            h18hhbpl: '',
            h19hheducation: '',
            h20hhoccupation: '',
            h21hhcaste: '',
            h22hhmaterials: '',
            h22hhmaterothsp: '',
            h22atoilettype: '',
            h23afourwheeler: '',
            h23bbicycle: '',
            h23cmotorcycle: '',
            h23dland: '',
            h23emobile: '',
            h24mobile: '',
            h25facility: '',
            h26vaxfacilitytyp: '',
            h32avisits: '',
            h32bdateofvisit: '',
            h31intcomments: '',
            h27latitude: '',
            h28longitude: '',
            updatedTime: '',
            hasError: false
        };

        this.styles = StyleSheet.create({
            container: {
                flex: 1,
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

    async openDatePicker(value) {
        const { params } = this.props.navigation.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const newState = {};
                newState[value] = `${day}-${month + 1}-${year}`;
                this.setState(newState);
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    onChange(value) {
        this.setState({ formValue: value });
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.setState({
                    accuracy: position.coords.accuracy,
                    h27latitude: position.coords.latitude,
                    h28longitude: position.coords.longitude
                });
            },
            (error) => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.props.navigation.setParams({ handleSubmit: this.onPress.bind(this), goHome: this._goHome.bind(this) });
        const householdSurveyData = realm.objects('SurveyInformation').filtered('AgeGroup="H" && status="saved" && HouseholdID=$0', params.HouseholdID);
        if (householdSurveyData.length > 0) {
            console.log('JSON.parse(JSON.stringify(householdSurveyData)).surveyData', JSON.parse(JSON.parse(JSON.stringify(householdSurveyData))[0].surveyData));
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(householdSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
    }

    validateRadioOptions() {
        const validation = [];
        if (this.state.h6astatusvis !== '01') {
            if (this.state.h6astatusvis1index === -1) {
                validation[h6astatusvis1index] = false;
                _.forEach(Object.keys(this.state), (fieldKey) => {
                    if (fieldKey !== 'h6astatusvis1index') {
                        validation[fieldKey] = true;
                    }
                });
            } else {
                _.forEach(Object.keys(this.state), (fieldKey) => {
                    validation[fieldKey] = true;
                });
            }
        } else {
            _.forEach(Object.keys(this.state), (fieldKey) => {
                if (this.state[fieldKey] === -1) {
                    validation[fieldKey] = false;
                } else {
                    validation[fieldKey] = true;
                }
            });
        }
        return validation;
    }

    onPress() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        if (this.state.h6astatusvis1 === '01') {
            this.validate({
                h8respondentname: { required: true },
                h31intcomments: { required: true }
            });
        }
        if (this.state.h6astatusvis1 === '99') {
            this.validate({
                h6astatusothsp: { required: true },
            });
        }
        if (this.state.h16hhstatus === '99') {
            this.validate({
                h16hhstatusothsp: { required: true },
            });
        }
        if (this.state.h22hhmaterials === '99') {
            this.validate({
                h22hhmaterothsp: { required: true },
            });
        }
        if (this.state.h32avisits === '01') {
            this.validate({
                h22hhmaterothsp: { required: true },
            });
        }

        const RadioValidations = this.validateRadioOptions();
        console.warn(RadioValidations);

        console.log("this.isFormValid()", this.isFormValid());
        console.log("error", this.getErrorMessages());

        if (this.isFormValid() && !RadioValidations.includes(false)) {
            this.setState({
                h1hhid: params.HouseholdID,
                h4avisit1: moment().format('MM-DD-YYY h:mm:ss a'),
                updatedTime: moment().format('MM-DD-YYY h:mm:ss a')
            });
            let surveyID;
            if (this.state.editedField) {
                surveyID = realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "saved" && HouseholdID=$0', params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                    navigate('CompletedSurveyDetails');
                });
            } else {
                surveyID = realm.objects('SurveyInformation').filtered('AgeGroup = "H" && status = "open" && HouseholdID=$0', params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                    navigate('RandomListScreen');
                });
            }
        } else {
            Alert.alert(
                'Validation Error',
                'Mandatory Fields are missing',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        console.log('this.state', this.state);
        return (
            <ScrollView style={this.styles.container}>
                <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Characteristics (HC) Form</Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>1. Household ID*</Text>
                    <FormInput
                        ref="h1hhid"
                        editable={false}
                        value={params.HouseholdID}
                    />
                </View>
                <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                    <Text style={styles.headingLetter}>3. Status of interview</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.household_status}
                        initial={this.state.h6astatusvis1index ? this.state.h6astatusvis1index : -1}
                        onPress={(value, index) => {
                            this.setState({ h6astatusvis1: value, h6astatusvis1index: index }); console.log(this.state);
                        }}
                    />
                    {(this.state.h6astatusvis1 === '99') &&
                        <View>
                            <Text style={styles.headingLetter}>Others Specify*</Text>
                            <FormInput
                                ref="h6astatusothsp"
                                value={this.state.h6astatusothsp}
                                onChangeText={(name) => this.setState({ h6astatusothsp: name })}
                            />
                        </View>
                    }
                </View >
                {this.state.h6astatusvis1 === '01' &&
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>4. Respondent to household questionnaire*</Text>
                            <FormInput
                                ref="h8respondentname"
                                value={this.state.h8respondentname}
                                onChangeText={(name) => this.setState({ h8respondentname: name })}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>5. Respondent relationship to head of household</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.relationship}
                                initial={this.state.h9relationshipindex ? this.state.h9relationshipindex : -1}
                                onPress={(value, index) => { this.setState({ h9relationship: value, h9relationshipindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Information</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>8. What is the religion of the household?*</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.religion}
                                initial={this.state.h17hhreligionindex ? this.state.h17hhreligionindex : -1}
                                onPress={(value, index) => { this.setState({ h17hhreligion: value, h17hhreligionindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>9. Does someone in the household have BPL card?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionList}
                                initial={this.state.h18hhbplindex ? this.state.h18hhbplindex : -1}
                                onPress={(value, index) => { this.setState({ h18hhbpl: value, h18hhbplindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>10. Head of household education</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.headofHouseholdEducation}
                                initial={this.state.h19hheducationindex ? this.state.h19hheducationindex : -1}
                                onPress={(value, index) => { this.setState({ h19hheducation: value, h19hheducationindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>11. Head of household Occupation</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.householdOccupation}
                                initial={this.state.h20hhoccupationindex ? this.state.h20hhoccupationindex : -1}
                                onPress={(value, index) => { this.setState({ h20hhoccupation: value, h20hhoccupationindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>12. What is your caste?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.caste}
                                initial={this.state.h21hhcasteindex ? this.state.h21hhcasteindex : -1}
                                onPress={(value, index) => { this.setState({ h21hhcaste: value, h21hhcasteindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>7. Is household ?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.householdCategory}
                                initial={this.state.h16hhstatusindex ? this.state.h16hhstatusindex : -1}
                                onPress={(value, index) => { this.setState({ h16hhstatus: value, h16hhstatusindex: index }); console.log(this.state); }}
                            />
                        </View>
                        {(this.state.h16hhstatus === '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>7a. Other house status?*</Text>
                                <FormInput
                                    ref="h16hhstatusothsp"
                                    value={this.state.h16hhstatusothsp}
                                    onChangeText={(name) => this.setState({ h16hhstatusothsp: name })}
                                />
                            </View>
                        }
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Household Material and Assets</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>22. Housing materials</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.housingMaterial}
                                initial={this.state.h22hhmaterialsindex ? this.state.h22hhmaterialsindex : -1}
                                onPress={(value, index) => { this.setState({ h22hhmaterials: value, h22hhmaterialsindex: index }); console.log(this.state); }}
                            />
                        </View>
                        {(this.state.h22hhmaterials == '99') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>22. Others Specify*</Text>
                                <FormInput
                                    ref="h22hhmaterothsp"
                                    value={this.state.h22hhmaterothsp}
                                    onChangeText={(name) => this.setState({ h22hhmaterothsp: name })}
                                />
                            </View>
                        }

                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>22A. Type of toilet household members use?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.toiletFacility}
                                initial={this.state.h22atoilettypeindex ? this.state.h22atoilettypeindex : -1}
                                onPress={(value, index) => { this.setState({ h22atoilettype: value, h22atoilettypeindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <Text style={styles.headingLetter}>ASSETS</Text>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>23a. Four wheeler vehicle</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListBoolean}
                                initial={this.state.h23afourwheelerindex ? this.state.h23afourwheelerindex : -1}
                                onPress={(value, index) => { this.setState({ h23afourwheeler: value, h23afourwheelerindex: index }); console.log(this.state); }}
                            />
                        </View>

                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>23d. Land</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListBoolean}
                                initial={this.state.h23dlandindex ? this.state.h23dlandindex : -1}
                                onPress={(value, index) => { this.setState({ h23dland: value, h23dlandindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>24. Does the mother own a mobile phone?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListMother}
                                initial={this.state.h23emobileindex ? this.state.h23emobileindex : 0}
                                onPress={(value, index) => { this.setState({ h23emobile: value, h23emobileindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#4c9689', height: 50, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '500', textAlign: 'center' }}>Nearby health facility &amp; health seeking behaviors</Text>
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>17. What type of health facility would you usually take your child to for vaccinations? </Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.healthFacility}
                                initial={this.state.h26vaxfacilitytyp ? this.state.h26vaxfacilitytyp : 0}
                                onPress={(value, index) => { this.setState({ h26vaxfacilitytyp: value, h26vaxfacilitytypindex: index }); console.log(this.state); }}
                            />
                        </View>
                        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10 }}>
                            <Text style={styles.headingLetter}>32A. Number of visits made to complete the enrollment? </Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListOneTwo}
                                initial={this.state.h32avisits ? this.state.h32avisits : 0}
                                onPress={(value, index) => { this.setState({ h32avisits: value, h32avisitsindex: index }); console.log(this.state); }}
                            />
                        </View>
                        {(this.state.h32avisits == '02') &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>32b. Date of first visit?*</Text>
                                <FormInput
                                    ref="h32bdateofvisit"
                                    value={this.state.h32bdateofvisit}
                                    onChangeText={(name) => this.setState({ h32bdateofvisit: name })}
                                    onFocus={() => {
                                        this.openDatePicker('h32bdateofvisit');
                                    }}
                                />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>18. Interviewer's comments*</Text>
                            <FormInput
                                ref="h31intcomments"
                                value={this.state.h31intcomments}
                                onChangeText={(name) => this.setState({ h31intcomments: name })}
                            />
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
