import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
        accessToken
    }
  }
`;

export default (navigation) => {
  const [error, setError] = useState('');
  const clearError = () => setError('');

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: async ({ signup }) => {
      if (signup) {
        await AsyncStorage.setItem('accessToken', signup.accessToken);
        navigation.navigate('TrackList');
      }
    },
    onError: (error) => setError(error.message)
  });

  return [signUp, error, clearError];
}
