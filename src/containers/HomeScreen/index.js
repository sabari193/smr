import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ClusterFormScreen from '../ClusterFormScreen';
import { colors, LoginHeader } from '../../components/PocketUI/index';
import realm from '../../providers/realm';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props.navigation;
        const activeCluster = realm.objects('Cluster').filtered('status = "active"');
        this.requestLocationPermission();
        console.log("activeCluster", JSON.parse(JSON.stringify(realm.objects('Cluster'))))
        if (activeCluster.length > 0) {
            dispatch({ type: 'goToDashboard' });
        }
        else {
            return false;
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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: 'white' }}>
                <LoginHeader
                    headerTitle="Enter your cluster information"
                />
                <ClusterFormScreen navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        padding: 0,
    },
});
