import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
  const { state: { recording, name, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          placeholder='Enter Name'
          value={ name }
          onChangeText={ changeName }/>
      </Spacer>
      <Spacer>
        { recording
          ? <Button title='Stop' onPress={ stopRecording }/>
          : <Button title='Start Recording' onPress={ startRecording }/>
        }
      </Spacer>
      <Spacer>
        { !recording && locations.length
          ? <Button
            title='Save'
            onPress={ saveTrack }/>
          : null }
      </Spacer>
    </>
  )
};

const styles = StyleSheet.create({});

export default TrackForm;
