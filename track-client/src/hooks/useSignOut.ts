import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearCache } from '../apollo';

export default (navigation) => {
  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    await clearCache();
    navigation.navigate('loginFlow');
  };

  return [signOut];
}
