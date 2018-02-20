import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import realm from '../../providers/realm';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Left,
    Button,
    Icon
} from 'native-base';
import { get } from 'lodash';
import { connect } from "react-redux";
import AddIndividualForm from "../../forms/AddIndividualForm/index";
import MIcon from '../../components/MIcon/index';

class AddIndividualScreen extends Component {
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
        }
    }
    

    async openDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            })
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ dob: `${day}-${month + 1}-${year}`, selectedDate: `${year}0${month + 1}${day}` });
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    getAgeDays() {
        let now = moment();
        let end = moment(this.state.selectedDate);
        let duration = moment.duration(now.diff(end));
        let days = duration.asDays();
        return days;
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log("position.coords.accuracy", position.coords.accuracy);
                this.setState({
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => console.log('location is not available'),
            { enableHighAccuracy: false, timeout: 30000 }
        )
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }
    saveIndividual() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const { dispatch, addindividualValues } = this.props;
        if (addindividualValues.values.name && (addindividualValues.values.dob || addindividualValues.values.age)) {
            const householdObj = {
                id: `${params.HouseholdID}${new Date().getTime()}`,
                HouseholdID: params.HouseholdID,
                HouseholdStatus: params.HouseholdStatus,
                Name: addindividualValues.values.name,
                KnowDOB: addindividualValues.values.dobStatus,
                DOB: addindividualValues.values.dobStatus ? addindividualValues.values.dob : '',
                AgeDays: addindividualValues.values.dobStatus ? String(Math.floor(this.getAgeDays())) : String(Math.floor(addindividualValues.values.age * 365.25)),
                Age: addindividualValues.values.age ? addindividualValues.values.age : '',
                Sex: addindividualValues.values.Sex,
                IsPersonAvailable: addindividualValues.values.availability,
                Submitted: 'active',
                Category: '',
                clusterID: params.clusterID,
                AgeMonths: 0,
                UpdatedTime: moment().format('DD-MM-YYYY h:mm:ss a'),
                HouseholdStatusValue: params.HouseholdStatusValue,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                accuracy: this.state.accuracy
            }
            if (this.state.availability) {
                let AgeMonths = Math.floor(parseInt(householdObj['AgeDays']) / 30.4368)
                if (AgeMonths > 8 && AgeMonths < 60) {
                    householdObj['Category'] = 'A';
                }
                else if (AgeMonths > 59 && AgeMonths < 180) {
                    householdObj['Category'] = 'B';
                }
                else if (AgeMonths > 179 && AgeMonths < 600 && householdObj['Sex'] === 'F') {
                    householdObj['Category'] = 'C';
                }
                householdObj['AgeMonths'] = AgeMonths;
            }
            console.log("householdObj", householdObj);
            realm.write(() => {
                realm.create('Household', householdObj);
                navigate('HouseHold', { HouseholdID: params.HouseholdID });
            });

        } else {
            alert('Mandatory fields cannot be left empty');
        }

    }

    render() {
        const { dispatch, addindividualValues } = this.props;
        return (
            <Container style={{ backgroundColor: '#e9e9e9' }}>
                <Content style={{ padding: 20 }}>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <MIcon family='FontAwesome' name='user-plus' style={{ fontSize: 100, color: '#4c9689' }} />
                                <Body>
                                    <Text style={{ fontSize: 32 }}>Add Individual</Text>
                                    <Text note>Please enter the individual information.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <AddIndividualForm />
                            </Body>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#4c9689' }}>
                            <Body>
                                <Button full transparent onPress={() => { this.saveIndividual() }}>
                                    <Text style={{ fontSize: 20, color: '#fff' }}>Save Individual</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    addindividualValues: state.form.addindividual,
    formValues: state.form
});

export default connect(mapStateToProps)(AddIndividualScreen);