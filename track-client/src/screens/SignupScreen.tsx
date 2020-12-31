import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import useSignUp from '../hooks/useSignUp';

const SignupScreen = ({ navigation }) => {

  const [signUp, error, clearError] = useSignUp(navigation);

  return (
    <View style={ styles.container }>
      <NavigationEvents onWillFocus={ clearError }/>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={ error }
        onSubmit={ signUp }
        submitButtonText="Sign Up"/>

      <NavLink
        text="Already have an account? Sign in instead"
        routeName="Signin"
      />
    </View>
  )
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SignupScreen;
