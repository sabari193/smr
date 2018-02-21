import React from 'react'
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import _ from 'lodash';
import { ProfileMenuHeader, colors } from '../../components/PocketUI/index';
import realm from '../../providers/realm';

export default class DashboardScreen extends React.Component {
  constructor() {
    super()
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
              });
              realm.create('Cluster', {
                clusterPrimaryID: this.state.clusterPrimaryID,
                status: 'deleted'
              }, true);
              realm.delete(realm.objects('RandomSurvey'));
              realm.delete(realm.objects('SurveyDetails'));
              realm.delete(realm.objects('SurveyInformation'));
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
    return (
      <View style={{ backgroundColor: '#F2F5FB', flex: 1 }}>
        <ScrollView>
          {(this.state.clusterID) &&
            <ProfileMenuHeader
              headingIcon="IMRVI"
              heading={`${this.state.clusterID} - ${this.state.villageName}`}
              icon1Title="Add Household"
              icon2Title="Edit Household"
              icon3Title="Survey Details"
              icon4Title="Completed Survey"
              icon5Title="Cluster History"
              icon6Title="Cluster Logout"
              onPressIcon1={this.gotoHouseholdScreen.bind(this)}
              onPressIcon2={this.gotoEditHouseholdScreen.bind(this)}
              onPressIcon3={this.generateRandomSurvey.bind(this)}
              onPressIcon4={this.gotoCompletedSurvey.bind(this)}
              onPressIcon5={this.showClusterHisttory.bind(this)}
              onPressIcon6={this.deleteCluster.bind(this)}
              navigation={this.props.navigation}
            />
          }
          <View>
            <Text style={styles.headingLetter1}>Census --> A : {this.state.categoryA} || B : {this.state.categoryB} || C : {this.state.categoryC}</Text>
            <Text style={styles.headingLetter2}>Blood Collected --> A : 0 || B : 2 || C : 1</Text>
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  headingLetter1: {
    color: '#3E4A59',
    fontWeight: '700',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 50,
    textAlign: 'center',
    color: 'green'
  },
  headingLetter2: {
    color: '#3E4A59',
    fontWeight: '700',
    fontSize: 23,
    marginLeft: 20,
    marginTop: 10,
    textAlign: 'center',
    color: 'red'
  }
});