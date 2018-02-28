import React from 'react';
import { StyleSheet, View, ScrollView, DatePickerAndroid, Switch } from 'react-native';
import {
    FormRow, colors, Button, AddCardHeader,
    FormInput, FormLabel, Text
} from '../../components/PocketUI/index';
import moment from 'moment';
import realm from '../../providers/realm';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class AddIndividualScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dobStatus: true,
            availability: true,
            dob: '',
            age: '',
            selectedDate: '',
            Sex: 'M',
            accuracy: 0,
            latitude: 0,
            longitude: 0
        };
        this.gender_option = [
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' }
        ];
        this.availability_option = [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
        ];
    }

    static navigationOptions = {
        title: 'Add Individual',
        headerTitleStyle: { fontSize: 23, fontWeight: 'bold' },
        headerStyle: { height: 55, borderWidth: 1, borderBottomColor: 'white', padding: 8 }
    };

    state = {
        selectedTab: 'AddIndividual'
    }
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

    getAgeDays() {
        const now = moment();
        const end = moment(this.state.selectedDate);
        const duration = moment.duration(now.diff(end));
        const days = duration.asDays();
        return days;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log('position.coords.accuracy', position.coords.accuracy);
                this.setState({
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        );
    }

    saveIndividual() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const HouseholdPrimary = Math.floor(Math.random() * 10000000000) + new Date().getTime();
        if (this.state.name && (this.state.dob || this.state.age)) {
            const householdObj = {
                id: `${params.HouseholdID}${new Date().getTime()}`,
                HouseholdID: params.HouseholdID,
                HouseholdStatus: params.HouseholdStatus,
                HouseholdPrimary,
                Name: this.state.name,
                KnowDOB: this.state.dobStatus,
                DOB: this.state.dobStatus ? this.state.dob : '',
                AgeDays: this.state.dobStatus ? String(Math.floor(this.getAgeDays())) : String(Math.floor(this.state.age * 365.25)),
                Age: this.state.age,
                Sex: this.state.Sex,
                IsPersonAvailable: this.state.availability,
                Submitted: 'active',
                Category: '',
                clusterID: params.clusterID,
                AgeMonths: 0,
                UpdatedTime: moment().format('DD-MM-YYYY h:mm:ss a'),
                HouseholdStatusValue: params.HouseholdStatusValue,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                accuracy: this.state.accuracy
            };
            if (this.state.availability) {
                const AgeMonths = Math.floor(parseInt(householdObj.AgeDays) / 30.4368);
                if (AgeMonths > 8 && AgeMonths < 60) {
                    householdObj.Category = 'A';
                } else if (AgeMonths > 59 && AgeMonths < 180) {
                    householdObj.Category = 'B';
                } else if (AgeMonths > 179 && AgeMonths < 600 && householdObj.Sex === 'F') {
                    householdObj.Category = 'C';
                }
                householdObj.AgeMonths = AgeMonths;
            }
            console.log('householdObj', householdObj);
            realm.write(() => {
                realm.create('Household', householdObj);
                navigate('HouseHold', { HouseholdID: params.HouseholdID, HouseholdStatus: params.HouseholdStatus });
            });
        } else {
            alert('Mandatory fields cannot be left empty');
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <AddCardHeader
                        mainTitle={`Cluster ID : ${params.clusterID} / Village Name : ${params.villageName}`}
                        subTitle={`Household ID : ${params.HouseholdID}`}
                    />
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.headingLetter}>Name*</Text>
                        <FormInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.headingLetter}>Do you know DOB ?</Text>
                        <RadioForm
                            animation={false}
                            style={{ margin: 20 }}
                            labelStyle={{ fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                            buttonColor={'#4B5461'}
                            formHorizontal
                            labelHorizontal
                            radio_props={this.availability_option}
                            initial={0}
                            onPress={(value) => { this.setState({ dobStatus: value, dob: '', age: '' }); console.log(this.state); }}
                        />
                    </View>
                    {(this.state.dobStatus) &&
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.headingLetter}>Date of Birth*</Text>
                            <FormInput
                                value={this.state.dob}
                                onFocus={() => {
                                    this.openDatePicker();
                                }
                                }

                            />
                        </View>
                    }
                    {(!this.state.dobStatus) &&
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.headingLetter}>Completed Age*</Text>
                            <FormInput
                                keyboardType='numeric'
                                value={this.state.age}
                                onChangeText={(age) => this.setState({ age })}
                            />
                        </View>
                    }
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.headingLetter}>Gender</Text>
                        <RadioForm
                            animation={false}
                            style={{ margin: 20 }}
                            labelStyle={{ fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                            buttonColor={'#4B5461'}
                            formHorizontal
                            labelHorizontal
                            radio_props={this.gender_option}
                            initial={0}
                            onPress={(value) => { this.setState({ Sex: value }); console.log(this.state); }}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.headingLetter}>Availability - Will you be available for next 3-4 days during the survey ?</Text>
                        <RadioForm
                            animation={false}
                            style={{ margin: 20 }}
                            labelStyle={{ fontSize: 20, fontWeight: 'bold', marginRight: 40, color: '#4B5461' }}
                            buttonColor={'#4B5461'}
                            formHorizontal
                            labelHorizontal
                            radio_props={this.availability_option}
                            initial={0}
                            onPress={(value) => { this.setState({ availability: value }); console.log(this.state); }}
                        />
                    </View>
                    <Button
                        buttonStyle={{ marginTop: 30, marginBottom: 15, backgroundColor: '#4c9689' }}
                        title='Add'
                        onPress={() => this.saveIndividual()}
                    />

                </ScrollView>
            </View >
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
        fontWeight: '700',
        fontSize: 22,
        marginLeft: 20,
        marginTop: 10,
    }
});
