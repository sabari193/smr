import React from 'react';
import { StyleSheet, ScrollView, View, Alert, DatePickerAndroid } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ValidationComponent from 'react-native-form-validator';
import RadioForm from 'react-native-simple-radio-button';
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
        };
    }
    state = {
        selectedTab: 'WomenCampaignSurvey'
    };

    async openDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ dob: `${day}-${month + 1}-${year}`, selectedDate: `${year}0${month + 1}${day}` });
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    //Radio Button OPtions to be added
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

        this.optionListConsent = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No, Refused due to Blood collection' },
            { value: '03', label: 'No, Refused due to Other reason' }];

        this.optionListRelation = [
            { value: '01', label: 'Mother' },
            { value: '02', label: 'Father' },
            { value: '03', label: 'Grand Parent' }];

        this.maritalStatus = [
            { value: '01', label: 'Married' },
            { value: '02', label: 'Unmarried' },
            { value: '03', label: 'Separated' },
            { value: '04', label: 'Widowed' }
        ];

        this.mrdoseoptions = [
            { value: '01', label: 'Yes, Documented' },
            { value: '02', label: 'Yes, Reported' },
            { value: '03', label: 'No' },
            { value: '88', label: 'Dont Know' }
        ];

        this.bloodreasonoptions = [
            { value: '01', label: 'Not present' },
            { value: '02', label: 'Sickness' },
            { value: '03', label: 'Refusal' },
            { value: '99', label: 'Other, specify' }
        ];

        this.specimenmethodoptions = [
            { value: '01', label: 'One Prick' },
            { value: '02', label: 'Two Pricks' },
            { value: '03', label: 'Venepuncture (After 2 prick attemps)' }
        ];

        this.specimenqualityoptions = [
            { value: '01', label: 'Adequate' },
            { value: '02', label: 'Inadequate' }
        ];

        this.specimenproblemoptions = [
            { value: '01', label: 'No problem' },
            { value: '02', label: 'Could not be completed because participant was crying, moving too much, other reasons' },
            { value: '99', label: 'Others, specify' }
        ];

        this.dbssampleoptions = [
            { value: '01', label: 'Yes' },
            { value: '02', label: 'No' },
            { value: '03', label: 'NA' }
        ];

        this.spotsCollectedoptions = [
            { value: '01', label: '1' },
            { value: '02', label: '2' },
            { value: '03', label: '3' },
            { value: '04', label: '4' },
            { value: '05', label: '5' }
        ];

        this.adequateoptions = [
            { value: '01', label: '100%' },
            { value: '02', label: '75-99%' },
            { value: '03', label: '50-74%' },
            { value: '04', label: '<50%' },
            { value: '05', label: 'Not Collected' }
        ];

        this.dbsspecimenproblemoptions = [
            { value: '01', label: 'No problem' },
            { value: '02', label: 'Could not be completed because participant was crying, moving too much, other reasons' },
            { value: '03', label: 'Participant or guardian asked to stop' },
            { value: '04', label: 'Could not spot all five circles because blood flow was very slow or blood clotted' },
            { value: '99', label: 'Others, specify' }
        ];

        //Fieldname to be added
        this.state = {
            editedField: false,
            surveyType: '',
            w2name: '',
            w2aconsent: '01',
            w3dob: '',
            w3adobdt: '',
            w4age: '',
            w5maritalstat: '01',
            w6children: '',
            w7livehhcampaign: '01',
            w8mrcampaigndose: '',
            w9mrvaxhistory: '01',
            w11intcomments: '',
            ws1scollect: '01',
            ws1ascollectno: '',
            ws1bscollectoth: '',
            ws1scollecthow: '',
            ws4sspecid: '',
            ws5squal: '',
            ws6sproblem: '',
            ws6asprobsp: '',
            ws7dcollect: '',
            ws7adcollectno: '',
            ws7bdcollectoth: '',
            ws11dspots: '',
            ws12adqual1: '',
            ws12bdqual2: '',
            ws12cdqual3: '',
            ws12ddqual4: '',
            ws12edqual5: '',
            ws13dproblem: '',
            ws13adprobsp: '',
            ws15intcomments: ''
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
        const { params } = this.props.navigation.state;
        const surveyType = realm.objects('Cluster').filtered('status = "active"')[0].surveyType;
        const womenSurveyData = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && HouseholdID=$1', params.Sno, params.HouseholdID);
        console.log('womenSurveyData', JSON.parse(JSON.stringify(womenSurveyData)));
        if (womenSurveyData.length > 0) {
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(womenSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
        this.setState({ surveyType });
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
            let surveyID;
            if (this.state.editedField) {
                console.log(JSON.parse(JSON.stringify(realm.objects('SurveyInformation').filtered('status="saved"'))));
                surveyID = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && HouseholdID=$1', params.Sno, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                });
                this.removeBloodSampleCount();
                navigate('CompletedSurveyDetails');
            } else {
                surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 && HouseholdID=$1', params.Sno, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                });
                this.addBloodSampleCount();
                navigate('RandomListScreen');
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
    addBloodSampleCount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        realm.write(() => {
            if (realm.objects('BloodSample').length > 0) {
                const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeC;
                if (this.state.ws1scollect === '01' || this.state.ws6asprobsp === '01') {
                    realm.create('BloodSample', { clusterID, TypeC: bloodSampleData + 1 }, true);
                }
            } else {
                realm.create('BloodSample', { clusterID, TypeC: 1 });
            }
        });
    }
    removeBloodSampleCount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeC;
        realm.write(() => {
            if (this.state.ws1scollect !== '01' && this.state.ws6asprobsp !== '01') {
                if (bloodSampleData.TypeC > 0) {
                    realm.create('BloodSample', { clusterID, TypeC: bloodSampleData - 1 }, true);
                }
            }
        });
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
                        onChangeText={(w2name) => this.setState({ w2name })}
                    />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>2a. Was the consent/assent taken for the woman?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.optionListConsent}
                        initial={this.state.w2aconsentindex ? this.state.w2aconsentindex : 0}
                        onPress={(value, index) => { this.setState({ w2aconsent: value, w2aconsentindex: index }); console.log(this.state); }}
                    />
                </View>
                {this.state.w2aconsent === '01' &&
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Do you know your date of birth?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListBoolean}
                                initial={this.w3dobindex ? this.w3dobindex : 0}
                                onPress={(value, index) => { this.setState({ w3dob: value, w3dobindex: index }); console.log(this.state); }}
                            />
                        </View>
                        {this.state.w3dob === '01' &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>Date of Birth*</Text>
                                <FormInput
                                    value={this.state.w3adobdt}
                                    onChangeText={(w2name) => this.setState({ w2name })}
                                    onFocus={() => {
                                        this.openDatePicker();
                                    }
                                    }
                                />
                            </View>
                        }
                        {this.state.w3dob === '02' &&
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.headingLetter}>How old are you?</Text>
                                <FormInput
                                    keyboardType='numeric'
                                    value={this.state.w4age}
                                    onChangeText={(w4age) => this.setState({ w4age })}
                                />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>What is your current marital status?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.maritalStatusindex ? this.maritalStatusindex : 0}
                                initial={0}
                                onPress={(value, index) => { this.setState({ w5maritalstat: value, maritalStatusindex: index }); console.log(this.state); }}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>How many children have you had?</Text>
                            <FormInput
                                keyboardType='numeric'
                                maxLength={1}
                                value={this.state.w6children}
                                onChangeText={(w6children) => this.setState({ w6children })}
                            />
                        </View>
                        {this.state.surveyType === '02' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Were you living in this household when the MR campaign was occuring?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListBoolean}
                                        initial={this.state.w7livehhcampaignindex ? this.state.w7livehhcampaignindex : 0}
                                        onPress={(value, index) => { this.setState({ w7livehhcampaign: value, w7livehhcampaignindex: index }); console.log(this.state); }}
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
                                        labelHorizontal
                                        radio_props={this.mrdoseoptions}
                                        initial={this.state.w8mrcampaigndoseindex}
                                        onPress={(value, index) => { this.setState({ w8mrcampaigndose: value, w8mrcampaigndoseindex: index }); console.log(this.state); }}
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
                                labelHorizontal
                                radio_props={this.optionList}
                                initial={this.state.w9mrvaxhistoryindex}
                                onPress={(value, index) => { this.setState({ w9mrvaxhistory: value, w9mrvaxhistoryindex: index }); console.log(this.state); }}
                            />
                        </View>
                    </View>
                }
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Interviewer's comment</Text>
                    <FormInput
                        value={this.state.w11intcomments}
                        onChangeText={(name) => this.setState({ w11intcomments: name })}
                    />
                </View>
                {this.state.w2aconsent === '01' &&
                    <View>
                        <View>
                            <Text style={styles.headingLetter}>SPECIMEN COLLECTION</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Was a Capillary Liquid Blood sample collected?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionList}
                                initial={this.state.ws1scollectindex ? this.state.ws1scollectindex : 0}
                                onPress={(value, index) => { this.setState({ ws1scollect: value, ws1scollectindex: index }); console.log(this.state); }}
                            />
                        </View>

                        {this.state.ws1scollect === '02' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Specify reason?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.bloodreasonoptions}
                                        initial={this.state.ws1ascollectnoindex ? this.state.ws1ascollectnoindex : 0}
                                        onPress={(value, index) => { this.setState({ ws1ascollectno: value, ws1ascollectnoindex: index }); console.log(this.state); }}
                                    />
                                </View>

                                {this.state.ws1ascollectno === '99' &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>Specify other reason</Text>
                                        <FormInput
                                            value={this.state.ws1bscollectoth}
                                            onChangeText={(ws1bscollectoth) => this.setState({ ws1bscollectoth })}
                                        />
                                    </View>
                                }
                            </View>
                        }
                        {this.state.ws1scollect === '01' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>How specimen was collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.specimenmethodoptions}
                                        initial={this.state.ws1scollecthowindex ? this.state.ws1scollecthowindex : 0}
                                        onPress={(value, index) => { this.setState({ ws1scollecthow: value, ws1scollecthowindex: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Specimen quality?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.specimenqualityoptions}
                                        initial={this.state.ws5squalindex ? this.state.ws5squalindex : 0}
                                        onPress={(value, index) => { this.setState({ ws5squal: value, ws5squalindex: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Specimen collection problem?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.specimenproblemoptions}
                                        initial={this.state.ws6sproblemindex ? this.state.ws6sproblemindex : 0}
                                        onPress={(value, index) => { this.setState({ ws6sproblem: value, ws6sproblemindex: index }); console.log(this.state); }}
                                    />
                                </View>

                                {this.state.ws6sproblem === '99' &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>Specify other reason</Text>
                                        <FormInput
                                            value={this.state.ws6asprobsp}
                                            onChangeText={(ws6asprobsp) => this.setState({ ws6asprobsp })}
                                        />
                                    </View>
                                }
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Was a DBS sample collected?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.dbssampleoptions}
                                initial={this.state.ws7dcollectindex ? this.state.ws7dcollectindex : 0}
                                onPress={(value, index) => { this.setState({ ws7dcollect: value, ws7dcollectindex: index }); console.log(this.state); }}
                            />
                        </View>
                        {this.state.ws7dcollect !== '01' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Specify reason?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.bloodreasonoptions}
                                        initial={this.state.ws7adcollectnoindex ? this.state.ws7adcollectnoindex : 0}
                                        onPress={(value, index) => { this.setState({ ws7adcollectno: value, ws7adcollectnoindex: index }); console.log(this.state); }}
                                    />
                                </View>
                                {this.state.ws7adcollectno === '99' &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>Specify other reason</Text>
                                        <FormInput
                                            value={this.state.ws7bdcollectoth}
                                            onChangeText={(ws7bdcollectoth) => this.setState({ ws7bdcollectoth })}
                                        />
                                    </View>
                                }
                            </View>
                        }
                        {this.state.ws7dcollect === '01' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Number of spots collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.spotsCollectedoptions}
                                        initial={this.state.ws11dspotsindex ? this.state.ws11dspotsindex : 0}
                                        onPress={(value, index) => { this.setState({ ws11dspots: value, ws11dspotsindex: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>SPECIMEN QUALITY DBS1?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.adequateoptions}
                                        initial={this.state.ws12adqual1index ? this.state.ws12adqual1index : 0}
                                        onPress={(value, index) => { this.setState({ ws12adqual1: value, ws12adqual1index: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>SPECIMEN QUALITY DBS2?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.adequateoptions}
                                        initial={this.state.ws12adqual2index ? this.state.ws12adqual2index : 0}
                                        onPress={(value, index) => { this.setState({ ws12adqual2: value, ws12adqual2index: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>SPECIMEN QUALITY DBS3?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.adequateoptions}
                                        initial={this.state.ws12adqual3index ? this.state.ws12adqual3index : 0}
                                        onPress={(value, index) => { this.setState({ ws12adqual3: value, ws12adqual3index: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>SPECIMEN QUALITY DBS4?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.adequateoptions}
                                        initial={this.state.ws12adqual4index ? this.state.ws12adqual4 : 0}
                                        onPress={(value, index) => { this.setState({ ws12adqual4: value, ws12adqual4index: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>SPECIMEN QUALITY DBS5?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.adequateoptions}
                                        initial={this.state.ws12adqual5index ? this.state.ws12adqual5index : 0}
                                        onPress={(value, index) => { this.setState({ ws12adqual5: value, ws12adqual5index: index }); console.log(this.state); }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Specimen collection problem?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.dbsspecimenproblemoptions}
                                        initial={this.state.ws13dproblemindex ? this.state.ws13dproblemindex : 0}
                                        onPress={(value, index) => { this.setState({ ws13dproblem: value, ws13dproblemindex: index }); console.log(this.state); }}
                                    />
                                </View>
                                {this.state.ws13dproblem === '99' &&
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={styles.headingLetter}>Specify other reason</Text>
                                        <FormInput
                                            value={this.state.ws13adprobsp}
                                            onChangeText={(ws13adprobsp) => this.setState({ ws13adprobsp })}
                                        />
                                    </View>
                                }
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Interviewer observation (Related to Blood Collection)</Text>
                            <FormInput
                                value={this.state.ws13adprobsp}
                                onChangeText={(ws13adprobsp) => this.setState({ ws13adprobsp })}
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
