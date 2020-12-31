import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import useSignIn from '../hooks/useSignIn';

const SigninScreen = ({ navigation }) => {

  const [signIn, error, clearError] = useSignIn(navigation);

  return (
    <View style={ styles.container }>
      <NavigationEvents onWillFocus={ clearError }/>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={ error }
        onSubmit={ signIn }
        submitButtonText="Sign In"/>

      <NavLink
        text="Don't have an account? Go back to sign up"
        routeName="Signup"
      />
    </View>
  )
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
