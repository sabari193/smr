import React, { Component } from 'react';
import realm from '../../providers/realm';
import _ from 'lodash';
import moment from 'moment';
import { Image, TouchableHighlight } from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Left,
    Button,
    Icon,
    List,
    ListItem,
    Right,
    View

} from 'native-base';
import { get } from 'lodash';
import { connect } from "react-redux";
import HouseholdForm from "../../forms/HouseholdForm/index";
import MIcon from '../../components/MIcon/index';

class HouseHoldScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HouseholdID: '',
            HouseholdStatus: '1',
            HouseholdStatusValue: 'Complete',
            personList: [],
            clusterID: '',
            villageName: '',
            accuracy: 0,
            latitude: 0,
            longitude: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        let householdStatus = '1';
        if (nextProps.householdValues.values) {
            householdStatus = nextProps.householdValues.values.householdStatus;
        }
        switch (householdStatus) {
            case '1':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Complete'
                });
                break;
            case '2':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Complete, Information provided by neighbor'
                });
                break;
            case '3':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Incomplete, Locked House'
                });
                break;
            case '4':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Incomplete, No competent responded at home'
                });
                break;
            case '5':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Incomplete, Refused'
                });
                break;
            case '6':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Incomplete, Other'
                });
                break;
            case '7':
                this.setState({
                    HouseholdStatus: householdStatus,
                    HouseholdStatusValue: 'Incomplete, Extended absence (per neighbor)'
                });
                break;
            default:
                break;
        }

    }
    componentWillMount() {
        const { params = {} } = this.props.navigation.state;
        const clusterInfo = JSON.parse(JSON.stringify(realm.objects('Cluster').filtered('status="active"')));
        this.props.navigation.setParams({ handleSave: this._handleSave.bind(this), goHome: this._goHome.bind(this) });
        let HouseholdNumber = ''
        if (!params.HouseholdID) {
            let activehouseholdData = realm.objects('HouseholdNumber').filtered('Submitted="active" AND clusterID=$0', clusterInfo[0].clusterID);
            if (activehouseholdData.length === 1) {
                HouseholdNumber = activehouseholdData[0].HouseholdID;
            }
            else {
                let completedhouseholdData = realm.objects('HouseholdNumber').filtered('Submitted !="active"AND clusterID=$0', clusterInfo[0].clusterID);
                if (completedhouseholdData.length > 0) {
                    let householdNo = parseInt(completedhouseholdData[completedhouseholdData.length - 1].HouseholdID) + 1
                    HouseholdNumber = String(householdNo);
                }
                else {
                    HouseholdNumber = '1';
                }
            }
        }
        else {
            HouseholdNumber = params.HouseholdID;
        }
        this.setState({
            HouseholdID: HouseholdNumber,
            clusterID: clusterInfo[0].clusterID,
            villageName: clusterInfo[0].villageName,
            personList: realm.objects('Household').filtered('HouseholdID=$0 AND Submitted= "active"', HouseholdNumber)
        });
    }
    componentDidMount() {
        const { dispatch, householdValues } = this.props;

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
    _goHome() {
        const { navigate } = this.props.navigation;
        navigate('Dashboard');
    }
    _handleSave() {
        const { navigate } = this.props.navigation;
        if (this.state.HouseholdStatus !== '1') {
            if (this.state.HouseholdStatus !== '2') {
                const HouseholdPrimary = Math.floor(Math.random() * 10000000000) + new Date().getTime();
                const householdObj = {
                    id: `${this.state.HouseholdID}${new Date().getTime()}`,
                    householdNumberPrimary: HouseholdPrimary,
                    HouseholdID: this.state.HouseholdID,
                    HouseholdStatus: this.state.HouseholdStatus,
                    Name: '',
                    KnowDOB: false,
                    DOB: '',
                    AgeDays: '',
                    Age: '',
                    Sex: '',
                    IsPersonAvailable: false,
                    Submitted: 'inprogress',
                    HouseholdStatusValue: this.state.HouseholdStatusValue,
                    clusterID: this.state.clusterID,
                    UpdatedTime: moment().format('MM-DD-YYYY h:mm:ss a'),
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    accuracy: this.state.accuracy
                }
                realm.write(() => {
                    realm.delete(realm.objects('Household').filtered('HouseholdID=$0', this.state.HouseholdID));
                    realm.create('Household', householdObj);
                    realm.create('HouseholdNumber', { HouseholdStatus: this.state.HouseholdStatus, HouseholdID: this.state.HouseholdID, HouseholdPrimary: HouseholdPrimary, Submitted: 'inprogress', clusterID: this.state.clusterID });

                });
                navigate('Dashboard');
            }
            else {
                this.savehouseholdInformation();
            }
        }
        else {
            this.savehouseholdInformation();
        }
    }

    savehouseholdInformation() {
        const { navigate } = this.props.navigation;
        const HouseholdPrimary = Math.floor(Math.random() * 10000000000) + new Date().getTime();
        let idList = _.map(JSON.parse(JSON.stringify(this.state.personList)), 'id');
        realm.write(() => {
            for (var i = 0; i < idList.length; i++) {
                realm.create('Household', { id: idList[i], Submitted: 'inprogress' }, true);
            }
            const householdDetails = realm.objects('Household').filtered('Submitted="inprogress" AND HouseholdStatus!="1" AND HouseholdStatus!= "2" AND HouseholdID=$0', this.state.HouseholdID);
            realm.delete(householdDetails);
            realm.create('HouseholdNumber', { HouseholdStatus: this.state.HouseholdStatus, HouseholdID: this.state.HouseholdID, HouseholdPrimary: HouseholdPrimary, Submitted: 'inprogress', clusterID: this.state.clusterID });
        });
        this.setState({
            personList: []
        });
        navigate('Dashboard');
    }

    removePerson(removePerson, index) {
        realm.write(() => {
            realm.delete(removePerson);
            this.setState({
                personList: realm.objects('Household').filtered('HouseholdID=$0 AND Submitted= "active"', this.state.HouseholdID)
            })
        });
    }

    render() {
        const { dispatch, householdValues } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <Container style={{ backgroundColor: '#e9e9e9' }}>
                <Content style={{ padding: 20 }}>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <MIcon family='FontAwesome' name='address-card' style={{ fontSize: 100, color: '#4c9689' }} />
                                <Body>
                                    <Text style={{ fontSize: 32 }}>Add Household</Text>
                                    <Text note>Please enter your household information.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <HouseholdForm />
                            </Body>
                        </CardItem>
                        {(this.state.HouseholdStatus == '1' || this.state.HouseholdStatus == '2') &&
                            <CardItem style={{ backgroundColor: '#4c9689' }}>
                                <Body>
                                    <Button full transparent onPress={() => { navigate('AddIndividual', { HouseholdID: this.state.HouseholdID, HouseholdStatus: this.state.HouseholdStatus, HouseholdStatusValue: this.state.HouseholdStatusValue, clusterID: this.state.clusterID, villageName: this.state.villageName })/* dispatch({ type: 'goToAddIndividual' }) */ }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>Add Individual</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        }
                    </Card>
                    {(this.state.HouseholdStatus == '1' || this.state.HouseholdStatus == '2') && this.state.personList.map(function (person, index) {
                        return <List avatar style={{ backgroundColor: '#fff' }} key={index}>
                            <ListItem>
                                <Left style={{ width: 100 }}>
                                    <View style={{ width: 75, height: 75, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#4c9689' }}>
                                        <MIcon family='FontAwesome' name={person.Sex == 'M' ? 'male' : 'female'} style={{ fontSize: 30, color: '#fff' }} />
                                    </View>
                                </Left>
                                <Body style={{ marginLeft: -355 }}>
                                    <Text style={{ fontSize: 28 }}>{person.Name}</Text>
                                    <Text note style={{ fontSize: 20 }}>{`${person.KnowDOB ? `DOB  : ` : `Age : `} ${person.KnowDOB ? person.DOB : person.Age}`}</Text>
                                </Body>
                                <TouchableHighlight onPress={() => this.removePerson(person, index)}>
                                    <Right>
                                        <MIcon style={{ fontSize: 50, color: '#4c9689' }} family='FontAwesome' name="trash" />
                                    </Right>
                                </TouchableHighlight>
                            </ListItem>
                        </List>
                    }, this)}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    householdValues: state.form.householdform
});

export default connect(mapStateToProps)(HouseHoldScreen);