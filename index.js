import React from 'react'
import {
  AppRegistry
} from 'react-native'

import Svg from 'react-native-svg'

import { Provider } from 'react-redux'
import configureStore from './configureStore'

// import HomeScreen from './src/components/views/main/HomeScreen'
// import MainScreenContainer from  './src/components/containers/MainScreenContainer'
// import Container from './src/components/views/Animation/SmoothAnimatedChart'
import RealTimeLineChart from './src/components/views/charts/RealTimeLineChart'



const store = configureStore()
const view = [480, 320];
const trbl = [0, 0, 0, 0];


const ReduxApp = () => (
  <Provider store = {store}>
    <RealTimeLineChart />
  </Provider>
)

AppRegistry.registerComponent('SFView', () => ReduxApp)