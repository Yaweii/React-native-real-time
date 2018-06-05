import { FETCHING_VEHICLE_STATE, FETCHING_VEHICLE_STATE_SUCCESS } from './constants'

export function connectSocket() {
  const ws = new WebSocket("ws://10.21.80.183:8675");

  return  (dispatch) => {
      ws.onopen = () => {
          console.log('Connection Open');
      }

      ws.onmessage = (msg) => {
          const response = JSON.parse(msg.data)
          if (response.vehicle_state) {
              dispatch(getVehicleStatesSuccess(response.vehicle_state))
          }
      }

      ws.onerror = (e) => {
          console.log(e.message);
      }

      ws.onclose = (e) => {
          console.log(e.code, e.reason);
      }
  }
}

export function getVehicleStates() {
  return {
    type: FETCHING_VEHICLE_STATE
  }
}

export function getVehicleStatesSuccess(data) {
  return {
    type: FETCHING_VEHICLE_STATE_SUCCESS,
    data,
  }
}

