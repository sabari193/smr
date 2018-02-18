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
import ClusterForm from "../../forms/ClusterForm/index";
import { formValueSelector } from 'redux-form';

class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { dispatch, clusterValues } = this.props;
        
        return (
            <Container style={{backgroundColor: '#e9e9e9'}}>
                <Content style={{padding: 20}}>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Icon name="home" style={{ fontSize: 70, color: '#4c9689'}} />
                                <Body>
                                    <Text style={{fontSize: 32}}>Cluster Information</Text>
                                    <Text note>Please enter your cluster information.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Image source={require('../../assets/images/cluster_form_banner.jpg')} style={{height: 400, width: 640, flex: 1}}/>
                                <ClusterForm />
                            </Body>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#4c9689' }}>
                            <Body>
                                <Button transparent block onPress={() => {dispatch({type: 'goToDashboard'})}}>
                                    <Text style={{fontSize: 20, color: '#fff'}}>Start the Survey</Text>
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
    clusterValues: state.form.clusterform
});
 
export default connect(mapStateToProps)(HomeScreen);