import React, { Component } from 'react';
import realm from '../../providers/realm';
import _ from 'lodash';
import moment from 'moment';
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
import HouseholdSurveyForm from "../../forms/HouseholdSurveyForm/index";
import MIcon from '../../components/MIcon/index';

class HouseHoldSurvey extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { dispatch, householdsurveyvalues } = this.props;        
        return (
            <Container style={{backgroundColor: '#e9e9e9'}}>
                <Content style={{padding: 20}}>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <MIcon family='FontAwesome' name='address-card' style={{ fontSize: 100, color: '#4c9689'}}/>
                                <Body>
                                    <Text style={{fontSize: 32}}>Add Household</Text>
                                    <Text note>Please enter your household information.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <HouseholdForm />                                
                            </Body>                            
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#4c9689' }}>
                            <Body>
                                <Button full transparent onPress={() => {dispatch({type: 'goToAddIndividual'})}}>
                                    <Text style={{fontSize: 20, color: '#fff'}}>Add Individual</Text>
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
    householdsurveyvalues: state.form.householdsurveyform
});
 
export default connect(mapStateToProps)(HouseHoldSurvey);