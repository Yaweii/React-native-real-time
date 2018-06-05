import React, {Component} from 'react'
import { Text, View } from 'react-native' 



// This class will be placed by Google Map later
// Currently is displaying text


const GoogleMapScreen = (props) => {
    const { vehicleStates } = props.vehicleStates

    return (
        <View>
            <Text>Speed</Text>
            <Text>{vehicleStates.front_wheel_spin_speed_}</Text>
        </View>
    )
}

export default GoogleMapScreen