import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import {
    Button,
    Text,
    Card,
    CardItem,
    Body
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/InputField/index';
import RadioInput from '../../components/RadioInput/index';

class AddIndividualForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selected: ''
        }
    }

    onPress(selected){
        this.setState({
            selected
        })
    }

    render(){
        const { dispatch } = this.props;
        
        const indNameModelDefinition = {
            label: 'Name'
        }
        const indDOBModelDefinition = {
            label: 'Date of Birth'
        }
        const indCompletedAgeModelDefinition = {
            label: 'Completed Age'
        }
        const iDobStatus1ModelDefinition = {
            label: 'Yes',
            name: 'idobstatus',
            value: '01',
            actualValue: '01'
        }
        const iDobStatus2ModelDefinition = {
            label: 'No',
            name: 'idobstatus',
            value: '02',
            actualValue: '02'
        }
        const genderMaleModelDefinition = {
            label: 'Male',
            name: 'gender',
            value: 'M',
            actualValue: '01'
        }
        const genderFemaleModelDefinition = {
            label: 'Female',
            name: 'gender',
            value: 'F',
            actualValue: '02'
        }
        const availability1ModelDefinition = {
            label: 'Yes',
            name: 'availability',
            value: '03',
            actualValue: '01',
        }
        const availability2ModelDefinition = {
            label: 'No',
            name: 'availability',
            value: '04',
            actualValue: '02'
        }
        return (
            <View style={{width: 625, padding: 20}}>
                <Field name="iName" component={InputField} modelDefinitions={indNameModelDefinition} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Do you know DOB ?</Text>
                <Field type="radio" name="idobstatus" component={RadioInput} modelDefinitions={iDobStatus1ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('01')} />
                <Field type="radio" name="idobstatus" component={RadioInput} modelDefinitions={iDobStatus2ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('02')} />
                <Field name="iDOB" component={InputField} modelDefinitions={indDOBModelDefinition} />
                <Field name="iCompletedAge" component={InputField} modelDefinitions={indCompletedAgeModelDefinition} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Gender</Text>
                <Field type="radio" name="gender" component={RadioInput} modelDefinitions={genderMaleModelDefinition} selected={this.state.selected} changeState={() => this.onPress('M')} />
                <Field type="radio" name="gender" component={RadioInput} modelDefinitions={genderFemaleModelDefinition} selected={this.state.selected} changeState={() => this.onPress('F')} />
                <Text style={{ fontSize: 28, marginTop: 10}}>Availability - Will you be available for next 3-4 days during the survey ?</Text>
                <Field type="radio" name="availability" component={RadioInput} modelDefinitions={availability1ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('03')} />
                <Field type="radio" name="availability" component={RadioInput} modelDefinitions={availability2ModelDefinition} selected={this.state.selected} changeState={() => this.onPress('04')} />
            </View>
        );
    }

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string
    }
}



export default reduxForm({
    form: 'addindividual'
})(AddIndividualForm);