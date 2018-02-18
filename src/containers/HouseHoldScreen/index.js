import React, { Component } from 'react';
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
import HouseholdForm from "../../forms/HouseholdForm/index";
import MIcon from '../../components/MIcon/index';

class HouseHoldScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { dispatch, householdValues } = this.props;        
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
                                <Button full transparent onPress={() => {dispatch({type: 'goToDashboard'})}}>
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
    householdValues: state.form.householdform
});
 
export default connect(mapStateToProps)(HouseHoldScreen);