import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

export interface Props {
  isFocused: boolean;
}

const TrackCreateScreen: React.FC<Props> = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback((location: any) => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={ { top: 'always' } }>
      <Text h2>Create a Track</Text>
      <Map/>
      <TrackForm/>
      { err ? <Text>Please enable location services</Text> : null }
    </SafeAreaView>
  )
};

TrackCreateScreen.navigationOptions = () => {
  return {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={ 20 } color="black"/>
  }
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
