import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResolveAuthScreen = ({ navigation }) => {

  const tryLocalSignIn = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    navigation.navigate(token ? 'TrackList' : 'loginFlow');
  };

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;
