import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import useSignOut from '../hooks/useSignOut';

const AccountScreen = ({ navigation }) => {

  const [signOut] = useSignOut(navigation);

  return (
    <SafeAreaView forceInset={ { top: 'always' } }>
      <Text>AccountScreen</Text>
      <Spacer>
        <Button
          title="Sign Out"
          onPress={ signOut }
        />
      </Spacer>
    </SafeAreaView>
  )
};

AccountScreen.navigationOptions = () => {
  return {
    title: 'Account',
    tabBarIcon: <FontAwesome name="gear" size={ 20 } color="black"/>
  }
};

export default AccountScreen;
