import React, { Component } from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Icon,
    Button
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MIcon from '../../components/MIcon/index';
import { connect } from "react-redux";

class DashboardScreen extends Component {

    constructor(props){
        super(props);
    }

    render(){
        const { dispatch } = this.props;
        return(
            <Container style={{backgroundColor: '#e9e9e9'}}>
                <Content style={{padding: 20}}>
                    <Grid>
                        <Col>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='plus-square' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block onPress={ () => { dispatch({ type: 'goToHouseHold' }) }}>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Add Household</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='address-book' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Survey Details</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='list' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Completed Survey</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>                        
                        <Col>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='pencil-square' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Edit Household</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='history' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Cluster History</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{flex: 0, marginBottom: 30}}>
                                <CardItem>
                                    <Body style={{alignItems: 'center'}}>
                                        <MIcon family='FontAwesome' name='sign-out' style={{ fontSize: 100, color: '#4c9689'}}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer  style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{fontSize: 16, color: '#fff'}}>Cluster Logout</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
});
 
export default connect(mapStateToProps)(DashboardScreen);
