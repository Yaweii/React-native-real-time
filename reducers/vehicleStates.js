import { FETCHING_VEHICLE_STATE, FETCHING_VEHICLE_STATE_SUCCESS } from '../constants'
const initialState = {
  vehicleStates: [],
}

export default function vehicleStatesReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_VEHICLE_STATE:
      return {
        ...state,
        vehicleStates
      
      }
    case FETCHING_VEHICLE_STATE_SUCCESS:
      return {
        ...state,
        vehicleStates: action.data
      }
    default:
      return state
  }
}