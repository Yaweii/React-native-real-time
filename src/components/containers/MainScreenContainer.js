import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { connectSocket } from '../../../actions';

// Import components
import GooggleMapScreen from '../views/main/GoogleMapScreen'
import ViewWrapper from '../views/Animation/ViewWrapper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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
    mapContainer: {
        flex: 5,
        backgroundColor: '#2196F3',
        alignItems: 'center'

    },
    chartContainer: {
        flex: 5,
        backgroundColor: 'white',
        // alignItems: 'center',
        justifyContent: 'center'

    },

})

class MainScreenContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { vehicleStates: null }
    }
    componentDidMount() {
        this.props.getVehicleStates();

    }

    render() {
        const { vehicleStates } = this.props.vehicleStates

        return (
            <View style = {styles.container} >
                <View style = {styles.titleTextContainer}>
                    <Text style = {styles.titleText}>SF MOTORS</Text>
                </View>
                <View style = {styles.mapContainer}>
                    <Text>{vehicleStates.front_wheel_spin_speed_}</Text>
                </View>
                <View style = {styles.chartContainer}>
                    <ViewWrapper vehicleStates = {vehicleStates}/>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        vehicleStates: state.vehicleStates
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVehicleStates: () => dispatch(connectSocket())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreenContainer)
