import React from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { connectSocket } from './actions'

let styles

const App = (props) => {
  const {
    container,
    text,
    button,
    buttonText
  } = styles
  const { vehicleStates } = props.vehicleStates;
  return (
    <View style={container}>
      <Text style={text}>Redux Example</Text>
      <TouchableHighlight style={button} onPress={() => props.getVehicleStates()}>
        <Text style={buttonText}>Load VehicleStates</Text>
      </TouchableHighlight>
      {
        // isFetching && <Text>Loading</Text>
      }
      {
          vehicleStates.map((vehicleState, i) => {
            return <View key={i} >
              <Text>Name: {vehicleState.front_wheel_spin_speed_}</Text>
            </View>
          })
      }
    </View>
  )
}

styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

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
)(App)