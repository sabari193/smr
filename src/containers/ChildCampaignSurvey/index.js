import React from 'react';
import { StyleSheet, ScrollView, View, Alert, DatePickerAndroid } from 'react-native';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import RadioForm from 'react-native-simple-radio-button';
import realm from '../../providers/realm';
import { Button, FormInput, Text } from '../../components/PocketUI';


export default class ChildCampaignSurvey extends ValidationComponent {
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
                    buttonStyle={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#4c9689',
                        marginRight: 10
                    }}
                    fontSize={25}
                    title='Home'
                    onPress={params.goHome}
                />
            )
        };
    }
    state = {
        selectedTab: 'ChildCampaignSurvey'
    };
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
            { value: '03', label: 'Grand Parent' },
            { value: '04', label: 'Uncle,Aunt' },
            { value: '99', label: 'Others' }
        ];

        this.educationStatus = [
            { value: '01', label: 'Professional or honors' },
            { value: '02', label: 'Graduate or postgraduate' },
            { value: '03', label: 'Senior/Higher Secondary' },
            { value: '04', label: 'High School Certificate' },
            { value: '05', label: 'Middle School Certificate' },
            { value: '06', label: 'Primary School Certificate' },
            { value: '07', label: 'Illiterate' },
            { value: '88', label: 'Don’t know' }

        ];

        this.ocuupationStatus = [
            { value: '01', label: 'Professional' },
            { value: '02', label: 'sales worker' },
            { value: '03', label: 'service worker' },
            { value: '04', label: 'production worker (skilled)' },
            { value: '05', label: 'Production worker (unskilled)' },
            { value: '06', label: 'Primary School Certificate' },
            { value: '07', label: 'home Maker' },
            { value: '08', label: 'unemployed' },
            { value: '09', label: 'student' },
            { value: '88', label: 'Don`t Know' }

        ];

        this.champaignInfoStatus = [
            { value: '01', label: 'local Health Worker (ASHA or AWW)' },
            { value: '02', label: 'anm' },
            { value: '03', label: 'poster/ Banner' },
            { value: '04', label: 'radio' },
            { value: '05', label: 'tv' },
            { value: '06', label: 'newspaper' },
            { value: '07', label: 'cell Phone SMS' },
            { value: '08', label: 'What`s App' },
            { value: '09', label: 'facebook' },
            { value: '10', label: 'other Social Media' },
            { value: '11', label: 'neighbor' },
            { value: '12', label: 'miking' },
            { value: '13', label: 'community Leder/Village Head' },
            { value: '14', label: 'religious Sources' },
            { value: '15', label: 'school Authorities' },
            { value: '99', label: 'others ' },

        ];

        this.schoolStatus = [
            { value: '01', label: 'government School' },
            { value: '02', label: 'private School' },
            { value: '03', label: 'madrassa Or Other Relligious School' },
            { value: '04', label: 'does Not Go To School' },
            { value: '05', label: 'not Applicable' },

        ];

        this.receiveVaccineStatus = [
            { value: '01', label: 'school' },
            { value: '02', label: 'government Health Facility site (like-PHC/CHC/SDH/DH/MC etc..)' },
            { value: '03', label: 'government site- outreach session (like, HSC/AWW/Panchayat Bhawan)' },
            { value: '04', label: 'private provider (like, Private practitioner /Private hospitals/Nursing homes etc..)' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'others' },

        ];

        this.vaccineCardStatus = [
            { value: '01', label: 'yes Card Available' },
            { value: '02', label: 'yes But The Card Is Lost' },
            { value: '03', label: 'no' },
            { value: '88', label: 'Don’t know' }

        ];

        this.notReceiveVaccineStatus = [
            { value: '01', label: 'unaware of MR Vaccination Campaign' },
            { value: '02', label: 'did Not Know Where To Go For Vaccination' },
            { value: '03', label: 'no Vaccination Conducted At School' },
            { value: '04', label: 'did Not Receive Any Communication From School' },
            { value: '05', label: 'absent At School On Immunization Day' },
            { value: '06', label: 'already Received Measles/Rubella Vaccines' },
            { value: '07', label: 'inconvenient Timing Of Session' },
            { value: '08', label: 'long Waiting Time At The Session Site' },
            { value: '09', label: 'immunization Site Too Far Away' },
            { value: '10', label: 'went To RI Site But Turned Away' },
            { value: '11', label: 'child Sick And Health Worker Unwilling To Vaccinate Child' },
            { value: '12', label: 'fear Of Pain And Other Side Effects From Injection' },
            { value: '13', label: 'child Sick And Caregiver Unwilling To Let Child Be Vaccinated' },
            { value: '14', label: 'no Faith/Don’t Believe In Vaccination' },
            { value: '15', label: 'no Faith In Government Immunization' },
            { value: '16', label: 'heard From Community Members That Vaccine May Harm The Child ' },
            { value: '17', label: 'heard From Religious Sources That Vaccine May Harm The Child ' },
            { value: '18', label: 'heard From Whatsapp That Vaccine May Harm The Child ' },
            { value: '19', label: 'heard From Facebook That Vaccine May Harm The Child' },
            { value: '20', label: 'heard From Other Social Media That Vaccine May Harm The Child' },
            { value: '21', label: 'heard That Vaccine May Harm The Child From Print Media' },
            { value: '22', label: 'heard That Vaccine May Harm The Child From Electronic Media' },
            { value: '23', label: 'family Doctor Advised Against/Pediatrician Advised Against' },
            { value: '24', label: 'ineligible' },
            { value: '88', label: 'Don’t know' },
            { value: '99', label: 'others ' },


        ];

        this.facilityStatus = [
            { value: '01', label: 'private Facility' },
            { value: '02', label: 'public Facility' },
            { value: '88', label: 'don’t Know' }

        ];

        this.immunineCardStatus = [
            { value: '01', label: 'yes, Shows Card' },
            { value: '02', label: 'yes, But Does Not Show/Find Card' },
            { value: '03', label: 'No' }

        ];

        this.vaccineByCardStatus = [
            { value: '01', label: 'Yes, received' },
            { value: '02', label: 'Yes, date not legible' },
            { value: '03', label: 'Yes, recall for this vaccine' },
            { value: '04', label: 'No' }
        ];

        this.vaccineByCardStatusNA = [
            { value: '01', label: 'Yes, received' },
            { value: '02', label: 'Yes, date not legible' },
            { value: '03', label: 'Yes, recall for this vaccine' },
            { value: '04', label: 'No' },
            { value: '05', label: 'NA' }
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
            { value: '03', label: 'Participant or Guardian asked to stop' },
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
            clusterID: '',
            editedField: false,
            eligible: true,
            selectedDate: '',
            surveyType: '',
            c2name: '',
            c3areason: '01',
            c4resname: '',
            c5resrelation: '',
            c6amomalive: '',
            c6bmomage: '',
            c7momeducation: '',
            c8momoccupation: '',
            c3dob: '01',
            c9adobdt: '',
            c10age: '',
            c11campaignlive: '',
            c12campaignaware: '',
            c13campaignhear1: '',
            c13campaignhear2: '',
            c13campaignhear3: '',
            c13aschool: '',
            c14campaignmrrec: '',
            c15campaignlocat: '',
            c15campaignlocatsp: '',
            c16campaigncard: '',
            c17campaigndose: '',
            c18reason1: '',
            c18reason2: '',
            c18reason3: '',
            c18reason4: '',
            c18reason5: '',
            c19bmcvroutrecfac: '',
            c19mcvroutrec: '',
            c19amcvroutrecdose: '',
            c20mcvcampaign: '',
            c20amcvcampaigndose: '',
            c20bmcvcampaignage: '',
            c21immcard: '',
            c22mcvdoc1: '',
            c22bmcvday1: '',
            c22cmcvdoc1rub: '',
            c23amcvdoc2: '',
            c23bmcvday1: '',
            c23cmcvdoc2rub: '',
            c24abcgdoc: '',
            c24bhepatitis: '',
            c24bhepatitisday: '',
            c24abcgday: '',
            c24bopv0doc: '',
            c24bopv0day: '',
            c24fopv1doc: '',
            C24FOPVDAY1: '',
            c24gopv2doc: '',
            C24GOPVDAY2: '',
            c24hopv3doc: '',
            C24HOPVDAY3: '',
            c24gipvdoc: '',
            c24gipvdocday: '',
            c24cpenta1doc: '',
            c24cpentaday1: '',
            c24dpenta2doc: '',
            c24dpentaday1: '',
            c24epenta3doc: '',
            c24epentaday3: '',
            c24ipcv1doc: '',
            c24ipcvday1: '',
            c24jpcv2doc: '',
            c24jpcvday2: '',
            c24kpcv3doc: '',
            c24kpcvday3: '',
            c24krota1: '',
            c24krota1day: '',
            c24lrota2: '',
            c24lrot2day: '',
            c24mrota3: '',
            c24mrota3day: '',
            c24nje1: '',
            c24nje1day: '',
            c24oje2: '',
            c24oje2day: '',
            c25abcg: '',
            c25bhepatitis: '',
            c25cpolio: '',
            c25dopv: '',
            c25dopvdose: '',
            c29aipv: '',
            c30apenta: '',
            c30apentadose: '',
            c31arota: '',
            c31arotadose: '',
            c32aje: '',
            c32ajedose: '',
            c26intcomments: '',
            cs1scollect: '01',
            cs1ascollectno: '',
            cs1bscollectoth: '',
            cs1scollecthow: '',
            cs2sdate: '',
            cs3stime: '',
            cs4sspecid: '',
            cs5squal: '',
            cs6sproblem: '',
            cs6asprobsp: '',
            cs7dcollect: '01',
            cs7adcollectno: '',
            cs7bdcollectoth: '',
            cs8ddate: '',
            cs9dtime: '',
            cs10dspecid: '',
            cs11dspots: '',
            cs12adqual1: '',
            cs12adqual2: '',
            cs12adqual3: '',
            cs12adqual4: '',
            cs12adqual5: '',
            cs13dproblem: '',
            cs13adprobsp: '',
            cs15intcomments: '',
            updatedTime: ''
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
    async openDatePicker() {
        const { params } = this.props.navigation.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ c9adobdt: `${day}-${month + 1}-${year}`, selectedDate: `${year}0${month + 1}${day}` });
                const AgeDays = Math.floor(this.getAgeDays(this.state.c9adobdt));
                const AgeMonths = Math.floor(parseInt(AgeDays) / 30.4368);
                if (params.person.AgeGroup === 'B') {
                    if (AgeMonths > 59 && AgeMonths < 180) {
                        this.setState({
                            eligible: true
                        });
                    } else {
                        this.setState({
                            eligible: false
                        });
                    }
                } else if (AgeMonths > 8 && AgeMonths < 60) {
                    this.setState({
                        eligible: true
                    });
                } else {
                    this.setState({
                        eligible: false
                    });
                }
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }
    getAgeDays() {
        const now = moment();
        const end = moment(this.state.selectedDate);
        const duration = moment.duration(now.diff(end));
        const days = duration.asDays();
        return days;
    }
    _goHome() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToDashboard' });
    }
    componentWillMount() {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        this.props.navigation.setParams({ handleSubmit: this.onPress.bind(this), goHome: this._goHome.bind(this) });
        const { params } = this.props.navigation.state;
        console.log(params);
        const surveyType = realm.objects('Cluster').filtered('status = "active"')[0].surveyType;
        const childSurveyData = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && HouseholdID=$1', params.person.Sno, params.HouseholdID);
        if (childSurveyData.length > 0) {
            const surveyDataFromDB = JSON.parse(JSON.parse(JSON.stringify(childSurveyData))[0].surveyData);
            this.setState(surveyDataFromDB);
            this.setState({ editedField: true });
        }
        this.setState({ surveyType, clusterID });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.setState({
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            () => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
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
                updatedTime: moment().format('MM-DD-YYY h:mm:ss a')
            });
            let surveyID;
            if (this.state.editedField) {
                surveyID = realm.objects('SurveyInformation').filtered('status = "saved" && Sno = $0 && AgeGroup = $1 && HouseholdID=$2', params.person.Sno, params.person.AgeGroup, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'saved' }, true);
                });
                this.removeBloodSampleCount(params.person.AgeGroup);
                navigate('CompletedSurveyDetails');
            } else {
                surveyID = realm.objects('SurveyInformation').filtered('status = "open" && Sno = $0 && AgeGroup = $1 && HouseholdID=$2', params.person.Sno, params.person.AgeGroup, params.HouseholdID)[0].surveyID;
                realm.write(() => {
                    realm.create('SurveyInformation', { surveyID, surveyData: JSON.stringify(this.state), status: 'inprogress' }, true);
                });
                this.addBloodSampleCount(params.person.AgeGroup);
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
    addBloodSampleCount(AgeGroup) {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        realm.write(() => {
            if (AgeGroup === 'A') {
                if (realm.objects('BloodSample')
                    .filtered('Submitted = "active" && clusterID = $0', clusterID).length > 0) {
                    const bloodsampleid = realm.objects('BloodSample').filtered('Submitted = "active" && clusterID = $0', clusterID)[0].id;
                    const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeA;
                    if (this.state.cs1scollect === '01' || this.state.cs7dcollect === '01') {
                        realm.create('BloodSample', { id: bloodsampleid, TypeA: bloodSampleData + 1 }, true);
                    }
                } else {
                    realm.create('BloodSample', { id: new Date().getTime(), clusterID, TypeA: 1 });
                }
            } else if (realm.objects('BloodSample').filtered('Submitted = "active" && clusterID = $0', clusterID).length > 0) {
                const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeB;
                const bloodsampleid = realm.objects('BloodSample').filtered('Submitted = "active" && clusterID = $0', clusterID)[0].id;
                if (this.state.cs1scollect === '01' || this.state.cs7dcollect === '01') {
                    realm.create('BloodSample', { id: bloodsampleid, TypeB: bloodSampleData + 1 }, true);
                }
            } else {
                realm.create('BloodSample', { id: new Date().getTime(), clusterID, TypeB: 1 });
            }
        });
    }
    removeBloodSampleCount(AgeGroup) {
        const clusterID = realm.objects('Cluster').filtered('status = "active"')[0].clusterID;
        const bloodsampleid = realm.objects('BloodSample').filtered('Submitted = "active" && clusterID = $0', clusterID)[0].id;
        if (AgeGroup === 'A') {
            const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeA;
            realm.write(() => {
                if (this.state.cs1scollect !== '01' && this.state.cs7dcollect !== '01') {
                    if (bloodSampleData.TypeA > 0) {
                        realm.create('BloodSample', { id: bloodsampleid, TypeA: bloodSampleData - 1 }, true);
                    }
                }
            });
        } else {
            const bloodSampleData = realm.objects('BloodSample').filtered('clusterID=$0', clusterID)[0].TypeB;
            realm.write(() => {
                if (this.state.cs1scollect !== '01' && this.state.cs7dcollect !== '01') {
                    if (bloodSampleData.TypeB > 0) {
                        realm.create('BloodSample', { id: bloodsampleid, TypeB: bloodSampleData - 1 }, true);
                    }
                }
            });
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={this.styles.container}>
                {/* <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetterErr}>{this.getErrorMessages()}</Text>
                </View> */}
				
				<View style={{ backgroundColor: '#a3a7a7', height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>{`Child Form for ${params.person.Name}`}</Text>
                </View>
				<View style={{ backgroundColor: '#ebebeb', padding: 25, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{`Name: ${params.person.Name}`}</Text>
					<Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{`${params.person.AgeDis}`}</Text>
					<Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{`Sex: ${params.person.Sex}`}</Text>
					<Text style={{ fontSize: 18, color: '#333', fontWeight: '200', textAlign: 'left' }}>{`Sno: ${params.person.Sno}`}</Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Child Full Name</Text>
                    <FormInput
                        value={this.state.c2name}
                        onChangeText={(name) => this.setState({ c2name: name })}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.headingLetter}>Do you know date of birth for the child?</Text>
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                        buttonColor={'#4B5461'}
                        formHorizontal={false}
                        labelHorizontal
                        radio_props={this.optionListBoolean}
                        initial={this.state.c3dobindex ? this.state.c3dobindex : 0}
                        onPress={(value, index) => {
                            this.setState({ c3dob: value, c9adobdt: '', c10age: '', c3dobindex: index, eligible: true });
                        }}
                    />
                </View >
                {this.state.c3dob === '01' &&
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.headingLetter}>On what day month and year was the child born?</Text>
                        <FormInput
                            value={this.state.c9adobdt}
                            onChangeText={(c9adobdt) => this.setState({ c9adobdt })}
                            onFocus={() => {
                                this.openDatePicker();
                            }}
                        />
                    </View>
                }

                {this.state.c3dob === '02' &&
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.headingLetter}>How old is the child?</Text>
                        <FormInput
                            keyboardType='numeric'
                            value={this.state.c10age}
                            onChangeText={(c10age) => this.setState({ c10age })}
                            onBlur={() => {
                                const AgeMonths = Math.floor(Math.floor(this.state.c10age * 365.25) / 30.4368);
                                if (params.person.AgeGroup === 'B') {
                                    if (AgeMonths > 59 && AgeMonths < 180) {
                                        this.setState({
                                            eligible: true
                                        });
                                    } else {
                                        this.setState({
                                            eligible: false
                                        });
                                    }
                                } else if (AgeMonths > 8 && AgeMonths < 60) {
                                    this.setState({
                                        eligible: true
                                    });
                                } else {
                                    this.setState({
                                        eligible: false
                                    });
                                }
                            }}
                        />
                    </View>
                }
                {this.state.eligible &&
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Was assent and/or parental  permission taken for child?</Text>
                            <RadioForm
                                animation={false}
                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                buttonColor={'#4B5461'}
                                formHorizontal={false}
                                labelHorizontal
                                radio_props={this.optionListConsent}
                                initial={this.state.c3areasonindex ? this.state.c3areasonindex : 0}
                                onPress={(value, index) => { this.setState({ c3areason: value, c3areasonindex: index }); console.log(this.state); }}
                            />
                        </View >
                        {this.state.c3areason === '01' &&
                            <View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Respondent full name?</Text>
                                    <FormInput
                                        value={this.state.c4resname}
                                        onChangeText={(resname) => this.setState({ c4resname: resname })}
                                    />
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Relationship of respondent to the child?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListRelation}
                                        initial={this.state.c5resrelationindex ? this.state.c5resrelationindex : 0}
                                        onPress={(value, index) => { this.setState({ c5resrelation: value, c5resrelationindex: index }); console.log(this.state); }}
                                    />
                                </View >
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Is child mother alive?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionListBoolean}
                                        initial={this.state.c6amomaliveindex ? this.state.c6amomaliveindex : 0}
                                        onPress={(value, index) => { this.setState({ c6amomalive: value, c6amomaliveindex: index }); console.log(this.state); }}
                                    />
                                </View >
                                {this.state.c6amomalive === '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Mother's completed age(years)?</Text>
                                            <FormInput
                                                value={this.state.c6bmomage}
                                                onChangeText={(value) => this.setState({ c6bmomage: value })}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Mother's education?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.educationStatus}
                                                initial={this.state.c7momeducationindex ? this.state.c7momeducationindex : 0}
                                                onPress={(value, index) => { this.setState({ c7momeducation: value, c7momeducationindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Mother's Occupation?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.ocuupationStatus}
                                                initial={this.state.c8momoccupationindex ? this.state.c8momoccupationindex : 0}
                                                onPress={(value, index) => { this.setState({ c8momoccupation: value, c8momoccupationindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                    </View>
                                }
                                {this.state.surveyType === '02' &&
                                    <View>
									<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Measles and Rubella campaign immunization</Text>
                            </View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Was the child living in this household when MR campaign was occuring? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c11campaignliveindex ? this.state.c11campaignliveindex : 0}
                                                onPress={(value, index) => { this.setState({ c11campaignlive: value, c11campaignliveindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Are you aware that Measles-Rubella (MR) vaccination campaign was recently held in your area? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c12campaignawareindex ? this.state.c12campaignawareindex : 0}
                                                onPress={(value, index) => { this.setState({ c12campaignaware: value, c12campaignawareindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>How did you hear about the campaign(First Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear1index ? this.state.c13campaignhear1index : 0}
                                                onPress={(value, index) => { this.setState({ c13campaignhear1: value, c13campaignhear1index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>How did you hear about the campaign(Second Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear2index ? this.state.c13campaignhear2index : 0}
                                                onPress={(value, index) => { this.setState({ c13campaignhear2: value, c13campaignhear2index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>How did you hear about the campaign(Third Option)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.champaignInfoStatus}
                                                initial={this.state.c13campaignhear3index ? this.state.c13campaignhear3index : 0}
                                                onPress={(value, index) => { this.setState({ c13campaignhear3: value, c13campaignhear3index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Where did you go to school? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.schoolStatus}
                                                initial={this.state.c13aschoolindex ? this.state.c13aschoolindex : 0}
                                                onPress={(value, index) => { this.setState({ c13aschool: value, c13aschoolindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Did the child receive the Measles-Rubella(MR) vaccine during the recent vaccination campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c14campaignmrrecindex ? this.state.c14campaignmrrecindex : 0}
                                                onPress={(value, index) => { this.setState({ c14campaignmrrec: value, c14campaignmrrecindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Where did the child receive the Measles-Rubella(MR) vaccine during the campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.receiveVaccineStatus}
                                                initial={this.state.c15campaignlocatindex ? this.state.c15campaignlocatindex : 0}
                                                onPress={(value, index) => { this.setState({ c15campaignlocat: value, c15campaignlocatindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Others, Specify?</Text>
                                            <FormInput
                                                value={this.state.c15campaignlocatsp}
                                                onChangeText={(c15campaignlocatsp) => this.setState({ c15campaignlocatsp })}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Was the vaccination card provided to the family during the campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.vaccineCardStatus}
                                                initial={this.state.c16campaigncardindex ? this.state.c16campaigncardindex : 0}
                                                onPress={(value, index) => { this.setState({ c16campaigncard: value, c16campaigncardindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>Does the vaccination card indicate the MR campaign vaccination dose was given? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionListBoolean}
                                                initial={this.state.c17campaigndoseindex ? this.state.c17campaigndoseindex : 0}
                                                onPress={(value, index) => { this.setState({ c17campaigndose: value, c17campaigndoseindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>What was the reason child not receiving MR vaccination during the campaign (Reason 1)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.notReceiveVaccineStatus}
                                                initial={this.state.c18reason1index ? this.state.c18reason1index : 0}
                                                onPress={(value, index) => { this.setState({ c18reason1: value, c18reason1index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>What was the reason child not receiving MR vaccination during the campaign (Reason 2)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.notReceiveVaccineStatus}
                                                initial={this.state.c18reason2index ? this.state.c18reason2index : 0}
                                                onPress={(value, index) => { this.setState({ c18reason2: value, c18reason2index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>What was the reason child not receiving MR vaccination during the campaign (Reason 3)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.notReceiveVaccineStatus}
                                                initial={this.state.c18reason3index ? this.state.c18reason3index : 0}
                                                onPress={(value, index) => { this.setState({ c18reason3: value, c18reason3index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>What was the reason child not receiving MR vaccination during the campaign (Reason 4)? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.notReceiveVaccineStatus}
                                                initial={this.state.c18reason4index ? this.state.c18reason4index : 0}
                                                onPress={(value, index) => { this.setState({ c18reason4: value, c18reason4index: index }); console.log(this.state); }}
                                            />
                                        </View >
                                    </View>
                                }
                                {params.person.AgeGroup === 'A' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>19. Did you receive any measles containing vaccine to prevent him/ her getting measles?(This does not include measles vaccines given during vaccination campaign) </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c19mcvroutrecindex ? this.state.c19mcvroutrecindex : 0}
                                                onPress={(value, index) => { this.setState({ c19mcvroutrec: value, c19mcvroutrecindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        {this.state.c19mcvroutrec === '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>19A. Number of doses?</Text>
                                                    <FormInput
                                                        value={this.state.c19amcvroutrecdose}
                                                        onChangeText={(c19amcvroutrecdose) => this.setState({ c19amcvroutrecdose })}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>19B. Where did you receive the first vaccine dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.facilityStatus}
                                                        initial={this.state.c19bmcvroutrecfacindex ? this.state.c19bmcvroutrecfacindex : 0}
                                                        onPress={(value, index) => { this.setState({ c19bmcvroutrecfac: value, c19bmcvroutrecfacindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.surveyType === '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>20. Has your child receive any measles containing vaccine from the vaccination campaign? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.optionList}
                                                initial={this.state.c20mcvcampaignindex ? this.state.c20mcvcampaignindex : 0}
                                                onPress={(value, index) => { this.setState({ c20mcvcampaign: value, c20mcvcampaignindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        {this.state.c20mcvcampaign === '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>20a. Number of doses?</Text>
                                                    <FormInput
                                                        value={this.state.c19amcvroutrecdose}
                                                        onChangeText={(c19amcvroutrecdose) => this.setState({ c19amcvroutrecdose })}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>20b. What was the child's age when they receive the measles vaccine from vaccination campaign?</Text>
                                                    <FormInput
                                                        value={this.state.c20bmcvcampaignage}
                                                        onChangeText={(c20bmcvcampaignage) => this.setState({ c20bmcvcampaignage })}
                                                    />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                                {params.person.AgeGroup === 'A' &&
                                    <View>
									
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>21. Do you have a routine immunization card for child? </Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.immunineCardStatus}
                                                initial={this.state.c21immcardindex ? this.state.c21immcardindex : 0}
                                                onPress={(value, index) => { this.setState({ c21immcard: value, c21immcardindex: index }); console.log(this.state); }}
                                            />
                                        </View >
                                        {this.state.c21immcard === '01' &&
                                            <View>
											<View style={{ backgroundColor: '#ebebeb', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>information from Immunization card</Text>
											</View>
											<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
												<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>MCV</Text>
											</View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>22A. Vaccine - MCV1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c22mcvdoc1index ? this.state.c22mcvdoc1index : 0}
                                                        onPress={(value, index) => { this.setState({ c22mcvdoc1: value, c22mcvdoc1index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c22mcvdoc1 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>22B. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c22bmcvday1}
                                                            onChangeText={(c22bmcvday1) => this.setState({ c22bmcvday1 })}
                                                        />
                                                    </View>
                                                }
                                                {(this.state.c22mcvdoc1 === '01' || this.state.c22mcvdoc1 === '02') &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>22C. Does this dose contain rubella (MR or MMR)? </Text>
                                                        <RadioForm
                                                            animation={false}
                                                            style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                            labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                            buttonColor={'#4B5461'}
                                                            formHorizontal={false}
                                                            labelHorizontal
                                                            radio_props={this.optionListBoolean}
                                                            initial={this.state.c22cmcvdoc1rubindex ? this.state.c22cmcvdoc1rubindex : 0}
                                                            onPress={(value, index) => { this.setState({ c22cmcvdoc1rub: value, c22cmcvdoc1rubindex: index }); console.log(this.state); }}
                                                        />
                                                    </View >
                                                }

                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>23A. Vaccine - MCV2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c23amcvdoc2index ? this.state.c23amcvdoc2index : 0}
                                                        onPress={(value, index) => { this.setState({ c23amcvdoc2: value, c23amcvdoc2index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c23amcvdoc2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>23B. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c23bmcvday1}
                                                            onChangeText={(c23bmcvday1) => this.setState({ c23bmcvday1 })}
                                                        />
                                                    </View>
                                                }
                                                {(this.state.c23amcvdoc2 === '01' || this.state.c23amcvdoc2 === '02') &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>23C. Does this dose contain rubella (MR or MMR)? </Text>
                                                        <RadioForm
                                                            animation={false}
                                                            style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                            labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                            buttonColor={'#4B5461'}
                                                            formHorizontal={false}
                                                            labelHorizontal
                                                            radio_props={this.optionListBoolean}
                                                            initial={this.state.c23cmcvdoc2rubindex ? this.state.c23cmcvdoc2rubindex : 0}
                                                            onPress={(value, index) => { this.setState({ c23cmcvdoc2rub: value, c23cmcvdoc2rubindex: index }); console.log(this.state); }}
                                                        />
                                                    </View >
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24A. BCG? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24abcgdocindex ? this.state.c24abcgdocindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24abcgdoc: value, c24abcgdocindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24abcgdoc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24A. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c23bmcvday1}
                                                            onChangeText={(c23bmcvday1) => this.setState({ c23bmcvday1 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24b. Hepatitis B? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24bhepatitisindex ? this.state.c24bhepatitisindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24bhepatitis: value, c24bhepatitisindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24bhepatitis === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24b. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24bhepatitisday}
                                                            onChangeText={(c24bhepatitisday) => this.setState({ c24bhepatitisday })}
                                                        />
                                                    </View>
                                                }
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
													<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Polio</Text>
												</View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24c. OPV-Birth dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24bopv0docindex ? this.state.c24bopv0docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24bopv0doc: value, c24bopv0docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24abcgdoc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24c. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24bopv0day}
                                                            onChangeText={(c24bopv0day) => this.setState({ c24bopv0day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24d. OPV Dose 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24fopv1docindex ? this.state.c24fopv1docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24fopv1doc: value, c24fopv1docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24fopv1doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24D. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24fopvday1}
                                                            onChangeText={(c24fopvday1) => this.setState({ c24fopvday1 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24E. OPV Dose 2 ? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24gopv2docindex ? this.state.c24gopv2docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24gopv2doc: value, c24gopv2docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24gopv2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24E. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24gopvday2}
                                                            onChangeText={(c24gopvday2) => this.setState({ c24gopvday2 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24F. OPV Dose 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24hopv3docindex ? this.state.c24hopv3docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24hopv3doc: value, c24hopv3docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24gopv2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24F. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24hopcday3}
                                                            onChangeText={(c24hopcday3) => this.setState({ c24hopcday3 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24G. IPV? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24gipvdocindex ? this.state.c24gipvdocindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24gipvdoc: value, c24gipvdocindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24gopv2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24G. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24gipvdocday}
                                                            onChangeText={(c24gipvdocday) => this.setState({ c24gipvdocday })}
                                                        />
                                                    </View>
                                                }
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
													<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Penta</Text>
												</View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24H. DTP/Penta -1 ? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24cpenta1docindex ? this.state.c24cpenta1docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24cpenta1doc: value, c24cpenta1docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24cpenta1doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24H. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24cpentaday1}
                                                            onChangeText={(c24cpentaday1) => this.setState({ c24cpentaday1 })}
                                                        />
                                                    </View>
                                                }

                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24I. DTP/Penta - 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24dpenta2docindex ? this.state.c24dpenta2docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24dpenta2doc: value, c24dpenta2docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24dpenta2doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24I. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24dpentaday1}
                                                            onChangeText={(c24dpentaday1) => this.setState({ c24dpentaday1 })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24J. DPT/Penta - 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24epenta3docindex ? this.state.c24epenta3docindex : 0}
                                                        onPress={(value, index) => { this.setState({ c24epenta3doc: value, c24epenta3docindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24epenta3doc === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24J. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24epentaday3}
                                                            onChangeText={(c24epentaday3) => this.setState({ c24epentaday3 })}
                                                        />
                                                    </View>
                                                }
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
													<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Rotavirus</Text>
												</View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24K. Rota 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24krota1index ? this.state.c24krota1index : 0}
                                                        onPress={(value, index) => { this.setState({ c24krota1: value, c24krota1index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24krota1 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24K. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24krota1day}
                                                            onChangeText={(c24krota1day) => this.setState({ c24krota1day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24l. Rota 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24lrota2index ? this.state.c24lrota2index : 0}
                                                        onPress={(value, index) => { this.setState({ c24lrota2: value, c24lrota2index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24lrota2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24L. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24lrota2day}
                                                            onChangeText={(c24lrota2day) => this.setState({ c24lrota2day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24M. Rota 3? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatus}
                                                        initial={this.state.c24mrota3index ? this.state.c24mrota3index : 0}
                                                        onPress={(value, index) => { this.setState({ c24mrota3: value, c24mrota3index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24mrota3 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>24M. Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24mrota3day}
                                                            onChangeText={(c24mrota3day) => this.setState({ c24mrota3day })}
                                                        />
                                                    </View>
                                                }
												<View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
													<Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>Japanese Encephalitis</Text>
												</View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24N. Japanese Encephalitis 1? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c24nje1index ? this.state.c24nje1index : 0}
                                                        onPress={(value, index) => { this.setState({ c24nje1: value, c24nje1index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24nje1 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24nje1day}
                                                            onChangeText={(c24nje1day) => this.setState({ c24nje1day })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>24O. Japanese Encephalitis 2? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.vaccineByCardStatusNA}
                                                        initial={this.state.c24oje2index ? this.state.c24oje2index : 0}
                                                        onPress={(value, index) => { this.setState({ c24oje2: value, c24oje2index: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c24oje2 === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>Date of vaccination?</Text>
                                                        <FormInput
                                                            value={this.state.c24oje2day}
                                                            onChangeText={(c24oje2day) => this.setState({ c24oje2day })}
                                                        />
                                                    </View>
                                                }
                                            </View>
                                        }
                                        {this.state.c21immcard !== '01' &&
                                            <View>
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>25A. BCG? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25abcgindex ? this.state.c25abcgindex : 0}
                                                        onPress={(value, index) => { this.setState({ c25abcg: value, c25abcgindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>26A. Hepatatis B birth dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25bhepatitisindex ? this.state.c25bhepatitisindex : 0}
                                                        onPress={(value, index) => { this.setState({ c25bhepatitis: value, c25bhepatitisindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>27A. Polio-Birth dose? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25cpolioindex ? this.state.c25cpolioindex : 0}
                                                        onPress={(value, index) => { this.setState({ c25cpolio: value, c25cpolioindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>28A. OPV? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c25dopvindex ? this.state.c25dopvindex : 0}
                                                        onPress={(value, index) => { this.setState({ c25dopv: value, c25dopvindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c25dopv === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>28B. Number of doses?</Text>
                                                        <FormInput
                                                            value={this.state.c25dopvdose}
                                                            onChangeText={(c25dopvdose) => this.setState({ c25dopvdose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>29A. IPV? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c29aipvindex ? this.state.c29aipvindex : 0}
                                                        onPress={(value, index) => { this.setState({ c29aipv: value, c29aipvindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>30A. Penta? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c30apentaindex ? this.state.c30apentaindex : 0}
                                                        onPress={(value, index) => { this.setState({ c30apenta: value, c30apentaindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c30apenta === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>30B. Number of doses?</Text>
                                                        <FormInput
                                                            value={this.state.c30apentadose}
                                                            onChangeText={(c30apentadose) => this.setState({ c30apentadose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>31A. Rota? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c31arotaindex ? this.state.c31arotaindex : 0}
                                                        onPress={(value, index) => { this.setState({ c31arota: value, c31arotaindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c31arota === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>31B. Number of doses?</Text>
                                                        <FormInput
                                                            value={this.state.c31arotadose}
                                                            onChangeText={(c31arotadose) => this.setState({ c31arotadose })}
                                                        />
                                                    </View>
                                                }
                                                <View style={{ marginBottom: 20 }}>
                                                    <Text style={styles.headingLetter}>32A. JE? </Text>
                                                    <RadioForm
                                                        animation={false}
                                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                        buttonColor={'#4B5461'}
                                                        formHorizontal={false}
                                                        labelHorizontal
                                                        radio_props={this.optionList}
                                                        initial={this.state.c32ajeindex ? this.state.c32ajeindex : 0}
                                                        onPress={(value, index) => { this.setState({ c32aje: value, c32ajeindex: index }); console.log(this.state); }}
                                                    />
                                                </View >
                                                {this.state.c32aje === '01' &&
                                                    <View style={{ marginBottom: 20 }}>
                                                        <Text style={styles.headingLetter}>32B. Number of doses?</Text>
                                                        <FormInput
                                                            value={this.state.c32ajedose}
                                                            onChangeText={(c32ajedose) => this.setState({ c32ajedose })}
                                                        />
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>

                                }
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.headingLetter}>Interviewer comments?</Text>
                            <FormInput
                                value={this.state.c26intcomments}
                                onChangeText={(c26intcomments) => this.setState({ c26intcomments })}
                            />
                        </View>

                        {this.state.c3areason === '01' &&
                            <View>
                            <View style={{ backgroundColor: '#e2e4e4', height: 50, display: 'flex', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: '#333', fontWeight: '500', textAlign: 'center' }}>SPECIMEN COLLECTION</Text>
                            </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>1. Was a Capillary Liquid Blood sample collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.optionList}
                                        initial={this.state.cs1scollectindex ? this.state.cs1scollectindex : 0}
                                        onPress={(value, index) => {
                                            this.setState({ cs1scollect: value, cs1scollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                            } else {
                                                this.state.specimenCapillaryID = '';
                                            }
                                        }}
                                    />
                                </View>

                                {this.state.cs1scollect === '02' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>1A. Specify reason?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.bloodreasonoptions}
                                                initial={this.state.cs1ascollectnoindex ? this.state.cs1ascollectnoindex : 0}
                                                onPress={(value, index) => { this.setState({ cs1ascollectno: value, cs1ascollectnoindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        {this.state.cs1ascollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>1B. Specify other reason</Text>
                                                <FormInput
                                                    value={this.state.cs1bscollectoth}
                                                    onChangeText={(cs1bscollectoth) => this.setState({ cs1bscollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.cs1scollect === '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>1C. How specimen was collected?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenmethodoptions}
                                                initial={this.state.cs1scollecthowindex ? this.state.cs1scollecthowindex : 0}
                                                onPress={(value, index) => {
                                                    this.setState({ cs1scollecthow: value, cs1scollecthowindex: index });
                                                    if (value === '01' || value === '02') {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}S`;
                                                    } else {
                                                        this.state.specimenCapillaryID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}V`;
                                                    }
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.headingLetter}>{`Specimen ID: ${this.state.specimenCapillaryID}`} :: {`Collection Date & Time: ${new Date().getTime()}`}</Text>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>5. Specimen quality?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenqualityoptions}
                                                initial={this.state.cs5squalindex ? this.state.cs5squalindex : 0}
                                                onPress={(value, index) => { this.setState({ cs5squal: value, cs5squalindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>6. Specimen collection problem?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.specimenproblemoptions}
                                                initial={this.state.cs6sproblemindex ? this.state.cs6sproblemindex : 0}
                                                onPress={(value, index) => { this.setState({ cs6sproblem: value, cs6sproblemindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        {this.state.cs6sproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>6A. Specify other reason</Text>
                                                <FormInput
                                                    value={this.state.cs6asprobsp}
                                                    onChangeText={(cs6asprobsp) => this.setState({ cs6asprobsp })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>7. Was a DBS sample collected?</Text>
                                    <RadioForm
                                        animation={false}
                                        style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                        labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                        buttonColor={'#4B5461'}
                                        formHorizontal={false}
                                        labelHorizontal
                                        radio_props={this.dbssampleoptions}
                                        initial={this.state.cs7dcollectindex ? this.state.cs7dcollectindex : 0}
                                        onPress={(value, index) => {
                                            this.setState({ cs7dcollect: value, cs7dcollectindex: index });
                                            if (value === '01') {
                                                this.state.specimenDBSID = `${this.state.clusterID + params.person.AgeGroup + params.person.Sno}D`;
                                            } else {
                                                this.state.specimenDBSID = '';
                                            }
                                        }}
                                    />
                                </View>
                                {this.state.cs7dcollect !== '01' &&
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>7A. Specify reason?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.bloodreasonoptions}
                                                initial={this.state.cs7adcollectnoindex ? this.state.cs7adcollectnoindex : 0}
                                                onPress={(value, index) => { this.setState({ cs7adcollectno: value, cs7adcollectnoindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        {this.state.cs7adcollectno === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>7B. Specify other reason</Text>
                                                <FormInput
                                                    value={this.state.cs7bdcollectoth}
                                                    onChangeText={(cs7bdcollectoth) => this.setState({ cs7bdcollectoth })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                {this.state.cs7dcollect === '01' &&
                                    <View>
                                        <Text style={styles.headingLetter}>{`Specimen ID: ${this.state.specimenDBSID}`} :: {`Collection Date & Time: ${new Date().getTime()}`}</Text>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>11. Number of spots collected?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.spotsCollectedoptions}
                                                initial={this.state.cs11dspotsindex ? this.state.cs11dspotsindex : 0}
                                                onPress={(value, index) => { this.setState({ cs11dspots: value, cs11dspotsindex: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>12A. SPECIMEN QUALITY DBS1?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.cs12adqual1index ? this.state.cs12adqual1index : 0}
                                                onPress={(value, index) => { this.setState({ cs12adqual1: value, cs12adqual1index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>12B. SPECIMEN QUALITY DBS2?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.cs12adqual2index ? this.state.cs12adqual2index : 0}
                                                onPress={(value, index) => { this.setState({ cs12adqual2: value, cs12adqual2index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>12C. SPECIMEN QUALITY DBS3?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.cs12adqual3index ? this.state.cs12adqual3index : 0}
                                                onPress={(value, index) => { this.setState({ cs12adqual3: value, cs12adqual3index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>12D. SPECIMEN QUALITY DBS4?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.cs12adqual4index ? this.state.cs12adqual4 : 0}
                                                onPress={(value, index) => { this.setState({ cs12adqual4: value, cs12adqual4index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>12E. SPECIMEN QUALITY DBS5?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.adequateoptions}
                                                initial={this.state.cs12adqual5index ? this.state.cs12adqual5index : 0}
                                                onPress={(value, index) => { this.setState({ cs12adqual5: value, cs12adqual5index: index }); console.log(this.state); }}
                                            />
                                        </View>

                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={styles.headingLetter}>13. Specimen collection problem?</Text>
                                            <RadioForm
                                                animation={false}
                                                style={{ marginTop: 20, marginLeft: 17, alignItems: 'flex-start' }}
                                                labelStyle={{ margin: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                                                buttonColor={'#4B5461'}
                                                formHorizontal={false}
                                                labelHorizontal
                                                radio_props={this.dbsspecimenproblemoptions}
                                                initial={this.state.cs13dproblemindex ? this.state.cs13dproblemindex : 0}
                                                onPress={(value, index) => { this.setState({ cs13dproblem: value, cs13dproblemindex: index }); console.log(this.state); }}
                                            />
                                        </View>
                                        {this.state.cs13dproblem === '99' &&
                                            <View style={{ marginBottom: 20 }}>
                                                <Text style={styles.headingLetter}>13A. Specify other reason</Text>
                                                <FormInput
                                                    value={this.state.cs13adprobsp}
                                                    onChangeText={(cs13adprobsp) => this.setState({ cs13adprobsp })}
                                                />
                                            </View>
                                        }
                                    </View>
                                }
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.headingLetter}>Interviewer observation (Related to Blood Collection)</Text>
                                    <FormInput
                                        value={this.state.cs13adprobsp}
                                        onChangeText={(cs13adprobsp) => this.setState({ cs13adprobsp })}
                                    />
                                </View>
                            </View>
                        }

                    </View>
                }
                {(!this.state.eligible) &&
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.headingLetterErr}>Ineligible Candidate for  the Age group selected*</Text>
                        <Text style={styles.headingLetter}>Interviewer comments?</Text>
                        <FormInput
                            value={this.state.c26intcomments}
                            onChangeText={(c26intcomments) => this.setState({ c26intcomments })}
                        />
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
