import createDataContext, { Action } from './createDataContext';

const locationReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'start_recording':
      return { ...state, recording: true};
    case 'stop_recording':
      return { ...state, recording: false};
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'reset':
      return { ...state, name: '', locations: [] };
    default:
      return state;
  }
};

const startRecording = (dispatch: any) => () => {
  dispatch({ type: 'start_recording' });
};

const stopRecording = (dispatch: any) => () => {
  dispatch({ type: 'stop_recording'});
};

const addLocation = (dispatch: any) => (location: any, recording: boolean) => {
  dispatch({ type: 'add_current_location', payload: location });
  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }
};

const changeName = (dispatch: any) => (name: string) => {
  dispatch({ type: 'change_name', payload: name});
};

const reset = (dispatch: any) => () => {
  dispatch({ type: 'reset'});
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { recording: false, name: '', currentLocation: null, locations: [] }
);
