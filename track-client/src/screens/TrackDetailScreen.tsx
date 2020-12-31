import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import MapView, { Polyline } from 'react-native-maps';
import useTrackDetail from '../hooks/useTrackDetail';

const TrackDetailsScreen = ({ navigation }) => {

  const id = navigation.getParam('id');
  const [loading, error, data] = useTrackDetail(id);

  if (loading) {
    return <ActivityIndicator size='large'/>;
  }

  if (error) {
    return <Text h4>{ error?.message }</Text>;
  }

  const track = data.track;
  const initialCoords = track.locations[0].coords;

  return (
    <SafeAreaView>
      <Text h3>{ track.name }</Text>
      <MapView
        style={ styles.map }
        initialRegion={ {
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        } }>
        <Polyline coordinates={ track.locations.map((loc: any) => loc.coords) }/>
      </MapView>
    </SafeAreaView>
  )
};

TrackDetailsScreen.navigationOptions = () => {
  return {
    title: 'Track Details'
  }
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});
export default TrackDetailsScreen;
