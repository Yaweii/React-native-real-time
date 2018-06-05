import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { connectSocket } from '../../../../actions';

import { LineChart, Grid } from 'react-native-svg-charts'
import * as V from 'victory'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const SpeedLineChart = (props) => {
  
    const { vehicleStates } = props.vehicleStates;
    const data = [ ...[74], vehicleStates.front_wheel_spin_speed_, undefined, undefined, undefined, undefined]
    
        return (
            <View style = {{ height: 200, flexDirection: 'row'}}>
            <LineChart
                style = {{ height: 300, width: 300}}
                animated = {true}
                animationDuration = {300}
                gridMin = {0}
                gridMax = {100}
                data = { data }
                svg = {{ stroke: 'rgb(134, 65, 244)' }}
                contentInset = {{ top: 20, bottom: 20 }}
            >
                <Grid/>
            </LineChart>
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
)(SpeedLineChart)
  