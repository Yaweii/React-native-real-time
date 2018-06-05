import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux';
import { connectSocket } from '../../../../actions';

import SpeedLineChart from '../charts/SpeedLineChart';
// import Test from '../charts/Test'
import LineChart from '../charts/LineChart';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  titleTextContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  titleText: {
    textAlign: 'center',
    fontSize: 35
  },
  launchButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  launchButton: {
    height: 50,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  launchButtonText: {
    color: 'white',
    fontSize: 20
  },
  infoViewContainer: {
    flex: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15
  },
  listViewContainer1: {
    flex: 5,
    backgroundColor:'#2196F3',
    alignItems: 'center'
 
  },
  listViewContainer3: {
    flex: 5,
    backgroundColor:'white',
    // alignItems: 'center',
    justifyContent: 'center'
 
  },
  listViewHeaderContainer: {
    marginTop: 5,
    marginBottom: 5
  },
  listViewHeaderText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
})


const HomeScreen = (props) => {
  const {
    container,
    titleTextContainer,
    titleText,
    launchButtonContainer,
    launchButton,
    launchButtonText,
    infoViewContainer,
    listViewContainer1,
    listViewContainer3,
    listViewHeaderContainer,
    listViewHeaderText
  } = styles

  const { vehicleStates } = props.vehicleStates;


  return (
    <View style = {container}>
      <View style = {titleTextContainer}>
        <Text style = {titleText}>SF MOTORS</Text>
      </View>
      <View style = {launchButtonContainer}>
        <TouchableHighlight style = {launchButton} onPress = {() => props.getVehicleStates()}>
          <Text style = {launchButtonText}>Launch</Text>
        </TouchableHighlight>
      </View>
      <View style = {infoViewContainer}> 
        <View style = {listViewContainer1}>
          <View style = {listViewHeaderContainer}>
            <Text style = {listViewHeaderText}>SPEED</Text>
          </View>
          <Text>Front Wheel Spin Speed</Text>
          <Text>{vehicleStates.front_wheel_spin_speed_}</Text>
        </View>
        <View style = {listViewContainer3}>
          <LineChart speed = {vehicleStates.front_wheel_spin_speed_}/>
        </View>
      </View>
    </View>
  )
}

function mapStateToProps (state) {
    return {
      vehicleStates: state.vehicleStates
    }
  }
  
function mapDispatchToProps (dispatch) {
    return {
      getVehicleStates: () => dispatch(connectSocket())
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
  