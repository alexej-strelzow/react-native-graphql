import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { gql, useQuery } from '@apollo/client';
import { NavigationEvents } from 'react-navigation';

const TRACKS_QUERY = gql`
  query tracks {
    tracks {
      id
      name
    }
  }
`;

const TrackListScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(TRACKS_QUERY);

  if (loading) {
    return <ActivityIndicator size='large'/>;
  }

  if (error) {
    return <Text h4>{error?.message}</Text>;
  }

  return (
    <>
      <NavigationEvents onWillFocus={refetch}/>
      <FlatList
        data={ data.tracks }
        keyExtractor={ (item) => '' + item.id }
        renderItem={ ({ item }) => {
          return (
            <TouchableOpacity onPress={ () => navigation.navigate('TrackDetail', { id: item.id }) }>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{ item.name }</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            </TouchableOpacity>
          );
        } }/>
    </>
  )
};

TrackListScreen.navigationOptions = () => {
  return {
    title: 'Tracks'
  }
};

const styles = StyleSheet.create({});

export default TrackListScreen;
