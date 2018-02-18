import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import realm from '../../providers/realm';
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

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props.navigation;
        const activeCluster = realm.objects('Cluster').filtered('status = "active"');
        console.log("clsuter", realm.objects('Cluster').filtered('status = "active"').length);
        this.requestLocationPermission();
        if (activeCluster.length > 0) {
            dispatch({ type: 'goToDashboard' });
        }
        else {
            dispatch({ type: 'goToHome' });
        }
    }

    requestLocationPermission() {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Location Permission',
                    'message': 'Need permission to update location information'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission granted")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    saveClusterInformation() {
        const { dispatch, clusterValues } = this.props;
        console.log(clusterValues.values);
        if (clusterValues.values.clusterID && clusterValues.values.villageName) {
            if (clusterValues.values.clusterID > 100 && clusterValues.values.clusterID < 1000) {
                clusterValues.values['status'] = 'active';
                clusterValues.values['clusterPrimaryID'] = String(new Date().getTime())
                realm.write(() => {
                    realm.create('Cluster', clusterValues.values);
                });
                dispatch({ type: 'goToDashboard' })
            } else {
                alert('Cluster ID should be between 101 to 999');
            }
        } else {
            alert('Cluster ID & Village Name cannot be empty');
        }
    }
    render() {
        const { dispatch, clusterValues } = this.props;

        return (
            <Container style={{ backgroundColor: '#e9e9e9' }}>
                <Content style={{ padding: 20 }}>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <Icon name="home" style={{ fontSize: 70, color: '#4c9689' }} />
                                <Body>
                                    <Text style={{ fontSize: 32 }}>Cluster Information</Text>
                                    <Text note>Please enter your cluster information.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={require('../../assets/images/cluster_form_banner.jpg')} style={{ height: 400, width: 640, flex: 1 }} />
                                <ClusterForm />
                            </Body>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#4c9689' }}>
                            <Body>
                                <Button transparent block
                                    onPress={() => {
                                        this.saveClusterInformation();
                                    }}
                                >
                                    <Text style={{ fontSize: 20, color: '#fff' }}>Start the Survey</Text>
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