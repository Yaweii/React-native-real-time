import React, {Component} from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import Container from './SmoothAnimatedChart'
import Svg, {G, Path, Line, Rect, Defs, ClipPath } from 'react-native-svg'



// import { connect } from 'react-redux';
// import { connectSocket } from '../../../../actions';



class ViewWrapper extends Component {


    render() {
        const { vehicleStates } = this.props.vehicleStates

        const view = [480, 320];
        const trbl = [0, 0, 0, 0];
        return (
            <View width = {1000} height = {1000}>
                <Svg width = {500} height = {500}>
                <Container {...{view, trbl}}/>
                </Svg>

            </View>

        )
    }
}