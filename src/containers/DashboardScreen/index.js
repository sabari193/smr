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
import { Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MIcon from '../../components/MIcon/index';
import { connect } from "react-redux";

class DashboardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clusterID: '',
            villageName: '',
            categoryA: '-',
            categoryB: '-',
            categoryC: '-',
            clusterPrimaryID: '',
            surveyDetails: []
        }
    }
    async loadCategoryDetails() {
        let clusterDetails = JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status="active"')));
        this.setState({
            clusterPrimaryID: clusterDetails[0].clusterPrimaryID,
            clusterID: clusterDetails[0].clusterID,
            villageName: clusterDetails[0].villageName,
            categoryA: realm.objects('Household').filtered('clusterID=$0 AND Category="A" AND Submitted="inprogress"', clusterDetails[0].clusterID).length,
            categoryB: realm.objects('Household').filtered('clusterID=$0 AND Category="B" AND Submitted="inprogress"', clusterDetails[0].clusterID).length,
            categoryC: realm.objects('Household').filtered('clusterID=$0 AND Category="C" AND Submitted="inprogress"  ', clusterDetails[0].clusterID).length
        });
        console.log(realm.objects('Household').filtered(`clusterID=$0 AND Category="A"`, clusterDetails[0].clusterID).length)
    }
    componentWillMount() {
        this.loadCategoryDetails();
    }
    deleteCluster() {
        Alert.alert(
            'Delete Cluster Information',
            'Do you want to delete cluster information',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        realm.write(() => {
                            let householdDetails = JSON.parse(JSON.stringify(realm.objects('Household')));
                            _.forEach(householdDetails, (house) => {
                                realm.create('Household', { id: house.id, Submitted: 'deleted' }, true);

                            });
                            let householdNumberDetails = JSON.parse(JSON.stringify(realm.objects('HouseholdNumber')));
                            _.forEach(householdNumberDetails, (household) => {
                                realm.create('HouseholdNumber', { HouseholdPrimary: household.HouseholdPrimary, Submitted: 'deleted' }, true);

                                realm.create('Cluster', {
                                    clusterPrimaryID: this.state.clusterPrimaryID,
                                    status: 'deleted'
                                }, true);
                            });
                            realm.delete(realm.objects('RandomSurvey'));
                            realm.delete(realm.objects('SurveyDetails'));
                            this.navigateToSignIn();
                        });
                    }
                },
            ],
            { cancelable: false }
        )
    }
    navigateToSignIn() {
        var { dispatch } = this.props.navigation;
        dispatch({ type: 'goToHome' });
    }
    showClusterHisttory() {
        var { dispatch } = this.props.navigation;
        dispatch({ type: 'goToShowClusterHistory' });
    }
    generateRandomSurvey(props) {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToRandomListScreen' });
    }
    gotoHouseholdScreen() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToHouseHold' });
    }
    gotoEditHouseholdScreen() {
        const { dispatch } = this.props.navigation;
        dispatch({ type: 'goToViewCluster' });
    }

    gotoCompletedSurvey() {
        const { navigate } = this.props.navigation;
        const surveyDatafromRealm = JSON.parse(JSON.stringify(realm.objects('RandomSurvey')))[0].surveyDetails;
        this.setState({ surveyDetails: surveyDatafromRealm });
        navigate('CompletedSurveyDetails', { surveyDetails: surveyDatafromRealm });
    }

    render() {
        const { dispatch } = this.props;
        return (
            <Container style={{ backgroundColor: '#e9e9e9' }}>
                <Content style={{ padding: 20 }}>
                    <Grid>
                        <Col>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='plus-square' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block onPress={() => { dispatch({ type: 'goToHouseHold' }) }}>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Add Household</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='address-book' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Survey Details</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='list' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Completed Survey</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='pencil-square' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Edit Household</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='history' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Cluster History</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ flex: 0, marginBottom: 30 }}>
                                <CardItem>
                                    <Body style={{ alignItems: 'center' }}>
                                        <MIcon family='FontAwesome' name='sign-out' style={{ fontSize: 100, color: '#4c9689' }} />
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ backgroundColor: '#4c9689' }}>
                                    <Body>
                                        <Button transparent block onPress={() => { this.deleteCluster() }}>
                                            <Text style={{ fontSize: 16, color: '#fff' }}>Cluster Logout</Text>
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
