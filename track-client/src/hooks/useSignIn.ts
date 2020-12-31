import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
        accessToken
    }
  }
`;

export default (navigation) => {
  const [error, setError] = useState('');
  const clearError = () => setError('');

  const [signin] = useMutation(SIGN_IN, {
    onCompleted: async ({ signin }) => {
      if (signin) {
        await AsyncStorage.setItem('accessToken', signin.accessToken);
        navigation.navigate('TrackList');
      }
    },
    onError: (error) => setError(error.message)
  });

  return [signin, error, clearError];
}
