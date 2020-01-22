import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import {login, register} from '../hooks/APIhooks';
import useSignUpForm from '../hooks/LoginHooks';

const Login = (props) => {
  const {handleUsernameChange, handlePasswordChange, handleEmailChange, handleFullnameChange, inputs} = useSignUpForm();
  const signInAsync = async () => {
    try {
      console.log('username: ' + inputs.username + 'password: ' + inputs.password);
      const user = await login(inputs.username, inputs.password);
      console.log(user);
      await AsyncStorage.setItem('userToken', user.token);
      console.log(user.user.email);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('error', e);
    }
  };

  const registerAsync = async () => {
    try {
      const result = await register(inputs.username, inputs.password, inputs.email, inputs.full_name);
      console.log('user: ' + result);
      // IF does not exist do somtihng
      await signInAsync();
      // else
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize='none'
          placeholder='username'
          onChangeText={handleUsernameChange}
          value={inputs.username}
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={inputs.password}
        />
        <Button title="Sign in!" onPress={signInAsync} />
      </View>
      <Text>Register</Text>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize='none'
          placeholder='username'
          onChangeText={handleUsernameChange}
          value={inputs.username}
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={inputs.password}
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='email'
          onChangeText={handleEmailChange}
          value={inputs.email}
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='full_name'
          onChangeText={handleFullnameChange}
          value={inputs.full_name}
        />
        <Button title="Register" onPress={registerAsync} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
