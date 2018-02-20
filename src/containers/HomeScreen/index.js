import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ClusterFormScreen from '../ClusterFormScreen';
import { colors, LoginHeader } from '../../components/PocketUI/index';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
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
